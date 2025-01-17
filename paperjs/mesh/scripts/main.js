/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global paper, ColorTheme, Point, view, Shape, Path, atob, btoa, ArrayBuffer,
    Uint8Array, Blob, Size, PixelData, Tool, project, Layer, ObjectPool, BlendModes,
    FileDownloader, Utils, MathUtils */

(function () {
    "use strict";
    
    paper.install(window);
    
    
    var config = {
        APP_NAME: "mesh",
        BACKGROUND_COLOR: "#111111",
        ANIMATE: false,
        DRAW_RADIUS_POINTS: false,

        RADIUS: 3,
        DRAW_CIRCLES: false,
        CIRCLE_OPACITY: 1.0,
        FILL_OPACITY: 1.0,
        
        BOUNDS_PADDING: 0, //radius * 2
        CIRCLE_COUNT: 3800,
        MAX_NEIGHBOR_COUNT: 20,
        FIND_NEAREST_NEIGHBOR: true,

        STROKE_COLOR: "white",

        //soft-light, hard-light, difference, color-dodge
        BLEND_MODE: BlendModes.SOFT_LIGHT,
        CIRCLE_BLENDMODE: BlendModes.NORMAL,
        STROKE_WIDTH: 0.2,
        TEMPLATE: "templates/blank_template.gif",
        ALLOW_TEMPLATE_SKEW: false, //todo: this doesnt work correct when true
        CANVAS_WIDTH: 768,
        CANVAS_HEIGHT: 432, //16:9 aspect ratio
        SCALE_CANVAS: false,
        USE_RANDOM_COLORS: true,
        colorTheme: ColorTheme.themes.BLUE_AND_PINK
    };
    
    /*********** Override Config defaults here ******************/
    
    
    config.CIRCLE_COUNT = 3800;//3800
    config.MAX_NEIGHBOR_COUNT = 20;
    config.TEMPLATE = "templates/cc_template_768.png";
    //config.BOUNDS_PADDING = 50;
    
    config.BOUNDS_PADDING = 0;
    config.colorTheme = ColorTheme.themes.BLUE_AND_PINK;
    config.BLEND_MODE = BlendModes.SOFT_LIGHT;
    
    
    //config.CIRCLE_COUNT = 100;
    //config.MAX_NEIGHBOR_COUNT = 3;
    
    //config.BOUNDS_PADDING = 0;
    //config.STROKE_WIDTH = 1.0;
    //config.STROKE_COLOR = "#111111";
    //config.TEMPLATE = "templates/blank_template.gif";
    //config.BLEND_MODE = BlendModes.NORMAL;
    //config.BACKGROUND_COLOR = "#FFFFFF";
    //config.USE_RANDOM_COLORS = false;
    
    //config.colorTheme = ColorTheme.themes.PHAEDRA;
    
    /*************** End Config Override **********************/
    
    var colorTheme = new ColorTheme(config.colorTheme);
    var circleGroups = {};
    var t; //paperjs tool reference
    var circlesStore;
    var pixelData;
    
    var backgroundLayer;
    var circleLayer;
    var linesLayer;
    
    var getColor = function () {
        
        var color;
        if (config.USE_RANDOM_COLORS) {
            color = colorTheme.getRandomColor();
        } else {
            color = colorTheme.getNextColor();
        }
        
        return color;
    };
    
    var randomVectorValue = function () {

        var v = Math.random();

        if (v === 0) {
            v = -1;
        }
        
        v += 0.25; //minimum speed
        
        if (Math.random() < 0.5) {
            v *= -1;
        }

        return v;
    };
    
    var createCircle = function (point, radius) {
        
        if (!radius) {
            radius = config.RADIUS;
        }
        
        if (!point) {
            point = Utils.randomPointInView(view, config.BOUNDS_PADDING);
        }
        
        var circle = new Shape.Circle({
            center: point,
            radius: radius,
            insert: config.DRAW_CIRCLES
        });
        
        if (config.DRAW_CIRCLES) {
            circle.blendMode = config.CIRCLE_BLENDMODE;
            circle.strokeColor = config.STROKE_COLOR;
            circle.fillColor = getColor();

            circle.vector = new Point(randomVectorValue(), randomVectorValue());

            circle.opacity = config.CIRCLE_OPACITY;
        }
        
        //todo: this may not work if we are not drawing circles
        if (config.ANIMATE) {
            circle.onFrame = function () {
                
                var SPEED = 4;
                this.position.x += this.vector.x * SPEED;
                this.position.y += this.vector.y * SPEED;
                if (this.position.y < 0) {
                    this.vector.y *= -1;
                    this.position.y = 0;
                } else if (this.position.y + this.bounds.height > view.bounds.height) {
                    this.vector.y *= -1;
                    this.position.y = view.bounds.height - this.bounds.height - 1;
                }
                
                if (this.position.x < 0) {
                    this.vector.x *= -1;
                    this.position.x = 0;
                } else if (this.position.x + this.bounds.width > view.bounds.width) {
                    this.vector.x *= -1;
                    this.position.x = view.bounds.width - this.bounds.width - 1;
                }
            };
        } else {
            circle.onFrame = undefined;
        }

        return circle;
    };
    
    var _distanceSort = function (a, b) {
        return a.distance - b.distance;
    };
    
    var pool = new ObjectPool();
    
    //todo: this could use a TON of optimization. Probably needs a different
    //algorithm to sort the points.
    var findClosestNeighbors = function (circle, circles) {
        var count = config.MAX_NEIGHBOR_COUNT;

        var circlesLen = circles.length;
        if (count >= circlesLen) {
            count = circlesLen - 1;
        }

        var c;
        var dist;
        var hash = {};
        
        var h;
        var i;
        for (i = 0; i < circlesLen; i++) {
            c = circles[i];
            
            if (c === circle) {
                continue;
            }

            dist = MathUtils.distanceBetweenPoints(c.position, circle.position);
            
            //This hashes on the PaperJS naming for each Circle instance
            //we can't hash on the distance (which would be faster), because it is possible 
            //there will be a duplicate
            h = pool.getObject();
            h.distance = dist;
            h.circle = c;
            
            hash[c.toString()] = h;
        }
        
        var _sorted = [];
        var key;
        for (key in hash) {
            _sorted.push(hash[key]);
        }
        
        _sorted.sort(_distanceSort);
        
        if (!config.FIND_NEAREST_NEIGHBOR) {
            _sorted.reverse();
        }
        
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = _sorted[i].circle;
        }
        
        for (key in hash) {
            pool.returnObject(hash[key]);
        }
        
        return out;
    };
    
    var cp;
    var connectCircles = function (circles) {
        
        var c1;
        var c2;
        var neighbors;
        var len;
        var circleLen = circles.length;
    
        var k;
        for (k = 0; k < circleLen; k++) {
            c1 = circles[k];
            
            neighbors = findClosestNeighbors(c1, circles);
 
            len = neighbors.length;

            var path = new Path();
            path.strokeColor = config.STROKE_COLOR;
            path.strokeWidth = config.STROKE_WIDTH;
            path.blendMode = config.BLEND_MODE;
            path.opacity = config.FILL_OPACITY;
            
            path.fillColor = getColor();
            
            path.moveTo(c1.position);
            
            var i;
            for (i = 0; i < len; i++) {
                c2 = neighbors[i];
                path.lineTo(c2.position);
            }
            
            path.lineTo(c1.position);
        }
    };
    
    var connectAllCircles = function () {
        
        linesLayer.activate();
        
        var key;
        for (key in circleGroups) {
            connectCircles(circleGroups[key]);
        }
    };
    
    var groupCircles = function (circles) {
        
        circleGroups = {};
        
        var circle;
        var len = circles.length;
        
        var i;
        for (i = 0; i < len; i++) {
            circle = circles[i];
            
            var group = pixelData.getHex(circle.position);

            if (!circleGroups[group]) {
                circleGroups[group] = [];
            }
        
            circleGroups[group].push(circle);
        }
    };
    
    var initCanvas = function () {
        var drawCanvas = document.getElementById("myCanvas");
        var canvasW = config.CANVAS_WIDTH;
        var canvasH = config.CANVAS_HEIGHT;
        
        if (config.SCALE_CANVAS) {
            var maxW = window.innerWidth;
            var maxH = window.innerHeight;

            //http://www.ajaxblender.com/howto-resize-image-proportionally-using-javascript.html
            if (canvasH > maxH ||
                    canvasW > maxW) {

                var ratio = canvasH / canvasW;

                if (canvasW >= maxW && ratio <= 1) {
                    canvasW = maxW;
                    canvasH = canvasW * ratio;
                } else if (canvasH >= maxH) {
                    canvasH = maxH;
                    canvasW = canvasH / ratio;
                }
            }
        }
        
        drawCanvas.height = canvasH;
        drawCanvas.width = canvasW;
        
        return drawCanvas;
    };
    
    var fileDownloader;
    window.onload = function () {

        fileDownloader = new FileDownloader(config.APP_NAME);
        var drawCanvas = initCanvas();
        
        paper.setup(drawCanvas);
        
        var backgroundLayer = project.activeLayer;

        //programtically set the background colors so we can set it once in a var.
        document.body.style.background = config.BACKGROUND_COLOR;
        drawCanvas.style.background = config.BACKGROUND_COLOR;
        
        var rect = new Path.Rectangle(new Point(0, 0),
                            new Size(view.bounds.width, view.bounds.height)
                );
        
        rect.fillColor = config.BACKGROUND_COLOR;
      
        var w = drawCanvas.width;
        var h = drawCanvas.height;
        var templateImage = new Image();
        templateImage.onload = function () {
                
            var canvas = document.createElement("canvas");
            canvas.id = "templateCanvas";
            canvas.width = w;
            canvas.height = h;
            
            //todo: probably should scale the images depending on canvas size.
            
            var context = canvas.getContext("2d");
            context.fillStyle = "#000000";
            context.fillRect(0, 0, w, h);

            if (config.ALLOW_TEMPLATE_SKEW) {
                //WARNING: The causes some dithering and adds color to the template
                //pretty much broken right now
                //stretch image to fill entire canvas. This may skew image
                context.drawImage(templateImage, 0, 0, w, h);
            } else {
                //center the image

                var xPos = Math.floor((w - templateImage.width) / 2);
                var yPos = Math.floor((h - templateImage.height) / 2);
                context.drawImage(templateImage, xPos, yPos);
            }
            
            var imageData = context.getImageData(0, 0, w, h);
            pixelData = new PixelData(imageData);
            
            circlesStore = [];
            
            
            linesLayer = new Layer();
            var i;
            for (i = 0; i < config.CIRCLE_COUNT; i++) {
                circlesStore.push(createCircle());
            }

            groupCircles(circlesStore);

            circleLayer = new Layer();
            connectAllCircles();

            view.update();
            
            if (config.ANIMATE) {
                view.onFrame = function () {
                    linesLayer.removeChildren();
                    groupCircles(circlesStore);
                    connectAllCircles();

                    //this fixes an issue where sometimes the view won't render until a browser
                    //event (mouse over, etc...)
                    paper.view.update();
                };
            }

            t = new Tool();

            //Listen for SHIFT-p to save content as SVG file.
            //Listen for SHIFT-o to save as PNG
            t.onKeyUp = function (event) {
                if (event.character === "S") {
                    fileDownloader.downloadSVGFromProject(paper.project);
                } else if (event.character === "P") {
                    fileDownloader.downloadImageFromCanvas(drawCanvas);
                } else if (event.character === "J") {
                    fileDownloader.downloadConfig(config);
                }
            };
        };
            
        templateImage.src = config.TEMPLATE;
    };

}());
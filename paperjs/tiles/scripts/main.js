/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global paper, ColorTheme, Point, view, Shape, Path, atob, btoa, ArrayBuffer,
    Uint8Array, Blob, Size, PixelData, Tool, project, Layer, ObjectPool, BlendModes, FileDownloader, Utils */

(function () {
    "use strict";
    
    paper.install(window);
    
    
    var config = {
        APP_NAME: "tiles",
        BACKGROUND_COLOR: "#eee",
        
        BOUNDS_PADDING: 5,

        TILE_COUNT: 500,
        
        BASE_SIZE: 50,
        BLEND_MODE: BlendModes.SOFT_LIGHT,
        STROKE_WIDTH: 0.5,
        STROKE_COLOR: "#333333",
        ROTATION_RANGE: 3,
        
        CANVAS_WIDTH: 768,
        CANVAS_HEIGHT: 432, //16:9 aspect ratio
        SCALE_CANVAS: false,
        USE_RANDOM_COLORS: true,
        colorTheme: ColorTheme.themes.CROSSWALK
    };
    
    /*********** Override Config defaults here ******************/

    config.STROKE_WIDTH = 0.2;
    config.BASE_SIZE = 50;
    config.TILE_COUNT = 500;
    config.BACKGROUND_COLOR = "#eee";
    config.BLEND_MODE = BlendModes.SOFT_LIGHT;
    
    /*************** End Config Override **********************/
    
    var colorTheme = new ColorTheme(config.colorTheme);
    var t; //paperjs tool reference
    var pixelData;
    
    var backgroundLayer;
    var tileLayer;
    
    var getColor = function () {
        
        var color;
        if (config.USE_RANDOM_COLORS) {
            color = colorTheme.getRandomColor();
        } else {
            color = colorTheme.getNextColor();
        }
        
        return color;
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
    
    var generateTiles = function () {
        
        var out = [];
        var i;
        var rect;
        var point;
        var size;
        for (i = 0; i < config.TILE_COUNT; i++) {
            
            size = Utils.randomSize(config.BASE_SIZE);
            point = Utils.randomPointInBoundsForRectangle(config.BOUNDS_PADDING, size, view);
            
            rect = new Path.Rectangle({
                point: point,
                size: size,
                fillColor: getColor(),
                strokeColor: config.STROKE_COLOR,
                strokeWidth: config.STROKE_WIDTH,
                blendMode: config.BLEND_MODE,
                rotation: Utils.randomRotationInRange(config.ROTATION_RANGE)
            });
            
            out.push(rect);
        }
        
        return out;
    };
    
    
    var tiles;
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

        tileLayer = new Layer();
        tiles = generateTiles();
        
        
        view.update();

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
}());
/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global paper, ColorTheme, Point, view, Shape, Path, atob, btoa, ArrayBuffer,
    Uint8Array, Blob, Size, PixelData, Tool, project, Layer, ObjectPool, BlendModes,
    FileDownloader, Utils, MathUtils */

(function () {
    "use strict";
    
    paper.install(window);
    

    var config = {
        APP_NAME: window.location.pathname.replace(/\//gi, ""),
        BACKGROUND_COLOR: "#FFFFFF",
        CANVAS_BACKGROUND_COLOR:"#111111",
        FILL_COLOR:"#111111",

        CANVAS_WIDTH: 640,
        CANVAS_HEIGHT: 640, //16:9 aspect ratio
        SCALE_CANVAS: false,
        TEMPLATE: null,
        ANIMATE: false,
        TRACK_MOUSE:false,
        ALLOW_TEMPLATE_SKEW: false,
        STROKE_COLOR:"#FFFFFF"
    };
    
    /*********** Override Config defaults here ******************/
    
    //config.CANVAS_WIDTH = 1280;
    //config.CANVAS_HEIGHT = 1280;

    config.CANVAS_BACKGROUND_COLOR = Utils.randomHexColor();
    config.FILL_COLOR = Utils.randomHexColor();
    
    /*************** End Config Override **********************/
  
    var t; //paperjs tool reference
    var bounds;
    let mousePos;

    var main = function(){
        

        //var circles = new Array();

        var lastCircle;

        var combined;
        for(var i = 0; i < 100; i++) {

            /*
            var c = new Path.Circle({
                center:Utils.randomPointInBounds(bounds, 0),
                radius:Utils.getRandomArbitrary(25,35),
                fillColor: config.FILL_COLOR,
                strokeColor: config.STROKE_COLOR,
                strokeWidth: 8
            });
            */


            var c = new Path.RoundRectangle({
                point:Utils.randomPointInBounds(bounds, 0),
                size:Utils.randomSize(40),
                fillColor: config.FILL_COLOR,
                strokeColor: config.STROKE_COLOR,
                strokeWidth: 4,
                cornerSize:0
            });


            if(!combined) {
                combined = c;
                continue;
            }

            var tmp = combined;
            combined = tmp.unite(c);

            tmp.remove();
            c.remove();


            //c.remove();
            //lastCircle = c;
        }

        combined.smooth();
        //combined.fullySelected = true;

        //var combined = c.unite(d);

        //c.remove();
        //d.remove();


        if(config.ANIMATE) {
            view.onFrame = onFrame;
        }
    };

    var onFrame = function(event) {

    };

    var onMouseMove = function(event) {
        mousePos = event.point; 
    }

    /*********************** init code ************************/

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

        //this might be redundant
        //paper.view.viewSize.height = canvasH;
        //paper.view.viewSize.width = canvasW;
        
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
        drawCanvas.style.background = config.CANVAS_BACKGROUND_COLOR;
        
        bounds = view.bounds;

        var rect = new Path.Rectangle(bounds);
        
        rect.fillColor = config.CANVAS_BACKGROUND_COLOR;
    
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

        if(config.TRACK_MOUSE) {
            t.onMouseMove = onMouseMove;
        }

        main();
    };

}());
export default function(gv, $, createjs) {




    function lineDistance(point1, point2) {
        var xs = 0;
        var ys = 0;

        xs = point2.x - point1.x;
        xs = xs * xs;

        ys = point2.y - point1.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    }


    function traceGlobal() {
        for (var key in gv) {
            console.log(key + ") " + gv[key]);
        }
    }

    function lineAngle(point1, point2) {

        return Math.atan2(point2.y - point1.y, point2.x - point1.x);


    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function distanceAndAngle(point1, point2) {
        var xs = 0;
        var ys = 0;

        xs = point2.x - point1.x;
        ys = point2.y - point1.y;
        var angle = Math.atan2(ys, xs);

        ys = ys * ys;
        xs = xs * xs;
        var distance = Math.sqrt(xs + ys);

        return [distance, angle];

    }

    function intersectRect(r1, r2) {
        let a,b;
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }


    function randomHex() {
        return "#000000".replace(/0/g, function() {
            return (~~(Math.random() * 16)).toString(16);
        });
    }



    function randomColor() {

        var x = Math.round(0xffffff * Math.random()).toString(16);
        var y = (6 - x.length);
        var z = '000000';
        var z1 = z.substring(0, y);
        var color = '#' + z1 + x;
        return color;
    }

    function cosWave(startPoint, differential, speed) {
        //place in an onEnterFrame Handler0.0015

        var currentDate = new Date();
        return startPoint + (Math.cos(currentDate.getTime() * speed) * differential);
    }

    function randomIntBetween(min, max) {
        max++;
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomNumberBetween(min, max) {

        return Math.random() * (max - min) + min;
    }

    function trace(str, inPage) {

        if (inPage === undefined)
            console.log(str);
        else
            $("#trace").text(str);
    }

    function deg2rad(degree) {
        return degree * (Math.PI / 180);
    }

    function rad2deg(radians) {
        return radians * 180 / Math.PI;
    }

    function backgroundColor(background, border) {
        $("#tugtugCanvas").css("background-color", background);
        $("#tugtugCanvas").css("border-top", "1px solid " + border);
        $("#tugtugCanvas").css("border-bottom", "1px solid " + border);
    }

    Array.prototype.sortOn = function() {
        var dup = this.slice();
        if (!arguments.length) return dup.sort();
        var args = Array.prototype.slice.call(arguments);
        return dup.sort(function(a, b) {
            var props = args.slice();
            var prop = props.shift();
            while (a[prop] == b[prop] && props.length) prop = props.shift();
            return a[prop] == b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
        });
    };

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function pixiPointRectangleCollisionDetection(point, rectangle) {


        var rightSide = rectangle.x + rectangle.width;
        var bottom = rectangle.y + rectangle.height;




        if (point.x > rectangle.x && point.x < rightSide && point.y > rectangle.y && point.y < bottom) {
            return true;
        } else {
            return false;
        }


    }

    function pointRectangleCollisionDetection(item1, rectangle) {

        var point = new createjs.Point(item1.x, item1.y);
        //console.log("target "+item1+" local x = "+item1.x+" global x = "+rectangle.x)
        var rightSide = rectangle.x + rectangle.width;
        var bottom = rectangle.y + rectangle.height;

        var radius = item1.radius !== undefined ? item1.radius : 0;


        if (point.x + radius > rectangle.x && point.x - radius < rightSide && point.y + radius > rectangle.y && point.y - radius < bottom) {
            return true;
        } else {
            return false;
        }


    }

    function triangleCircleCollision(circle, point1, point2, point3) {

        //first edge
        var c1x = circle.x - point1.x;
        var c1y = circle.y - point1.x;
        var e1x = point2.x - point1.x;
        var e1y = point2.y - point1.y;

        var k = c1x * e1x + c1y * e1y;

        if (k > 0) {
            var len = Math.sqrt(e1x * e1x + e1y * e1y)
            k = k / len;

            if (k < len) {
                if (Math.sqrt(c1x * c1x + c1y * c1y - k * k) <= circle.radius)
                    return true
            }
        }

        // Second edge
        var c2x = circle.x - point2.x;
        var c2y = circle.y - point2.y;
        var e2x = point3.x - point2.x;
        var e2y = point3.y - point2.y;

        k = c2x * e2x + c2y * e2y

        if (k > 0) {
            len = Math.sqrt(e2x * e2x + e2y * e2y)
            k = k / len

            if (k < len) {
                if (Math.sqrt(c2x * c2x + c2y * c2y - k * k) <= circle.radius)
                    return true
            }
        }

        // Third edge
        var c3x = circle.x - point3.x;
        var c3y = circle.y - point3.y;
        var e3x = point1.x - point3.x;
        var e3y = point1.y - point3.y;

        k = c3x * e3x + c3y * e3y

        if (k > 0) {
            len = Math.sqrt(e3x * e3x + e3y * e3y)
            k = k / len

            if (k < len) {
                if (Math.sqrt(c3x * c3x + c3y * c3y - k * k) <= circle.radius)
                    return true
            }
        }

        // We're done, no intersection
        return false
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }


    function circleRectangleCollision(circle, rect) {

        var distX = Math.abs(circle.x - rect.x - rect.width / 2);
        var distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > (rect.width / 2 + circle.radius)) {
            return false;
        }
        if (distY > (rect.height / 2 + circle.radius)) {
            return false;
        }
        if (distX <= (rect.width / 2)) {
            return true;
        }
        if (distY <= (rect.height / 2)) {
            return true;
        }

    }


    function rectangleRectangleCollisionDetection(rect1, rect2) {
        return (rect1.x <= (rect2.x + rect2.width) &&
            rect2.x <= (rect1.x + rect1.width) &&
            rect1.y <= (rect2.y + rect2.height) &&
            rect2.y <= (rect1.y + rect1.height));
    }

    function pointRectangleCollisionDetection(point, rect) {


        if (point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height) {
            return true;
        } else {
            return false;
        }


    }


    function pointItemCollisionDetection(item1, item2) {

        //the item here is a class with two pubic properties:  a shape and the width
        // var point = new createjs.Point(item1.x, item1.y);

        // if (point.x > target.body.x && point.x < item2.body.x + item2.width && point.y > item2.body.y && point.y < item2.body.y + item2.height) {
        //     return true;
        // } else {
        //     return false;
        // }


    }

    String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        });
    };


    function addTicker(fps, tick) {


        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(fps);
    }


    function proxy(method, scope) {
        return function() {
            return method.apply(scope, arguments);
        };
    }


    function touchAndCursorEnable(number, gv) {


        //this is what enables the cursor to be a pointer
        gv.stage.enableMouseOver(number);
        //this is what enables touch screens to work:
        createjs.Touch.enable(gv.stage);


    }


    function getParameterByName(name) {
        //this function returns the value of GET variables by name
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(document.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


    function circleToCircleCollisionDetection(circle1, circle2) {

        var x1 = circle1.x;
        var y1 = circle1.y;
        var x2 = circle2.x;
        var y2 = circle2.y;
        var radius1 = circle1.radius;
        var radius2 = circle2.radius;

        if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < (radius1 + radius2)) {
            return true;
        } else {
            return false;
        }
    }

    function touchAndCursorEnableNew(number) {


        //this is what enables the cursor to be a pointer
        gv.stage.enableMouseOver(number);
        //this is what enables touch screens to work:
        createjs.Touch.enable(gv.stage);


    }

    function lineIntersectCircle(A, B, C, r) {
        this.intersects = false;

        var a = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
        var b = 2 * ((B.x - A.x) * (A.x - C.x) + (B.y - A.y) * (A.y - C.y));
        var cc = C.x * C.x + C.y * C.y + A.x * A.x + A.y * A.y - 2 * (C.x * A.x + C.y * A.y) - r * r;
        var deter = b * b - 4 * a * cc;
        if (deter <= 0) {
            this.inside = false;
        } else {
            var e = Math.sqrt(deter);
            var u1 = (-b + e) / (2 * a);
            var u2 = (-b - e) / (2 * a);
            if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {

            } else {
                this.intersects = true;

            }
        }

        return this.intersects;
    }


    function centerOnStage(mc, canvasWidth, canvasHeight) {
        mc.body.x = (canvasWidth - mc.body.getBounds().width) / 2;
        mc.body.y = (canvasHeight - mc.body.getBounds().height) / 2;
    }


    function AssetLoaderClass(gv, loading_text_visible) {

        //load graphic assets and show loading text
        this.gv = gv;

        if (loading_text_visible === undefined) loading_text_visible = true;

        var loaderProgressText = new createjs.Text(0 + " %", "bold 50px Arial", "#FFFF00");
        loaderProgressText.visible = loading_text_visible
        this.bounds = loaderProgressText.getBounds();


        loaderProgressText.x = gv.halfWidth - (this.bounds.width / 2);
        loaderProgressText.y = gv.halfHeight - (this.bounds.height / 2);

        this.loaderProgressText = loaderProgressText;


        var loader = new createjs.LoadQueue(false);
        this.loader = loader;

    };


    AssetLoaderClass.prototype.loadItems = function(arr, resultFunctionParam, fileLoad) {

        //arr is an array of objects with id: and src:
        this.gv.stage.addChild(this.loaderProgressText);

        this.loader.loadManifest(arr);

        this.resultFunction = resultFunctionParam;
        this.loader.removeAllEventListeners();
        this.loader.addEventListener("complete", proxy(this.handleComplete, this));
        this.loader.addEventListener("progress", proxy(this.loaderProgress, this));
        if (fileLoad) this.loader.addEventListener("fileload", proxy(this.handleFileLoad, this));

    }


    AssetLoaderClass.prototype.handleComplete = function(e) {


        this.resultFunction();
        //stage.setChildIndex(this.loaderProgressText, stage.children.length-1);//testing
        this.gv.stage.removeChild(this.loaderProgressText);


    }

    AssetLoaderClass.prototype.loaderProgress = function(e) {
        var perc = Math.round(e.progress * 100);

        this.loaderProgressText.text = perc + "%";
        this.bounds = this.loaderProgressText.getBounds();
        this.loaderProgressText.x = (this.gv.canvasWidth - this.bounds.width) / 2;
    }


    AssetLoaderClass.prototype.handleFileLoad = function(b) {


        // if (b.item.type == createjs.LoadQueue.XML) {
        //     bitmapFont.xml = this.loader.getResult("xml");
        // } else if (b.item.type == createjs.LoadQueue.IMAGE) {
        //     bitmapFont.bitmap = this.loader.getResult("image");
        // }


    }

    return {

        addTicker: addTicker,
        randomIntBetween: randomIntBetween,
        randomNumberBetween: randomNumberBetween,
        AssetLoaderClass: AssetLoaderClass,
        getParameterByName: getParameterByName,
        randomColor: randomColor,
        deg2rad: deg2rad,
        randomHex: randomHex,
        cosWave: cosWave,
        proxy: proxy,
        shuffle: shuffle,
        circleToCircleCollisionDetection: circleToCircleCollisionDetection,
        triangleCircleCollision: triangleCircleCollision,
        circleRectangleCollision: circleRectangleCollision,
        touchAndCursorEnable: touchAndCursorEnable,
        pixiPointRectangleCollisionDetection: pixiPointRectangleCollisionDetection,
        pointRectangleCollisionDetection: pointRectangleCollisionDetection,
        lineIntersectCircle: lineIntersectCircle,
        backgroundColor: backgroundColor,
        trace: trace,
        numberWithCommas: numberWithCommas
    }

};
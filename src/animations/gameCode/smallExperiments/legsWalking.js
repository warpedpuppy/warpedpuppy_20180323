export default function LegsWalking (PIXI, Utils){
    return {
        utils: new Utils(),
        canvasHeight: 400,
        cycle: 0,
        stage: new PIXI.Container(),
        app: new PIXI.Application(),
        init: function () {
            this.walk = this.walk.bind(this);
            this.Segment = this.Segment.bind(this);
            this.resize = this.resize.bind(this);
            window.onresize = this.resize;
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.canvasHeight = 400;
            this.halfHeight = this.canvasHeight / 2;
            this.halfWidth = this.canvasWidth / 2;
            this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight);
            this.renderer.backgroundColor = 0x333333;
            document.getElementById("tugtugCanvas").appendChild(this.renderer.view);
            this.build();
            this.app.ticker.add(this.animate.bind(this));
        },
        stop: function () {
            this.app.ticker.destroy();
            this.renderer.destroy();
        },
        build: function () {
            this.vx = 0;
            this.vy = 0;

            this.sliderYs = 60;

            this.segment0 = this.Segment(50, 15, 0xFFFFFF);
            this.segment0.body.x = this.halfWidth;
            this.segment0.body.y = 100;
            this.stage.addChild(this.segment0);

            this.segment1 = this.Segment(50, 10,0xFFFFFF);
            this.segment1.body.x = this.segment0.getPin().x;
            this.segment1.body.y = this.segment0.getPin().y;
            this.stage.addChild(this.segment1);

            this.segment2 = this.Segment(50, 15,0xFFFFFF);
            this.segment2.body.x = this.halfWidth;
            this.segment2.body.y = 100;
            //this.stage.addChild(this.segment2);

            this.segment3 = this.Segment(50, 10,0xFFFFFF);
            this.segment3.body.x = this.segment2.getPin().x;
            this.segment3.body.y = this.segment2.getPin().y;
            //this.stage.addChild(this.segment3);

            this.speedSlider = this.SimpleSlider(0, 0.3, 0.12, 10, this.sliderYs, "speed");
            this.stage.addChild(this.speedSlider);
            this.thighRangeSlider = this.SimpleSlider(0, 90, 45, 70, this.sliderYs, "thigh range");
            this.stage.addChild(this.thighRangeSlider);
            this.thighBaseSlider = this.SimpleSlider(0, 180, 90, 130, this.sliderYs, "thigh base");
            this.stage.addChild(this.thighBaseSlider);
            this.highBaseSlider = this.SimpleSlider(0, 180, 90, 130, this.sliderYs, "thigh base");
            this.stage.addChild(this.highBaseSlider);
            this.calfRangeSlider = this.SimpleSlider(0, 90, 45, 190, this.sliderYs, "calf range");
            this.stage.addChild(this.calfRangeSlider);
            this.calfOffsetSlider = this.SimpleSlider(-3.14, 3.14, -1.57, 250, this.sliderYs, "calf offset");
            this.stage.addChild(this.calfOffsetSlider);
            this.gravitySlider = this.SimpleSlider(0, 1, 0.2, 310, this.sliderYs, "gravity");
            this.stage.addChild(this.gravitySlider);

            // this.speedSlider = this.SimpleSlider(0, 0.3, 0.12, 10, this.sliderYs, "speed");
            // this.stage.addChild(this.speedSlider);
            // this.thighRangeSlider = this.SimpleSlider(0, .5, .5, 70, this.sliderYs, "thigh range");
            // this.stage.addChild(this.thighRangeSlider);
            // this.thighBaseSlider = this.SimpleSlider(0, 1, 2, 130, this.sliderYs, "thigh base");
            // this.stage.addChild(this.thighBaseSlider);
            // this.highBaseSlider = this.SimpleSlider(0, 1, 9, 130, this.sliderYs, "thigh base");
            // this.stage.addChild(this.highBaseSlider);
            // this.calfRangeSlider = this.SimpleSlider(0, .5, .5, 190, this.sliderYs, "calf range");
            // this.stage.addChild(this.calfRangeSlider);
            // this.calfOffsetSlider = this.SimpleSlider(-1.14, 1.14, -0.57, 250, this.sliderYs, "calf offset");
            // this.stage.addChild(this.calfOffsetSlider);
            // this.gravitySlider = this.SimpleSlider(0, 1, 0.2, 310, this.sliderYs, "gravity");
            // this.stage.addChild(this.gravitySlider);
        },
        SimpleSlider: function (min, max, value, xPos, yPos, label) {
            var _width = 16;
            var _height = 100;
            var _value;
            var _max = 100;
            var _min = 0;
            var _handle;
            var _back;
            var _backWidth = 4;
            var _handleHeight = 10;
            var _backColor = 0xCCCCCC;
            var _backBorderColor = 0x999999;
            var _handleColor = 0x333333;
            var _handleBorderColor = 0x000000;
            var _handleRadius = 2;
            var _backRadius = 2;
            _min = min;
            _max = max;
            _value = Math.min(Math.max(value, min), max)
            var cont = new PIXI.Container();
            cont.value = _value;



            
            cont.x = xPos;
            cont.y = yPos;
            cont.body = cont;
            var labelText = new PIXI.Text(label,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
            labelText.textAlign = "center";
            labelText.y = yPos -30;
            labelText.x = xPos + _width/2;
            cont.addChild(labelText);

            var t = new PIXI.Text(_value,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
            t.textAlign = "center";
            t.y = yPos -20;
            t.x = xPos + _width/2;
            cont.addChild(t);

            _back = new PIXI.Graphics();
            _back.clear();
            _back.beginFill(_backColor);
            _back.drawRoundedRect(0, 0, _backWidth, _height, _backRadius, _backRadius);
            _back.endFill();
            _back.x = _width / 2 - _backWidth / 2;
            cont.addChild(_back);

            _handle = new PIXI.Graphics();
            _handle.clear();
            _handle.beginFill(_handleColor);
            _handle.drawRoundedRect(0, 0, _width, _handleHeight, _handleRadius, _handleRadius);
            _handle.endFill();
            cont.addChild(_handle);
            _handle.on("mousedown", cont.onMouseDown);

            cont.updatePosition = function () {
                var handleRange = _height - _handleHeight;
                var valueRange = _max - _min;
                _handle.y = handleRange - (_value - _min) / valueRange * handleRange;
            }

            cont.updateValue = function () {
                var handleRange = _height - _handleHeight;
                var valueRange = _max - _min;
                _value = (handleRange - _handle.y) / handleRange * valueRange + _min;

                var printValue = Math.round(_value*10)/10;
                t.text = printValue;

                this.value = _value;


            }

            cont.onMouseUp = function (event) {

                this.stage.removeEventListener("pressmove", cont.onMouseMove);
                this.stage.removeEventListener("pressup", cont.onMouseUp);

                if( _handle.y > _height){
                    _handle.y = _height-_handleHeight;

                }
                if( _handle.y <0){
                    _handle.y = 1;

                }
            }

            cont.onMouseDown = function (event) {

                this.stage.addEventListener("pressmove", cont.onMouseMove);
                this.stage.addEventListener("pressup", cont.onMouseUp);
            }

           cont.onMouseMove = function (event) {

                this.stage.cursor = "pointer";
               if(_handle.y >= 0 && _handle.y <= _height){
                   _handle.y = this.stage.mouseY-cont.y;
                }

                cont.updateValue();
            }

            cont.invalidate = function () {
                cont.draw();
            }

            cont.move = function (x, y) {
                this.x = x;
                this.y = y;
            }

            cont.setSize = function (w, h) {
                _width = w;
                _height = h;
                cont.draw();
            }

            cont.backBorderColor = function (n) {
                _backBorderColor = n;
                cont.draw();
            }

            cont.backBorderColor = function () {
                return _backBorderColor;
            }

            cont.backColor = function (n) {
                _backColor = n;
               cont.draw();
            }

            cont.backColor = function () {
                return _backColor;
            }

            cont.backRadius = function (n) {
                _backRadius = n;
            }

            cont.backRadius = function () {
                return _backRadius;
            }


            cont.backWidth = function (n) {
                _backWidth = n;
                cont.draw();
            }

            cont.backWidth = function () {
                return _backWidth;
            }

            cont.handleBorderColor = function (n) {
                _handleBorderColor = n;
                cont.draw();
            }

            cont.handleBorderColor = function () {
                return _handleBorderColor;
            }

            cont.handleColor = function (n) {
                _handleColor = n;
                cont.draw();
            }

            cont.handleColor = function () {
                return _handleColor;
            }

            cont.handleRadius = function (n) {
                _handleRadius = n;
                cont.draw();
            }

            cont.handleRadius = function () {
                return _handleRadius;
            }

            cont.handleHeight = function (n) {
                _handleHeight = n;
                cont.draw();
                cont.updatePosition();
            }

            cont.handleHeight = function () {
                return _handleHeight;
            }

            cont.height = function (n) {
                _height = n;
                cont.draw();
            }

            cont.height = function () {
                return _height;
            }

            cont.max = function (n) {
                _max = n;
                cont.updatePosition();
            }

            cont.max = function () {
                return _max;
            }

            cont.min = function (n) {
                _min = n;
                cont.updatePosition();
            }
            cont.min = function () {
                return _min;
            }

            cont.returnValue = function () {
                return _value;
            }

            cont.width = function (n) {
                _width = n;
                cont.draw();
            }
            cont.width = function () {
                return _width;
            }
            
            cont.updatePosition();
            return cont;
        },
        animate: function () {
            this.doVelocity();
            this.walk(this.segment0, this.segment1, this.cycle);
            //this.walk(this.segment2, this.segment3, this.cycle + Math.PI);
            this.cycle += this.speedSlider.returnValue();
            this.checkFloor(this.segment1);
            this.checkFloor(this.segment3);
            this.checkWalls();
            this.renderer.render(this.stage);
        },
       
        doVelocity: function () {
            //this.vy += this.gravitySlider.returnValue();
            this.segment0.body.x += this.vx;
            this.segment0.body.y += this.vy;
            this.segment2.body.x += this.vx;
            this.segment2.body.y += this.vy;
        },
        checkFloor: function (seg) {
            // seg.body.setBounds(seg.body.x, seg.body.y , seg.segmentWidth, 60);
            // var bounds = seg.body.getBounds();
            var yMax = seg.body.y +seg.body.height;
            if (yMax > this.canvasHeight) {
                var dy = yMax - this.canvasHeight + 5;
                this.segment0.body.y -= dy;
                this.segment1.body.y -= dy;
                this.segment2.body.y -= dy;
                this.segment3.body.y -= dy;
            }
        },
        Segment: function(segmentWidth, segmentHeight, color) {
            const cont = new PIXI.Container();
            var color;
            var segmentWidth;
            var segmentHeight;

            cont.vx = 0;
            cont.vy = 0;
            cont.segmentWidth = segmentWidth;
            cont.segmentHeight = segmentHeight;
            cont.color = color;

            var sprite = new PIXI.Container;
            var roundRect = new PIXI.Graphics();
            roundRect.beginFill(color);

            roundRect.drawRoundedRect(
                -segmentHeight / 2, 
                -segmentHeight / 2,
                segmentWidth*1.25,
                segmentHeight,
                10);
            roundRect.endFill();
           sprite.addChild(roundRect);

            // draw the two "pins"
            var circle1 = new PIXI.Graphics();
            circle1.beginFill(0xFF0000)
            circle1.drawCircle(0, 0, 2);
            circle1.endFill()
            sprite.addChild(circle1);
            var circle2 = new PIXI.Graphics();
            circle2.beginFill(0xFF0000)
            circle2.drawCircle(segmentWidth, 0, 2);
            circle2.endFill()
            sprite.addChild(circle2);
            cont.addChild(sprite);

            cont.body = sprite;
            let that = this;
            cont.getPin = function () {
                var angle = sprite.rotation * that.utils.deg2rad(Math.PI / 180);
                var xPos = sprite.x + Math.cos(angle) * cont.segmentHeight;
                var yPos = sprite.y + Math.sin(angle) * cont.segmentHeight;
                var point = new PIXI.Point(xPos, yPos);
                return point;
            }
            return cont;
        },
        walk: function (segA, segB, cyc) {
            var foot = segB.getPin();
            var angleA = Math.sin(cyc) * this.thighRangeSlider.returnValue() + this.thighBaseSlider.returnValue();
            var angleB = Math.sin(cyc + this.calfOffsetSlider.returnValue()) * this.calfRangeSlider.returnValue() + this.calfRangeSlider.returnValue();
             segA.body.rotation = this.utils.deg2rad(angleA);
             //segB.body.rotation = this.utils.deg2rad(segA.body.rotation + angleB);
             segB.body.x = segA.getPin().x;
             segB.body.y = segA.getPin().y;
             //segB.vx = segB.getPin().x - foot.x;
             //segB.vy = segB.getPin().y - foot.y;
        },
        checkWalls: function () {
            var w = this.canvasWidth + 200;
            if(this.segment0.body.x > this.canvasWidth + 100) {
                this.segment0.body.x -= w;
                this.segment1.body.x -= w;
                this.segment2.body.x -= w;
                this.segment3.body.x -= w;
            } else if(this.segment0.body.x < -100) {
                this.segment0.body.x += w;
                this.segment1.body.x += w;
                this.segment2.body.x += w;
                this.segment3.body.x += w;
            }
        },
        resize: function () {
            this.stage.removeAllChildren();
            this.canvasWidth = this.utils.returnCanvasWidth();
            this.halfWidth = this.canvasWidth/2
            this.renderer.resize(this.canvasWidth, this.canvasHeight);
        }
    }
}
export default function SettingClass (PIXI, parent) {
    return {
        cont: new parent.PIXI.Container(),
        background: new parent.PIXI.Graphics(),
        frame: new parent.PIXI.Graphics(),
        pinwheels: [],
        init: function () {
            this.background
            .beginFill(0xCCCCCC)
            .drawRoundedRect(0,0,500, 300, 10)
            .endFill();
            this.cont.background = this.background;
            // this.cont.pivot.x = 250;
            // this.cont.pivot.x = 150;
            //background.cache(0,0,cont.width, cont.height);
            this.cont.addChild(this.background);

            this.frame
            .lineStyle(5, 0x000000, 1)
            .moveTo(0,0)
            .lineTo(this.cont.width, 0)
            .lineTo(this.cont.width, this.cont.height)
            .lineTo(0, this.cont.height)
            .lineTo(0,0)
            //this.frame.cache(-5,-5,cont.width+15, cont.height+15);
            this.cont.addChild(this.frame);


            let pinPos = [[0,0],[500, 0],[500,300],[0,300]]
            for (let i = 0; i < 4; i++) {
                var p1 = new PIXI.Graphics();
                p1.beginFill(0xFF9900).drawRect(0,0,20, 20).endFill();
                p1.pivot.x = p1.pivot.y = 10;
                p1.x = pinPos[i][0];
                p1.y = pinPos[i][1];
                this.cont.addChild(p1);
                //p1.cache(-5,-5,cacheValue,cacheValue)
                this.pinwheels.push(p1);
            }
            return this.cont;
        },
        spinWheels: function () {
            for(let i = 0; i < 4; i ++){
                this.pinwheels[i].rotation += .01;
            }
          // this.reset = this.reset.bind(this);
          // for(let i = 0; i < 4; i ++){
          //       //this.pinwheels[i].uncache();
          //       parent.TweenLite.to(this.pinwheels[i],.5, {rotation:360, delay:i *.25, onComplete:this.reset, onCompleteParams:[this.pinwheels[i]]});
          //   }
        },
        reset: function (mc) {
            //mc.cache(-5,-5,this.cacheValue,this.cacheValue)
            mc.rotation = 0;
        }
    }
}


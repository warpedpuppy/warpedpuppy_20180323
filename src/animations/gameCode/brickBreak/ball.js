export default function Ball(parent, radius, color)  {
    return {
        init: function () {
            this.radius = radius !== undefined ? radius : 10;
            this.color = color !== undefined ? color : "#FF00FF";
            var b = new parent.PIXI.Graphics();
            b.beginFill(color).drawCircle(0,0,this.radius*2);
            b.radius = radius;
            b.height = this.radius*4;
            b.vx = 0;
            b.vy = 0;
            b.vz = 0;
            b.xpos = 0;
            b.ypos = 0;
            b.zpos = 0;
            b.mass = 1;
            b.speed = 3;
            b.classRef = this;
            this.b = b;
            b.radius = this.radius;
            //b.cache(-10,-10,20,20)

            return b;
        },
        reset: function () {
            // this.b.x= tugtug.setting.width/2;
            // this.b.y = tugtug.setting.height/2;
        }
    }
}

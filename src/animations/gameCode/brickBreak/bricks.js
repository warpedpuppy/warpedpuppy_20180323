export default function Bricks(parent) {
    return {
        cont: new parent.PIXI.Container(),
        rows: [],
        storeRows: [],
        hitBlocks: [],
        boxWidth: 50,
        boxHeight: 5,
        spacer: 5,
        counter: 0,
        init: function () {
            this.boxQ =  500/this.boxWidth;
            let cont = this.cont;
            for (var i = 0; i < 5; i ++) {
                this.rows[i] = [];
                this.storeRows[i] = [];
                for (var j = 0; j < this.boxQ; j ++) {
                    let b = this.Block(
                        this.boxHeight, 
                        this.boxWidth, 
                        parent.utils.randomColor(), 
                        0x000000, 
                        1);
                   // b.body.cache(-5,-5,this.boxWidth+20, this.boxHeight+20)
                    this.hitBlocks.push(b);
                    b.x = j * (this.boxWidth + this.spacer);
                    b.y = this.spacer + i * (this.boxHeight +this.spacer);
                    this.rows[i].push(b);
                    this.storeRows[i].push(b);
                    this.cont.addChild(b);
                    this.counter ++;
                }
            }
            cont.boxHeight = this.boxHeight
            cont.boxWidth = this.boxWidth
            cont.spacer = this.spacer;
            cont.moveLeft = false;
            cont.moveRight = false;
            cont.movement = .5;
            cont.boxQ = this.boxQ;
            cont.rows = this.rows;
            cont.storeRows = this.storeRows;
            cont.hitBlocks = this.hitBlocks;
            this.cont= cont;
            cont.classRef = this;
            return cont;
        },
        Block: function (height, width, color, outline, outlineWidth) {
            this.blockHeight = height;
            this.blockWidth = width;
            var b = new parent.PIXI.Graphics();
            b.beginFill(color).drawRect(0,0,this.blockWidth, this.blockHeight);
            //stage.addChild(b);
            this.body = b;
            this.getBlock = function(){return b}
            this.getBounds = function(){this.setBounds(b.x, b.y, width, height)};
            return b;
        },
        reset:  function () {
            for (let i = 0; i < 5; i ++) {
                for (let j = 0; j < this.cont.rows[i].length; j++) {
                    this.cont.removeChild(this.cont.rows[i][j].body);
                }
            }
            this.cont.rows = [];
            this.cont.hitBlocks = [];
            for (let i = 0; i < 5; i ++) {
                this.cont.rows[i] = [];
                for (let j = 0; j < this.cont.storeRows[i].length; j++) {

                    let b = this.cont.storeRows[i][j];
                    b.body.visible = true;
                    this.cont.hitBlocks.push(b.body);
                    b.body.x = j * (this.cont.boxWidth + this.cont.spacer);
                    b.body.y = this.cont.spacer + i * (this.cont.boxHeight + this.cont.spacer);
                    this.cont.rows[i].push(b);
                    this.cont.addChild(b.body);
                }
            }
        }
    }
}

var BUILD = "release";
var a;
(function () {
    function e() {
    }

    var c;
    e.main = function () {
        var a = new e;
        window.HTMLCanvasElement ? a.initialize() : alert("Your browser does not support HTML5 Canvas.")
    };
    e.prototype.initialize = function () {
        this.mainCanvas = canvas;
        this.mainStage = stage;

        this.mainStage.snapToPixelsEnabled = !1;
        this.count = 0;
        var loader = new createjs.PreloadJS;
        loader.loadFile("/fonts/26/font.png");
        loader.loadFile("/fonts/26/font.xml");
        a = this;
        loader.onFileLoad = function (b) {

            b.type == createjs.PreloadJS.IMAGE &&
            (a.bitmap = b.result);
            b.type == createjs.PreloadJS.XML && (a.xml = b.result)
        };
        loader.onComplete = function () {
           /* c = new BitmapFont(a.bitmap, a.xml, 32);
            BitmapTextField.registerBitmapFont(c, "American Typewriter");

            var b = new BitmapTextField(600, 500, "I used a custom class from the internet for this Bitmap Text.\nThe link is below.\nI could not get the BitmapText class that came with createjs to work.\nAlso, here is a createjs sound test:", "American Typewriter", -1, 0, 0, "left", "top", !0);

            b.x = (canvasWidth - b.getBounds().width)/2;
            b.alpha = 0;
            TweenLite.to(b,.5, {alpha:1});
            a.mainStage.addChild(b);

            ready = "yes";*/

            fontReady();
        };

    };

    window.Main = e
})();
(function (e) {
    BitmapChar = function (c, a, b, k, j) {
        this.mTexture = a;
        this.mCharId = c;
        this.mXOffset = b;
        this.mYOffset = k;
        this.mXAdvance = j;
        this.mKernings = null
    };
    BitmapChar.prototype.addKerning = function (c, a) {
        null == this.mKernings && (this.mKernings = []);
        this.mKernings[c] = a
    };
    BitmapChar.prototype.getKerning = function (c) {
        return null == this.mKernings || null == this.mKernings[c] || void 0 == this.mKernings[c] ? 0 : this.mKernings[c]
    };
    BitmapChar.prototype.createImage = function () {
        return this.mTexture.clone()
    };
    BitmapChar.prototype.getCharId =
        function () {
            return this.mCharId
        };
    BitmapChar.prototype.getXOffset = function () {
        return this.mXOffset
    };
    BitmapChar.prototype.getYOffset = function () {
        return this.mYOffset
    };
    BitmapChar.prototype.getXAdvance = function () {
        return this.mXAdvance
    };
    BitmapChar.prototype.getTexture = function () {
        return this.mTexture
    };
    BitmapChar.prototype.getWidth = function () {
        return this.mTexture.spriteSheet.getFrame(this.mTexture.currentFrame).rect.width
    };
    BitmapChar.prototype.getHeight = function () {
        return this.mTexture.spriteSheet.getFrame(this.mTexture.currentFrame).rect.height
    };
    e.BitmapChar = BitmapChar
})(window);
(function (e) {
    BitmapFont = function (c, a, b) {
        this.mName = "unknown";
        this.mLineHeight = this.mSize = this.mBaseLine = b;
        this.mTexture = c;
        this.mChars = [];
        this.mHelperImage = new createjs.Bitmap(c);
        this.mCharLocationPool = [];
        a && this.parseFontXml(a);
        this.textHeight = this.textWidth = 0;
        this.previousWidth = []
    };
    BitmapFont.NATIVE_SIZE = -1;
    BitmapFont.MINI = "mini";
    BitmapFont.CHAR_SPACE = 32;
    BitmapFont.CHAR_TAB = 9;
    BitmapFont.CHAR_NEWLINE = 10;
    BitmapFont.CHAR_CARRIAGE_RETURN = 13;
    BitmapFont.prototype.parseFontXml = function (c) {

        for (var a = c.childNodes[0].getElementsByTagName("chars")[0].getElementsByTagName("char"),
                 b = [], k = {}, j = [], g = [], f = 0; f < a.length; f++) {
            var d = {};
            d.id = a[f].getAttribute("id");
            a[f].getAttribute("id");
            d.x = a[f].getAttribute("x");
            d.y = a[f].getAttribute("y");
            d.xAdvance = a[f].getAttribute("xadvance");
            d.xOffset = a[f].getAttribute("xoffset");
            d.yOffset = a[f].getAttribute("yoffset");
            d.width = a[f].getAttribute("width");
            d.height = a[f].getAttribute("height");
            b.push([d.x, d.y, d.width, d.height]);
            k["frame" + f] = [f];
            j.push(d)
        }
        spriteSheet = new createjs.SpriteSheet({images: [this.mTexture], frames: b, animations: k});
        for (d = 0; d <
            j.length; d++)a = new createjs.Sprite(spriteSheet), a.gotoAndStop(d), a.x = 800 * Math.random(), a.y = 100, a = new BitmapChar(j[d].id, a, j[d].xOffset, j[d].yOffset, j[d].xAdvance), this.addChar(j[d].id, a);
        if (null != c.childNodes[0].getElementsByTagName("kernings")[0]) {
            c = c.childNodes[0].getElementsByTagName("kernings")[0].getElementsByTagName("kerning");
            for (j = 0; j < c.length; j++)d = {}, d.first = c[j].getAttribute("first"), d.second = c[j].getAttribute("second"), d.amount = c[j].getAttribute("amount"), g.push(d), d.second in
                this.mChars && this.getChar(d.second).addKerning(d.first, d.amount)
        }
    };
    BitmapFont.prototype.getChar = function (c) {
        return this.mChars[c]
    };
    BitmapFont.prototype.addChar = function (c, a) {
        this.mChars[c] = a
    };
    BitmapFont.prototype.createSprite = function (c, a, b, k, j, g, f, d, e, l) {
        null == k && (k = -1);
        null == f && (f = "center");
        null == d && (d = "center");
        null == e && (e = !0);
        null == l && (l = !0);
        c = this.arrangeChars(c, a, b, k, f, d, e, l, g);
        a = c.length;
        b = new createjs.Container;
        for (k = 0; k < a; k++)g = c[k], f = g._char.createImage(), f.x = g.x + k * j, f.y = g.y, f.scaleX = f.scaleY =
            g.scale, b.addChild(f), g = g._char.getHeight() * g.scale, g > this.textHeight && (this.textHeight = g);
        return b
    };
    BitmapFont.prototype.arrangeChars = function (c, a, b, k, e, g, f, d, r) {
        null == k && (k = -1);
        null == e && (e = "center");
        null == g && (g = "center");
        null == f && (f = !0);
        null == d && (d = !0);
        if (null == b || 0 == b.length)return[];
        0 > k && (k *= -this.mSize);
        for (var l = [
            []
        ], y = !1, h = {}, p = 0, z = 0, n = 0, v = 0; !y;) {
            v = k / this.mSize;
            z = c / v;
            n = a / v;
            l = [];
            l.push([]);
            if (this.mLineHeight <= n)for (var x = -1, A = -1, w = 0, q = 0, s = [], p = b.length, m = 0; m < p; ++m) {
                var B = !1, u = b.charCodeAt(m),
                    t = this.getChar(u);
                if (u == BitmapFont.CHAR_NEWLINE || u == BitmapFont.CHAR_CARRIAGE_RETURN)B = !0; else if (null == t){
                    //console.log("[BitmapFont] Missing character: " + u);
                } else {
                    if (u == BitmapFont.CHAR_SPACE || u == BitmapFont.CHAR_TAB)x = m;
                    d && (w = t.getKerning(A) / 1 + w / 1);
                    h = new CharLocation(t);
                    h._char = t;
                    h.x = w / 1 + t.getXOffset() / 1;
                    h.y = q / 1 + t.getYOffset() / 1;
                    s.push(h);
                    w += t.getXAdvance() / 1;
                    A = u;
                    if (h.x + Number(t.getWidth()) > z) {
                        h = -1 == x ? 1 : m - x;
                        s.splice(s.length - h, h);
                        if (0 == s.length)break;
                        m -= h;
                        B = !0
                    }
                }
                if (m == p - 1)l.push(s), y = !0; else if (B)if (l.push(s),
                    x == m && s.pop(), q + 2 * this.mLineHeight <= n)s = [], w = 0, q += this.mLineHeight, A = x = -1; else break
            }
            f && !y ? (k -= 1, l.length = 0) : y = !0
        }
        c = [];
        m = l.length;
        p = q + this.mLineHeight;
        q = 0;
        g == VAlign.BOTTOM ? q = n - p : g == VAlign.CENTER && (q = (n - p) / 2);
        this.previousWidth = [];
        for (g = 0; g < m; ++g)if (n = l[g], p = n.length, 0 != p) {
            a = 0;
            h = n[n.length - 1];
            h = h.x - h._char.getXOffset() / 1 + h._char.getXAdvance() / 1;
            e == HAlign.RIGHT ? a = z - h : e == HAlign.CENTER && (a = (z - h) / 2);
            for (b = this.width = 0; b < p; ++b)h = n[b], this.width += h._char.getXAdvance() / 1 + h._char.getXOffset() / 1 + 1, h.x = v * (h.x +
                a), h.y = v * (h.y + q + (g - 1) * r), h.scale = v, 0 < h._char.getWidth() && 0 < h._char.getHeight() && c.push(h), this.mCharLocationPool.push(h);
            this.previousWidth.push(this.width)
        }
        this.width = this.previousWidth[0];
        for (m = 1; m < this.previousWidth.length; m++)this.previousWidth[m] > this.width && (this.width = this.previousWidth[m]);
        return c
    };
    BitmapFont.prototype.getName = function () {
        return this.mName
    };
    BitmapFont.prototype.getSize = function () {
        return this.mSize
    };
    BitmapFont.prototype.getLineHeight = function () {
        return this.mLineHeight
    };
    BitmapFont.prototype.setLineHeight =
        function (c) {
            this.mLineHeight = c
        };
    BitmapFont.prototype.getBaseLine = function () {
        return this.mBaseLine
    };
    BitmapFont.prototype.getWidth = function () {
        return this.width
    };
    BitmapFont.prototype.getHeight = function () {
        return this.textHeight
    };
    e.BitmapFont = BitmapFont
})(window);
(function () {
    BitmapTextField = function (c, a, b, e, j, g, f, d, r, l) {
        this.font = null;
        null == g && (g = 1);
        null == f && (f = 1);
        null == d && (d = "center");
        null == r && (r = "center");
        null == l && (l = !0);
        this.hAlign = d;
        this.vAlign = r;
        this.autoScale = l;
        this.color = "";
        this.initialize(c, a, b, e, j, g, f, d, r, l);
        this.containerWidth = c;
        this.containerHeight = a;
        this.fontSize = j;
        this.horizantalLetterSpacing = g;
        this.verticalLetterSpacing = f
    };
    BitmapTextField.bitmapFonts = [];
    var e = BitmapTextField.prototype = new createjs.Container;
    e.BitmapTextField_initialize = e.initialize;
    e.initialize = function (c, a, b, e, j, g, f, d, r, l) {
        b = String(b);
        this.BitmapTextField_initialize();
        this.border = new createjs.Shape;
        this.border.graphics.setStrokeStyle(1);
        this.border.graphics.beginStroke(createjs.Graphics.getRGB(255, 0, 0));
        this.border.graphics.drawRect(0, 0, c, a);
        this.addChild(this.border);
        this.border.visible = !1;
        this.textContainer = new createjs.Container;
        this.addChild(this.textContainer);
        BitmapTextField.bitmapFonts[e] ? (this.font = BitmapTextField.bitmapFonts[e], c = this.font.createSprite(c, a, b, j, g, f,
            d, r, l, !0), this.actualWidth = this.font.getWidth(), this.textContainer.addChild(c)) : console.log("BitmapTextField: Font is not registered " + e)
    };
    e.setText = function (c) {
        c = String(c);
        this.textContainer.uncache();
        this.textContainer.removeAllChildren();
        c = this.font.createSprite(this.containerWidth, this.containerHeight, c, this.fontSize, this.horizantalLetterSpacing, this.verticalLetterSpacing, this.hAlign, this.vAlign, this.autoScale, !0);
        this.textContainer.addChild(c);
        "" != this.color && this.setColor(this.color);
        this.actualWidth =
            this.font.getWidth()
    };
    e.getWidth = function () {
        return this.containerWidth
    };
    e.getHeight = function () {
        return this.containerHeight
    };
    e.getActualWidth = function () {
        return this.actualWidth
    };
    e.showBorder = function (c) {
        null == c && (c = !0);
        this.border.visible = c
    };
    e.setColor = function (c) {
        function a(a) {
            return"#" == a.charAt(0) ? a.substring(1, 7) : a
        }

        var b = parseInt(a(c).substring(0, 2), 16), e = parseInt(a(c).substring(2, 4), 16), j = parseInt(a(c).substring(4, 6), 16);
        c != this.color && (this.colorFilter = new createjs.ColorFilter(0, 0, 0, 1, b, e, j,
            0));
        this.textContainer.filters = [this.colorFilter];
        this.textContainer.cache(0, 0, this.containerWidth, this.containerHeight);
        this.color = c
    };
    BitmapTextField.registerBitmapFont = function (c, a) {
        if (null == BitmapTextField.bitmapFonts[a])return BitmapTextField.bitmapFonts[a] = c, a;
        console.log(a + " : is already registered")
    }
})(window);
(function (e) {
    CharLocation = function (c) {
        this._char = c;
        this._char = null;
        this.y = this.x = this.scale = 0
    };
    e.CharLocation = CharLocation
})(window);
(function (e) {
    HAlign = function () {
    };
    HAlign.CENTER = "center";
    HAlign.LEFT = "left";
    HAlign.RIGHT = "right";
    e.HAlign = HAlign
})(window);
(function (e) {
    VAlign = function () {
    };
    VAlign.BOTTOM = "bottom";
    VAlign.TOP = "top";
    VAlign.CENTER = "center";
    e.VAlign = VAlign
})(window);

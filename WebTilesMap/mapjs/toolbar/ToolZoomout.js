
//拉框缩小
Ext.Cat.AjaxMap.ZoomoutTool = function (config) {
    Ext.Cat.AjaxMap.ZoomoutTool.superclass.constructor.call(this, config);
}
Ext.extend(Ext.Cat.AjaxMap.ZoomoutTool, Ext.Cat.AjaxMap.AbstractTool, {
    cursorStyle: 'url("../../../maps/zoomout.cur"),pointer',
    selected: false,
    alt: '拉框缩小',
    mouseDownHandler: function (e, toolbar) {
        this.mapDiv = toolbar.mapDiv;
        this.mouseDownPixel = Util.getMouseRelativePixel(e, this.mapDiv);

        this.zoomBox = Util.createDiv('zoomBox', this.mouseDownPixel.x, this.mouseDownPixel.y, null, null, null, "absolute", "1px solid red");
        this.zoomBox.style.backgroundColor = "white";
        this.zoomBox.style.filter = "alpha(opacity=50)";
        this.zoomBox.style.opacity = "0.50";
        this.zoomBox.style.fontSize = "1px";
        this.mapDiv.appendChild(this.zoomBox);
        e.stopEvent();
        //Event.stop(e);
    },

    mouseMoveHandler: function (e, toolbar) {
        this.mapDiv = toolbar.mapDiv;
        this.mouseMovePixel = Util.getMouseRelativePixel(e, this.mapDiv);

        if (this.mouseDownPixel) {
            var deltaX = Math.abs(this.mouseDownPixel.x - this.mouseMovePixel.x);
            var deltaY = Math.abs(this.mouseDownPixel.y - this.mouseMovePixel.y);
            this.zoomBox.style.width = Math.max(1, deltaX) + "px";
            this.zoomBox.style.height = Math.max(1, deltaY) + "px";
            if (this.mouseMovePixel.x < this.mouseDownPixel.x)
                this.zoomBox.style.left = this.mouseMovePixel.x + "px";
            if (this.mouseMovePixel.y < this.mouseDownPixel.y)
                this.zoomBox.style.top = this.mouseMovePixel.y + "px";
        }
        e.stopEvent();
        //Event.stop(e);
    },

    mouseUpHandler: function (e, toolbar) {
        if (this.mouseDownPixel && this.mouseMovePixel) {
            var top = Math.min(this.mouseDownPixel.y, this.mouseMovePixel.y);
            var bottom = Math.max(this.mouseDownPixel.y, this.mouseMovePixel.y);
            var left = Math.min(this.mouseDownPixel.x, this.mouseMovePixel.x);
            var right = Math.max(this.mouseDownPixel.x, this.mouseMovePixel.x);

            var leftTop = Util.getCoordinateByPixel({ x: left, y: top }, toolbar.model.getZoom())
            var rightbottom = Util.getCoordinateByPixel({ x: right, y: bottom }, toolbar.model.getZoom())
            var rect = new Ext.Cat.AjaxMap.Rectangle(leftTop.x / 1e16, rightbottom.x / 1e16, leftTop.y / 1e16, rightbottom.y / 1e16);
            this.removeZoomBox(this.zoomBox);
            this.zoomToExtent(toolbar.model, rect, toolbar.container.body, "zoomout");
            this.reCreateCanvas(toolbar);
        }
        document.onselectstart = function () { return false };
        this.coord = null;
        this.newCoord = null;
        e.stopEvent();
        //Event.stop(e);
    },

    removeZoomBox: function (zoom) {
        if (!zoom) return;
        this.mapDiv.removeChild(zoom);
        zoom = null;
    },

    clickHandler: function (e, movel) {
        e.stopEvent();
        //Event.stop(e);
    },

    dblClickHandler: function (e, movel) {
        e.stopEvent();
        //Event.stop(e);
    }
});
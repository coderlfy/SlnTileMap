Ext.Cat.AjaxMap.MarkTrackerPointTool = function (config) {
    Ext.Cat.AjaxMap.ZoomoutTool.superclass.constructor.call(this, config);
    this.trackerpointerStore = config.trackerpointerStore;
    this.cursorImg = config.cursorImg;
    this.alt = config.alt;
}
Ext.extend(Ext.Cat.AjaxMap.MarkTrackerPointTool, Ext.Cat.AjaxMap.AbstractTool, {
    cursorStyle: 'url("../../../maps/base/marktracker.gif"),pointer',
    selected: false,
    alt: '标定路径点',
    mouseDownHandler: function (e, toolbar) {

        this.isMarked = false;
        this.mapDiv = toolbar.mapDiv;
        this.mouseDownPixel = Util.getMouseRelativePixel(e, this.mapDiv);

        this.currPoint = Util.getCoordinateByPixel(this.mouseDownPixel, toolbar.model.zoom).getPoint();

        this.pointX = Util.formatFloat(this.currPoint.x, 5);
        this.pointY = Util.formatFloat(this.currPoint.y, 5);

        this.marker = new Ext.Cat.AjaxMap.Marker();
        this.marker.setCoord(this.currPoint);
        this.marker.setIcon(new Ext.Cat.AjaxMap.Icon(16, 16, this.cursorImg));

        this.marker.setToMap(this.mapDiv, toolbar.model);
        e.stopEvent();
    },

    mouseMoveHandler: function (e, toolbar) {
        this.mapDiv = toolbar.mapDiv;
        this.mouseMovePixel = Util.getMouseRelativePixel(e, this.mapDiv);

        if (this.mouseDownPixel) {
            var deltaX = Math.abs(this.mouseDownPixel.x - this.mouseMovePixel.x);
            var deltaY = Math.abs(this.mouseDownPixel.y - this.mouseMovePixel.y);
        }
        e.stopEvent();
    },

    mouseUpHandler: function (e, toolbar) {
        if (this.mouseDownPixel && this.mouseMovePixel) {
            var top = Math.min(this.mouseDownPixel.y, this.mouseMovePixel.y);
            var bottom = Math.max(this.mouseDownPixel.y, this.mouseMovePixel.y);
            var left = Math.min(this.mouseDownPixel.x, this.mouseMovePixel.x);
            var right = Math.max(this.mouseDownPixel.x, this.mouseMovePixel.x);

            var leftTop = Util.getCoordinateByPixel({ x: left, y: top }, toolbar.model.getZoom())
            var rightbottom = Util.getCoordinateByPixel({ x: right, y: bottom }, toolbar.model.getZoom())
        }
        document.onselectstart = function () { return false };
        this.coord = null;
        this.newCoord = null;
        e.stopEvent();
    },

    clickHandler: function (e, movel) {
        CalibrationPathPointsForm(this, this.trackerpointerStore);
        e.stopEvent();
    },

    dblClickHandler: function (e, movel) {
        e.stopEvent();
    }
});

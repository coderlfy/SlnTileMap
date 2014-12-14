/// <reference path="EventMarkSensor.js" />
/// <reference path="EventMarkStation.js" />
//轨迹回放icon-tracktool
Ext.Cat.AjaxMap.TrackerTool = function (config) {
    Ext.Cat.AjaxMap.ZoomoutTool.superclass.constructor.call(this, config);
    //this.baseStationstore = config.baseStationstore;
}
Ext.extend(Ext.Cat.AjaxMap.TrackerTool, Ext.Cat.AjaxMap.AbstractTool, {
    cursorStyle: 'move',
    selected: false,
    alt: '轨迹回放',
    barClickHandler: function (e) {
        //this.clearCurrentToolStatus();
        //this.currentTool = this.tools[e.id];
        //var tool = this.tools[this.currentTool.id];
        //this.mapDiv.style.cursor = tool.cursorStyle;
        TrackerEvent(tool, this.mapDiv);
    },

    mouseDownHandler: function (e, toolbar) {
        this.mapDiv = toolbar.mapDiv; //修改调用方法
        if (!this.mapDiv)
            return;
        if (!this.isDrag)
            this.isDrag = true;
        this.orgPixelX = Util.getValueOfNoPX(this.mapDiv.style.left);
        this.orgPixelY = Util.getValueOfNoPX(this.mapDiv.style.top);
        this.orgMousePixel = Util.getMousePixel(e.browserEvent);
        if (this.mapDiv.setCapture)
            this.mapDiv.setCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        document.onselectstart = function () { return false };
        e.stopEvent();
    },

    mouseMoveHandler: function (e, toolbar) {
        if (this.orgMousePixel == null || this.isDrag == false || !this.mapDiv)
            return;
        this.newMousePixel = Util.getMousePixel(e.browserEvent);
        var deltaX = this.newMousePixel.x - this.orgMousePixel.x;
        var deltaY = this.newMousePixel.y - this.orgMousePixel.y;
        this.mapDiv.style.left = (this.orgPixelX + deltaX) + "px";
        this.mapDiv.style.top = (this.orgPixelY + deltaY) + "px";
        e.stopEvent();
    },

    mouseUpHandler: function (e, toolbar) {
        if (!this.isDrag) return;
        if (!this.mapDiv)
            return;
        if (this.mapDiv.releaseCapture)
            this.mapDiv.releaseCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        var lastMousePixel = Util.getMousePixel(e.browserEvent);
        var deltaX = lastMousePixel.x - this.orgMousePixel.x;
        var deltaY = lastMousePixel.y - this.orgMousePixel.y;
        this.reLoadTiles(toolbar, deltaX, deltaY, this.mapDiv);
        document.onmousemove = null;
        document.onmouseup = null;
        this.isDrag = false;
        e.stopEvent();
    },

    reLoadTiles: function (toolbar, deltaX, deltaY, mapDiv) {
        var orgCenterCoord = toolbar.model.getViewCenterCoord();
        var curZoom = toolbar.model.getZoom();
        var x = orgCenterCoord.x - deltaX * curZoom.realMapBound.getWidth() / (curZoom.getTileCols() * Ext.Cat.MapConfig.TileSize);
        var y = orgCenterCoord.y + deltaY * curZoom.realMapBound.getHeight() / (curZoom.getTileRows() * Ext.Cat.MapConfig.TileSize);
        var newCenterCoord = new Ext.Cat.AjaxMap.Coordinate(x, y);
        if (!newCenterCoord.isSame(orgCenterCoord)) {
            toolbar.model.setViewCenterCoord(newCenterCoord);
        }
        var control = new Ext.Cat.AjaxMap.AbstractControl();
        control.loadTiles(toolbar.model, toolbar.container.body.dom, mapDiv, true); //mapDiv.parentNode
        if (toolbar.model.ovId)
            toolbar.model.controls[toolbar.model.ovId].paint(toolbar.model);
    },

    clickHandler: function (e, toolbar) {
        e.stopEvent();
    },

    dblClickHandler: function (e, toolbar) {
        e.stopEvent();
    }
});

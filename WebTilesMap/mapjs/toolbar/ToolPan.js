//移屏
/*
Ext.Cat.AjaxMap.PanTool = function (config) {
    Ext.Cat.AjaxMap.PanTool.superclass.constructor.call(this, config);
}
Ext.extend(Ext.Cat.AjaxMap.PanTool, Ext.Cat.AjaxMap.AbstractTool, {
    cursorStyle: 'move',
    selected: false,
    alt: '移屏',
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
        //Event.stop(e);
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
        //Event.stop(e);
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
        //Event.stop(e);
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
        //Event.stop(e);
    },

    dblClickHandler: function (e, toolbar) {
        //Event.stop(e);
        //var point = Util.getCoordinateByPixel(Util.getMousePixel(e.browserEvent), toolbar.model.zoom).getPoint();
        //Util.getMousePixel(e);
        e.stopEvent();
    }
});
*/
Ext.define('iCatMap.PanTool', {
    cursorStyle: 'move',
    selected: false,
    alt: '移屏',
    extend: 'iCatMap.AbstractTool',
    newMousePixel: null,
    orgPixelX: null,
    orgPixelY: null,
    orgMousePixel: null,
    isDrag: null,
    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }
        me.callParent([config]);


    },
    mouseDownHandler: function (e, toolbar) {
        this.mapDiv = toolbar.mapDiv; //修改调用方法
        if (!this.mapDiv)
            return;
        if (!this.isDrag)
            this.isDrag = true;
        this.orgPixelX = iCatMap.Util.getValueOfNoPX(this.mapDiv.style.left);
        this.orgPixelY = iCatMap.Util.getValueOfNoPX(this.mapDiv.style.top);
        this.orgMousePixel = iCatMap.Util.getMousePixel(e.browserEvent);
        if (this.mapDiv.setCapture)
            this.mapDiv.setCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        document.onselectstart = function () { return false };
        e.stopEvent();
        //Event.stop(e);
    },

    mouseMoveHandler: function (e, toolbar) {
        if (this.orgMousePixel == null || this.isDrag == false || !this.mapDiv)
            return;
        this.newMousePixel = iCatMap.Util.getMousePixel(e.browserEvent);
        var deltaX = this.newMousePixel.x - this.orgMousePixel.x;
        var deltaY = this.newMousePixel.y - this.orgMousePixel.y;
        this.mapDiv.style.left = (this.orgPixelX + deltaX) + "px";
        this.mapDiv.style.top = (this.orgPixelY + deltaY) + "px";
        e.stopEvent();
        //Event.stop(e);
    },

    mouseUpHandler: function (e, toolbar) {
        if (!this.isDrag) return;
        if (!this.mapDiv)
            return;
        if (this.mapDiv.releaseCapture)
            this.mapDiv.releaseCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        var lastMousePixel = iCatMap.Util.getMousePixel(e.browserEvent);
        var deltaX = lastMousePixel.x - this.orgMousePixel.x;
        var deltaY = lastMousePixel.y - this.orgMousePixel.y;
        this.reLoadTiles(toolbar, deltaX, deltaY, this.mapDiv);
        document.onmousemove = null;
        document.onmouseup = null;
        this.isDrag = false;
        e.stopEvent();
        //Event.stop(e);
    },

    reLoadTiles: function (toolbar, deltaX, deltaY, mapDiv) {
        var orgCenterCoord = toolbar.model.getViewCenterCoord();
        var curZoom = toolbar.model.getZoom();
        var x = orgCenterCoord.x - deltaX * curZoom.realMapBound.getWidth() / (curZoom.getTileCols() * iCatMap.MapConfig.TileSize);
        var y = orgCenterCoord.y + deltaY * curZoom.realMapBound.getHeight() / (curZoom.getTileRows() * iCatMap.MapConfig.TileSize);
        var newCenterCoord = Ext.create('iCatMap.Coordinate',{x:x, y:y});
        if (!newCenterCoord.isSame(orgCenterCoord)) {
            toolbar.model.setViewCenterCoord(newCenterCoord);
        }
        var control = Ext.create('iCatMap.AbstractControl');
        control.loadTiles(toolbar.model, toolbar.container.body.dom, mapDiv, true); //mapDiv.parentNode
        if (toolbar.model.ovId)
            toolbar.model.controls[toolbar.model.ovId].paint(toolbar.model);
    },

    clickHandler: function (e, toolbar) {

        e.stopEvent();
        //Event.stop(e);
    },

    dblClickHandler: function (e, toolbar) {
        //Event.stop(e);
        //var point = Util.getCoordinateByPixel(Util.getMousePixel(e.browserEvent), toolbar.model.zoom).getPoint();
        //Util.getMousePixel(e);
        e.stopEvent();
    }
});

/// <reference path="../extjs/ext-base.js" />
/// <reference path="../extjs/ext-all.js" />
/// <reference path="Util.js" />
/*
Ext.Cat.AjaxMap.MapModel = function (id) {
    this.modelId = id;
    this.mapTypes = new Object();
}
Ext.Cat.AjaxMap.MapModel.prototype = {
    OvContainer: null,
    controls: new Object(),
    ovId: null,
    defaultCenterPoint: null,
    defaultLevel: null,
    overlays: null,
    traceIndex: 0,
    traces: new Object(),
    curIndex: -1,
    mapTypeIds: new Array(),

    getZoom: function () {
        return this.zoom;
    },

    setZoom: function (zoom) {
        this.zoom = zoom;
    },

    setViewCenterCoord: function (centerCoord) {
        this.viewCenterCoord = centerCoord;
    },

    getViewCenterCoord: function () {
        return this.viewCenterCoord;
    },

    getViewBound: function () {
        return this.viewBound;
    },

    setViewBound: function (bound) {
        this.viewBound = bound;
    },

    setCurrentMapType: function (type) {
        this.currentMapType = type;
    },

    getCurrentMapType: function () {
        return this.currentMapType;
    },

    getId: function () {
        return this.modelId;
    },

    getOvContainer: function () {
        return this.OvContainer;
    },

    getOvMapDiv: function () {
        return this.OvContainer.childNodes[0];
    },

    setOvContainer: function (ovContainer, id) {
        this.OvContainer = ovContainer;
        this.ovId = id;
    },

    getOvModel: function () {
        var newModel = new Ext.Cat.AjaxMap.MapModel(Util.createUniqueID());
        newModel.setViewCenterCoord(this.getViewCenterCoord());
        if (this.getZoom().getLevel() - 2 <= 1)
            ovLevel = 1
        else
            ovLevel = this.getZoom().getLevel() - 2;
        var zoom = new Ext.Cat.AjaxMap.Zoom(ovLevel);
        newModel.setZoom(zoom);
        newModel.setCurrentMapType(this.getCurrentMapType());
        newModel.setViewBound(zoom.getViewBound(this.OvContainer));
        return newModel;
    },

    reset: function (mapDiv, elm) {
        this.setViewCenterCoord(this.defaultCenterPoint.getCoord());
        this.setZoom(new Zoom(this.defaultLevel));
        this.controls[mapDiv.id].paint(this, true);
        this.controls[this.ovId].paint(this);
        elm.style.top = ((Ext.Cat.MapConfig.MaxZoomLevel - this.defaultLevel) * 12 + 6) + "px"
    },

    clearOverLayers: function (mapDiv) {
        if (this.overlays) {
            for (var i = 0; i < this.overlays.length; i++) {
                this.overlays[i].remove();
            }
            this.overlays.length = 0;
        }
    }
}
*/

Ext.define('iCatMap.MapModel', {
    modelId : null,
    mapTypes: new Object(),
    OvContainer: null,
    controls: new Object(),
    ovId: null,
    defaultCenterPoint: null,
    defaultLevel: null,
    overlays: null,
    traceIndex: 0,
    traces: new Object(),
    curIndex: -1,
    mapTypeIds: new Array(),
    zoom: null,
    viewCenterCoord: null,
    viewBound: null,
    currentMapType: null,
    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }
    },


    getZoom: function () {
        return this.zoom;
    },

    setZoom: function (zoom) {
        this.zoom = zoom;
    },

    setViewCenterCoord: function (centerCoord) {
        this.viewCenterCoord = centerCoord;
    },

    getViewCenterCoord: function () {
        return this.viewCenterCoord;
    },

    getViewBound: function () {
        return this.viewBound;
    },

    setViewBound: function (bound) {
        this.viewBound = bound;
    },

    setCurrentMapType: function (type) {
        this.currentMapType = type;
    },

    getCurrentMapType: function () {
        return this.currentMapType;
    },

    getId: function () {
        return this.modelId;
    },

    getOvContainer: function () {
        return this.OvContainer;
    },

    getOvMapDiv: function () {
        return this.OvContainer.childNodes[0];
    },

    setOvContainer: function (ovContainer, id) {
        this.OvContainer = ovContainer;
        this.ovId = id;
    },

    getOvModel: function () {
        var newModel = Ext.create('iCatMap.MapModel', {
            modelId: iCatMap.Util.createUniqueID()
        });
        newModel.setViewCenterCoord(this.getViewCenterCoord());
        if (this.getZoom().getLevel() - 2 <= 1)
            ovLevel = 1
        else
            ovLevel = this.getZoom().getLevel() - 2;
        var zoom = Ext.create('iCatMap.Zoom', {
            level: ovLevel
        });
        newModel.setZoom(zoom);
        newModel.setCurrentMapType(this.getCurrentMapType());
        newModel.setViewBound(zoom.getViewBound(this.OvContainer));
        return newModel;
    },

    reset: function (mapDiv, elm) {
        this.setViewCenterCoord(this.defaultCenterPoint.getCoord());
        this.setZoom(new Zoom(this.defaultLevel));
        this.controls[mapDiv.id].paint(this, true);
        this.controls[this.ovId].paint(this);
        elm.style.top = ((iCatMap.MapConfig.MaxZoomLevel - this.defaultLevel) * 12 + 6) + "px";
    },

    clearOverLayers: function (mapDiv) {
        if (this.overlays) {
            for (var i = 0; i < this.overlays.length; i++) {
                this.overlays[i].remove();
            }
            this.overlays.length = 0;
        }
    }
});
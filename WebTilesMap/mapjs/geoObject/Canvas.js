/*
Ext.Cat.AjaxMap.Canvas = function (left, top) {
    this.left = left;
    this.top = top;
}
Ext.extend(Ext.Cat.AjaxMap.Canvas, Ext.Cat.AjaxMap.AbstractOverLayer, {
    setToMap: function (mapDiv, model, overLayDiv) {
        //将画布显示在地图上
        this.mapDiv = mapDiv;
        this.model = model;
        var canvas = Util.createCanvas("tracker_canvas", this.left, this.top, this.mapDiv.style.width, this.mapDiv.style.height, 2, 'absolute');
        var canvasinterface = Util.createCanvas("tracker_interfacecanvas", this.left, this.top, this.mapDiv.style.width, this.mapDiv.style.height, 3, 'absolute');
        this.div = canvas;
        this.insert();
        this.div = canvasinterface;
        this.insert();
    },
    hide: function () {
        alert("good");
    }

});
*/
Ext.define('iCatMap.Canvas', {
    extend: 'iCatMap.AbstractOverLayer',
    left: 0,
    top: 0,
    div: null,
    constructor: function () {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }
    },
    setToMap: function (mapDiv, model, overLayDiv) {
        //将画布显示在地图上
        this.mapDiv = mapDiv;
        this.model = model;
        var canvas = iCatMap.Util.createCanvas(
            "tracker_canvas", this.left, this.top,
            this.mapDiv.style.width, this.mapDiv.style.height,
            2, 'absolute');

        var canvasinterface = iCatMap.Util.createCanvas(
            "tracker_interfacecanvas", this.left, this.top,
            this.mapDiv.style.width, this.mapDiv.style.height,
            3, 'absolute');

        this.div = canvas;
        this.insert();
        this.div = canvasinterface;
        this.insert();
    },

});

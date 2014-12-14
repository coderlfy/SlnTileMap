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

/*
Ext.Cat.AjaxMap.Polyline = function (points, color, size) {
    this.points = points;
    this.color = color;
    this.size = size;
    this.bound = this.buildExtent();
}
Ext.extend(Ext.Cat.AjaxMap.Polyline, Ext.Cat.AjaxMap.AbstractOverLayer, {
    
});
*/
Ext.define('iCatMap.Polyline', {
    extend: 'iCatMap.AbstractOverLayer',
    points: null,
    color: null,
    size: null,
    bound: null,
    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }
        this.bound = this.buildExtent();
    },
    buildExtent: function () {
        var minX = 180e16, maxX = 0, minY = 90e16, maxY = 0;

        for (var i = 0; i < this.points.length; i++) {
            if (this.points[i].getCoord().x < minX)
                minX = this.points[i].getCoord().x;
            if (this.points[i].getCoord().x > maxX)
                maxX = this.points[i].getCoord().x;
            if (this.points[i].getCoord().y < minY)
                minY = this.points[i].getCoord().y;
            if (this.points[i].getCoord().y > maxY)
                maxY = this.points[i].getCoord().y;
        }
        return Ext.create('iCatMap.Bound', {
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY
        });
    },

    getExtent: function () {
        return this.bound;
    },

    setExtent: function (extent) {
        this.bound = extent;
    },

    getCenterCoord: function () {
        return this.getExtent().getCenterCoord();
    },

    getLength: function () {
        if (this.points.length <= 1) return 0;
        var len = 0;
        for (var i = 0; i < this.points.length - 1; i++) {
            len += this.points[i].calcuDistance(this.points[i + 1]);
        }
        return len;
    },

    setToMap: function (mapDiv, model, overLayerDiv) {
        this.mapDiv = mapDiv;
        this.model = model;
        var curZoom = model.getZoom();
        var coord = Ext.create('iCatMap.Coordinate', {
            x: this.getExtent().getMinX(),
            y: this.getExtent().getMaxY()
        });
        var pixel = iCatMap.Util.getScreenPixel(coord, curZoom); //经纬度转屏幕

        var lines = new Array();
        lines.push('<v:PolyLine filled="false" Points="');
        for (var i = 0; i < this.points.length; i++) {
            var tempcoord = Ext.create('iCatMap.Coordinate', {
                x: this.points[i].getCoord().x,
                y: this.points[i].getCoord().y
            });
            var sPoint = iCatMap.Util.getScreenPixel(tempcoord, curZoom);
            lines.push(Math.floor(sPoint.x) + ',' + Math.floor(sPoint.y) + ',');
        }
        lines[lines.length - 1] = lines[lines.length - 1].substring(0, lines[lines.length - 1].length - 1);
        lines.push('" style="position:relative" strokecolor="' + this.color + '" strokeweight="' + this.size + '"/>');

        if (overLayerDiv) {
            overLayerDiv.innerHTML = "";
            overLayerDiv.style.left = pixel.x;
            overLayerDiv.style.top = pixel.y;
            overLayerDiv.innerHTML = lines.join("");
        }
        else {
            this.id = iCatMap.Util.createUniqueID('Over_Polyline_');
            this.div = iCatMap.Util.createDiv(this.id, pixel.x, pixel.y, null, null, null, 'absolute');
            this.div.style.zIndex = 10;
            this.div.innerHTML = lines.join("");
            this.insert();
        }

    }
});
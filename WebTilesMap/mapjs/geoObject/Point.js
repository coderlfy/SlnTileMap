/*
Ext.Cat.AjaxMap.Point = function (x, y) {
    this.x = x;
    this.y = y;
    this.coord = new Ext.Cat.AjaxMap.Coordinate(x * 1e16, y * 1e16);
}
Ext.Cat.AjaxMap.Point.prototype = {    
    getCoord: function(){
        return this.coord;
    },
    
    setCoord: function(coord){
        this.coord = coord;
    },
    
    calcuDistance: function(point){
        return Util.distanceByLnglat(this.x, this.y, point.x, point.y);
    },
    
    toString: function(){
        return 'X:'+this.x+',Y:'+this.y;
    }
}
*/
Ext.define('iCatMap.Point', {
    x: 0,
    y: 0,
    coord: null,

    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }

        me.coord = Ext.create('iCatMap.Coordinate', {
            x: x * 1e16,
            y: y * 1e16
        });
    },
    getCoord: function () {
        return this.coord;
    },

    setCoord: function (coord) {
        this.coord = coord;
    },

    calcuDistance: function (point) {
        return iCatMap.Util.distanceByLnglat(this.x, this.y, point.x, point.y);
    },

    toString: function () {
        return 'X:' + this.x + ',Y:' + this.y;
    }
});
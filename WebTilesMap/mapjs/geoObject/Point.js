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
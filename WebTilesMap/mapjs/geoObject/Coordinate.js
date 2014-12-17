/*
Ext.Cat.AjaxMap.Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
}
Ext.Cat.AjaxMap.Coordinate.prototype = {    
    isSame: function(coord){
        if (this.x == coord.x && this.y == coord.y) 
			return true;
		return false;
    },
    
    getBound: function(width, height){
        return new Ext.Cat.AjaxMap.Bound(this.x - width / 2, this.x + width / 2, this.y - height / 2, this.y + height / 2);
    },
    
    getPoint: function(){
        return new Ext.Cat.AjaxMap.Point(this.x / 1e16, this.y / 1e16);
    },
    
    toString: function(){
        return 'X:'+this.x+',Y:'+this.y;
    }
}
*/
Ext.define('iCatMap.Coordinate', {
    x: 0,
    y: 0,

    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }
    },
    isSame: function (coord) {
        if (this.x == coord.x && this.y == coord.y)
            return true;
        return false;
    },

    getBound: function (width, height) {
        return Ext.create('iCatMap.Bound',{
            minX: this.x - width / 2, 
            maxX: this.x + width / 2,
            minY: this.y - height / 2,
            maxY: this.y + height / 2
        });
    },

    getPoint: function () {
        return Ext.create('iCatMap.Point', {
            x: this.x / 1e16,
            y: this.y / 1e16
        });
    },

    toString: function () {
        return 'X:' + this.x + ',Y:' + this.y;
    }

});
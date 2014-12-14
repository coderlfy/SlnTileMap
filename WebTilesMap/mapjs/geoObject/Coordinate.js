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
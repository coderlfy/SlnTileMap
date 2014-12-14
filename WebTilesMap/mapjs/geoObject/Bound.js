Ext.Cat.AjaxMap.Bound = function (minX, maxX, minY, maxY) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.centerCoord = new Ext.Cat.AjaxMap.Coordinate((this.minX + this.maxX) / 2, (this.minY + this.maxY) / 2);
}
Ext.Cat.AjaxMap.Bound.prototype = {
    getCenterCoord: function(){
        return this.centerCoord;
    },
    
    clone: function(coord){
        if (coord == null || coord.isSame(this.centerCoord)) {
			return this;
		} 
		else {
			var minX = this.minX + coord.x - this.centerCoord.x;
			var maxX = this.maxX + coord.x - this.centerCoord.x;
			var minY = this.minY + coord.y - this.centerCoord.y;
			var maxY = this.maxY + coord.y - this.centerCoord.y;
			return new Ext.Cat.AjaxMap.Bound(minX, maxX, minY, maxY);
		}
    },
    
    isCover: function(bound){
        if (this.getMinX()>bound.getMaxX() || this.getMaxX()<bound.getMinX() || this.getMinY()>bound.getMaxY() || this.getMaxY()<bound.getMinY()) {
			return false;
		}
		return true;
    },
    
    isWithin: function(coord){
        if (coord.x<this.maxX && coord.x>this.minX && coord.y<this.maxY && coord.y>this.minY) {
			return true;
		}
		return false;
    },
    
    getMinX: function() {
		return this.minX;
	},

	getMaxX: function() {
		return this.maxX;
	},
	
	getMinY: function() {
		return this.minY;
	},

	getMaxY: function() {
		return this.maxY;
	},
    
	getHeight: function() {
		return Math.abs(this.maxY - this.minY);
	},
	
	getWidth: function() {
		return Math.abs(this.maxX - this.minX);
	},
	
	getPixelHeight: function(zoom) {
	    var topleft = Util.getScreenPixel(new Ext.Cat.AjaxMap.Coordinate(this.minX, this.maxY), zoom).y;
	    var bottomright = Util.getScreenPixel(new Ext.Cat.AjaxMap.Coordinate(this.maxX, this.minY), zoom).y;
	    return Math.floor(Math.abs(topleft - bottomright));

	},
	//像素宽度
	getPixelWidth: function(zoom) {
	    var topleft = Util.getScreenPixel(new Ext.Cat.AjaxMap.Coordinate(this.minX, this.maxY), zoom).x;
	    var bottomright = Util.getScreenPixel(new Ext.Cat.AjaxMap.Coordinate(this.maxX, this.minY), zoom).x;
	    return Math.floor(Math.abs(bottomright - topleft));
	}
    
}
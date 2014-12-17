/*
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
*/
Ext.define('iCatMap.Bound', {
    minX : 0,
    maxX : 0,
    minY : 0,
    maxY : 0,
    centerCoord : null,

    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }

        me.centerCoord = Ext.create('iCatMap.Coordinate', {
            x: (me.minX + me.maxX) / 2,
            y: (me.minY + me.maxY) / 2
        });
    },
    getCenterCoord: function () {
        return this.centerCoord;
    },

    clone: function (coord) {
        var me = this;
        if (coord == null ||
            coord.isSame(me.centerCoord)) {
            return me;
        }
        else {
            return Ext.create('iCatMap.Bound', {
                minX: me.minX + coord.x - me.centerCoord.x,
                maxX: me.maxX + coord.x - me.centerCoord.x,
                minY: me.minY + coord.y - me.centerCoord.y,
                maxY: me.maxY + coord.y - me.centerCoord.y
            });
        }
    },

    isCover: function (bound) {
        var me = this;
        if (me.getMinX() > bound.getMaxX()
            || me.getMaxX() < bound.getMinX()
            || me.getMinY() > bound.getMaxY()
            || me.getMaxY() < bound.getMinY()) {
            return false;
        }
        return true;
    },

    isWithin: function (coord) {
        var me = this;
        if (coord.x < me.maxX
            && coord.x > me.minX
            && coord.y < me.maxY
            && coord.y > me.minY) {
            return true;
        }
        return false;
    },

    getMinX: function () {
        return this.minX;
    },

    getMaxX: function () {
        return this.maxX;
    },

    getMinY: function () {
        return this.minY;
    },

    getMaxY: function () {
        return this.maxY;
    },

    getHeight: function () {
        return Math.abs(this.maxY - this.minY);
    },

    getWidth: function () {
        return Math.abs(this.maxX - this.minX);
    },

    getPixelHeight: function (zoom) {
        var topleft = iCatMap.Util
            .getScreenPixel(Ext.create('iCatMap.Coordinate',{
                x:this.minX, 
                y:this.maxY
            }), zoom).y;

        var bottomright = iCatMap.Util
            .getScreenPixel(Ext.create('iCatMap.Coordinate', {
                x: this.maxX,
                y: this.minY
            }), zoom).y;

        return Math.floor(Math.abs(topleft - bottomright));

    },
    //像素宽度
    getPixelWidth: function (zoom) {
        var topleft = iCatMap.Util
            .getScreenPixel(Ext.create('iCatMap.Coordinate', {
                x: this.minX,
                y: this.maxY
            }), zoom).x;
        var bottomright = iCatMap.Util
            .getScreenPixel(Ext.create('iCatMap.Coordinate', {
                x: this.maxX,
                y: this.minY
            }), zoom).x;

        return Math.floor(Math.abs(bottomright - topleft));
    }

});
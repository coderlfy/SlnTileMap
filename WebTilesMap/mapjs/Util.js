
//创建唯一ID，prefix参数为前缀
iCatMap.Util = (function () {
    return {
        createUniqueID: function (prefix) {
            if (prefix == null) {
                prefix = "id_";
            }
            return prefix + Math.round(Math.random() * 10000000);
        },
        getValueOfNoPX: function (valueString) {
            if (!valueString)
                return;
            if (valueString.indexOf("px")) {
                var i = valueString.indexOf("px");
                return Number(valueString.substring(0, i));
            }
            return Number(valueString);
        },
        getRealMapWidth: function (fullExtent) {
            return this.distanceByLnglat(
                fullExtent.getMinX() / 1e16,
                fullExtent.getMaxY() / 1e16,
                fullExtent.getMaxX() / 1e16,
                fullExtent.getMaxY() / 1e16);
        },
        getRealMapHeight: function (fullExtent) {
            return this.distanceByLnglat(
                fullExtent.getMinX() / 1e16,
                fullExtent.getMinY() / 1e16,
                fullExtent.getMinX() / 1e16,
                fullExtent.getMaxY() / 1e16);
        },
        getRealMapBound: function (fullExtent, level) {
            //获取当前级别地图的比例尺
            var scale = this.zoomScale(level);

            var xmin = fullExtent.getMinX() / 1e16;
            var xmax = fullExtent.getMaxX() / 1e16;
            var ymin = fullExtent.getMinY() / 1e16;
            var ymax = fullExtent.getMaxY() / 1e16;
            //瓦片的长度
            var tileWidth = Ext.Cat.MapConfig.TileSize / 96 * 2.54 * scale / 100; //TODO
            var cols = this.getRealMapWidth(fullExtent) / tileWidth; // double
            var rows = (ymax - ymin) / ((xmax - xmin) / cols);
            xmax = (xmax - xmin) / cols * Math.ceil(cols) + xmin;
            ymin = ymax - (ymax - ymin) / rows * Math.ceil(rows);
            return new Bound(xmin * 1e16,
                xmax * 1e16,
                ymin * 1e16,
                ymax * 1e16);
        },
        distanceByLnglat: function (lng1, lat1, lng2, lat2) {
            var radLat1 = this.Rad(lat1);
            var radLat2 = this.Rad(lat2);
            var a = radLat1 - radLat2;
            var b = this.Rad(lng1) - this.Rad(lng2);
            var s = 2 * Math.asin(
                Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                + Math.cos(radLat1)
                * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2)));

            s = s * 6378137.0;// 取WGS84标准参考椭球中的地球长半径(单位:m)
            s = Math.round(s * 10000) / 10000;
            return s;
        },
        Rad: function (d) {
            return d * Math.PI / 180.0;
        },
        zoomScale: function (level) {
            var scale;
            switch (level) {
                case 1:
                    scale = '5000000';
                    break;
                case 2:
                    scale = '3400000';
                    break;
                case 3:
                    scale = '2000000';
                    break;
                case 4:
                    scale = '1000000';
                    break;
                case 5:
                    scale = '800000';
                    break;
                case 6:
                    scale = '500000';
                    break;
                case 7:
                    scale = '250000';
                    break;
                case 8:
                    scale = '100000';
                    break;
                case 9:
                    scale = '50000';
                    break;
                case 10:
                    scale = '25000';
                    break;
                default:
                    scale = -1;
                    break;
            }
            return scale;
        },
        createDiv: function (id, left, top, 
            width, height, img, position, 
            border, opacity) {
            if (document.getElementById(id)) {
                return document.getElementById(id);
            }
            var e = document.createElement('div');
            if (id)
                e.id = id;

            if (left)
                e.style.left = parseInt(left) + "px";
            if (top)
                e.style.top = parseInt(top) + "px";

            if (width && height) {
                e.style.width = parseInt(width) + "px";
                e.style.height = parseInt(height) + "px";
            }
            if (img)
                e.appendChild(this.createImg(id + '_Img', 5, 5, null, null, img, 'relative'));

            if (position)
                e.style.position = position;
            if (border)
                e.style.border = border;

            if (opacity) {
                e.style.opacity = opacity;
                e.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
            }

            return e;
        },
        createCanvas : function (id, left, top, 
            width, height, zIndex, 
            position) {

            if (document.getElementById(id)) {
                return document.getElementById(id);
            }
            var e = document.createElement('canvas');
            if (id)
                e.id = id;

            if (left)
                e.style.left = parseInt(left) + "px";
            if (top)
                e.style.top = parseInt(top) + "px";
            if (width && height) {
                e.width = this.getValueOfNoPX(width);
                e.height = this.getValueOfNoPX(height);
            }
            if (zIndex)
                e.style.zIndex = zIndex;
            if (position)
                e.style.position = position;

            return e;
        },
        createImg : function(id, left, top, 
            width, height, imgurl, position, 
            border, opacity, delayDisplay) {

            image = document.createElement("img");

            if(delayDisplay) {
                image.style.display = "none";
                Event.observe(image, "load", this.onImageLoad.bindAsEventListener(image));
                Event.observe(image, "error",this.onImageLoadError.bindAsEventListener(image));        
            }
    
            image.style.alt = id;
            image.galleryImg = "no";
            if (imgurl) 
                image.src = imgurl;    
    
            if (!position) 
                position = "relative";
    
            if(id)
                image.id = id;
    
            if(left)
                image.style.left = parseInt(left) + "px";
            if(top)        
                image.style.top = parseInt(top) + "px";
    
            if(width && height){
                image.style.width = parseInt(width) + "px";
                image.style.height = parseInt(height) + "px";
            }
    
            if(position)
                image.style.position = position ;
        
            if (border)
                image.style.border = border;
            
            if (opacity) {
                image.style.opacity = opacity;
                image.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
            }
        
            return image;
        },
        setElementStyle : function(element, id, left, 
            top, width, height, position, 
            border, overflow, opacity) {

            if (id) {
                element.id = id;
            }
    
            if(left)
                element.style.left = parseInt(left) + "px";
            if(top)        
                element.style.top = parseInt(top) + "px";
        
            if(width && height){
                element.style.width = parseInt(width) + "px";
                element.style.height = parseInt(height) + "px";
            }
            if (position) {
                element.style.position = position;
            }
            if (border) {
                element.style.border = border;
            }
            if (overflow) {
                element.style.overflow = overflow;
            }
            if (opacity) {
                element.style.opacity = opacity;
                element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
            }
        },
        onImageLoad : function() {
            this.style.backgroundColor = null;
            this.style.display = "";  
        },
        onImageLoadError : function() {
            this.style.backgroundColor = "pink";
            this.style.display = "";
        },
        getMousePixel : function (e) {
            if (!e) {
                e = window.event;
            }
            if (!e.pageX)
                e.pageX = e.clientX;
            if (!e.pageY)
                e.pageY = e.clientY;
            return { x: e.pageX, y: e.pageY };
        },
        getMouseRelativePixel : function (e, mapDiv) {
            var pixel = this.getMousePixel(e.browserEvent);
            var relDeltaX = pixel.x - this.getLeft(mapDiv.parentNode) - this.getValueOfNoPX(mapDiv.style.left);
            var relDeltaY = pixel.y - this.getTop(mapDiv.parentNode) - this.getValueOfNoPX(mapDiv.style.top);
            return { x: relDeltaX, y: relDeltaY };
        },
        getTop : function(obj){
            var t = obj.offsetTop;
            while(obj = obj.offsetParent){
                t += obj.offsetTop;
            }
            return t;
        },
        getLeft : function(obj){
            var t = obj.offsetLeft;
            while(obj = obj.offsetParent){
                t += obj.offsetLeft;
            }
            return t;
        },
        getScreenPixel : function (coord, zoom) {
            var sx = (coord.x - zoom.realMapBound.getMinX()) * ((zoom.getTileCols() * Ext.Cat.MapConfig.TileSize) / zoom.realMapBound.getWidth());
            var sy = (zoom.realMapBound.getMaxY() - coord.y) * ((zoom.getTileRows() * Ext.Cat.MapConfig.TileSize) / zoom.realMapBound.getHeight());
            return { x: sx, y: sy }
        },
        getCoordinateByPixel : function (pixel, zoom) {

            var x = zoom.realMapBound.getMinX() + pixel.x * (zoom.realMapBound.getWidth() / (zoom.getTileCols() * Ext.Cat.MapConfig.TileSize));
            var y = zoom.realMapBound.getMaxY() - pixel.y * (zoom.realMapBound.getHeight() / (zoom.getTileRows() * Ext.Cat.MapConfig.TileSize));
            return new Ext.Cat.AjaxMap.Coordinate(x, y);
        },
        formatFloat : function (src, pos) {
            return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
        }
    }
}());

/*
var state = 1 ;	
var orgLeft = 0;
var orgTop = 0;
var deltaX = 0;
var deltaY = 0;
var timer = null;

function setCurPos(left, top){
    orgLeft = left;
    orgTop = top;
}

function slide(layerId, w, h, img){
    var containerW = Util.getValueOfNoPX($(layerId).parentNode.style.width);
    var containerH = Util.getValueOfNoPX($(layerId).parentNode.style.height);
    
    if(state == 1){
        state = 0 ;
        var rate = 200/190;
        fly(layerId, containerW, containerH, 20, rate);
        img.src = ImageBaseDir + '2.GIF'
    }	    
    else {
        state = 1 ;
        var rate = 190/200;
        fly(layerId, containerW-w, containerH-h, 20, rate);
        img.src = ImageBaseDir + '1.GIF';
    }	
}	
function fly(layerId, left, top, speed, speedRate){
    wSpeed = (Math.max(orgLeft, left) - Math.min(orgLeft, left))/(speed) ;
    hSpeed = (Math.max(orgTop, top) - Math.min(orgTop, top))/(speed*speedRate);
    move(layerId, wSpeed, hSpeed, left, top) ;
}	
function move(layerId, wSpeed, hSpeed, left, top){
    clearTimeout(timer) ;        
    if(orgLeft != left){
        if((Math.max(orgLeft, left) - Math.min(orgLeft, left)) < wSpeed)
            orgLeft = left ;
        else if(orgLeft < left)
            orgLeft = orgLeft + wSpeed;
        else if(orgLeft > left)
            orgLeft = orgLeft - wSpeed;            
        $(layerId).style.left = orgLeft;	        
    }        
    if(orgTop != top){
        if((Math.max(orgTop, top) - Math.min(orgTop, top)) < hSpeed)
            orgTop = top
        else if(orgTop < top)
            orgTop = orgTop + hSpeed
	    else if(orgTop > top)
	        orgTop = orgTop - hSpeed    		
	    $(layerId).style.top = orgTop
    }	
    
    timer = setTimeout('move("'+layerId+'",'+wSpeed+','+hSpeed+','+left+','+top+')',30);
};
*/

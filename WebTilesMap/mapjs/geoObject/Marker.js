Ext.Cat.AjaxMap.Marker = function (markerId, prefixId, offsetLeft, offsetTop) {
    this.backColor = '#ff0000';
    this.offsetTop = (offsetTop == null) ? 0 : offsetTop;
    this.offsetLeft = (offsetLeft == null) ? 0 : offsetLeft;
    this.prefixId = (prefixId == null) ? 'Over_Marker' : 'Over_' + prefixId;
    if (markerId) {
        this.id = this.prefixId + "_" + markerId;
        this.infoDivId = this.prefixId + "_Info_" + markerId;
    }
    else {
        this.id = Util.createUniqueID(this.prefixId + "_");
        this.infoDivId = Util.createUniqueID(this.prefixId + "_Info");
    }
}
Ext.extend(Ext.Cat.AjaxMap.Marker, Ext.Cat.AjaxMap.AbstractOverLayer, {
    getCoord: function () {
        return this.coord;
    },
    setCoord: function (point) {
        this.coord = point.getCoord();
    },

    getIcon: function () {
        return this.icon;
    },
    setIcon: function (icon) {
        this.icon = icon;
    },

    getInfo: function () {
        return this.info;
    },
    setInfo: function (info, backColor) {
        if (backColor != null)
            this.backColor = backColor;
        this.info = info;
    },

    getShadowIcon: function () {
        return this.shadowIcon;
    },
    setShadowIcon: function (sIcon) {
        this.shadowIcon = sIcon;
    },

    setToMap: function (mapDiv, model, overLayDiv, fn) {
        this.mapDiv = mapDiv;
        this.model = model;
        this.sPoint = Util.getScreenPixel(this.coord, model.getZoom());
        var infoDiv = null;
        var inforDeltaX = 0, inforDeltaY = 0;
        var deltaX = this.sPoint.x;
        var deltaY = this.sPoint.y;
        var markerDiv = Util.createDiv(this.id, deltaX, deltaY, this.icon.width, this.icon.height, null, 'absolute');
        markerDiv.style.zIndex = 10;
        markerDiv.style.cursor = 'pointer';
        markerDiv.style.background = "url(" + this.icon.src + ")";

        if (this.info) {
            inforDeltaX = this.sPoint.x + (this.icon.width + this.offsetLeft);
            inforDeltaY = this.sPoint.y - (this.icon.height - this.offsetTop);
            infoDiv = Util.createDiv(this.infoDivId, inforDeltaX, inforDeltaY, null, 0, null, 'absolute');
        }
        //缩放地图时，重绘地图上图标。
        if (overLayDiv) {
            this.infoDiv = overLayDiv;
            if (overLayDiv.id.indexOf(this.prefixId + '_Info') == -1) {
                overLayDiv.style.left = deltaX + 'px';
                overLayDiv.style.top = deltaY + 'px';
            }
            else {
                overLayDiv.style.left = inforDeltaX + 'px';
                overLayDiv.style.top = inforDeltaY + 'px';
            }
        }
        else {
            this.div = markerDiv;
            this.insert();
            this.div.style.cursor = "hand";
            if (this.info)
                this.showInfoWindow(infoDiv);
        }
        //Ext.get(markerDiv).removeAllListeners();
        if (fn!=null)
            Ext.get(markerDiv).on('click', fn);
    },

    reLoadInfo: function (e) {
        var mapDiv = Ext.get("map_" + this.model.getId());
        move("map_" + this.model.getId(), 20, 20, 400, 0);
        if (this.info && this.infoDiv) {
            this.infoDiv.style.display = "none";
        }
    },

    showInfoWindow: function (infoDiv) {
        //var mapDiv = Ext.get("map_" + this.model.getId());
        infoDiv.style.zIndex = 8;
        infoDiv.style.cursor = "default";
        infoDiv.style.display = "block";
        infoDiv.style.backgroundColor = this.backColor;
        this.infoDiv = infoDiv;
        this.insert();
        Ext.get(this.infoDivId).dom.innerHTML = this.info;
    }
});

Ext.Cat.AjaxMap.Icon = function (w, h, src) {
    this.width = w;
    this.height = h;
    this.src = src;
};

function hideInfoWindown(e, windowId) {
    var infoWindow = $(windowId);
    infoWindow.style.display = "none";
    Event.stop(e)
}








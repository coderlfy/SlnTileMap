Ext.Cat.AjaxMap.Marker = function () {
    this.id = Util.createUniqueID("Over_Marker_");
    this.infoDivId = Util.createUniqueID("Over_Marker_Info");
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
    setInfo: function (info) {
        this.info = info;
    },

    getShadowIcon: function () {
        return this.shadowIcon;
    },
    setShadowIcon: function (sIcon) {
        this.shadowIcon = sIcon;
    },

    setToMap: function (mapDiv, model, overLayDiv) {
        this.mapDiv = mapDiv;
        this.model = model;
        this.sPoint = Util.getScreenPixel(this.coord, model.getZoom());

        var deltaX = this.sPoint.x;
        var deltaY = this.sPoint.y;
        var inforDeltaX = this.sPoint.x + this.icon.width;
        var inforDeltaY = this.sPoint.y - this.icon.height;

        var markerDiv = Util.createDiv(this.id, deltaX, deltaY, this.icon.width, this.icon.height, null, 'absolute');
        var infoDiv = Util.createDiv(this.infoDivId, inforDeltaX, inforDeltaY, null, 20, null, 'absolute');

        markerDiv.style.zIndex = 10;
        markerDiv.style.cursor = 'pointer';
        markerDiv.style.background = "url(" + this.icon.src + ")";

        if (overLayDiv) {
            this.div = overLayDiv;
            if(overLayDiv.id.indexOf("Over_Marker_Info") == -1){
                overLayDiv.style.left = deltaX + 'px';
                overLayDiv.style.top = deltaY + 'px';
            }
            else{
                overLayDiv.style.left = inforDeltaX + 'px';
                overLayDiv.style.top = inforDeltaY + 'px';
            }
        }
        else {
            this.div = markerDiv;
            this.insert();
            this.div.style.cursor = "hand";
            this.showInfoWindow(infoDiv);
        }

        Ext.get(markerDiv).removeAllListeners();
        Ext.get(markerDiv).on('click', this.reLoadInfo, this);
    },

    reLoadInfo: function (e) {
        if (this.info && this.infoDiv) {
            this.infoDiv.style.display = "";
        }
    },

    showInfoWindow: function (infoDiv) {
        var mapDiv = Ext.get("map_" + this.model.getId());
        infoDiv.style.zIndex = 8;
        infoDiv.style.cursor = "default";
        infoDiv.style.display = "block";
        infoDiv.style.backgroundColor = "#a0a0a0";
        this.div = infoDiv;
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








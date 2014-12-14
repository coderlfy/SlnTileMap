
Ext.Cat.AjaxMap.MapControl = function (id, container) {
    var backgroundsize = container.getSize();
    this.id = id;
    this.mapDiv = Util.createDiv(id);
    this.mapDiv.style.position = "absolute";
    this.mapDiv.style.zIndex = 0;
    this.mapDiv.style.cursor = "move";
    this.container = container;
    this.container.dom.style.border = "1px solid #99bbe8";
    this.container.dom.style.overflow = "hidden";
    this.container.dom.style.position = "relative";
    this.container.setSize(backgroundsize.width, backgroundsize.height);
    this.container.appendChild(this.mapDiv);
}
Ext.extend(Ext.Cat.AjaxMap.MapControl, Ext.Cat.AjaxMap.AbstractControl, {
    paint: function (model, isTracing) {
        var curZoom = model.getZoom();
        var viewBound = curZoom.getViewBound(this.container.dom).clone(model.getViewCenterCoord());
        var mapBound = curZoom.realMapBound;
        var deltaX = (mapBound.getMinX() - viewBound.getMinX()) * (curZoom.getTileCols() * Ext.Cat.MapConfig.TileSize / mapBound.getWidth());
        var deltaY = (viewBound.getMaxY() - mapBound.getMaxY()) * (curZoom.getTileRows() * Ext.Cat.MapConfig.TileSize / mapBound.getHeight());
        this.mapDiv.style.left = deltaX + "px";
        this.mapDiv.style.top = deltaY + "px";
        this.mapDiv.style.width = (curZoom.getTileCols() * Ext.Cat.MapConfig.TileSize) + "px";
        this.mapDiv.style.height = (curZoom.getTileRows() * Ext.Cat.MapConfig.TileSize) + "px";

        this.loadTiles(model, this.container.dom, this.mapDiv, isTracing);

    }
});
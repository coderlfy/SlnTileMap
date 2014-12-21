/*
Ext.Cat.AjaxMap.Zoom = function (level) {
    this.level = level;
    this.tileCols = Ext.Cat.MapConfig.FirstZoomTileCols * Math.pow(2, (this.level - 1));
    this.tileRows = Ext.Cat.MapConfig.FirstZoomTileRows * Math.pow(2, (this.level - 1));
    this.tileNum = this.tileCols * this.tileRows;
    this.scale = Ext.Cat.MapConfig.FullWidth / (this.tileCols * Ext.Cat.MapConfig.TileSize * 2.54 / 100 / 96);
    this.realMapBound = Ext.Cat.MapConfig.FullExtent;
}
Ext.Cat.AjaxMap.Zoom.prototype = {
    getViewBound: function (container) {
        var width = container.clientWidth;
        var height = container.clientHeight;

        this.viewBound = this.realMapBound.getCenterCoord().getBound(width * this.realMapBound.getWidth() / (this.tileCols * Ext.Cat.MapConfig.TileSize), height * this.realMapBound.getHeight() / (this.tileRows * Ext.Cat.MapConfig.TileSize));
        return this.viewBound;
    },

    getLevel: function () {
        return this.level;
    },

    getTileCols: function () {
        return this.tileCols;
    },

    getTileRows: function () {
        return this.tileRows;
    },

    getScale: function () {
        return this.scale;
    },

    getTiles: function (model, container) {
        var coord = model.getViewCenterCoord();
        var viewBound = this.getViewBound(container);

        if (viewBound.getCenterCoord() != coord) {
            viewBound = viewBound.clone(coord);
        }
        if (!this.realMapBound.isCover(viewBound)) {
            return null;
        }
        else {
            var tiles = new Array();
            var rowFrom = Math.floor((this.realMapBound.getMaxY() - viewBound.getMaxY()) / (this.realMapBound.getHeight() / this.tileRows));
            rowFrom = rowFrom < 0 ? 0 : rowFrom;

            var rowTo = Math.floor((viewBound.getMinY() - this.realMapBound.getMinY()) / (this.realMapBound.getHeight() / this.tileRows));
            rowTo = rowTo < 0 ? this.tileRows : (this.tileRows - rowTo);

            var colFrom = Math.floor((viewBound.getMinX() - this.realMapBound.getMinX()) / (this.realMapBound.getWidth() / this.tileCols));
            colFrom = colFrom < 0 ? 0 : colFrom;

            var colTo = Math.floor((this.realMapBound.getMaxX() - viewBound.getMaxX()) / (this.realMapBound.getWidth() / this.tileCols));
            colTo = colTo < 0 ? this.tileCols : (this.tileCols - colTo);


            var delta = 1;
            rowFrom = rowFrom - delta < 0 ? 0 : rowFrom - delta;
            rowTo = rowTo + delta > this.tileRows ? this.tileRows : rowTo + delta;
            colFrom = colFrom - delta < 0 ? 0 : colFrom - delta;
            colTo = colTo + delta > this.tileCols ? this.tileCols : colTo + delta;

            for (var i = rowFrom; i < rowTo; i++) {
                for (var j = colFrom; j < colTo; j++) {
                    var tile = new Ext.Cat.AjaxMap.Tile(i, j, this.level, model);
                    tiles.push(tile);
                }
            }
            return tiles;
        }
    }
}
*/
Ext.define('iCatMap.Zoom', {
    level: 2,
    tileCols: 4,
    tileRows: 2,
    tileNum: null,
    scale:null,
    realMapBound: null,

    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }

        me.tileCols = iCatMap.MapConfig.FirstZoomTileCols * Math.pow(2, (this.level - 1));
        me.tileRows = iCatMap.MapConfig.FirstZoomTileRows * Math.pow(2, (this.level - 1));
        me.tileNum = me.tileCols * me.tileRows;
        me.scale = iCatMap.MapConfig.FullWidth / (me.tileCols * iCatMap.MapConfig.TileSize * 2.54 / 100 / 96);
        me.realMapBound = iCatMap.MapConfig.FullExtent;
    },
    getViewBound: function (container) {
        var width = container.clientWidth;
        var height = container.clientHeight;

        this.viewBound = this.realMapBound.getCenterCoord().getBound(
            width * this.realMapBound.getWidth() / (this.tileCols * iCatMap.MapConfig.TileSize),
            height * this.realMapBound.getHeight() / (this.tileRows * iCatMap.MapConfig.TileSize));

        return this.viewBound;
    },

    getLevel: function () {
        return this.level;
    },

    getTileCols: function () {
        return this.tileCols;
    },

    getTileRows: function () {
        return this.tileRows;
    },

    getScale: function () {
        return this.scale;
    },

    getTiles: function (model, container) {
        var coord = model.getViewCenterCoord();
        var viewBound = this.getViewBound(container);

        if (viewBound.getCenterCoord() != coord) {
            viewBound = viewBound.clone(coord);
        }
        if (!this.realMapBound.isCover(viewBound)) {
            return null;
        }
        else {
            var tiles = new Array();
            var rowFrom = Math.floor((this.realMapBound.getMaxY() - viewBound.getMaxY()) / (this.realMapBound.getHeight() / this.tileRows));
            rowFrom = rowFrom < 0 ? 0 : rowFrom;

            var rowTo = Math.floor((viewBound.getMinY() - this.realMapBound.getMinY()) / (this.realMapBound.getHeight() / this.tileRows));
            rowTo = rowTo < 0 ? this.tileRows : (this.tileRows - rowTo);

            var colFrom = Math.floor((viewBound.getMinX() - this.realMapBound.getMinX()) / (this.realMapBound.getWidth() / this.tileCols));
            colFrom = colFrom < 0 ? 0 : colFrom;

            var colTo = Math.floor((this.realMapBound.getMaxX() - viewBound.getMaxX()) / (this.realMapBound.getWidth() / this.tileCols));
            colTo = colTo < 0 ? this.tileCols : (this.tileCols - colTo);


            var delta = 1;
            rowFrom = rowFrom - delta < 0 ? 0 : rowFrom - delta;
            rowTo = rowTo + delta > this.tileRows ? this.tileRows : rowTo + delta;
            colFrom = colFrom - delta < 0 ? 0 : colFrom - delta;
            colTo = colTo + delta > this.tileCols ? this.tileCols : colTo + delta;

            for (var i = rowFrom; i < rowTo; i++) {
                for (var j = colFrom; j < colTo; j++) {
                    var tile = Ext.create('iCatMap.Tile', {
                        row: i,
                        column: j,
                        level: this.level,
                        model: model
                    });
                    tiles.push(tile);
                }
            }
            return tiles;
        }
    }
});


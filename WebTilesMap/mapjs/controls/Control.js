﻿//Abstract Control class
/*
Ext.Cat.AjaxMap.AbstractControl = function () { }
Ext.Cat.AjaxMap.AbstractControl.prototype = {
    initialize: function () {
    },

    paint: function () {

    },

    loadTiles: function (model, container, mapDiv, isTracing) {
        var curZoom = model.getZoom();

        var tiles = curZoom.getTiles(model, container);

        var oldTiles = new Array();
        var tileDivs = mapDiv.childNodes;
        if (mapDiv.id.indexOf('Ov_') == -1) {
            var scale = curZoom.getScale() * 1.5 / 100;
            if (scale < 1000) {
                scale = parseInt(scale) + " 米";
            }
            else {
                scale = parseInt(scale / 1000 * 100) / 100 + " 公里";
            }

            //$('scaleInfo').innerHTML = scale;
        }

        if (isTracing) {
            model.traces[model.traceIndex] = { coord: model.getViewCenterCoord(), level: curZoom.getLevel() };
            model.traceIndex += 1;
            model.curIndex = model.traceIndex - 1;
        }

        var n = 0;
        if (tileDivs) {
            for (var i = 0; i < tileDivs.length; i++) {
                oldTiles.push(tileDivs[i]);
            }
        }
        if (tiles) {
            for (var i = 0; i < tiles.length; i++) {
                var tileId = "map_" + model.getId() + "_zoom_" + model.getZoom().getLevel() + "_tile_" + tiles[i].getRow() + "_" + tiles[i].getColumn();
                var isExist = false;
                for (var j = 0; j < oldTiles.length; j++) {
                    if (oldTiles[j] != null && oldTiles[j].getAttribute("id") == tileId) {
                        isExist = true;
                        oldTiles[j] = null;
                        break;
                    }
                }

                if (!isExist) {
                    var deltaX = tiles[i].getColumn() * Ext.Cat.MapConfig.TileSize;
                    var deltaY = tiles[i].getRow() * Ext.Cat.MapConfig.TileSize;
                    var tile = document.createElement("div");
                    tile.id = tileId;
                    tile.style.position = "absolute";
                    tile.style.left = deltaX + "px";
                    tile.style.top = deltaY + "px";
                    tile.onmousedown = null;
                    mapDiv.appendChild(tile);
                    var tileImage = document.createElement("img");
                    tileImage.src = tiles[i].getSrc();
                    tileImage.galleryImg = 'no';
                    tileImage.onmousedown = null;
                    tile.appendChild(tileImage);
                    n++;
                }
            }
        }
        for (var i = 0; i < oldTiles.length; i++) {
            if (oldTiles[i] != null && oldTiles[i].getAttribute("id").indexOf("Over_") > -1) {
                if (tiles.length == n)
                    this.resetOverlay(mapDiv, model, oldTiles[i]);
                continue;
            }
            ///*在放大缩小时考虑变更大小？？
            if (oldTiles[i] != null && oldTiles[i].getAttribute("id").indexOf("tracker_") > -1) {
                continue;
            }
            if (oldTiles[i] != null) {
                mapDiv.removeChild(oldTiles[i]);
            }
        }
        oldTiles = null;
        tiles = null;
        tileDivs = null;
    },


    resetOverlay: function (mapDiv, model, div) {
        if (div) {
            for (var i = 0; i < model.overlays.length; i++) {
                if (model.overlays[i].id == div.id || model.overlays[i].infoDivId == div.id) {
                    model.overlays[i].setToMap(mapDiv, model, div);
                    break;
                }

            }
        }
    }

};
*/
Ext.define('iCatMap.AbstractControl', {
    loadTiles: function (model, container, mapDiv, isTracing) {
        var curZoom = model.getZoom();

        var tiles = curZoom.getTiles(model, container);

        var oldTiles = new Array();
        var tileDivs = mapDiv.childNodes;
        if (mapDiv.id.indexOf('Ov_') == -1) {
            var scale = curZoom.getScale() * 1.5 / 100;
            if (scale < 1000) {
                scale = parseInt(scale) + " 米";
            }
            else {
                scale = parseInt(scale / 1000 * 100) / 100 + " 公里";
            }

            //$('scaleInfo').innerHTML = scale;
        }

        if (isTracing) {
            model.traces[model.traceIndex] = { coord: model.getViewCenterCoord(), level: curZoom.getLevel() };
            model.traceIndex += 1;
            model.curIndex = model.traceIndex - 1;
        }

        var n = 0;
        if (tileDivs) {
            for (var i = 0; i < tileDivs.length; i++) {
                oldTiles.push(tileDivs[i]);
            }
        }
        if (tiles) {
            for (var i = 0; i < tiles.length; i++) {
                var tileId = Ext.String.format('map_{0}_zoom_{1}_tile_{2}_{3}',
                    model.getId(), model.getZoom().getLevel(),
                    tiles[i].getRow(), tiles[i].getColumn());

                var isExist = false;
                for (var j = 0; j < oldTiles.length; j++) {
                    if (oldTiles[j] != null && oldTiles[j].getAttribute("id") == tileId) {
                        isExist = true;
                        oldTiles[j] = null;
                        break;
                    }
                }

                if (!isExist) { 
                    var deltaX = tiles[i].getColumn() * iCatMap.MapConfig.TileSize;
                    var deltaY = tiles[i].getRow() * iCatMap.MapConfig.TileSize;
                    var tile = document.createElement("div");
                    tile.id = tileId;
                    tile.style.position = "absolute";
                    tile.style.left = deltaX + "px";
                    tile.style.top = deltaY + "px";
                    tile.onmousedown = null;
                    mapDiv.appendChild(tile);
                    var tileImage = document.createElement("img");
                    tileImage.src = tiles[i].getSrc();
                    tileImage.galleryImg = 'no';
                    tileImage.onmousedown = null;
                    tile.appendChild(tileImage);
                    n++;
                }
            }
        }
        for (var i = 0; i < oldTiles.length; i++) {
            if (oldTiles[i] != null && oldTiles[i].getAttribute("id").indexOf("Over_") > -1) {
                if (tiles.length == n)
                    this.resetOverlay(mapDiv, model, oldTiles[i]);
                continue;
            }
            /*在放大缩小时考虑变更大小？？*/
            if (oldTiles[i] != null && oldTiles[i].getAttribute("id").indexOf("tracker_") > -1) {
                continue;
            }
            if (oldTiles[i] != null) {
                mapDiv.removeChild(oldTiles[i]);
            }
        }
        oldTiles = null;
        tiles = null;
        tileDivs = null;
    },
    resetOverlay: function (mapDiv, model, div) {
        if (div) {
            for (var i = 0; i < model.overlays.length; i++) {
                if (model.overlays[i].id == div.id || model.overlays[i].infoDivId == div.id) {
                    model.overlays[i].setToMap(mapDiv, model, div);
                    break;
                }

            }
        }
    }
});
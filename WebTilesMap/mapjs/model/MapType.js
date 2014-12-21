//Map Data source(abstract classs)
/*
Ext.Cat.AjaxMap.MapType = function (config) {
    this.enableImg = Ext.Cat.MapConfig.ImageBaseDir + config.enImg;
    this.disableImg = Ext.Cat.MapConfig.ImageBaseDir + config.disImg;
    this.typeId = 'mapType_' + Util.createUniqueID();
    this.dirSrc = config.dirSrc;
    this.firstRows = config.firstRows;
    this.firstCols = config.firstCols;
}
Ext.Cat.AjaxMap.MapType.prototype = {
    getSrc: function (level, row, column) {
        var src = this.dirSrc + 'zoom_' + level + '/0/' + level + '_' + row + '_' + column + '.jpg';
        return src;
    },

    paint: function (model, container) {
        this.model = model;
        this.container = container;
        var ids = new Array();
        var html = '';
        for (var i = 0; i < model.mapTypeIds.length; i++) {
            var mapType = model.mapTypes[model.mapTypeIds[i]];
            if (model.currentMapType.typeId == mapType.typeId) {
                //html += '<img src="' + mapType.enableImg + '" style="cursor:pointer;"> ';//取消显示地图类型
            }
            else {
                html += '<img id="Img_' + mapType.typeId + '" src="' + mapType.disableImg + '" style="cursor:pointer;"> ';
                ids.push("Img_" + mapType.typeId);
            }
        }
        if (this.model.typeBarId) {
            this.typeBarDiv = $(this.model.typeBarId);
        }
        else {
            var left = 20; //Util.getValueOfNoPX(container.style.left) + 20;
            var top = 20; //Util.getValueOfNoPX(container.style.top) + 20;
            this.model.typeBarId = Util.createUniqueID("typeBar_");
            this.typeBarDiv = Util.createDiv(this.model.typeBarId, left, top, null, null, null, 'absolute');
        }
        this.typeBarDiv.innerHTML = html;
        container.appendChild(this.typeBarDiv);
        for (var i = 0; i < ids.length; i++) {
            this.curId = ids[i];
            //Event.observe($(ids[i]), 'click', this.mapTypeSwitch.bindAsEventListener(this));
        }

    },

    mapTypeSwitch: function (e) {
        var id = this.curId.substring(4, this.curId.length);
        mapType = this.model.mapTypes[id];
        this.model.setCurrentMapType(mapType);
        this.ClearOrgMapType(this.container.childNodes[0])
        this.model.controls[this.container.childNodes[0].id].paint(this.model, true);
        this.model.controls[this.model.ovId].paint(this.model);
        mapType.paint(this.model, this.container);
    },

    ClearOrgMapType: function (container) {
        var mapDiv = container;
        var tileNodes = mapDiv.childNodes;
        if (tileNodes) {
            for (var i = 0; i < tileNodes.length; i++) {
                mapDiv.removeChild(tileNodes[i]);
                i--;
            }
        }
    }
};
*/
/*
Ext.Cat.AjaxMap.SZMapType = function (config) {
    Ext.Cat.AjaxMap.SZMapType.superclass.constructor.call(this,config);
}

Ext.extend(Ext.Cat.AjaxMap.SZMapType, Ext.Cat.AjaxMap.MapType, {
    constructor: function (dirSrc, enImg, disImg, firstRows, firstCols) {
        this.enableImg = ImageBaseDir + enImg;
        this.disableImg = ImageBaseDir + disImg;
        this.typeId = 'mapType_' + Util.createUniqueID();
        this.dirSrc = dirSrc;
        this.firstRows = firstRows;
        this.firstCols = firstCols;

        this.superclass().constructor();
    },
    getSrc: function (level, row, column) {
        var src = this.dirSrc + 'zoom_' + level + '/0/' + level + '_' + row + '_' + column + '.jpg';
        return src;
    }
});
*/
Ext.define('iCatMap.MapType', {
    enableImg: null,
    disableImg: null,
    typeId: null,
    dirSrc: '',
    firstRows: 0,
    firstCols: 0,
    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }

        me.enableImg = iCatMap.MapConfig.ImageBaseDir + config.enImg;
        me.disableImg = iCatMap.MapConfig.ImageBaseDir + config.disImg;
        me.typeId = 'mapType_' + iCatMap.Util.createUniqueID();
    },
    getSrc: function (level, row, column) {
        return Ext.String.format('{0}zoom_{1}/0/{1}_{2}_{3}.jpg', this.dirSrc, level, row, column);
    },

    paint: function (model, container) {
        this.model = model;
        this.container = container;
        var ids = new Array();
        var html = '';
        for (var i = 0; i < model.mapTypeIds.length; i++) {
            var mapType = model.mapTypes[model.mapTypeIds[i]];
            if (model.currentMapType.typeId == mapType.typeId) {
                //html += '<img src="' + mapType.enableImg + '" style="cursor:pointer;"> ';//取消显示地图类型
            }
            else {
                html += Ext.String.format('<img id="Img_{0}" src="{1}" style="cursor:pointer;">',
                    mapType.typeId, mapType.disableImg);

                //html += '<img id="Img_' + mapType.typeId + '" src="' + mapType.disableImg + '" style="cursor:pointer;"> ';
                ids.push("Img_" + mapType.typeId);
            }
        }
        if (this.model.typeBarId) {
            this.typeBarDiv = $(this.model.typeBarId);
        }
        else {
            var left = 20; //Util.getValueOfNoPX(container.style.left) + 20;
            var top = 20; //Util.getValueOfNoPX(container.style.top) + 20;
            this.model.typeBarId = iCatMap.Util.createUniqueID("typeBar_");
            this.typeBarDiv = iCatMap.Util.createDiv(this.model.typeBarId, left, top, null, null, null, 'absolute');
        }
        this.typeBarDiv.innerHTML = html;
        container.appendChild(this.typeBarDiv);
        for (var i = 0; i < ids.length; i++) {
            this.curId = ids[i];
            //Event.observe($(ids[i]), 'click', this.mapTypeSwitch.bindAsEventListener(this));
        }

    },

    mapTypeSwitch: function (e) {
        var id = this.curId.substring(4, this.curId.length);
        mapType = this.model.mapTypes[id];
        this.model.setCurrentMapType(mapType);
        this.ClearOrgMapType(this.container.childNodes[0])
        this.model.controls[this.container.childNodes[0].id].paint(this.model, true);
        this.model.controls[this.model.ovId].paint(this.model);
        mapType.paint(this.model, this.container);
    },

    ClearOrgMapType: function (container) {
        var mapDiv = container;
        var tileNodes = mapDiv.childNodes;
        if (tileNodes) {
            for (var i = 0; i < tileNodes.length; i++) {
                mapDiv.removeChild(tileNodes[i]);
                i--;
            }
        }
    }
});
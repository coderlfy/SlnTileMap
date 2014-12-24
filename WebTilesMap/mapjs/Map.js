/// <reference path="../extjs/ext-base.js" />
/// <reference path="../extjs/ext-all.js" />
/// <reference path="Util.js" />
//Ext.Cat = Ext.Cat || {};
//Ext.Cat.AjaxMap = Ext.Cat.AjaxMap || {};
//Ext.Cat.MapConfig = Ext.Cat.MapConfig || {};
/*
Ext.Cat.AjaxMap.Map = function (panel, mWidth, mHeight) {
    this.container = panel;
    this.mapId = Util.createUniqueID();
    this.containerWidth = this.container.body.dom.clientWidth;
    this.containerHeight = this.container.body.dom.clientHeight;

    this.model = new Ext.Cat.AjaxMap.MapModel(this.mapId);

    this.mapControl = new Ext.Cat.AjaxMap.MapControl("map_" + this.mapId, this.container.body);
    this.model.controls[this.mapControl.id] = this.mapControl;
    //this.container.body.dom.style.width = mWidth;
    //this.container.body.dom.style.height = mHeight;
    var scale = new Ext.Cat.AjaxMap.ScaleControl(this.container);
    this.model.controls[scale.id] = scale;


}
Ext.Cat.AjaxMap.Map.prototype = {
    setCenter: function (centerPoint, level) {
        this.model.defaultCenterPoint = centerPoint;
        this.model.defaultLevel = level;
        this.model.setViewCenterCoord(centerPoint.getCoord());
        this.model.setZoom(new Ext.Cat.AjaxMap.Zoom(level));
        this.mapControl.paint(this.model, true);
        this.level = level;
        //鼠标滚轮事件
        //Event.observe(this.mapControl.mapDiv, "mousewheel", this.map_mousewheel.bindAsEventListener(this));
    },
    addMapType: function (type, isCurrent) {
        if (isCurrent) {
            this.model.setCurrentMapType(type);
        }

        this.model.mapTypeIds.push(type.typeId)
        this.model.mapTypes[type.typeId] = type;
        type.paint(this.model, this.container.body);
        Ext.Cat.MapConfig.FirstZoomTileRows = type.firstRows;
        Ext.Cat.MapConfig.FirstZoomTileCols = type.firstCols;

    },
    addToolBar: function (toolbar) {
        toolbar.setMapModel(this.model);
        toolbar.registerEventToMap(this.mapControl.mapDiv);
    },
    addControl: function(control){
        control.paint(this.model)
        this.model.controls[control.id] = control;
    }
}
*/
Ext.define('iCatMap.Map', {
    container: null,
    mapId: 0,
    containerWidth: 0,
    containerHeight: 0,
    model: null,
    mapControl: null,

    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }

        //this.container = panel;
        me.mapId = iCatMap.Util.createUniqueID();
        me.containerWidth = me.container.body.dom.clientWidth;
        me.containerHeight = me.container.body.dom.clientHeight;
        me.model = Ext.create('iCatMap.MapModel', { modelId: me.mapId });
        //this.container.body.dom.style.width = config.mWidth;
        //this.container.body.dom.style.height = config.mHeight;
        me.mapControl = Ext.create('iCatMap.MapControl', {
            id: 'map_' + me.mapId,
            container: me.container.body
        });
        me.model.controls[me.mapControl.id] = me.mapControl;

        //var scale = new Ext.Cat.AjaxMap.ScaleControl(this.container);
        //this.model.controls[scale.id] = scale;
    },
    setCenter: function (centerPoint, level) {
        this.model.defaultCenterPoint = centerPoint;
        this.model.defaultLevel = level;
        this.model.setViewCenterCoord(centerPoint.getCoord());
        this.model.setZoom(Ext.create('iCatMap.Zoom', {
            level: level
        }));
        this.mapControl.paint(this.model, true);
        this.level = level;
        //鼠标滚轮事件
        //Event.observe(this.mapControl.mapDiv, "mousewheel", this.map_mousewheel.bindAsEventListener(this));
    },
    addMapType: function (type, isCurrent) {
        if (isCurrent) {
            this.model.setCurrentMapType(type);
        }

        this.model.mapTypeIds.push(type.typeId)
        this.model.mapTypes[type.typeId] = type;
        type.paint(this.model, this.container.body);
        iCatMap.MapConfig.FirstZoomTileRows = type.firstRows;
        iCatMap.MapConfig.FirstZoomTileCols = type.firstCols;

    },
    addToolBar: function (toolbar) {
        toolbar.setMapModel(this.model);
        toolbar.registerEventToMap(this.mapControl.mapDiv);
    },
    addControl: function (control) {
        control.paint(this.model)
        this.model.controls[control.id] = control;
    }
});

/*
Map = Class.create();
Map.prototype = {
    
    mapTypes: new Object(),
    currentMapType:null,
    
    initialize: function(container){
        this.container = container;
        this.container.style.backgroundImage = 'url(' + ImageBaseDir + 'iaspec_bottom.png)';
        this.mapId = Util.createUniqueID();
        this.containerWidth=Util.getValueOfNoPX(this.container.style.width);
        this.containerHeight=Util.getValueOfNoPX(this.container.style.height);
        this.model = new MapModel(this.mapId);
        this.mapControl = new MapControl("map_" + this.mapId, this.container);        
        this.model.controls[this.mapControl.id] = this.mapControl;
        var scale = new ScaleControl(container);
        this.model.controls[scale.id] = scale;

    },
    
    getContainer: function(){
        return this.container;
    },
    
    setCenter: function(centerPoint, level){
        this.model.defaultCenterPoint = centerPoint;
        this.model.defaultLevel = level;
        this.model.setViewCenterCoord(centerPoint.getCoord());
        this.model.setZoom(new Zoom(level));
        this.mapControl.paint(this.model, true);
        this.level = level;
        //鼠标滚轮事件
        //Event.observe(this.mapControl.mapDiv, "mousewheel", this.map_mousewheel.bindAsEventListener(this));
    },
    
    map_mousewheel: function(e){
        
        var level = this.model.getZoom().getLevel();
        if(window.event.wheelDelta == 120 && level < Ext.Cat.MapConfig.MaxZoomLevel)
        {
            level += 1
	        this.model.setZoom(new Zoom(level));
	        this.mapControl.paint(this.model, true);
        }
        else if(window.event.wheelDelta==-120 && level>1)
        {
            level -= 1
	        this.model.setZoom(new Zoom(level));
	        this.mapControl.paint(this.model, true);
        }
        $('sliderbar_'+this.model.getId()).parentNode.style.top = ((Ext.Cat.MapConfig.MaxZoomLevel-level)*12+6)+"px"
    },    
    
    addMapType: function(type, isCurrent){
        if(isCurrent){
            this.model.setCurrentMapType(type);
        }
        
        this.model.mapTypeIds.push(type.typeId)
        this.model.mapTypes[type.typeId] = type;
        type.paint(this.model, $('map'));
    },
    
    addOverLayer: function(layer){
        
    },
    
    addControl: function(control){
        control.paint(this.model)
        this.model.controls[control.id] = control;
    },
    
};

*/
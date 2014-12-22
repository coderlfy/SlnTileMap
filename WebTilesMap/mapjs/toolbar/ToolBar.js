/*
Ext.Cat.AjaxMap.ToolBar = function (container) {
    this.container = container;
    //this.bar = Util.createDiv(Util.createUniqueID('Tool_'));
    this.tbar = container.tbar;
    this.canvaspainter = null;
    //this.container.appendChild(this.bar);
    this.tools = new Object();
    this.currentTool = null;
}
Ext.Cat.AjaxMap.ToolBar.prototype = {

    EVENT_TYPES: ["mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "dblclick", "click"],

    addTool: function (mapTbar, tool, isDefault) {
        if (!tool)
            return;
        this.tools[tool.id] = tool;

        if (isDefault) {
            this.defaultTool = tool;
            this.currentTool = tool;
        }
        mapTbar.addButton({ text: tool.text, id: tool.id,iconCls:tool.iconCls, handler: tool.barClickHandler, scope: this });
    },

    addCommand: function (cmd) {
        if (!cmd)
            return;
        this.tools[cmd.id] = cmd;
        this.bar.appendChild(cmd.div);
        //注册工具栏按钮事件；
        //Event.observe(cmd.div, "mouseout", cmd.cmdMouseOutHandler.bindAsEventListener(this));
        //Event.observe(cmd.div, "mouseover", cmd.cmdMouseOverHandler.bindAsEventListener(this));
        //Event.observe(cmd.div, "click", cmd.cmdClickHandler.bindAsEventListener(this));
    },

    setMapModel: function (model) {
        this.model = model;
    },

    clearCurrentToolStatus: function () {
        ///--------------
        var toolDivs = this.bar.childNodes;
        for (var i = 0; i < toolDivs.length; i++) {
        var tool = this.tools[toolDivs[i].id]
        if (tool.selected == true) {
        tool.selected = false;
        toolDivs[i].childNodes[0].src = tool.img_normal;
        }
        }
        --------//
        //        this.currentTool.div.childNodes[0].src = this.currentTool.img_normal;
        //        this.currentTool.selected = false;

    },

    registerEventToMap: function (mapDiv) {
        this.mapDiv = mapDiv;
        Ext.get(this.mapDiv).on('mousedown', this.mapMouseDownHandler, this);
        Ext.get(this.mapDiv).on('mousemove', this.mapMouseMoveHandler, this);
        Ext.get(this.mapDiv).on('mouseup', this.mapMouseUpHandler, this);
        Ext.get(this.mapDiv).on('dblclick', this.mapDblclickHandler, this);
        Ext.get(this.mapDiv).on('click', this.mapClickHandler, this);
    },

    mapMouseDownHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].mouseDownHandler(e, this);
    },
    mapMouseMoveHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].mouseMoveHandler(e, this);
    },
    mapMouseUpHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].mouseUpHandler(e, this);
    },

    mapClickHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].clickHandler(e, this);
    },

    mapDblclickHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].dblClickHandler(e, this);
    }

}
*/
iCatMap.MapTbarConfig = {
    CreateMarkBasestation: function (tbar, mapPanel, baseStationStore) {
        var toolbar = Ext.create('iCatMap.ToolBar', { container: mapPanel });
        var panTool = Ext.create('iCatMap.PanTool', {
            id: 'pan',
            text: '移动',
            iconCls: 'icon-move'
        });
        /*
        var zoomInTool = new Ext.Cat.AjaxMap.ZoominTool({
            id: 'zoomin',
            text: '局部放大',
            iconCls: 'icon-zoomin'
        });
        var zoonOutTool = new Ext.Cat.AjaxMap.ZoomoutTool({
            id: 'zoomout',
            text: '局部缩小',
            iconCls: 'icon-zoomout'
        });
        var baseStationImg = '../../../maps/base/marker_small.png';
        var markbasestationTool = new Ext.Cat.AjaxMap.MarkerTool({
            id: 'markbasestationTool',
            baseStationstore: baseStationStore,
            text: '标定基站',
            iconCls: 'icon-markstation',
            cursorImg: baseStationImg,
            alt: '标定基站',
            markType: 'basestation'
        });
        markbasestationTool.cursorStyle = 'url(' + baseStationImg + '),pointer';
        markbasestationTool.alt = '标定基站';
        */
        //console.log(mapPanel);
        toolbar.addTool(tbar, panTool, true);
        /*
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoomInTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoonOutTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, markbasestationTool);
        mapTbar.addSeparator();
        */
        return toolbar;
    }/*,

    CreateBasestationStatus: function (mapTbar, mapPanel, baseStationStore) {
        var toolbar = new Ext.Cat.AjaxMap.ToolBar(mapPanel);
        var panTool = new Ext.Cat.AjaxMap.PanTool({
            id: 'pan',
            text: '移动',
            iconCls: 'icon-move'
        });
        var zoomInTool = new Ext.Cat.AjaxMap.ZoominTool({
            id: 'zoomin',
            text: '局部放大',
            iconCls: 'icon-zoomin'
        });
        var zoonOutTool = new Ext.Cat.AjaxMap.ZoomoutTool({
            id: 'zoomout',
            text: '局部缩小',
            iconCls: 'icon-zoomout'
        });

        toolbar.addTool(mapTbar, panTool, true);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoomInTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoonOutTool);
        mapTbar.addSeparator();
        return toolbar;
    },
    CreateMonitorSys: function (mapTbar, mapPanel, baseStationStore, SensorStore) {
        var toolbar = new Ext.Cat.AjaxMap.ToolBar(mapPanel);
        var panTool = new Ext.Cat.AjaxMap.PanTool({
            id: 'pan',
            text: '移动',
            iconCls: 'icon-move'
        });
        var zoomInTool = new Ext.Cat.AjaxMap.ZoominTool({
            id: 'zoomin',
            text: '局部放大',
            iconCls: 'icon-zoomin'
        });
        var zoonOutTool = new Ext.Cat.AjaxMap.ZoomoutTool({
            id: 'zoomout',
            text: '局部缩小',
            iconCls: 'icon-zoomout'
        });
        var subStationImg = '../../../maps/base/marker_smallgree.png';
        var marksubstationTool = new Ext.Cat.AjaxMap.MarkerTool({
            id: 'marksubstationTool',
            baseStationstore: baseStationStore,
            text: '标定分站',
            iconCls: 'icon-markstation',
            cursorImg: subStationImg,
            markType: 'substation'
        });
        marksubstationTool.cursorStyle = 'url(' + subStationImg + '),pointer';
        marksubstationTool.alt = '标定分站';

        var sensorImg = '../../../maps/base/marker_smallgree.png';
        var markSensorTool = new Ext.Cat.AjaxMap.MarkerTool({
            id: 'marksensorTool',
            baseStationstore: SensorStore,
            text: '标定传感器',
            iconCls: 'icon-marksensor',
            cursorImg: sensorImg,
            markType: 'sensor'
        });
        markSensorTool.cursorStyle = 'url(' + sensorImg + '),pointer';
        markSensorTool.alt = '标定传感器';

        toolbar.addTool(mapTbar, panTool, true);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoomInTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoonOutTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, marksubstationTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, markSensorTool);
        mapTbar.addSeparator();
        return toolbar;
    },
    CreateMarkTracker: function (mapTbar, mapPanel, trackerpointerStore) {
        var toolbar = new Ext.Cat.AjaxMap.ToolBar(mapPanel);
        var panTool = new Ext.Cat.AjaxMap.PanTool({
            id: 'pan',
            text: '移动',
            iconCls: 'icon-move'
        });
        var zoomInTool = new Ext.Cat.AjaxMap.ZoominTool({
            id: 'zoomin',
            text: '局部放大',
            iconCls: 'icon-zoomin'
        });
        var zoonOutTool = new Ext.Cat.AjaxMap.ZoomoutTool({
            id: 'zoomout',
            text: '局部缩小',
            iconCls: 'icon-zoomout'
        });
        var pointinline = '../../../maps/business/marktracker.gif';
        var marktrackerTool = new Ext.Cat.AjaxMap.MarkTrackerPointTool({
            id: 'marktrackerTool',
            trackerpointerStore: trackerpointerStore,
            text: '标定路径点',
            iconCls: 'icon-marktracker',
            cursorImg: pointinline,
            markType: 'substation'
        });
        marktrackerTool.cursorStyle = 'url(' + pointinline + '),pointer';
        marktrackerTool.alt = '标定路径点';
        toolbar.addTool(mapTbar, panTool, true);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoomInTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoonOutTool);
        mapTbar.addSeparator();
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, marktrackerTool);
        mapTbar.addSeparator();
        return toolbar;
    },
    CreateHistoryTracker: function (mapTbar, mapPanel, baseStationStore) {
        var toolbar = new Ext.Cat.AjaxMap.ToolBar(mapPanel);
        var panTool = new Ext.Cat.AjaxMap.PanTool({
            id: 'pan',
            text: '移动',
            iconCls: 'icon-move'
        });
        var zoomInTool = new Ext.Cat.AjaxMap.ZoominTool({
            id: 'zoomin',
            text: '局部放大',
            iconCls: 'icon-zoomin'
        });
        var zoonOutTool = new Ext.Cat.AjaxMap.ZoomoutTool({
            id: 'zoomout',
            text: '局部缩小',
            iconCls: 'icon-zoomout'

        });
        toolbar.addTool(mapTbar, panTool, true);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoomInTool);
        mapTbar.addSeparator();
        toolbar.addTool(mapTbar, zoonOutTool);
        mapTbar.addSeparator();
        return toolbar;
    }
    */
}

Ext.define('iCatMap.ToolBar', {
    container: null,
    tbar: null,
    canvaspainter: null,
    //this.container.appendChild(this.bar);
    tools: new Object(),
    currentTool: null,
    constructor: function (config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }

        me.tbar = me.container.tbar;

    },
    EVENT_TYPES: ["mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "dblclick", "click"],

    addTool: function (mapTbar, tool, isDefault) {
        if (!tool)
            return;
        this.tools[tool.id] = tool;

        if (isDefault) {
            this.defaultTool = tool;
            this.currentTool = tool;
        }
        mapTbar.add({
            xtype: 'button',
            text: tool.text,
            id: tool.id,
            iconCls: tool.iconCls,
            handler: tool.barClickHandler,
            scope: this
        });

        return mapTbar;
    },

    addCommand: function (cmd) {
        if (!cmd)
            return;
        this.tools[cmd.id] = cmd;
        this.bar.appendChild(cmd.div);
        //注册工具栏按钮事件；
        //Event.observe(cmd.div, "mouseout", cmd.cmdMouseOutHandler.bindAsEventListener(this));
        //Event.observe(cmd.div, "mouseover", cmd.cmdMouseOverHandler.bindAsEventListener(this));
        //Event.observe(cmd.div, "click", cmd.cmdClickHandler.bindAsEventListener(this));
    },

    setMapModel: function (model) {
        this.model = model;
    },

    clearCurrentToolStatus: function () {
        /*
        var toolDivs = this.bar.childNodes;
        for (var i = 0; i < toolDivs.length; i++) {
        var tool = this.tools[toolDivs[i].id]
        if (tool.selected == true) {
        tool.selected = false;
        toolDivs[i].childNodes[0].src = tool.img_normal;
        }
        }
        */
        //        this.currentTool.div.childNodes[0].src = this.currentTool.img_normal;
        //        this.currentTool.selected = false;

    },

    registerEventToMap: function (mapDiv) {
        this.mapDiv = mapDiv;
        Ext.get(this.mapDiv).on('mousedown', this.mapMouseDownHandler, this);
        Ext.get(this.mapDiv).on('mousemove', this.mapMouseMoveHandler, this);
        Ext.get(this.mapDiv).on('mouseup', this.mapMouseUpHandler, this);
        Ext.get(this.mapDiv).on('dblclick', this.mapDblclickHandler, this);
        Ext.get(this.mapDiv).on('click', this.mapClickHandler, this);
    },

    mapMouseDownHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].mouseDownHandler(e, this);
    },
    mapMouseMoveHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].mouseMoveHandler(e, this);
    },
    mapMouseUpHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].mouseUpHandler(e, this);
    },

    mapClickHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].clickHandler(e, this);
    },

    mapDblclickHandler: function (e) {
        if (this.currentTool == null || this.tools[this.currentTool.id].toolType == "Command")
            return;
        this.tools[this.currentTool.id].dblClickHandler(e, this);
    }
});

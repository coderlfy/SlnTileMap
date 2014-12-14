MapInit = function (lx, baseStores, mWidth, mHeight) {
    Ext.Cat.MapConfig.FullExtent = new Ext.Cat.AjaxMap.Bound(0, 100e16, 0, 50e16); //113.65e16, 114.75e16, 22.35e16, 22.9e16
    Ext.Cat.MapConfig.FullWidth = Util.distanceByLnglat(Ext.Cat.MapConfig.FullExtent.getMinX() / 1e16, Ext.Cat.MapConfig.FullExtent.getMinY() / 1e16, Ext.Cat.MapConfig.FullExtent.getMaxX() / 1e16, Ext.Cat.MapConfig.FullExtent.getMaxY() / 1e16);
    var mapTbar = new Ext.Toolbar();
    var mapPanel = new Ext.Panel({
        renderTo: "divID1",
        height: 540,
        width: '100%',
        layout: 'fit',
        plain: true,
        border: true,
        bodyCfg: {
            tag: 'div',
            cls: 'loginbgimage'
        },
        tbar: mapTbar
    });
    var map = new Ext.Cat.AjaxMap.Map(mapPanel, mWidth, mHeight);
    var setMapType = new Ext.Cat.AjaxMap.SZMapType({
        dirSrc: Ext.Cat.MapConfig.ImageBaseDir + '2d/',
        enImg: 'map2.gif',
        disImg: 'map1.gif',
        firstRows: 1,
        firstCols: 2
    });

    map.addMapType(setMapType, true);
    map.setCenter(new Ext.Cat.AjaxMap.Point(50, 23.5), Ext.Cat.MapConfig.DefaultLevel);

    var toolbar = Ext.Cat.AjaxMap.MapTbarConfig.CreatePerLocationSys(mapTbar, mapPanel, baseStores); //配置tbar按钮
    map.addToolBar(toolbar);

    if (baseStores)
        baseStores.each(function (record) {

            var marker = new Ext.Cat.AjaxMap.Marker(record.get('SubstationID'));
            marker.setCoord(new Ext.Cat.AjaxMap.Point(record.get('PosX'), record.get('PosY')));
            marker.setIcon(new Ext.Cat.AjaxMap.Icon(20, 25, Ext.Cat.MapConfig.ImageBaseDir + "marker_small.png"));
            marker.setInfo(record.get('BaseStationSerial'));

            marker.setToMap(toolbar.mapDiv, toolbar.model);
        });
    /*
    if (lx == 2) {
        var fn = function () {
            if (toolbar.model.overlays != null) {
                for (var i = 0; i < toolbar.model.overlays.length; i = i + 2) {
                    if (toolbar.model.overlays[i].infoDivId.indexOf("Over_Marker_Info_") != -1) {

                        var SubstationID = toolbar.model.overlays[i].id.substring(12);
                        baseStores.each(function (record) {
                            if (record.get('SubstationID') == SubstationID)
                                Ext.get(toolbar.model.overlays[i].infoDivId).dom.innerHTML = record.get('BaseStationSerial') + "(" + record.get('PersonnelCount') + ")";
                        });
                    }
                }
            }
        }

        var task_CheckLoginState = {
            run: fn, //执行任务时执行的函数
            interval: 10000//任务间隔，毫秒为单位，这里是10秒
        }

        Ext.TaskMgr.start(task_CheckLoginState);
    }
    */
}
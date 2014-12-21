MapInit = function (lx, baseStores, mWidth, mHeight) {
    iCatMap.MapConfig.FullExtent = Ext.create('iCatMap.Bound', {
        minX: 0,
        maxX: 100e16,
        minY: 0,
        maxY: 50e16
    }); //113.65e16, 114.75e16, 22.35e16, 22.9e16
    iCatMap.MapConfig.FullWidth = iCatMap.Util.distanceByLnglat(
        iCatMap.MapConfig.FullExtent.getMinX() / 1e16,
        iCatMap.MapConfig.FullExtent.getMinY() / 1e16,
        iCatMap.MapConfig.FullExtent.getMaxX() / 1e16,
        iCatMap.MapConfig.FullExtent.getMaxY() / 1e16);

    var mapPanel = Ext.create('Ext.panel.Panel', {
        //renderTo: "divID1",
        height: 540,
        width: '100%',
        layout: 'fit',
        plain: true,
        border: true,
        bodyCfg: {
            tag: 'div',
            cls: 'loginbgimage'
        }
    });
    var map = null;
    var wlogpersonlogtopwindow = Ext.create('Ext.window.Window', {
        title: '单地图显示',
        width: 800,
        height: 500,
        minWidth: 800,
        minHeight: 500,
        items: mapPanel,
        listeners: {
            'afterrender': function () {
            },
            'show': function () {
                map = Ext.create('iCatMap.Map', {
                    container: mapPanel,
                    mWidth: mWidth,
                    mHeight: mHeight
                });
                var setMapType = Ext.create('iCatMap.MapType', {
                    dirSrc: iCatMap.MapConfig.ImageBaseDir + '2d/',
                    enImg: 'map2.gif',
                    disImg: 'map1.gif',
                    firstRows: 1,
                    firstCols: 2
                });

                map.addMapType(setMapType, true);
                map.setCenter(Ext.create('iCatMap.Point', {
                    x: 50,
                    Y: 23.5
                }), iCatMap.MapConfig.DefaultLevel);
                var toolbar = iCatMap.MapTbarConfig.CreateMarkBasestation(mapPanel, null); //配置tbar按钮
                map.addToolBar(toolbar);

                
                
            }
        }
    });
    wlogpersonlogtopwindow.show();
    //iCatMap.MapTbarConfig.tbar.render(mapPanel.tbar);
    /*
    if (baseStores)
        baseStores.each(function (record) {

            var marker = new Ext.Cat.AjaxMap.Marker(record.get('SubstationID'));
            marker.setCoord(new Ext.Cat.AjaxMap.Point(record.get('PosX'), record.get('PosY')));
            marker.setIcon(new Ext.Cat.AjaxMap.Icon(20, 25, Ext.Cat.MapConfig.ImageBaseDir + "marker_small.png"));
            marker.setInfo(record.get('BaseStationSerial'));

            marker.setToMap(toolbar.mapDiv, toolbar.model);
        });
    */
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
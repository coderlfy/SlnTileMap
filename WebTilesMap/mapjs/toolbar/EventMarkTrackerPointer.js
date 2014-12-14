CalibrationPathPointsForm = function (tool, basestationStore) {
    //-----路线
    var trackerfield = Ext.data.Record.create([
            { name: 'TrackerId', mapping: 'TrackerId' },
            { name: 'TrackerName', mapping: 'TrackerName' }
                ]);
    var trackerstore = new Ext.data.Store
    ({
        proxy: new Ext.data.HttpProxy({
            url: '../../../handler/PersonnelLocate/BasicDataSet/CalibrationPathsPoints.ashx?action=combo',
            method: 'GET'
        }),
        reader: new Ext.data.JsonReader({
            root: 'data',
            id: 'ID'
        }, trackerfield)
    });

    trackerstore.load();

    //路线选择下拉框
    var TrackerCombox = new Ext.form.ComboBox
    ({
        store: trackerstore,
        typeAhead: true,
        fieldLabel: '路线选择',
        triggerAction: 'all',
        emptyText: '请选择路线',
        selectOnFocus: true,
        editable: false,
        displayField: 'TrackerName',
        valueField: 'TrackerId',
        mode: 'remote'
    });
    //路线 下拉框 end

    var CalibrationPathPointsFormPanel = new Ext.form.FormPanel
    ({
        id: 'CalibrationPathPointsFormPanel',
        buttonAlign: 'center',
        frame: true,
        plain: true,
        baseCls: 'x-plain',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 100,
        defaults: { anchor: "90%", msgTarget: 'side' },
        items:
        [
          TrackerCombox,
         { fieldLabel: '路径点坐标', id: 'PosXY', xtype: 'textfield', disabled: true, valuefield: 'PosXYstore' }
       ]
    });
    var CalibrationPathPointsFormWindow = new Ext.Window
    ({
        width: 350,
        height: 150,
        //y: 150,  //设置窗体距 顶部的距离，单位为像素。
        iconCls: 'icon-config',
        resizable: false,
        closable: true,
        collapsible: true,
        modal: 'true',  //True 表示为当window显示时对其后面的一切内容进行遮罩，false表示为限制对其它UI元素的语法（默认为 false）。
        layout: 'fit',
        buttonAlign: 'center',
        title: '标定路径点',
        buttonAlign: 'center',
        bodyStyle: 'padding:10px 15px 0 0px', //语法：padding :padding-top | padding-right | padding-bottom | padding-left 
        plain: true,
        items: [CalibrationPathPointsFormPanel],
        buttons:
        [{
            text: '保存',
            minWidth: 60,
            handler: function () {
                if (CalibrationPathPointsFormPanel.getForm().isValid()) {
                    //if (isAdd) {
                    CalibrationPathPointsFormPanel.getForm().submit({
                        url: '../../../handler/PersonnelLocate/BasicDataSet/CalibrationPathsPoints.ashx?action=add',
                        method: 'post',
                        params: { TrackerId: TrackerCombox.getValue(), PosXY: Ext.get("PosXY").getValue() },
                        success: function (form, action) {
                            var flag = action.result.success;
                            //var treegrid = Ext.getCmp('PerTrackerPoint');
                            if (flag) {
                                ExtInformation('保存成功！');
                                //Ext.getCmp('PerTrackerPoint').store.reload();
                                CalibrationPathPointsFormWindow.close();
                            } else {
                                ExtInformation('保存失败！');
                            }
                        },
                        failure: function (form, action) {
                            ExtError('保存失败！');
                        }
                    });
                    /*
                    }
                    else {
                    var s = Ext.getCmp("PerTrackerPoint").getSelectionModel().getSelections();
                    for (var i = 0, r; r = s[i]; i++) {
                    CalibrationPathPointsFormPanel.getForm().submit({
                    url: '../../../handler/PersonnelLocate/BasicDataSet/CalibrationPathsPoints.ashx?action=add',
                    method: 'post',
                    params: { TrackerLine: TrackerCombox.getValue(),
                    PosXY: FieldLable.getRawValue
                    },
                    success: function (form, action) {
                    var flag = action.result.success;
                    var treegrid = Ext.getCmp('PerTrackerPoint');
                    if (flag) {
                    ExtInformation('保存成功！');
                    Ext.getCmp('PerTrackerPoint').store.reload();
                    CalibrationPathPointsFormWindow.close();
                    } else {
                    ExtInformation('保存失败！');
                    }
                    },
                    failure: function (form, action) {
                    ExtError('保存失败！');
                    }
                    });
                    }
                    }
                    */
                }
            }
        },

         {
             text: '关闭',
             minWidth: 60,
             handler: function () {
                 CalibrationPathPointsFormWindow.close();
             }
         }
         ]

    });
    CalibrationPathPointsFormWindow.show();
    Ext.getCmp("PosXY").setValue(tool.pointX + "," + tool.pointY);



    /*
    var baseStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
    url: '../../../handler/PersonnelLocate/Map/MarkBaseStation.ashx?action=list',
    method: 'post'
    }),
    reader: new Ext.data.ArrayReader({}, [
    { name: 'SubstationID' },
    { name: 'SubstationSerial' },
    { name: 'Palce' },
    { name: 'IpAdress' }
    ]),
    autoLoad: true
    });
    var baseStationNo = new Ext.form.ComboBox({
    hiddenName: 'baseStationNo',
    mode: 'local',
    triggerAction: 'all',
    store: baseStore,
    editable: false,
    displayField: 'SubstationSerial',
    valueField: 'SubstationID',
    emptyText: '请选择',
    fieldLabel: '基站编号',
    listeners: {
    'select': function (i, j, k) {
    var that = this;
    baseStore.each(function (record) {
    if (record.get('SubstationSerial') == that.getRawValue()) {
    Ext.getCmp("Palce").setValue(record.get('Palce'));
    Ext.getCmp("IpAdress").setValue(record.get('IpAdress'));
    }
    });
    }
    }
    });
    var selectBaseStationPanel = new Ext.form.FormPanel({
    border: false,
    buttonAlign: 'center',
    plain: true,
    baseCls: 'x-plain',
    frame: true,
    defaultType: 'textfield',
    labelAlign: 'right',
    defaults: { anchor: "90%", msgTarget: 'side' },
    items:
    [
    baseStationNo,
    { fieldLabel: '基站IP', id: 'IpAdress', xtype: 'textfield', disabled: true },
    { fieldLabel: '所在位置', id: 'Palce', xtype: 'textfield', disabled: true },
    { fieldLabel: '基站标定坐标', id: 'Pos', xtype: 'textfield', disabled: true }
    ]
    });
    var selectBaseStationWin = new Ext.Window({
    width: 320,
    height: 190,
    //y: 150,  //设置窗体距 顶部的距离，单位为像素。
    iconCls: 'icon-config',
    resizable: true,
    closable: true,
    collapsible: true,
    closeAction: 'close',
    modal: 'true',  //True 表示为当window显示时对其后面的一切内容进行遮罩，false表示为限制对其它UI元素的语法（默认为 false）。
    layout: 'fit',
    buttonAlign: 'center',
    title: '请选择要标定的基站',
    buttonAlign: 'center',
    bodyStyle: 'padding:10px 15px 0 0px', //语法：padding :padding-top | padding-right | padding-bottom | padding-left 
    plain: true,
    items: [selectBaseStationPanel],
    buttons:
    [
    {
    text: '确定',
    handler: function () {
    Ext.Ajax.request({
    method: 'post',
    url: 'handler/PersonnelLocate/Map/MarkBaseStation.ashx?action=add',
    params: { BaseStationID: baseStationNo.getValue(), Pos: Ext.get("Pos").getValue() },
    success: function (response) {
    var responseJson = Ext.util.JSON.decode(response.responseText).success;
    if (responseJson) {
    ExtInformation('标定成功！');
    if (basestationStore)
    basestationStore.reload();
    this.isMarked = true;
    }
    else {
    ExtInformation('标定失败！');
    }
    selectBaseStationWin.close();
    },
    failure: function (form, action) {
    ExtError('标定失败！');
    }
    });
    }
    },
    {
    text: '取消',
    handler: function () {
    selectBaseStationWin.close();
    }
    }
    ]
    });
    selectBaseStationWin.show();
    Ext.getCmp("Pos").setValue(tool.pointX + "," + tool.pointY);
    */
}
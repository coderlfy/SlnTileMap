MarkSensorEvent = function (tool, SensorStore) {
    var baseStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '../../../handler/SecurityMonitor/RealMonitor/DeviceVirtrualUI.ashx?action=Sensor&Sensor=1',
            method: 'post'
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'totalProperty', //数据总条数
            root: 'root' //将要显示数据的数组
        }, [
                { name: 'SensorID' },
                { name: 'SubstationID' },
                { name: 'SensorSerial' },
                { name: 'Palce' },
                { name: 'IpAdress' }
            ]),
        autoLoad: true
    });
    var SensorNo = new Ext.form.ComboBox({
        hiddenName: 'SensorNo',
        mode: 'local',
        triggerAction: 'all',
        store: baseStore,
        editable: false,
        displayField: 'SensorSerial',
        valueField: 'SensorID',
        emptyText: '请选择',
        fieldLabel: '传感器编号',
        listeners: {
            'select': function (i, j, k) {
                var that = this;
                baseStore.each(function (record) {
                    if (record.get('SensorSerial') == that.getRawValue()) {
                        Ext.getCmp("Palce").setValue(record.get('Palce'));
                    }
                });
            }
        }
    });
    var selectSubStationPanel = new Ext.form.FormPanel({
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
                SensorNo,
                { fieldLabel: '所在位置', id: 'Palce', xtype: 'textfield', disabled: true },
                { fieldLabel: '传感器标定坐标', id: 'Pos', xtype: 'textfield', disabled: true }
            ]
    });
    var selectSubStationWin = new Ext.Window({
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
        title: '请选择要标定的传感器',
        buttonAlign: 'center',
        bodyStyle: 'padding:10px 15px 0 0px', //语法：padding :padding-top | padding-right | padding-bottom | padding-left 
        plain: true,
        items: [selectSubStationPanel],
        buttons:
            [
                {
                    text: '确定',
                    handler: function () {
                        Ext.Ajax.request({
                            method: 'post',
                            url: '../../../handler/SecurityMonitor/RealMonitor/DeviceVirtrualUI.ashx?action=SensorUpdate',
                            params: { SensorID: SensorNo.getValue(), Pos: Ext.get("Pos").getValue() },
                            success: function (response) {
                                var responseJson = Ext.util.JSON.decode(response.responseText).success;
                                if (responseJson) {
                                    ExtInformation('标定成功！');
                                    if (SensorStore)
                                        SensorStore.reload();
                                    this.isMarked = true;
                                }
                                else {
                                    ExtInformation('标定失败！');
                                }
                                selectSubStationWin.close();
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
                        selectSubStationWin.close();
                    }
                }
            ]
    });
    selectSubStationWin.show();
    Ext.getCmp("Pos").setValue(tool.pointX + "," + tool.pointY);
}

TrackerEvent = function (tool) {
    /*
    var baseStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
    url: 'handler/PersonnelLocate/Map/MarkBaseStation.ashx?action=list',
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
    */
    var trackerRecordCM = Ext.data.Record.create([
        { name: 'sId' },
        { name: 'SubstationID' },
        { name: 'PosX' },
        { name: 'PosY' },
    ]);
    var trackerStore = new Ext.data.Store
    ({
        proxy: new Ext.data.HttpProxy({
            url: 'handler/PersonnelLocate/Map/DeviceVirtrualUI.ashx?action=TrackerList',
            method: 'post',
            async: false
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'totalProperty', //数据总条数
            root: 'root', //将要显示数据的数组
            fields: trackerRecordCM
        })
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
                { fieldLabel: '姓名', id: 'IpAdress', xtype: 'textfield', maxLength: 10 },
                { fieldLabel: '查询时间段从', id: 'Palce', xtype: 'datetimefield' },
                { fieldLabel: '到', id: 'Pos', xtype: 'datetimefield' }
            ]
    });
    var selectBaseStationWin = new Ext.Window({
        width: 320,
        height: 170,
        //y: 150,  //设置窗体距 顶部的距离，单位为像素。
        iconCls: 'icon-config',
        resizable: true,
        closable: true,
        collapsible: true,
        closeAction: 'close',
        modal: 'true',  //True 表示为当window显示时对其后面的一切内容进行遮罩，false表示为限制对其它UI元素的语法（默认为 false）。
        layout: 'fit',
        buttonAlign: 'center',
        title: '请录入要查询轨迹的相关条件',
        buttonAlign: 'center',
        bodyStyle: 'padding:10px 15px 0 0px', //语法：padding :padding-top | padding-right | padding-bottom | padding-left 
        plain: true,
        items: [selectBaseStationPanel],
        buttons:
            [
                {
                    text: '确定',
                    handler: function () {
                        trackerStore.load({ params: { start: 1, limit: 2} });
                        selectBaseStationWin.close();
                        /*
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
                        
                        },
                        failure: function (form, action) {
                        ExtError('标定失败！');
                        }
                        });
                        */
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
    //Ext.getCmp("Pos").setValue(tool.pointX + "," + tool.pointY);
}
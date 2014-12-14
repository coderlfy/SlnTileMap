
//测量距离
Ext.Cat.AjaxMap.MeasureTool = function (config) {
    Ext.Cat.AjaxMap.MeasureTool.superclass.constructor.call(this, config);
}
Ext.extend(Ext.Cat.AjaxMap.MeasureTool, Ext.Cat.AjaxMap.AbstractTool, {
    isDrag: false,
    selected: false,
    cursorStyle: 'url("../maps/mea.cur"),pointer',
    alt: '测量距离',
    measure: new Array(),

    mouseDownHandler: function (e, toolbar) {
        if (!this.lineDiv)
            this.lineDiv = Util.createDiv('lineDiv');
        this.mapDiv = toolbar.mapDiv;
        this.mapDiv.appendChild(this.lineDiv);

        this.mouseDownPixel = Util.getMouseRelativePixel(e, this.mapDiv);

        if (!this.isDrag)
            this.isDrag = true;
        this.lastX = this.mouseDownPixel.x;
        this.lastY = this.mouseDownPixel.y;
        this.line = '<v:line from="' + this.lastX + ',' + this.lastY + '" to="' + this.mouseDownPixel.x + ',' + this.mouseDownPixel.y + '" strokecolor="red" strokeweight="2pt" style="position:absolute;left:-3px;top:-3px;"></v:line>'
        this.vLine = document.createElement(this.line);
        this.lineDiv.appendChild(this.vLine);

        var coord = Util.getCoordinateByPixel(this.mouseDownPixel, toolbar.model.getZoom());
        this.measure.push(new Ext.Cat.AjaxMap.Point(coord.x / 1e16, coord.y / 1e16));

        e.stopEvent();
        //Event.stop(e);
    },

    mouseMoveHandler: function (e, toolbar) {
        if (!this.isDrag)
            return;
        this.mouseMovePixel = Util.getMouseRelativePixel(e, this.mapDiv);
        this.vLine.to = this.mouseMovePixel.x + "," + this.mouseMovePixel.y;
        e.stopEvent();
        //Event.stop(e);
    },

    dblClickHandler: function (e, toolbar) {
        if (!this.isDrag || !this.lineDiv)
            return;
        this.lineDiv.innerHTML = "";
        this.mapDiv.removeChild(this.lineDiv);
        var pline = new Ext.Cat.AjaxMap.Polyline(this.measure, "blue", 2);
        pline.setToMap(toolbar.mapDiv, toolbar.model);
        this.measure = new Array();

        this.isDrag = false;

        var len = pline.getLength();
        var unit = '';
        if (len != null && len.toString().indexOf(".")) {
            var i = len.toString().indexOf(".");
            if (i < 4) {
                unit = "米"
                len = Number(len.toString().substring(0, i + 3));
            }
            else {
                len = len / 1000;
                i = len.toString().indexOf(".");
                len = Number(len.toString().substring(0, i + 4));
                unit = "千米";
            }
        }

        var infoCoord = Util.getMouseRelativePixel(e, this.mapDiv);
        this.CreateMeasureInfo(toolbar.model.getId(), infoCoord, "<br>本次总测量距离：<br>" + len + unit);
        e.stopEvent();
        //Event.stop(e);
    },

    CreateMeasureInfo: function (modelId, infoCoord, result) {
        var div = $("measureResultDiv")
        if (!div) {
            var mapDiv = $("map_" + modelId)
            this.measureResult = document.createElement("div");
            this.measureResult.id = "measureResultDiv";
            this.measureResult.onselect = null;
            this.measureResult.style.position = "absolute";
            this.measureResult.style.background = "#FFFFFF";
            this.measureResult.style.border = "1px solid #999999";
            this.measureResult.style.fontSize = "12px";
            this.measureResult.style.padding = "1px";
            this.measureResult.innerHTML = '<div style="background:#EEEEEE;"><table style="width:150px;"><tr><td align=left>测量结果</td><td align=right><img onmousedown="hideWindown(event, \'' + this.measureResult.id + '\')" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'infowindow_close.gif"></td></tr></table></div>';
            this.measureResult.innerHTML += '<div id="measureResult" align="center" style="padding:2px;height:50px;width:150px;z-index:10"></div>';
            mapDiv.appendChild(this.measureResult);
        }
        this.measureResult.style.zIndex = 11;
        this.measureResult.style.left = infoCoord.x + "px";
        this.measureResult.style.top = infoCoord.y + "px";
        $("measureResult").innerHTML = result;
        this.measureResult.style.display = "";
    },

    clickHandler: function (e, model) {
        e.stopEvent();
        //Event.stop(e);
    },

    mouseUpHandler: function (e, model) {
        e.stopEvent();
        //Event.stop(e);
    }
});
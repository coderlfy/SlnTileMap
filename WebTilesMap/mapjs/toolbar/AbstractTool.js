/// <reference path="../../extjs/ext-base.js" />
/// <reference path="../../extjs/ext-all.js" />

Ext.Cat.AjaxMap.AbstractTool = function (config) {
    this.toolType = "Tool";
    this.id = config.id;
    this.text = config.text;
    this.iconCls = config.iconCls;
    this.cursorImg = config.cursorImg;

}
Ext.Cat.AjaxMap.AbstractTool.prototype = {
    barClickHandler: function (e) {
        this.clearCurrentToolStatus();
        this.currentTool = this.tools[e.id];
        var tool = this.tools[this.currentTool.id];
        this.mapDiv.style.cursor = tool.cursorStyle;
    },

    barMouseOverHandler: function (e) {
        var elm = Event.element(e)
        if (elm.childNodes.length > 0)
            return;
        if (this.tools[elm.parentNode.id].selected == true)
            return;
        elm.src = this.tools[elm.parentNode.id].img_over;
        elm.alt = this.tools[elm.parentNode.id].alt;
        e.stopEvent();
    },

    barMouseOutHandler: function (e) {
        var elm = Event.element(e)
        if (elm.childNodes.length > 0)
            return;
        if (this.tools[elm.parentNode.id].selected == true)
            return;
        elm.src = this.tools[elm.parentNode.id].img_normal;
        e.stopEvent();
    },
    reCreateCanvas: function (toolbar) {
        var trackercanvas = Ext.get('tracker_canvas');
        var trackerinterfacecanvas = Ext.get('tracker_interfacecanvas');
        if (trackercanvas != null) {
            trackercanvas.remove();
            trackerinterfacecanvas.remove();
            var tracker = new Ext.Cat.AjaxMap.Canvas(0, 0);
            tracker.setToMap(this.mapDiv, toolbar.model);
            if (CanvasHelper.canvasExists("tracker_canvas")) {
                toolbar.canvaspainter = new Painter("tracker_canvas", "tracker_interfacecanvas", { x: 0, y: 0 });
                toolbar.canvaspainter.setLineWidth(6);
            }
        }

        //对小人动画做不可见的处理
        var obj = document.getElementById("Over_persondiv_person");
        if (obj != null)
            obj.parentNode.removeChild(obj);
    },
    //缩放范围
    zoomToExtent: function (model, extent, container, direction) {
        if (extent) {
            var zoom = model.getZoom();

            var w1 = zoom.getViewBound(container.dom).getPixelWidth(zoom);
            var h1 = zoom.getViewBound(container.dom).getPixelHeight(zoom);
            var w2 = extent.getPixelWidth(zoom);
            var h2 = extent.getPixelHeight(zoom);
            var r1 = Math.sqrt(w1 * w1 + h1 * h1);
            var r2 = Math.sqrt(w2 * w2 + h2 * h2);
            var deltalLevel = Math.floor(r1 / r2);
            if (w2 < 1 || h2 < 1)
                return;
            var orgLevel = zoom.getLevel();
            var tempLevel = orgLevel;
            if (deltalLevel > 3) deltalLevel = 3;
            switch (direction) {
                case 'zoomin':
                    orgLevel += deltalLevel;
                    if (orgLevel > Ext.Cat.MapConfig.MaxZoomLevel)
                        orgLevel = Ext.Cat.MapConfig.MaxZoomLevel;
                    break;
                case 'zoomout':
                    orgLevel -= deltalLevel;
                    if (orgLevel < 2)
                        orgLevel = 2; //最低级别图为2级图；如果有2张的1级图，则可以修改为1；
                    break;
            }
            //if (tempLevel != orgLevel)
            //    model.clearOverLayers(this.mapDiv);
            model.setZoom(new Ext.Cat.AjaxMap.Zoom(orgLevel));
            model.setViewCenterCoord(extent.getCenter());
            model.controls[container.dom.childNodes[0].id].paint(model, true); //这句有问题
            if (model.ovId)
                model.controls[model.ovId].paint(model);
            //$('sliderbar_'+model.getId()).parentNode.style.top=((MaxZoomLevel-orgLevel)*12+6)+"px"
        }
    }
};

function hideWindown(e, id) {
    var obj = $(id);
    obj.style.display = "none";
    e.stopEvent();
    //Event.stop(e);
}



    
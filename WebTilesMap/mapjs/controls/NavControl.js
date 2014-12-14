//Map navigation tools
Ext.Cat.AjaxMap.NavControl = function (container) {
    this.container = container;
    this.drawNavControl(); 
};
Ext.extend(Ext.Cat.AjaxMap.NavControl, Ext.Cat.AjaxMap.AbstractControl, {

    paint: function (model) {
        this.model = model;
        var html = '<table border="0" cellspacing="0" cellpadding="1"><tr><td align="center" colspan="3">'
        html += '<img style="cursor:pointer" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'icon_goup.gif" id="goup_' + this.model.getId() + '"></td></tr><tr><td>'
        html += '<img style="cursor:pointer" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'icon_goleft.gif" id="goleft_' + this.model.getId() + '"></td><td>'
        html += '<img style="cursor:pointer" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'icon_default.gif" id="reset_' + this.model.getId() + '"></td><td>'
        html += '<img style="cursor:pointer" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'icon_goright.gif" id="goright_' + this.model.getId() + '"></td></tr><tr><td align="center" colspan="3">'
        html += '<img style="cursor:pointer" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'icon_godown.gif" id="godown_' + this.model.getId() + '"></td></tr><tr><td height="5"></td></tr><tr><td align="center" colspan="3"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center">'
        html += '<img style="cursor:pointer" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'icon_zoomin.gif" id="zoomin_' + this.model.getId() + '"></td></tr><tr>'
        html += '<td style="height:2px;" id="map' + this.model.getId() + '_sliderbar" align="center" onmousedown="return false;"></td></tr><tr><td align="center">'
        html += '<img style="cursor:pointer" src="' + Ext.Cat.MapConfig.ImageBaseDir + 'icon_zoomout.gif" id="zoomout_' + this.model.getId() + '"></td></tr></table></td></tr></table>';
        this.navToolDiv.innerHTML = html;

        html = '<div style="position:relative;height:' + (Ext.Cat.MapConfig.MaxZoomLevel * 12 + 9) + 'px;width:18px;z-index:100;overflow:hidden;" onmousedown="return false;">';
        for (var i = 0; i <= Ext.Cat.MapConfig.MaxZoomLevel; i++) {
            html += '<img src="' + Ext.Cat.MapConfig.ImageBaseDir + 'zoom_bar.gif">'
        }
        html += '<div style="position:absolute;top:' + ((Ext.Cat.MapConfig.MaxZoomLevel - this.model.getZoom().getLevel()) * 12 + 6) + 'px;left:0px;z-index:100;">'
        html += '<img src="' + Ext.Cat.MapConfig.ImageBaseDir + 'slider.gif" id="sliderbar_' + this.model.getId() + '"></div></div>';
        var sliderbar = Ext.get('map' + this.model.getId() + '_sliderbar');
        sliderbar.dom.innerHTML = html;
        //this.registerEventToNav("goup_,goleft_,goright_,godown_,reset_,zoomin_,zoomout_");
        //this.registerEventToSlider("sliderbar_", "mousedown,mousemove,mouseup");
    },

    loadTiles: function () {
    },

    registerEventToNav: function (str) {
        var eventNames = str.split(',');
        for (var i = 0; i < eventNames.length; i++) {
            var source = $(eventNames[i] + this.model.getId());
            //Event.observe(source, "click", this.navClickHandler.bindAsEventListener(this));
        }
    },

    registerEventToSlider: function (id, eventTypes) {
        var source = $(id + this.model.getId());
        eventTypes = eventTypes.split(',');
        //Event.observe(source, eventTypes[0], this.sliderDownHandler.bindAsEventListener(this));
        //Event.observe(source, eventTypes[1], this.sliderMoveHandler.bindAsEventListener(this));
        //Event.observe(source, eventTypes[2], this.sliderUpHandler.bindAsEventListener(this));
    },


    drawNavControl: function () {
        var left = 20;
        var top = 30;
        this.id = Util.createUniqueID('Nav_');
        this.navToolDiv = Util.createDiv(this.id, left, top, null, null, null, 'absolute', '0px solid blue');
        this.navToolDiv.style.zIndex = 2000;
        this.container.appendChild(this.navToolDiv);
    },


    navClickHandler: function (e) {
        var param = Event.element(e).id.split('_')[0];

        if (param != null) {
            var newX = this.model.getViewCenterCoord().x;
            var newY = this.model.getViewCenterCoord().y;
            if (param == "goup") {
                newY = this.model.getViewCenterCoord().y + this.model.getZoom().getViewBound(this.container).getHeight() / 2;
            }
            if (param == "godown") {
                newY = this.model.getViewCenterCoord().y - this.model.getZoom().getViewBound(this.container).getHeight() / 2;
            }
            if (param == "goleft") {
                newX = this.model.getViewCenterCoord().x - this.model.getZoom().getViewBound(this.container).getWidth() / 2;
            }
            if (param == "goright") {
                newX = this.model.getViewCenterCoord().x + this.model.getZoom().getViewBound(this.container).getWidth() / 2;
            }
            if (param == "zoomin") {
                this.zoomin($('sliderbar_' + this.model.getId()).parentNode);
                e.stopEvent();
                return;
            }
            if (param == "zoomout") {
                this.zoomout($('sliderbar_' + this.model.getId()).parentNode);
                e.stopEvent();
                return;

            }
            if (param == "reset") {
                this.reset($('sliderbar_' + this.model.getId()).parentNode)
                e.stopEvent();
                return;
            }

            var newCoord = new Coordinate(newX, newY);
            if (!newCoord.isSame(this.model.getViewCenterCoord())) {
                this.model.setViewCenterCoord(newCoord);
                this.model.controls[this.container.childNodes[0].id].paint(this.model, true);
                this.model.controls[this.model.ovId].paint(this.model);
            }
            e.stopEvent();
        }
    },

    zoomin: function (elm) {
        var level = this.model.getZoom().getLevel();
        if (level < Ext.Cat.MapConfig.MaxZoomLevel) {
            this.model.setZoom(new Zoom(level + 1));
            //alert(this.container.childNodes[0].id);
            this.model.controls[this.container.childNodes[0].id].paint(this.model, true);
            this.model.controls[this.model.ovId].paint(this.model);
            elm.style.top = ((Ext.Cat.MapConfig.MaxZoomLevel - (level + 1)) * 12 + 6) + "px"
        }
    },
    zoomout: function (elm) {
        var level = this.model.getZoom().getLevel();
        if (level > 1) {
            this.model.setZoom(new Zoom(level - 1));

            this.model.controls[this.container.childNodes[0].id].paint(this.model, true);
            this.model.controls[this.model.ovId].paint(this.model);
            elm.style.top = ((Ext.Cat.MapConfig.MaxZoomLevel - (level - 1)) * 12 + 6) + "px"
        }
    },

    reset: function (elm) {
        this.model.reset(this.container.childNodes[0], elm)
    },

    sliderDownHandler: function (e) {
        if (!this.isDragging)
            this.isDragging = true;
        this.elm = Event.element(e);
        this.orgTop = Util.getValueOfNoPX(this.elm.parentNode.style.top);
        this.elm.style.cursor = 'pointer';
        this.orgMousePixel = Util.getMousePixel(e);

        if (this.elm.setCapture) {
            this.elm.setCapture();
        }
        else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
    },

    sliderMoveHandler: function (e) {
        if (!this.isDragging)
            return;
        this.newMousePixel = Util.getMousePixel(e);
        var top = this.orgTop + this.newMousePixel.y - this.orgMousePixel.y;
        if (top > 0 && top < Ext.Cat.MapConfig.MaxZoomLevel * 12) {
            this.elm.parentNode.style.top = top + "px";
        }
    },

    sliderUpHandler: function (e) {
        if (this.isDragging)
            this.isDragging = false;
        if (this.elm.releaseCapture) {
            this.elm.releaseCapture();
        }
        else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        document.onmousemove = function () { return false };
        document.onmouseup = function () { return false };
        this.elm.style.cursor = "";
        var sliderLevel = Math.floor(Util.getValueOfNoPX(this.elm.parentNode.style.top) / 12);
        var sliderTop = sliderLevel * 12 + 6;
        this.elm.parentNode.style.top = sliderTop + "px";
        this.sliderZoom(Ext.Cat.MapConfig.MaxZoomLevel - sliderLevel);
    },

    sliderZoom: function (newLevel) {
        var level = this.model.getZoom().getLevel();
        if (newLevel > Ext.Cat.MapConfig.MaxZoomLevel) {
            newLevel = Ext.Cat.MapConfig.MaxZoomLevel;
        }
        if (level != newLevel) {
            this.model.setZoom(new Zoom(newLevel));
            this.model.controls[this.container.childNodes[0].id].paint(this.model, true);
            this.model.controls[this.model.ovId].paint(this.model);
        }
    }


});



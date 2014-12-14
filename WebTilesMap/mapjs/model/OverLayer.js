Ext.Cat.AjaxMap.AbstractOverLayer = function (mapDiv) {
}
Ext.Cat.AjaxMap.AbstractOverLayer.prototype = {
    insert: function () {
        if (this.model == null)
            return;
        if (this.model.overlays == null)
            this.model.overlays = new Array();
        this.mapDiv.appendChild(this.div);
        if (this.infoDiv) {
            this.model.overlays.push(this);
            this.mapDiv.appendChild(this.infoDiv)
        }
    },

    remove: function () {
        if (this.model == null)
            return;
        if (this.model.overlays) {
            //this.model.overlays.without(this);
            this.mapDiv.removeChild(this.div);
            if (this.infoDiv)
                this.mapDiv.removeChild(this.infoDiv)
        }
    }
};
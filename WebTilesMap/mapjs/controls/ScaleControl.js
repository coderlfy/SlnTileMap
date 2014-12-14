//Scale Control
Ext.Cat.AjaxMap.ScaleControl = function (container) {
    this.id = Util.createUniqueID('Scale_');
    this.scaleDiv = this.create(container.body)
    container.body.appendChild(this.scaleDiv);
}
Ext.Cat.AjaxMap.ScaleControl.prototype = {
    create: function (container) {
        var left = 10; //Util.getValueOfNoPX(container.style.left)+10;
        var top = 510; //Util.getValueOfNoPX(container.style.top) + 510
        var div = Util.createDiv(this.scaleId, left, top, null, null, null, 'absolute')
        var scaleInfo = Util.createDiv(null, left - 8, top, 150, null, Ext.Cat.MapConfig.ImageBaseDir + 'scale.gif', 'absolute')
        container.appendChild(scaleInfo);
        div.style.fontSize = "12px";
        div.innerHTML = '<div id="scaleInfo" style="padding:3px;z-index:10;vertical-align:bottom;">&nbsp;</div>';
        return div;
    }
};
Ext.Cat.AjaxMap.Tile = function (row, column, level, model) {
    this.row = row;
    this.column = column;
    this.level = level;
    this.model = model;
}
Ext.Cat.AjaxMap.Tile.prototype = {

    getRow: function () {
        return this.row;
    },

    getColumn: function () {
        return this.column;
    },

    getLevel: function () {
        return this.level;
    },

    getMapModel: function () {
        return this.model;
    },

    getSrc: function () {
        return this.model.getCurrentMapType().getSrc(this.level, this.row, this.column);
    }
}
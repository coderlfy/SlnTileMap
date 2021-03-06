﻿(function () {
    var includeformat = '<script type="text/javascript" src="{0}/{1}"></script>';
    function getCurrentPath() {
        var scriptEls = document.getElementsByTagName('script');
        var path = scriptEls[scriptEls.length - 1].src;
        var i = 1;
        while (i--) path = path.substring(0, path.lastIndexOf('/'));
        return path;
    }
    function getFilename(filename) {
        var fileextendname = '.js';
        var filelength = filename.length;
        if (filelength <= 3)
            return filename;
        if (filename.substr(filelength - 3, 3)
            .toLocaleLowerCase() == fileextendname)
            return filename;
        else
            return filename + fileextendname;
    }
    var ICatMapJsFilesPath = [
        'namespces',
        'canvas/Base', 'canvas/IE8canvas', 'canvas/Widget', 'canvas/Painter', 'canvas/CPWidgets', 'canvas/CPDrawing', 'canvas/CPAnimator',
        'Util.js', 'model/Tile', 'geoObject/Bound', 'geoObject/Coordinate', 'geoObject/Point', 'model/OverLayer', 'geoObject/Polyline', 'MapConfig.js',//,
        'controls/Control', 'controls/MapControl', 'geoObject/Rectangle', 'model/Zoom', 'model/MapModel', 'model/MapType',//, 'controls/ScaleControl',
        'geoObject/Canvas', 'geoObject/Marker', 'Map.js', 'MapInit.js',
        'toolbar/AbstractTool', 'toolbar/ToolPan', 'toolbar/ToolBar'//, 'toolbar/EventMarkBaseStation', 'toolbar/EventMarkSensor', 'toolbar/EventMarkSubStation', 'toolbar/EventMarkTrackerPointer', 'toolbar/EventTracker',
        //, 'toolbar/ToolMark', 'toolbar/ToolMarkTrackerPoint', 'toolbar/ToolMeasure', 'toolbar/ToolTrack', 'toolbar/ToolZoomin', 'toolbar/ToolZoomout'
    ];
    var currentpath = getCurrentPath();
    for (var index in ICatMapJsFilesPath) {
        document.write(Ext.String.format(includeformat,
            currentpath,
            getFilename(ICatMapJsFilesPath[index])));
    }
})();
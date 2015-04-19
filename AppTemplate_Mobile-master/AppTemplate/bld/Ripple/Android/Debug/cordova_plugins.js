cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/net.yoik.cordova.plugins.screenorientation/www/screenorientation.js",
        "id": "net.yoik.cordova.plugins.screenorientation.screenorientation",
        "clobbers": [
            "cordova.plugins.screenorientation"
        ]
    },
    {
        "file": "plugins/net.yoik.cordova.plugins.screenorientation/www/screenorientation.android.js",
        "id": "net.yoik.cordova.plugins.screenorientation.screenorientation.android",
        "merges": [
            "cordova.plugins.screenorientation"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "net.yoik.cordova.plugins.screenorientation": "1.3.2"
}
// BOTTOM OF METADATA
});
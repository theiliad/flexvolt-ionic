cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-bluetooth-serial.bluetoothSerial",
        "file": "plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js",
        "pluginId": "cordova-plugin-bluetooth-serial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-ble-central.ble",
        "file": "plugins/cordova-plugin-ble-central/www/ble.js",
        "pluginId": "cordova-plugin-ble-central",
        "clobbers": [
            "ble"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/ios/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Location",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.location.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.location"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Bluetooth",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.bluetooth.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.bluetooth"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Wifi",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.wifi.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.wifi"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Camera",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.camera.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.camera"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Notifications",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.notifications.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.notifications"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Microphone",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.microphone.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.microphone"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Contacts",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.contacts.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.contacts"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Calendar",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.calendar.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.calendar"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Reminders",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.reminders.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.reminders"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic_Motion",
        "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.motion.js",
        "pluginId": "cordova.plugins.diagnostic",
        "merges": [
            "cordova.plugins.diagnostic.motion"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-bluetooth-serial": "0.4.7",
    "cordova-plugin-device": "1.1.7",
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-ble-central": "1.1.4",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-statusbar": "2.2.3",
    "ionic-plugin-keyboard": "2.2.1",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova.plugins.diagnostic": "4.0.3"
};
// BOTTOM OF METADATA
});
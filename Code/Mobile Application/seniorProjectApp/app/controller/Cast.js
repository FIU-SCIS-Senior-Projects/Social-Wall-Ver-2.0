/**
 * @class ZapCast.controller.Cast
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('ZapCast.controller.Cast', {
    extend: 'Ext.app.Controller',
    requires: [],

    config: {
        refs:{
        	CastButton:'#castbutton'
        },
        control:{
        	CastButton:{
        		tap:'checkAvailableDevices'
        	}	
        }

    },
    checkAvailableDevices:function(){
    	ConnectSDK.discoveryManager.pickDevice().success(function (device) {
        function sendVideo () {
            device.getMediaPlayer().playMedia("http://media.w3.org/2010/05/sintel/trailer.mp4", "video/mp4");
        }

        if (device.isReady()) { // already connected
            sendVideo();
        } else {
            device.on("ready", sendVideo);
            device.connect();
        }
    })	},
    launch:function(){
        	if(ConnectSDK != null){
        		alert('I was launched');
        		ConnectSDK.discoveryManager.startDiscovery();
			}

    }
});
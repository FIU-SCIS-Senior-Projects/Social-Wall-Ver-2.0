/**
 * @class ZapCast.controller.CampaignListController
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('FotoZap.controller.CampaignListController', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox','FotoZap.model.Campaign'],
	config: {
        webAppId:'407D3C8E',
        jsondata:null,
        device:null,
        activeCampaign:null,
        refs:{
        	campaignList:{
                selector:'#theCampaignList',
                xtype:'campaignlist',
                autoCreate:true
            },
            castButton:'#thecastbutton'
        },
        control:{
        	campaignList:{
        		select:'CampaignSelected',
                initialize:'ListInit',
                applyStore:function(oldstore,newstore){
                    alert('hahaha');
                }
        	},
            castButton:{
                tap:'ConnectToChromecast'
            }
        }
    },
    applyJsondata:function(newjsondata,oldjsondata){
    this.getCampaignList().getStore().setData(newjsondata);
    },
    CampaignSelected:function(list,record,e0pts){
    	this.setActiveCampaign(record.data.title);
        setTimeout(function(){list.deselect(record);},750);
    },
    ListInit:function(){
        if(!this.ConnectSDKAvailable()){
            console.log('ConnectSDK not available');
        }else{
            ConnectSDK.discoveryManager.on('devicelistchanged',this.DeviceListChange,this);

            ConnectSDK.discoveryManager.startDiscovery();
        }
    },
    ConnectSDKAvailable:function(){
        if( typeof ConnectSDK == 'undefined'){
            return false;
        }
        return true;
    },
    DeviceListChange:function(){
        var devices =  ConnectSDK.discoveryManager.getDeviceList();
        if(devices.length == 0){
            this.getCastButton().hide();
        }else{
            this.getCastButton().show();
        }

    },
    checkActiveCampaign:function(){
        if(this.getActiveCampaign() == null){
            return false;
        }
        return true;
    },
    ConnectToChromecast:function(){
        if(this.ConnectSDKAvailable()){
            var devices = ConnectSDK.discoveryManager.getDeviceList();
            if(devices.length > 0 ){
                var that = this;
                if(this.checkActiveCampaign()){
                   var  thoe = that;
                    ConnectSDK.discoveryManager.pickDevice().success(function(device){
                            thoe.setDevice(device);
                           if(device.isReady()){
                                thoe.deviceConnected();
                            }else{
                            device.on("ready", thoe.deviceConnected,thoe);
                            device.connect();
                           }
                           device.on("disconnect", thoe.deviceDisconnected,thoe); 
                    });
                }else{
                        Ext.Msg.alert('Social Wall','Please select a Campaign, then select the Cast Button.',Ext.emptyFn);
                }
                
            }
        }
    },
    deviceConnected:function(){
        this.getCastButton().setIconCls('icon-cast-connected');

        this.getDevice().getWebAppLauncher().launchWebApp('407D3C8E').success(function (session) {
            Ext.Msg.alert("Alert","web app launch success",Ext.emptyFn);
        }).error(function (err) {
            Ext.Msg.alert("Alert","web app launch error:",Ext.emptyFn);
        });
        
       /* var comand = this.getDevice().getLauncher().launchBrowser('http://wall.fotozap.com/chromecast-receiver');
        
        command.success(function (launchSession) {
            console.log("command was successful");
        }).error(function (err) {
            console.error("command failed");
        });*/

    },
    deviceDisconnected:function(){
      this.getCastButton().setIconCls('icon-cast');  
    }


});
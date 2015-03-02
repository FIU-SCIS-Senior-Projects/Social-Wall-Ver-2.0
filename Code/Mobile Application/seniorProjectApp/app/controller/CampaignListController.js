/**
 * @class ZapCast.controller.CampaignListController
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('FotoZap.controller.CampaignListController', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox','FotoZap.model.Campaign'],
	config: {
        webAppId:'1E0F8D69',
        appSession:null,
        jsondata:null,
        device:null,
        activeCampaign:null,
        refs:{
            logoutButton:'titlebar #logoutbutton',
        	campaignList:' [itemId="theCampaignList"]',
                //selctor:'#theCampaignList',
                //xtype:'campaignlist'
                
            
            castButton:'titlebar #thecastbutton'
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
            },
            logoutButton:{
                tap:'LogoutClicked'
            }
        }
    },
    applyJsondata:function(newjsondata,oldjsondata){
   // this.getCampaignList().getStore().setData(newjsondata);
   Ext.getStore('theCampaigns').setData(newjsondata);
    },
    CampaignSelected:function(list,record,e0pts){
    	this.setActiveCampaign(record.data.title);

        if(this.appSession){
            this.appSession.sendText("Hi");
        }
        //alert("list");


        setTimeout(function(){list.deselect(record);},750);
    },
    ListInit:function(){
        if(!this.ConnectSDKAvailable()){
            console.log('ConnectSDK not available');
        }else{
            ConnectSDK.discoveryManager.on('devicelistchanged',this.DeviceListChange,this);

            ConnectSDK.discoveryManager.startDiscovery();
        }
        console.log(this.getCampaignList());

      //  this.getCampaignList().on('select', function() {
       //     alert('selected');

        //});

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
        var that = this;
        this.getDevice().getWebAppLauncher().launchWebApp('1E0F8D69').success(function (session) {
            
        var then = that;
        then.appSession = session.acquire();
        //  mysession = session.acquire(); 

          then.appSession.on("disconnect", function () {
                then.appSession.release();
                then.appSession = null;
            });

           /*mysession.on("ready",function(){
            mysession.sendText("2nd Campaign"); 
           });*/

          then.appSession .connect().success(function(){
           // Ext.Msg.alert("Alert","web app session success",Ext.emptyFn);
          then.appSession .sendText("2nd Campaign"); 
                
                }).error(function(error){
                    Ext.Msg.alert("Alert","web app session errr:"+error.message,Ext.emptyFn);
            });
               



        }).error(function (err) {
            Ext.Msg.alert("Alert","web app launch error:" + err.message,Ext.emptyFn);
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
    },

    LogoutClicked:function(){
       // alert('area');
       var that = this;
       Ext.Msg.confirm("Social Wall", "Are you sure you want to Logout?",function(buttonId){
            if(buttonId === 'yes') {
        Ext.Viewport.remove(that.getCampaignList(),true);
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
         Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.Main')); 

        }
       });

       //Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
       //Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.Main'));




    }

});
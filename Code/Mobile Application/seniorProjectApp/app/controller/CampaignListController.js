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
        username:null,
        password:null,
        device:null,
        activeCampaign:null,
        refs:{
            logoutButton:'titlebar #logoutbutton',
        	campaignList:'[itemId="theCampaignList"]',
            castButton:'titlebar #thecastbutton',
            disconnectButton:'[itemId="disconnectChrome"]',
            discoModal:'disconnectModal'
        },
        control:{
            disconnectButton:{
                tap:'disconnectPressed'
            },  
        	campaignList:{
        		select:'CampaignSelected',
                initialize:'ListInit'
        	},
            castButton:{
                tap:'ConnectToChromecast'
            },
            logoutButton:{
                tap:'LogoutClicked'
            }
        }
    },
    disconnectPressed:function(){
        if(this.getDevice()){
            //this.cleanUpSession();
            //this.appSession = null;
            this.cleanUpDevice();
            this.getDiscoModal().hide();
        }
    },
    applyJsondata:function(newjsondata,oldjsondata){
   // this.getCampaignList().getStore().setData(newjsondata);
   Ext.getStore('theCampaigns').setData(newjsondata);
    },
    CampaignSelected:function(list,record,e0pts){
    	this.setActiveCampaign(record.data.title);

        var sending =  this.getUsername() + " "+ this.getPassword() +" "+record.data.id;
        if(this.getAppSession()){
            alert(this.getAppSession());
           Ext.Msg.alert('Social Wall','You sent a message',Ext.emptyFn);
            this.getAppSession().sendText(sending);
        }
        //console.log(sending);
        //Ext.Msg.alert('Social Wall','You selected a Campaign',Ext.emptyFn);
        //alert(this.getAppSession());

        setTimeout(function(){
            list.deselect(record);
        },750);
    },
    ListInit:function(){
        if(!this.ConnectSDKAvailable()){
            console.log('ConnectSDK not available');
        }else{
            ConnectSDK.discoveryManager.on('devicelistchanged',this.DeviceListChange,this);

            ConnectSDK.discoveryManager.startDiscovery();
        }
        //console.log(this.getCampaignList());

      //  this.getCampaignList().on('select', function() {
       //     alert('selected');

        //});

    },
    clearAppSession:function(){
        this.appSession = null;
        //Ext.Msg.alert('Social Wall','Clearing the app Session.',Ext.emptyFn);
    },
    ConnectSDKAvailable:function(){
        if( typeof ConnectSDK == 'undefined'){
            return false;
        }
        return true;
    },
    DeviceListChange:function(){
        var devices =  ConnectSDK.discoveryManager.getDeviceList();
       // alert('haha');
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
    devicesDetected:function(){
        var devices = ConnectSDK.discoveryManager.getDeviceList();
        return devices.length > 0  true : false; 
    },
    devicePickedSuccessful:function(device){
            this.setDevice(device);
            if(this.getDevice().isReady()){
                this.deviceConnected();
              }else{
                this.getDevice().on("ready", this.deviceConnected,this);
                this.getDevice().connect();
                }
            this.getDevice().on("disconnect", this.deviceDisconnected,this);
    },
    ConnectToChromecast:function(){
        //If the ConnectSDK variable is defined
        if(this.ConnectSDKAvailable()){
            //If their are devices detected
            if(this.devicesDetected()){
                //var that = this;
                //If there is an active campaign and their is not a device already connected
                if(this.checkActiveCampaign() && !this.getDevice()){
                   //var  thoe = that;
                    ConnectSDK.discoveryManager.pickDevice().success(this.devicePickedSuccessful,this);
                }else{
                    //If there is not an active campaign
                    if(!this.checkActiveCampaign()){
                        Ext.Msg.alert('Social Wall','Please select a Campaign, then select the Cast Button.',Ext.emptyFn);          
                    }
                    else{
                        //show the disconnect modal
                        var modal = Ext.create('FotoZap.view.disconnectChromecast');
                        Ext.Viewport.add(modal);
                        modal.down('toolbar').setTitle(this.getDevice().getFriendlyName());
                        modal.show();
                    }    
                }
                
            }
        }
    },
    cleanUpDevice:function(){
        if(this.getDevice()){
            this.getDevice().off("ready");
            this.getDevice().off("disconnect");
           //this.getDevice().getWebAppLauncher().closeWebApp('1E0F8D69').success(function(){
            //Ext.Msg.alert("Alert","Succesfully closed Web App",Ext.emptyFn);
            //}).error(function(error){
            //Ext.Msg.alert("Alert","web app close error " + err.message,Ext.emptyFn);
           // });
           this.getCastButton().setIconCls('icon-cast');  
           this.getDevice().disconnect();
            this.setDevice(null);   
        }
    },
    cleanUpSession:function(callback){
        if(this.getAppSession()){
                this.getAppSession().off("message");
                this.getAppSession().off("disconnect");

                //this.getAppSession().disconnect();
               // var that = this;
                this.getAppSession().close().success(function(){
                //Ext.Msg.alert("Alert","Succesfully closed Web App",Ext.emptyFn);
                //that.getAppSession().disconnect().success(function(){
                 //   Ext.Msg.alert("Alert","Succesfully disconnected Web App",Ext.emptyFn);
                //that.getAppSession().release();
                //that.clearAppSession();
                //}).error(function(error){
                //    Ext.Msg.alert("Alert","Error disconnecting Web App" + error.message ,Ext.emptyFn);
                //    that.getAppSession().release();
                //that.clearAppSession();
                //});
                //this.getAppSession().release();
                this.clearAppSession();
                
                },this).error(function(error){
                    Ext.Msg.alert("Alert","Error closed Web App" + error.message,Ext.emptyFn);
                //this.getAppSession().disconnect();
                //this.getAppSession().release();
                this.clearAppSession();
                },this);
                
                //this.getAppSession().disconnect();
                //this.getAppSession().release();
                this.clearAppSession();


        }
    },
    deviceConnected:function(){
        this.getCastButton().setIconCls('icon-cast-connected');
        //alert(this.getDevice());
        this.getDevice().getWebAppLauncher().launchWebApp('1E0F8D69').success(function (session) {
            //alert('we got into the web app launch');
        Ext.Msg.alert("Alert","We got into the Web App Launch",Ext.emptyFn);
        //var sesh = session.acquire();
        this.setAppSession(session.acquire());
        //  mysession = session.acquire(); 

          this.getAppSession().on("disconnect", function () {
                //Ext.Msg.alert("Alert","App Session Disconnect fired",Ext.emptyFn);
                this.getAppSession().off("message");
                this.getAppSession().off("disconnect");

                //var session = this.getAppSession();
                //this.setAppSession(null);

                //this.getAppSession().close().success(function(){
                 //   Ext.Msg.alert("Alert","App Session Disconnect closed",Ext.emptyFn);
                //},this).error(function(error){
                 //    Ext.Msg.alert("Alert","App Session Disconnect error "+error.message,Ext.emptyFn);
                //},this);
                //session.disconnect();
                this.getAppSession().release();
                this.setAppSession(null);
            },this);

          this.getAppSession().on("message", function () {
                Ext.Msg.alert("Alert","I received your Message",Ext.emptyFn);
            },this);

           /*mysession.on("ready",function(){
            mysession.sendText("2nd Campaign"); 
           });*/

          this.getAppSession().connect().success(function(){
            Ext.Msg.alert("Alert","web app session success",Ext.emptyFn);
          //this.getAppSession().sendText("2nd Campaign"); 
             //    alert('session connected succesfully');        
                },this).error(function(error){
                    Ext.Msg.alert("Alert","web app session errr:"+error.message,Ext.emptyFn);
            },this);
               



        },this).error(function (err) {
            Ext.Msg.alert("Alert","web app launch error:" + err.message,Ext.emptyFn);
        },this);
        
       /* var comand = this.getDevice().getLauncher().launchBrowser('http://wall.fotozap.com/chromecast-receiver');
        
        command.success(function (launchSession) {
            console.log("command was successful");
        }).error(function (err) {
            console.error("command failed");
        });*/

    },
    deviceDisconnected:function(){
     Ext.Msg.alert("Alert","Device Disconnect Function",Ext.emptyFn);
      this.getCastButton().setIconCls('icon-cast');  
      this.cleanUpDevice();
    },
    LogoutClicked:function(){
       // alert('area');
       var that = this;
       Ext.Msg.confirm("Social Wall", "Are you sure you want to Logout?",function(buttonId){
        if(buttonId === 'yes') {         
        if(that.ConnectSDKAvailable()){
            ConnectSDK.discoveryManager.stopDiscovery();
        }    
        Ext.Viewport.remove(that.getCampaignList(),true);
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.Main')); 
        //that.cleanUpSession().bind(that);
        that.cleanUpDevice().bind(that);
                
        
    }
       });

    },
    setCredentials:function(us,pa){
        this.setUsername(us);
        this.setPassword(pa);
    }

});

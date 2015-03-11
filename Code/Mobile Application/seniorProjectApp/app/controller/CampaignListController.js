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
        	campaignList:' [itemId="theCampaignList"]',
                //selctor:'#theCampaignList',
                //xtype:'campaignlist'
                
            
            castButton:'titlebar #thecastbutton'
        },
        control:{
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
    applyJsondata:function(newjsondata,oldjsondata){
   // this.getCampaignList().getStore().setData(newjsondata);
   Ext.getStore('theCampaigns').setData(newjsondata);
    },
    CampaignSelected:function(list,record,e0pts){
    	this.setActiveCampaign(record.data.title);

        var sending =  this.getUsername() + " "+ this.getPassword() +" "+record.data.id;
        if(this.appSession != null){
            this.getAppSession().sendText(sending);
        }
        console.log(sending);
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
        //console.log(this.getCampaignList());

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
    ConnectToChromecast:function(){
        if(this.ConnectSDKAvailable()){
            var devices = ConnectSDK.discoveryManager.getDeviceList();
            if(devices.length > 0 ){
                //var that = this;
                if(this.checkActiveCampaign()){
                   //var  thoe = that;
                    ConnectSDK.discoveryManager.pickDevice().success(function(device){
                            this.setDevice(device);
                           if(this.getDevice().isReady()){
                                this.deviceConnected();
                            }else{
                            this.getDevice().on("ready", this.deviceConnected,this);
                            this.getDevice().connect();
                           }
                           this.getDevice().on("disconnect", this.deviceDisconnected,this); 
                    },this);
                }else{
                        Ext.Msg.alert('Social Wall','Please select a Campaign, then select the Cast Button.',Ext.emptyFn);
                }
                
            }
        }
    },
    deviceConnected:function(){
        this.getCastButton().setIconCls('icon-cast-connected');
        // var that = this;
        this.getDevice().getWebAppLauncher().launchWebApp('1E0F8D69').success(function (session) {
            
       
        this.setAppSession(session.acquire());
        //  mysession = session.acquire(); 

          this.getAppSession().on("disconnect", function () {
                alert('App session disonnect fireds');
                this.getAppSession().release();
                this.setAppSession(null);
            },this);

           /*mysession.on("ready",function(){
            mysession.sendText("2nd Campaign"); 
           });*/

          this.getAppSession().connect().success(function(){
           // Ext.Msg.alert("Alert","web app session success",Ext.emptyFn);
          this.getAppSession().sendText("2nd Campaign"); 
                
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
        alert('device disconnect function');
      this.getCastButton().setIconCls('icon-cast');  
      if(this.getDevice())
      {
        alert('disconnecting device from deviceDisconnected');
       this.getDevice().off("ready");
       this.getDevice().off("disconnect");
       this.setDevice(null);
      }
      

    },
    LogoutClicked:function(){
       // alert('area');
       var that = this;
       Ext.Msg.confirm("Social Wall", "Are you sure you want to Logout?",function(buttonId){
            if(buttonId === 'yes') {
                if(that.getDevice()){
                    alert('disconnecting device in logout');
                    alert(that.getDevice());
                    that.getDevice().disconnect();
                }

                if(that.getAppSession()){
                    alert('disconnecting session in logout');
                    alert(that.getAppSession());
                    that.getAppSession().off("message");
                    that.getAppSession().off("disconnect");
        
        // Release session to free up memory
        that.getAppSession().close();
        that.getAppSession().disconnect();
        that.getAppSession().release();
        that.setAppSession(null);
                }
            
        ConnectSDK.discoveryManager.stopDiscovery();
        Ext.Viewport.remove(that.getCampaignList(),true);
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
         Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.Main')); 

        }
       });

    },
    setCredentials:function(us,pa){
        this.setUsername(us);
        this.setPassword(pa);
    }

});
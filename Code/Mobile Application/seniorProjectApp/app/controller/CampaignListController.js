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
        playing:true,
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
            discoModal:'disconnectModal',
            campaignPage:'campaignpage',
            playpausePage:'playpausebar',
            playpauseButton:'[itemId="playpause"]'
        },
        control:{
            playpauseButton:{
                tap:'playPausePressed'
            },
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
    applyPlaying:function(newPlay,oldPlay){
        this.playing = newPlay;
    },
    playPausePressed:function(){
        if(this.getAppSession()){
          console.log(this.playing);
           
            if(this.playing){
                var message = {
                    type:'pause'
                };
                if(this.getAppSession()){
                    this.getAppSession().sendJSON(message);
                }
                this.playing=false;
                this.getPlaypauseButton().setIconCls('play');
            
            }else{
                var message = {
                    type:'play'
                };
                if(this.getAppSession()){
                this.getAppSession().sendJSON(message);
                }
                this.playing=true;
                this.getPlaypauseButton().setIconCls('pause');
            }


        }
    },
    hideplayPause:function(){
        if(!this.playing){
            this.playing = true;
        }
        this.getCampaignPage().remove(this.getPlaypausePage());
    },
    showplayPause:function(){
        if(!this.getCampaignPage().down('playpausebar')){
            this.getCampaignPage().add(Ext.create('FotoZap.view.playPauseView'));
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
    hideActiveCampaignViews:function(campaignViewSelector,showCls){
        var htmlElements = Ext.select(campaignViewSelector);
        //console.log(htmlElements);
        if(htmlElements){
            for (var i = 0; i < htmlElements.elements.length; i++) {
                var el = htmlElements.elements[i];
                var indexofCls = el.className.indexOf(showCls);
                if(indexofCls > -1){
                    el.className = el.className.slice(0,indexofCls);
                  console.log(el);
                }
            };
        }
    },
    toggleActiveCampaignView:function(parent,classNameToAdd,classIdentifier){
        if(parent){
          var activeView =  parent.down(classIdentifier,[true]);
            console.log(activeView);
            
            if(activeView){
                var place = activeView.className.indexOf(classNameToAdd);
               if(place > -1){
                return;
               }else{
                    activeView.className += classNameToAdd;
               }
            }
        }
    },

    applyJsondata:function(newjsondata,oldjsondata){
   
   Ext.getStore('theCampaigns').setData(newjsondata);
    },
    CampaignSelected:function(list,record,e0pts){
    	this.setActiveCampaign(record.data.id);

        var sending =  this.getUsername() + " "+ this.getPassword() +" "+record.data.id;
        if(this.getAppSession()){
            //alert(this.getAppSession());
           Ext.Msg.alert('Social Wall','You sent a message',Ext.emptyFn);
           var message = {
                type:'campaignseleted',
                data:sending
           };
            this.getAppSession().sendJSON(message);
        }
        //var button = Ext.create('Ext.Button',{
         //   iconCls:'check2',
          //  width:'50px',
         //   height:'50px'
        //});
        this.showplayPause();
        var selectedItem = list.getItemAt(list.getStore().indexOf(record));
      
        setTimeout(function(){
            list.deselect(record);
            this.hideActiveCampaignViews('.plus',' unhide');
            this.toggleActiveCampaignView(selectedItem.element,' unhide','.plus');
        }.bind(this),750);
    },
    ListInit:function(){
        if(!this.ConnectSDKAvailable()){
            console.log('ConnectSDK not available');
        }else{
            ConnectSDK.discoveryManager.on('devicelistchanged',this.DeviceListChange,this);
            ConnectSDK.discoveryManager.startDiscovery();
        }

    },
    clearAppSession:function(){
        this.appSession = null;
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
        return devices.length > 0 ? true : false; 
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
           
           this.getCastButton().setIconCls('icon-cast');  
           this.getDevice().disconnect();
            this.setDevice(null);   
        }
    },
    cleanUpSession:function(callback){
        if(this.getAppSession()){
                this.getAppSession().off("message");
                this.getAppSession().off("disconnect");

                
                this.getAppSession().close().success(function(){
                
                this.clearAppSession();
                
                },this).error(function(error){
                    Ext.Msg.alert("Alert","Error closed Web App" + error.message,Ext.emptyFn);
                
                this.clearAppSession();
                },this);
                
                
                this.clearAppSession();


        }
    },
    deviceConnected:function(){
        this.getCastButton().setIconCls('icon-cast-connected');
        
        this.getDevice().getWebAppLauncher().launchWebApp('1E0F8D69').success(function (session) {
            
        Ext.Msg.alert("Alert","We got into the Web App Launch",Ext.emptyFn);
        
        this.setAppSession(session.acquire());
        

          this.getAppSession().on("disconnect", function () {
                //Ext.Msg.alert("Alert","App Session Disconnect fired",Ext.emptyFn);
                this.getAppSession().off("message");
                this.getAppSession().off("disconnect");

                
                this.getAppSession().release();
                this.setAppSession(null);
            },this);

          this.getAppSession().on("message", function () {
                Ext.Msg.alert("Alert","I received your Message",Ext.emptyFn);
            },this);

           this.getAppSession().on("ready",function(){
                var send =this.getUsername() + " " +this.getPassword() + " "+ this.getActiveCampaign(); 
                this.getAppSession().sendJSON({
                    type:'campaignseleted',
                    data:send
                });
           },this);

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

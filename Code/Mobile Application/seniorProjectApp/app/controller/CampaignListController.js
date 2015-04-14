/**
 * @class ZapCast.controller.CampaignListController
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('FotoZap.controller.CampaignListController', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox', 'FotoZap.model.Campaign'],
    config: {
        webAppId: '1E0F8D69',
        playing: true,
        appSession: null,
        jsondata: null,
        username: null,
        password: null,
        device: null,
        activeCampaign: null,
        refs: {
            logoutButton: 'titlebar #logoutbutton',
            joinButton: '[itemId="joinbutton"]',
            campaignList: '[itemId="theCampaignList"]',
            castButton: 'titlebar #thecastbutton',
            disconnectButton: '[itemId="disconnectChrome"]',
            discoModal: {
                selector: '#diconnectWindow',
                xtype: 'disconnectModal',
                autoCreate: true

            },
            campaignPage: 'campaignpage',
            playpausePage: 'playpausebar',
            playpauseButton: '[itemId="playpause"]'
        },
        control: {
            joinButton: {
                tap: 'rejoinApp'
            },
            playpauseButton: {
                tap: 'playPausePressed'
            },
            disconnectButton: {
                tap: 'disconnectPressed'
            },
            campaignList: {
                select: 'CampaignSelected',
                initialize: 'ListInit'
            },
            castButton: {
                tap: 'ConnectToChromecast'
            },
            logoutButton: {
                tap: 'LogoutClicked'
            }
        }
    },
    handleMessage: function() {
        Ext.Msg.alert("Alert", "I received your Message", Ext.emptyFn);
    },
    rejoinApp: function() {
        var callAPi = function() {
            this.getDevice().getWebAppLauncher().joinWebApp(this.getWebAppId()).success(function(websession) {
                this.setupWebAppSession(websession);
            }, this).error(function(error) {
                this.hideplayPause();
                Ext.Msg.alert('Slideshow', error.message, Ext.emptyFn);
            }, this);
        };
        var newCall = callAPi.bind(this);
        this.cleanUpSession(newCall);
    },
    setupWebAppSession: function(websession) {
        this.setAppSession(websession.acquire());
        this.showplayPause();

        this.getAppSession().addListener("disconnect", function() {
            this.cleanUpSession();
        }, this);

    },
    handleSessionConnect: function() {
        this.getAppSession().addListener("disconnect", function() {
           
        }, this);
        
    },
    handleSessionError: function() {
        this.cleanupSession();
    },
    onPause: function() {
        if (this.getAppSession()) {

        } else {

            if (this.getDevice()) {

            }
        }

    },
    applyPlaying: function(newPlay, oldPlay) {
        this.playing = newPlay;
    },
    playPausePressed: function() {
        if (this.getAppSession()) {
            console.log(this.playing);

            if (this.playing) {
                var message = {
                    type: 'pause'
                };
                if (this.getAppSession()) {
                    this.getAppSession().sendJSON(message);
                }
                this.playing = false;
                this.getPlaypauseButton().setIconCls('play');

            } else {
                var message = {
                    type: 'play'
                };
                if (this.getAppSession()) {
                    this.getAppSession().sendJSON(message);
                }
                this.playing = true;
                this.getPlaypauseButton().setIconCls('pause');
            }

        }
    },
    resetPlaying: function() {
        if (!this.playing) {
            this.playing = true;
        }
    },
    hideplayPause: function() {
        this.getCampaignPage().remove(this.getPlaypausePage());
    },
    showplayPause: function() {
        if (this.getPlaypauseButton()) {
            if (this.playing == true) {
                this.getPlaypauseButton().setIconCls('pause');
            } else {
                this.getPlaypauseButton().setIconCls('play');
            }
        }

        if (!this.getCampaignPage().down('playpausebar') && this.getAppSession()) {
            this.getCampaignPage().add(Ext.create('FotoZap.view.playPauseView'));
            if (this.playing == false) {
                this.getPlaypauseButton().setIconCls('play');
            }
        }
    },
    disconnectPressed: function() {
        if (this.getDevice()) {
            
            var webFilter = new ConnectSDK.CapabilityFilter([
                "WebAppLauncher.Launch"
            ]);
            ConnectSDK.discoveryManager.setCapabilityFilters([webFilter]);
            ConnectSDK.discoveryManager.startDiscovery();
            this.getDiscoModal().hide();
            this.cleanUpDevice();
            this.getDiscoModal().hide();
        }
    },
    hideActiveCampaignViews: function(campaignViewSelector, showCls) {
        var htmlElements = Ext.select(campaignViewSelector);
        
        if (htmlElements) {
            for (var i = 0; i < htmlElements.elements.length; i++) {
                var el = htmlElements.elements[i];
                var indexofCls = el.className.indexOf(showCls);
                if (indexofCls > -1) {
                    el.className = el.className.slice(0, indexofCls);
                    console.log(el);
                }
            };
        }
    },
    toggleActiveCampaignView: function(parent, classNameToAdd, classIdentifier) {
        if (parent) {
            var activeView = parent.down(classIdentifier, [true]);
            console.log(activeView);

            if (activeView) {
                var place = activeView.className.indexOf(classNameToAdd);
                if (place > -1) {
                    return;
                } else {
                    activeView.className += classNameToAdd;
                }
            }
        }
    },

    applyJsondata: function(newjsondata, oldjsondata) {

        Ext.getStore('theCampaigns').setData(newjsondata);
    },
    CampaignSelected: function(list, record, e0pts) {
        var sending = this.getUsername() + " " + this.getPassword() + " " + record.data.id;
        if (this.getAppSession()) {
            this.setActiveCampaign(record.data.id);
           
            var message = {
                type: 'campaignseleted',
                data: sending
            };
            this.getAppSession().sendJSON(message);
        }
        if (this.getAppSession()) {
            this.resetPlaying();
            this.showplayPause();
        }
        var selectedItem = list.getItemAt(list.getStore().indexOf(record));

        setTimeout(function() {
            list.deselect(record);
            this.hideActiveCampaignViews('.plus', ' unhide');
            this.toggleActiveCampaignView(selectedItem.element, ' unhide', '.plus');
        }.bind(this), 750);
    },
    ListInit: function() {
        if (!this.ConnectSDKAvailable()) {
            console.log('ConnectSDK not available');
        } else {
            ConnectSDK.discoveryManager.on('devicelistchanged', this.DeviceListChange, this);
            var webFilter = new ConnectSDK.CapabilityFilter([
                "WebAppLauncher.Launch"
            ]);
            ConnectSDK.discoveryManager.setCapabilityFilters([webFilter]);
            ConnectSDK.discoveryManager.startDiscovery();
        }

    },
    clearAppSession: function() {
        this.appSession = null;
    },
    ConnectSDKAvailable: function() {
        if (typeof ConnectSDK == 'undefined') {
            return false;
        }
        return true;
    },
    DeviceListChange: function() {
        var devices = ConnectSDK.discoveryManager.getDeviceList();
        if (devices.length == 0) {
            this.getCastButton().hide();
        } else {
            this.getCastButton().show();
        }

    },
    checkActiveCampaign: function() {
        if (this.getActiveCampaign() == null) {
            return false;
        }
        return true;
    },
    devicesDetected: function() {
        var devices = ConnectSDK.discoveryManager.getDeviceList();
        return devices.length > 0 ? true : false;
    },
    devicePickedSuccessful: function(device) {
        this.setDevice(device);
        if (this.getDevice().isReady()) {
            this.deviceConnected();
        } else {
            this.getDevice().on("ready", this.deviceConnected, this);
            this.getDevice().connect();
        }
        this.getDevice().on("disconnect", this.deviceDisconnected, this);
    },
    ConnectToChromecast: function() {
        //If the ConnectSDK variable is defined
        if (this.ConnectSDKAvailable()) {
            //If their are devices detected
            if (this.devicesDetected()) {
                //If there is an active campaign and their is not a device already connected
                if (!this.getDevice()) {
                    //var  thoe = that;
                    ConnectSDK.discoveryManager.pickDevice()
                        .success(this.devicePickedSuccessful, this)
                        .error(function(error) {
                            Ext.Msg.alert("Alert", error.message, Ext.emptyFn);
                        }, this);
                } else {
                   
                    var modal = this.getDiscoModal();
                    Ext.Viewport.add(modal);
                    modal.down('toolbar').setTitle(this.getDevice().getFriendlyName());
                    modal.show();

                }

            }
        }
    },
    cleanUpDevice: function() {
        if (!this.getDevice()) {
            return;
        }
        this.cleanUpSession();
        this.getDevice().off("ready");
        this.getDevice().off("disconnect");
        this.getCastButton().setIconCls('icon-cast');
        this.getDevice().disconnect();
        this.setDevice(null);

    },
    cleanUpSession: function(callback) {
        if (this.getAppSession()) {
            this.getAppSession().off("message");
            this.getAppSession().off("disconnect");

            this.getAppSession().disconnect()
                .success(function() {
                    this.getAppSession().release();
                    this.setAppSession(null);
                    this.hideplayPause();
                    if (callback) {
                        callback();
                    }
                }, this).error(function(error) {
                    Ext.Msg.alert("Alert", error.message, Ext.emptyFn);
                }, this);

        } else {
            if (callback) {
                callback();
            }
        }
        this.hideplayPause();
    },
    deviceConnected: function() {
        this.getCastButton().setIconCls('icon-cast-connected');

        this.getDevice().getWebAppLauncher().launchWebApp('1E0F8D69').success(function(session) {

            this.setAppSession(session.acquire());


            this.getAppSession().on("disconnect", function() {
                this.getAppSession().off("message");
                this.getAppSession().off("disconnect");

                this.getAppSession().release();
                this.setAppSession(null);
                this.hideplayPause();
            }, this);

            this.getAppSession().on("message", function() {
                Ext.Msg.alert("Alert", "I received your Message", Ext.emptyFn);
            }, this);

            this.getAppSession().on("ready", function() {
                
            }, this);

            this.getAppSession().connect().success(function() {
            }, this).error(function(error) {
                Ext.Msg.alert("Alert", error.message, Ext.emptyFn);
            }, this);

        }, this).error(function(err) {
            Ext.Msg.alert("Alert", err.message, Ext.emptyFn);
        }, this);



    },
    startConnectSdkDiscovery:function(){
        if(this.ConnectSDKAvailable()){
        var webFilter = new ConnectSDK.CapabilityFilter([
            "WebAppLauncher.Launch"
        ]);
        ConnectSDK.discoveryManager.setCapabilityFilters([webFilter]);
        ConnectSDK.discoveryManager.startDiscovery();
        }
    },
    deviceDisconnected: function() {
        this.getCastButton().setIconCls('icon-cast');
        this.startConnectSdkDiscovery();        
        this.cleanUpDevice();
    },
    LogoutClicked: function() {
        var that = this;
        Ext.Msg.confirm("Social Wall", "Are you sure you want to Logout?", function(buttonId) {
            if (buttonId === 'yes') {
                that.cleanUpDevice();
                if (that.ConnectSDKAvailable()) {
                    ConnectSDK.discoveryManager.stopDiscovery();
                }
                Ext.Viewport.remove(that.getCampaignList(), true);
                Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
                Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.Main'));
                
                that.setActiveCampaign(null);

            }
        });

    },
    setCredentials: function(us, pa) {
        this.setUsername(us);
        this.setPassword(pa);
    }

});
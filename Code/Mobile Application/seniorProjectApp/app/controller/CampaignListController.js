/**
 * @class ZapCast.controller.CampaignListController
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('ZapCast.controller.CampaignListController', {
    extend: 'Ext.app.Controller',
    requires: [],
	config: {
        activeCampaign:null,
        refs:{
        	campaignList:'#theCampaignList',
            castButton:'#thecastbutton'
        },
        control:{
        	campaignList:{
        		select:'CampaignSelected',
                initialize:'ListInit'
        	},
            castButton:{
                tap:'ConnectToChromecast'
            }
        }
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
                if(this.checkActiveCampaign()){
                    ConnectSDK.discoveryManager.pickDevice();
                }else{
                        Ext.MessageBox.alert('ZapCast','Please select a Campaign');
                }
                
            }
        }
    }


});
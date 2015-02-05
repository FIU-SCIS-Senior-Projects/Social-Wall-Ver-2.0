/**
 * @class ZapCast.controller.CampaignListController
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('ZapCast.controller.CampaignListController', {
    extend: 'Ext.app.Controller',
    requires: [],
	config: {
        refs:{
        	campaignList:'#theCampaignList'
        },
        control:{
        	campaignList:{
        		select:'CampaignSelected'
        	}
        }
    },
    CampaignSelected:function(list,record,e0pts){
    	setTimeout(function(){list.deselect(record);},750);
    

    }
});
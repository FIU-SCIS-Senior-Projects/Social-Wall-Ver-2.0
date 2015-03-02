/**
 * @class ZapCast.view.CampaignList
 * @extends Ext.Panel
 * Description
 */
Ext.define('FotoZap.view.CampaignPage', {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar','Ext.List','Ext.Spacer','FotoZap.view.CampaignList'],
    xtype:'campaignpage',
    config: {
    	fullscreen:true,
    	layout:'fit',
       	items:[{
       		xtype:'titlebar',
       		docked:'top',
       		title:'Select A Campaign',
          items:[{
            iconCls:'action',
              align: 'left',
              itemId:'logoutbutton'
          },{
              iconCls:'icon-cast',
              hidden:true,
              align: 'right',
              itemId:'thecastbutton'
          }]
       	},{
       		xtype:'campaignlist'
       	/*	data: [
		        { title: 'Disney 2012' },
		        { title: 'Graduation 2015' },
		        { title: 'Selfies' },
		        { title: 'Birthday 2014' }
		    ]*/
		}]
    }

});
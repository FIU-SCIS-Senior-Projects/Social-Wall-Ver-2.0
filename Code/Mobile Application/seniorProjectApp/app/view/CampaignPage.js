/**
 * @class ZapCast.view.CampaignList
 * @extends Ext.Panel
 * Description
 */
Ext.define('FotoZap.view.CampaignPage', {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar','Ext.List','Ext.Spacer','FotoZap.view.CampaignList'],
    config: {
    	fullscreen:true,
    	layout:'fit',
       	items:[{
       		xtype:'titlebar',
       		docked:'top',
       		title:'Select A Campaign',
          items:[{
              iconCls:'icon-cast',
              hidden:true,
              align: 'right',
              id:'thecastbutton'
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
/**
 * @class ZapCast.view.CampaignList
 * @extends Ext.Panel
 * Description
 */
Ext.define('FotoZap.view.CampaignList', {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar','Ext.List','Ext.Spacer'],

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
       		xtype:'list',
       		id:'theCampaignList',
       		cls:'expanded-list',
       		itemTpl: ['{title}'],
       		data: [
		        { title: 'Disney 2012' },
		        { title: 'Graduation 2015' },
		        { title: 'Selfies' },
		        { title: 'Birthday 2014' }
		    ]
		}]
    }

});
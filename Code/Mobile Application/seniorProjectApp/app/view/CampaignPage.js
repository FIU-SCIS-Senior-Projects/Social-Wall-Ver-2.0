/**
 * @class ZapCast.view.CampaignList
 * @extends Ext.Panel
 * Description
 */
Ext.define('FotoZap.view.CampaignPage', {
  extend: 'Ext.Container',
  requires: ['Ext.TitleBar', 'Ext.List', 'Ext.Spacer', 'FotoZap.view.CampaignList'],
  xtype: 'campaignpage',
  config: {
    fullscreen: true,
    layout: 'fit',
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      centered: true,
      title: 'Select A Campaign',
      items: [{
        iconCls: 'action',
        align: 'left',
        itemId: 'logoutbutton'
      }, {
        iconCls: 'refresh',
        align: 'right',
        itemId: 'joinbutton'
      }, {
        iconCls: 'icon-cast',
        align: 'right',
        hidden: true,
        itemId: 'thecastbutton'
      }]
    }, {
      xtype: 'campaignlist'
    }]
  }

});
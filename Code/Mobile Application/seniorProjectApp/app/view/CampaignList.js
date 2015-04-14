/**
 * @class MyNamespace.CampaignList
 * @extends extendsClass
 * Description
 */
Ext.define('FotoZap.view.CampaignList', {
  extend: 'Ext.dataview.List',
  require: ['FotoZap.store.StoreCampaign', 'FotoZap.view.customListItem'],
  xtype: 'campaignlist',
  config: {

    itemId: 'theCampaignList',
    cls: 'expanded-list',
    store: 'theCampaigns',
    itemTpl: ['{title}', '<div class="x-button-normal x-item-hidden x-button x-iconalign-center x-layout-box-item x-stretched plus">',
      '<span class="x-button-icon x-shown check2"></span>',
      '</div>'
    ],
    listeners: {
      initialize: function() {
        FotoZap.app.getController('CampaignListController').ListInit();
      }

    }
  }
});
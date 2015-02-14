/**
 * @class MyNamespace.CampaignList
 * @extends extendsClass
 * Description
 */
 Ext.require(['FotoZap.store.StoreCampaign']);
 var store = Ext.create('FotoZap.store.StoreCampaign');
 //store.add({id:'hello',title:'boss'});

Ext.define('FotoZap.view.CampaignList', {
    extend: 'Ext.dataview.List',
    require:['FotoZap.store.StoreCampaign'],
    xtype:'campaignlist',
    config: {
        id:'theCampaignList',
       	cls:'expanded-list',
        store:store,
        itemTpl: ['{title}']
    }
});
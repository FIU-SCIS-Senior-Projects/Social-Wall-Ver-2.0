/**
 * @class MyNamespace.CampaignList
 * @extends extendsClass
 * Description
 */
 //Ext.require(['FotoZap.store.StoreCampaign']);
 //var store = Ext.create('FotoZap.store.StoreCampaign');
 //store.add({id:'hello',title:'boss'});

Ext.define('FotoZap.view.CampaignList', {
    extend: 'Ext.dataview.List',
    require:['FotoZap.store.StoreCampaign','FotoZap.view.customListItem'],
    xtype:'campaignlist',
    config: {
      //  defaultType:'customListItem',
        itemId:'theCampaignList',
       // useComponents: true,
        cls:'expanded-list',
        store:'theCampaigns',
        itemTpl: ['{title}','<div class="x-button-normal x-item-hidden x-button x-iconalign-center x-layout-box-item x-stretched plus">',  
                        '<span class="x-button-icon x-shown check2"></span>',  
                    '</div>'],
        listeners:{
            initialize:function(){
                //var items = this.getItems();
                //for (var i = 0; i < items.length; i++) {
                 //   console.log(items[i]);
                //};




                FotoZap.app.getController('CampaignListController').ListInit();
        	}
            
    }
   }
});
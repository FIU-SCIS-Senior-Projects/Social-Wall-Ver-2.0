/**
 * @class MyNamespace.StoreCampaign
 * @extends extendsClass
 * Description
 */
Ext.define('FotoZap.store.StoreCampaign', {
    extend: 'Ext.data.Store',
    require:['FotoZap.model.Campaign'],
    config: {
        model:'FotoZap.model.Campaign',
        storeId: 'theCampaigns'
    }
});
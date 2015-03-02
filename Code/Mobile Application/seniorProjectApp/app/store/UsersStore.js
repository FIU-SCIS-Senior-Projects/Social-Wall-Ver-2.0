/**
 * @class MyNamespace.StoreCampaign
 * @extends extendsClass
 * Description
 */
Ext.define('FotoZap.store.UsersStore', {
    extend: 'Ext.data.Store',
    require:['FotoZap.model.User','Ext.data.proxy.LocalStorage'],
    config: {
        model:'FotoZap.model.Campaign',
        storeId: 'theUsers',
        proxy:{
        	type:'localstorage',
        	id:'thelocalusers'
        	 }
    }
});
/**
 * @class MyNamespace.dropDownList
 * @extends extendsClass
 * Description
 */
 //var st = Ext.create('FotoZap.store.UsersStore');
Ext.define('FotoZap.view.dropDownPanel', {
    extend: 'Ext.Panel',
    requires: ['Ext.List','Ext.data.proxy.LocalStorage'],
    xtype:'dropdownpanel',
	config: {
            layout : {
           type  : 'vbox',
           pack:'center',
           align:'center'
            },
            items:[{
    			xtype:'label',
                cls:'userlalbel',
                id:'dropdownlabel',
                html:''
                
    		}]
    },
    initialize: function() {
        this.element.on('tap',function(){
            FotoZap.app.getController('Main').dropPanelSelected();
        });
    }
});
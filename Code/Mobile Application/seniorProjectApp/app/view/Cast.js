/**
 * @class ZapCast.view.Cast
 * @extends Ext.Panel
 * Description
 */
Ext.define('FotoZap.view.Cast', {
    extend: 'Ext.Container',
    requires: ['Ext.Toolbar','Ext.Button'],

    config: {
    	layout:'vbox',
    	fullscreen: true,
        items:[
        {
        	docked:'top',
        	xtype:'toolbar',
            items:[{
                xtype:'spacer'        	    
            },{
                iconCls:'icon-cast',
                id:'castbutton'
            }]
        }],
        listeners:{
        painted:function(me,eopts){
            var modal = Ext.create('FotoZap.view.CastModal');
            Ext.Viewport.add(modal);
            modal.show();
            
        }
    }
}
    
});
/**
 * @class ZapCast.view.disconnectChromecast
 * @extends
 * Description
 */
Ext.define('FotoZap.view.disconnectChromecast', {
    extend: 'Ext.Panel',
    requires:['Ext.Label','Ext.Button','Ext.Toolbar'],

    config: {
        modal:true,
       layout:'fit',
       centered:true,
        hideOnMaskTap:true,
        showAnimation:{
        	type:'popIn',
        	duration:300,
        	easing:'ease-out'
        },
        hideAnimation:{
        	type:'popOut',
        	duration:300,
        	easing:'ease-out'
        },
        cls:'disconnectModal',
         items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:' Connected to Chromecast8580',
                items:[{
                    iconCls:'icon-cast',
                    align:'left'
                }]
            },{
                xtype:'button',
                ui:'plain',
                width:'100%',
                height:'30px',
                text:'Disconnect'    
            }
        ]

    }
});
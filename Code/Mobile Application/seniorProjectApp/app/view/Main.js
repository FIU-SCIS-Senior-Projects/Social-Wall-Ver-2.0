Ext.define('ZapCast.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: ['Ext.Img','Ext.field.Text','Ext.Button'],
    config: {
        cls:'main-panel',
        layout:{
            type:'vbox',
            pack:'center',
            align:'center'
        },
        items: [
            {   
                xtype:'panel',
                html: '<img src="resources/images/FotoZapLogoMediumCropedcopy.png"/>'            
            },{
                xtype: 'textfield',
                id: 'email',
                clearIcon:false,
                cls:'text-field-login',
                placeHolder:'Username'
            },
            {
                xtype: 'textfield',
                id: 'password',
                cls:'text-field-login',
                clearIcon:false,
                placeHolder:'Password'  
            },{
                xtype: 'button',
                text:'Login',
                ui:'normal',
                id:'loginbutton',
                cls:'big-button bigblue'
            }
        ]
    }
});

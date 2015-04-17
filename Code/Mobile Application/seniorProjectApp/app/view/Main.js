Ext.define('FotoZap.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: ['Ext.Img', 'Ext.field.Text', 'Ext.Button', 'Ext.field.Password', 'Ext.field.Toggle'],
    config: {
        cls: 'main-panel',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'center'
        },
        items: [{
            xtype: 'panel',
            html: '<img id="login-logo" src="resources/images/FotoZapLogoMediumCropedcopy-ConvertImage.png"/>'
        }, {
            xtype: 'textfield',
            itemId: 'email',
            clearIcon: false,
            cls: 'text-field-login',
            placeHolder: 'Username'
        }, {
            xtype: 'passwordfield',
            itemId: 'password',
            cls: 'text-field-login',
            clearIcon: false,
            placeHolder: 'Password'
        }, {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'label',
                id: 'rememberlabel',
                html: 'Remember Me'
            }, {
                xtype: 'togglefield',
                baseCls: 'toggle',
                id: 'remember'
            }]
        }, {
            xtype: 'button',
            text: 'Login',
            ui: 'normal',
            itemId: 'loginbutton',
            cls: 'big-button bigblue'
        }]
    }
});
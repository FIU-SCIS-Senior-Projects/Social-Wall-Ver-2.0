/**
 * @class ZapCast.view.disconnectChromecast
 * @extends
 * Description
 */
Ext.define('FotoZap.view.disconnectChromecast', {
    extend: 'Ext.Panel',
    requires: ['Ext.Label', 'Ext.Button', 'Ext.Toolbar'],
    xtype: 'disconnectModal',
    config: {
        modal: true,
        itemId: 'diconnectWindow',
        layout: 'fit',
        centered: true,
        hideOnMaskTap: true,
        showAnimation: {
            type: 'popIn',
            duration: 300,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 300,
            easing: 'ease-out'
        },
        cls: 'disconnectModal',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: ' Connected to Chromecast8580',
            items: [{
                iconCls: 'icon-cast',
                disabled: true,
                align: 'left'
            }]
        }, {
            xtype: 'button',
            itemId: 'disconnectChrome',
            ui: 'plain',
            width: '100%',
            height: '30px',
            text: 'Disconnect'
        }]

    }
});
/**
 * @class ZapCast.view.CastModal
 * @extends
 * Description
 */
Ext.define('FotoZap.view.CastModal', {
    extend: 'Ext.Panel',
    requires: ['Ext.Label', 'Ext.Button', 'Ext.Img'],

    config: {
        modal: true,
        fullscreen: true,
        cls: 'CastModal',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'center'
        },
        width: '100%',
        height: '100%',
        hideOnMaskTap: false,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        items: [{
            xtype: 'image',
            src: 'resources/images/cling.png'
        }, {
            xtype: 'label',
            itemId: 'TheCastModalLabel',
            html: 'Touch to Cast Media \n to your TV.'
        }, {
            xtype: 'button',
            bottom: '10px',
            text: 'Ok',

            handler: function(me) {
                this.up().hide();
            }
        }]



    }
});
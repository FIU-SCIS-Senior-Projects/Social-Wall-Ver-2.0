/**
 * @class ZapCast.view.playPauseView
 * @extends Ext.Toolbar
 * Description
 */
Ext.define('FotoZap.view.playPauseView', {
    extend: 'Ext.Toolbar',
    requires: ['Ext.Button'],
    xtype: 'playpausebar',
    config: {
        docked: 'bottom',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [{
            xtype: 'button',
            itemId: 'playpause',
            iconCls: 'pause',
            style: 'color:black !important'
        }]
    }

});
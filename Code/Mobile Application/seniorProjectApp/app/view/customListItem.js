Ext.define('FotoZap.view.customListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'customListItem',
    require:['Ext.Button','Ext.Label'],
    config: {
        captionPanel: true,
        layout: {
            type: 'hbox'
        },
        items:[{
            xtype:'label',
            html:'hello'
        },{
            xtype:'button',
            iconCls:'check2',
            cls:'plus'
        }]
    }
});
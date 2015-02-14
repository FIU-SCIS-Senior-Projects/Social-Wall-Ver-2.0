/**
 * @class MyNamespace.Campaign
 * @extends extendsClass
 * Description
 */
Ext.define('FotoZap.model.Campaign', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{name:'id', type: 'string'},
        {name:'title', type:'string'}
        ]
    }
});
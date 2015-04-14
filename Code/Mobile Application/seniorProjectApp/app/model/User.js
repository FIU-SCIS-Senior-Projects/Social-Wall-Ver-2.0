/**
 * @class MyNamespace.Campaign
 * @extends extendsClass
 * Description
 */
Ext.define('FotoZap.model.User', {
	extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		fields: [{
			name: 'username',
			type: 'auto'
		}, {
			name: 'password',
			type: 'string'
		}]
	}
});
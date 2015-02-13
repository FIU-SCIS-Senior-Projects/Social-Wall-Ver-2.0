/**
 * @class ZapCast.Main
 * @extends Ext.app.Controller
 * Description 
 * The controller that listens to the user interactions from the main page
 * of the application (ZapCast.views.Main).
 */
Ext.define('FotoZap.controller.Main', {
    extend: 'Ext.app.Controller',
    requires:['Ext.Ajax','Ext.MessageBox'],
	config:{
		url:'https://zap-rest.fotozap.com/campaigns',
		refs:{
			emailField:'#email',
			passwordField:'#password',
			loginButton:'button[id="loginbutton"]'
		},
		control:{
			loginButton:{
				tap:'loginUser'
			}	
		}

	},
	 loginUser:function(){
	 		Ext.Viewport.setMasked({xtype:'loadmask',message:''});
	 		
	 		var usernameForm = this.getEmailField().getValue();
	 		var passwordForm = this.getPasswordField().getValue();
	 		var tooken = usernameForm + ":" + passwordForm;
	 		var hash = window.btoa(tooken);
	 		var basic = "Basic " + hash;
	 		var that = this;
				/*Ext.Ajax.request({
						url:'http://zap-rest.fotozap.com/campaigns',
						method:'GET',
						headers:{
							'Authorization':basic
						},
						success:that.errorResponse,
						failure:that.successResponse
				});
			*/
	 		setTimeout(function(){
			Ext.Viewport.setMasked(false);
			Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.CampaignList'));
	 		}, 1000);
	 }, 
	 errorResponse:function(response){
	 	Ext.Viewport.setMasked(false);
	 	Ext.Msg.alert('SocialWall','Error!\n Login Failed! Please try again later.',Ext.emptyFn);
	 },
	 successResponse:function(response){
	 	Ext.Viewport.setMasked(false);
	 	Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.CampaignList'));
	 }
    
});
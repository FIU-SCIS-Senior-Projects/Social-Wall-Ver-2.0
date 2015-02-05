/**
 * @class ZapCast.Main
 * @extends Ext.app.Controller
 * Description 
 * The controller that listens to the user interactions from the main page
 * of the application (ZapCast.views.Main).
 */
Ext.define('ZapCast.controller.Main', {
    extend: 'Ext.app.Controller',
    requires:['Ext.Ajax'],
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
	 		/*
			var that = this;
			$.ajaxSetup({
			    beforeSend: function(xhr) {
			        xhr.setRequestHeader('Authorization', tooken);
			        //xhr.setRequestHeader('X-Parse-REST-API-Key', 'mbm311*****d0X2N');
			    }
			});*/

		
			//		$.get(that.getUrl(),function(data){
			//			alert(data);
		//		});
			
	 		setTimeout(function(){
			Ext.Viewport.setMasked(false);
			Ext.Viewport.setActiveItem(Ext.create('ZapCast.view.CampaignList'));
	 		}, 1000);
	 } 

    
});
/**
 * @class ZapCast.Main
 * @extends Ext.app.Controller
 * Description 
 * The controller that listens to the user interactions from the main page
 * of the application (ZapCast.views.Main).
 */
Ext.define('FotoZap.controller.Main', {
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
	 		
			var that = this;
			//$.ajaxSetup({
			//    beforeSend: function(xhr) {
			//        xhr.setRequestHeader('Authorization', basic);
			        //xhr.setRequestHeader('X-Parse-REST-API-Key', 'mbm311*****d0X2N');
			//    }
			//});

		/*
					$.ajax({
						url:that.getUrl(),
						type:'GET',
						username:usernameForm,
						password:passwordForm,
						dataType:'json',
						success:function(data){
								alert('success');
						},
						error:function(error){
								alert('error');
						}	
				});
		*/	
	 		setTimeout(function(){
			Ext.Viewport.setMasked(false);
			Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.CampaignList'));
	 		}, 1000);
	 } 

    
});
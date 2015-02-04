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

	 		Ext.Ajax.request({
    			url: this.getUrl(),
    			method : 'GET',
    			//useDefaultXhrHeader: false,
    			//headers:{
    			//	"Authorization":"Basic "+ hash
    			//},
    			params :{
        username : usernameForm,
        password : passwordForm
     },
    			success: function(options, success, response) {
        			alert("Login Success");
    			},
    			failure : function(response) {
        			alert("Login failed");
    			},
    			scope:this
			});
			
	 		setTimeout(function(){
			Ext.Viewport.setMasked(false);
				



			//Ext.Viewport.setActiveItem(Ext.create('ZapCast.view.Cast'));
	 		}, 1000);
	 } 

    
});
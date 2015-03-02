/**
 * @class ZapCast.Main
 * @extends Ext.app.Controller
 * Description 
 * The controller that listens to the user interactions from the main page
 * of the application (ZapCast.views.Main).
 */
Ext.define('FotoZap.controller.Main', {
    extend: 'Ext.app.Controller',
    requires:['Ext.Ajax','Ext.MessageBox','FotoZap.model.User'],
	config:{
		url:'https://zap-rest.fotozap.com/campaigns',
		refs:{
			emailField:'main #email',
			passwordField:'main #password',
			loginButton:' main #loginbutton',
			dropdownpanel:'dropdownpanel',
			dropdownlabel:'#dropdownlabel',
			rememberfield:'#remember'
		},
		control:{
			dropdownpanel:{
				//tap:'dropItemSelected'
			},
			emailField:{
				keyup:'toggleDropdown',
				blur:'userfieldBlurred'
			},
			loginButton:{
				tap:'loginUser'
			}	
		}

	},
	launch:function(){
		//this.getDropdownpanel().element.on('tap',function(){
		//	alert('are');
		//});
	},
	userfieldBlurred:function(){
		if(this.getDropdownpanel()){
		this.getDropdownpanel().hide();
		}
	},
	loginUser:function(){

	 		Ext.Viewport.setMasked({xtype:'loadmask',message:''});
	 		
	 		var usernameForm = this.getEmailField().getValue();
	 		var passwordForm = this.getPasswordField().getValue();
	 		
	 		
			if(usernameForm !== "" && passwordForm !== ""){
	 		var tooken = usernameForm + ":" + passwordForm;
	 		var hash = window.btoa(tooken);
	 		var basic = "Basic " + hash;
	 		var that = this;
	 	
				Ext.Ajax.request({
						url:'http://zap-rest.fotozap.com/campaigns',
						method:'GET',
						timeout:'3000',
						headers:{
							'Authorization':basic
						},
						success:that.successResponse.bind(that),
						failure:that.errorResponse
				});
			}else{
				this.errorResponse();
			}
			/*
	 		setTimeout(function(){
			Ext.Viewport.setMasked(false);
			Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.CampaignPage'));
	 		}, 1000);*/
	 },
	 checkRemember:function(){
	 	var r = this.getRememberfield().getValue(); 
	 	return r;
	 }, 
	 errorResponse:function(response){
	 	Ext.Viewport.setMasked(false);
	 	Ext.Msg.alert('SocialWall','Error!\n Login Failed! Please try again later.',Ext.emptyFn);
	 },
	 successResponse:function(response){
	 	Ext.Viewport.setMasked(false);
	 	//console.log(this);
	 	if(this.checkRemember()){
	 		console.log(this.getPasswordField().getValue());
	 		this.saveUser(this.getEmailField().getValue(),this.getPasswordField().getValue());
	 	}
	 	FotoZap.app.getController('CampaignListController').setJsondata(Ext.decode(response.responseText));
	 	Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
	 	Ext.Viewport.setActiveItem(Ext.create('FotoZap.view.CampaignPage'));
	 },
	 saveUser:function(usern,pass){
	 	if(usern && pass){
	 		//var alert = Ext.create('FotoZap.model.User',{
	 		//	username:'hay',
	 		//	password:'ou',
	 		//	storeId:'theUsers'
	 		//});
		localStorage.setItem("u",usern);
		localStorage.setItem("p",pass);
	 		//Ext.getStore('theUsers').removeAll();
	 		//Ext.getStore('theUsers').sync();
	 		//Ext.getStore('theUsers').add(alert);
	 		//Ext.getStore('theUsers').sync();
	 		//Ext.getStore('theUsers').load();
	 	}
	 },
	 toggleDropdown:function(){
	 	var usernametext = this.getEmailField().getValue();
	 	var droptext=null;
	 	//if(usernametext === ""){
	 	//	return;
	 	//}
	 	//var userstore = Ext.getStore('theUsers');
	 	//userstore.clearFilter();
	 	var u = localStorage.getItem("u");
	 	if(!u){
	 		return;
	 	}else{
	 		if(u.indexOf(usernametext) == 0){
	 			droptext = u;		
	 		}
	 		
	 	}	
	 	//console.log(usernametext);
	 	
	 	//userstore.filter("username",usernametext);
	 	//userstore.filter({
	 	//	property: 'username',
    	//	value: usernametext,
    	//	anyMatch: true,
    	//	caseSensitive: false
	 	//});
		//console.log(userstore.getCount());
	 	if(droptext  && usernametext!==""){
	 		if(!this.getDropdownpanel()){
	 		var dr = Ext.create('FotoZap.view.dropDownPanel',{
	 			width:this.getEmailField().element.getWidth()+'px',
	 			height:this.getEmailField().element.getHeight()+'px'
	 		});
	 		dr.showBy(this.getEmailField(),"bc-tc");
	 		console.log(this.getDropdownlabel().setHtml(droptext));
	 		}else{
	 		this.getDropdownpanel().showBy(this.getEmailField(),"bc-tc");	
	 		}

	 	}else{
	 		console.log('store got no stuff or you entered nothing');
	 		if(this.getDropdownpanel()){
	 			this.getDropdownpanel().hide();
	 		}
	 	}
	 },
	 setLoginInfo:function(username,password){
	 	//alert(username+" "+ password);
	 	this.getEmailField().setValue(username);
	 	this.getPasswordField().setValue(password);

	 },
	 dropPanelSelected:function(){
	 		//alert('sare');
	 		//this.setLoginInfo(record);
	 		//this.getDropdownpanel().hide();
	 		this.setLoginInfo(localStorage.getItem("u"),localStorage.getItem("p"));

			//list.deselect(record);
			//list.up('panel').hide();
	 }
    
});
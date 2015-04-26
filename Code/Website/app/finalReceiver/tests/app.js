describe('AngularJS app and angular mock is loaded succesfully ', function() {
	
	beforeEach(module('social-wall-receiverApp'));
	var $controller;

	inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  	});

	it("Agular app is defined",function(){
		expect(social-wall-receiverApp).toBeDefined();
	});
  

});
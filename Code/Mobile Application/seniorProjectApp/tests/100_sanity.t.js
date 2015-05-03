StartTest(function(t) {

    t.chain(
        { 
            waitFor : 'CQ', 
            args    : 'main',
            desc    : 'Should find login view on app start'
        },
        
        function(next) {
            t.ok(t.cq1('#loginbutton'), 'Should find a login button');
        }
    );
});

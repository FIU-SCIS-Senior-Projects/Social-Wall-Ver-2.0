StartTest(function(t) {

    t.chain(
        { waitFor : 'componentVisible', args : '#loginbutton' },

        function(next) {
            t.cq1('#email').setValue('snoel006@fiu.edu');
            t.cq1('#password').setValue('fotozap');
            next();
        },

        // We'd like to find a headshot icon the DOM, that's proof the main app has been launched ok
        { 
            waitFor : 'componentVisible', 
            args    : '.campaignpage',
            desc    : 'Should be able login and see the campaign page',
            
            trigger : { tap : '>> #loginbutton' }
        },
        {
            waitFor:'componentVisible',
            args:'#logoutbutton',
            desc : "Should be able to see the logout Button when succesfully logged in.",
            trigger : {tap : '>> #logoutbutton'}
        },{
            waitFor:'selector',
            args:'.x-msgbox',
            desc : "Should be able to see the MessageBox Alert message when loggin out",
            trigger : {tap : '.x-msgbox .x-msgbox-buttons .x-button-action'}
        },
         { waitFor : 'componentVisible', args : '#loginbutton' },
        function(next){
            t.pass("Should be able to see the login button after succesfully loggin out");
        }
    );
});

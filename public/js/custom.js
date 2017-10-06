(function ($) {
    
    // Init Wow
    wow = new WOW( {
        animateClass: 'animated',
        offset:       100
    });
    wow.init();
    
    // Navigation scrolls
    $('.navbar-nav li a').bind('click', function(event) {
        $('.navbar-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        var $anchor = $(this);
        var nav = $($anchor.attr('href'));
        if (nav.length) {
        $('html, body').stop().animate({				
            scrollTop: $($anchor.attr('href')).offset().top				
        }, 1500, 'easeInOutExpo');
        
        event.preventDefault();
        }
    });
    
    
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar-default").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
        
    });

    //Login fields
    var btnLogin = $('#btnLogin');
    var btnSignUp = $('#btnSignUp');
    var btnLogOut = $('#btnLogOut');
  
    btnLogin.on('click', function(){
      event.preventDefault();
  
      var txtEmail = $('#txtEmail').val().trim();
      var txtPassword = $('#txtPassword').val().trim();
  
      var email = txtEmail;
      var password = txtPassword;
  
      var auth = firebase.auth();
  
      var promise = auth.signInWithEmailAndPassword(email, password);
  
      promise.catch(e => {
        console.log(e.message);
        $('#signUpAlert').html('<h3>Error Please sign-in again or sign-up with us.</h3>');
      });
  
      console.log('email is: '+ txtEmail);
      console.log('password is: '+ txtPassword);
  
      txtEmail = $('#txtEmail').val('');
      txtPassword = $('#txtPassword').val('');
  
    });
  
    //add a click for sign up
    btnSignUp.on('click', function(){
      event.preventDefault();
  
      //need to check for real password
      var txtEmail = $('#txtEmail').val().trim();
      //password should be at least 6 char
      var txtPassword = $('#txtPassword').val().trim();
  
      var email = txtEmail;
      var password = txtPassword;
  
      var auth = firebase.auth();
  
      var promise = auth.createUserWithEmailAndPassword(email, password);
  
      promise.catch(e => {
        console.log(e.message);
        if (password.length <= 6){
          $('#signUpAlert').html('<h3>Password must be longer than 6 characters</h3>');
        }
        else if (e.message = 'The email address is badly formatted.'){
          $('#signUpAlert').html('<h3>Please use a correct email.</h3>');
        }
      });
  
  
      console.log('email is: '+ txtEmail);
      console.log('password is: '+ txtPassword);
  
      txtEmail = $('#txtEmail').val('');
      txtPassword = $('#txtPassword').val('');
  
    });
  
    btnLogOut.on('click', e => {
      firebase.auth().signOut();
  
    });
  
    //Add a realtime auth listen to see if user is logged in the whole time
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
        //when users are logged in
        btnLogOut.removeClass('hide');
        btnLogin.addClass('hide');
        $('#LoginInstructions').html('<p>You are logged in</p>');
        $('.loginForm').addClass('hide');
        $('#signUpAlert').html('');
  
      }
      else {
        //no users logged in
        console.log('not Logged In');
        btnLogOut.addClass('hide');
        $('#LoginInstructions').html('<p>Already have an account?</p>'); 
        $('.loginForm').removeClass('hide');     
        $('#signUpAlert').removeClass('hide');
        $('#signUpAlert').html('<p>Login Area</p>');
  
      }
   });   
    
})(jQuery);
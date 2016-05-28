function clearErros(){
    loginFormErrors = [];
    Session.set('loginErros',loginFormErrors);
}

function validateUserData(userData) {
    loginFormErrors = [];
    if(Session.get("signUp")){
        if (userData.firstname === ''){
            loginFormErrors.push('Please enter a first name');
        }
        if (userData.lastname === ''){
            loginFormErrors.push('Please enter a last name');
        }
        if (userData.email === ''){
            loginFormErrors.push('Please enter your email');
        }
        if(!validateEmail(userData.email)){
            loginFormErrors.push('Please enter a valid email');
        }
        if (userData.password === ''){
            loginFormErrors.push('Please enter a password');
        }
        if (userData.password.length <= 5){
            loginFormErrors.push('Your password must be at least 6 characters');
        }

    } else {
        if (userData.email === ''){
            loginFormErrors.push('Please enter a valid email');
            valid = false;
        }
        if (userData.password === ''){
            loginFormErrors.push('Please enter your password');
            valid = false;
        }
        if (userData.password.length <= 5){
            loginFormErrors.push('Your password must be at least 6 characters');
            valid = false;
        }
    }
    Session.set("loginErros", loginFormErrors);

    return loginFormErrors.length === 0 ;
}
Template.LoginDlg.events({
    "click #facebookBtn": function(event, template){
        clearErros();
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                loginFormErrors.push('Facebook login failed');
                Session.set("loginErros", loginFormErrors);
            }
            else {
                 $('#loginModal').modal('hide');
            }
        });
      },
    "click #signUpToggle": function(event, template){
        var current  = Session.get("signUp");
        Session.set("signUp", !current);
        clearErros();
      },
      "click #submitBtn": function(event, template){
          if(Session.get("signUp")){
              userData = {
                  'firstname': $('#firstname').val(),
                  'lastname': $('#lastname').val(),
                  'email': $('#email').val(),
                  'password': $('#password').val()
              };
              if(validateUserData(userData)){
                  var userObject = {
                      username: userData.firstname,
                      email: userData.email,
                      password: userData.password,
                      profile: {name:userData.firstname + " " + userData.lastname}
                  };
                  Accounts.createUser(userObject, function(err){
                      if (err) {
                          loginFormErrors.push(err.reason);
                          Session.set('loginErros', loginFormErrors);
                      }
                      else {
                           $('#loginModal').modal('hide');
                      }
                   });
              }
          } else {
              userData = {
                  'email': $('#email').val(),
                  'password': $('#password').val()
              };
              if(validateUserData(userData)){
                  Meteor.loginWithPassword(userData.email, userData.password, function(err){
                   if (err){
                       loginFormErrors.push(err.reason);
                       Session.set('loginErros', loginFormErrors);
                   }
                   else{
                        $('#loginModal').modal('hide');
                   }
                 });
              }
          }
        },
});

Template.LoginDlg.helpers({
    signUp: function(){
        return Session.get("signUp");
    },
    message: function(){
        if (Session.get("signUp")){
            return 'Already have an account?';
        }
        return 'Create and account?';
    },
    buttonLbl: function(){
        if (Session.get("signUp")){
            return 'Sign Up';
        }
        return 'Sign In';
    },
    linkLbl: function(){
        if (Session.get("signUp")){
            return 'Sign In';
        }
        return 'Sign Up';
    },
    loginErros: function (){
        return Session.get("loginErros");
    },
    loginErrosPresent: function() {
        var errs = Session.get("loginErros");
        if(typeof errs !== 'undefined'){
            return errs.length > 0;
        }
        else {
         return false;
        }
    }

});

$(function() {

  console.log('working');

  $('#login').on('click', function() {
    console.log('awesome');
    navigator.id.request();
  });

  $('#signout').on('click', function(event) {
    event.preventDefault();
    navigator.id.logout();
  });

  var email = getEmail() || null;
  console.log(email);

  navigator.id.watch({
    loggedInUser: email,
    onlogin: function(assertion) {
      $.post('/auth/login', {assertion: assertion}).success(function() {
        window.location.reload();
      })
    },
    onlogout: function() {
      window.location = '/auth/logout';
    }
  });

});
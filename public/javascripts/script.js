$(function() {

  $('#login').on('submit', function(event) {
    event.preventDefault();
    navigator.id.request();
  });

  $('#signout').on('click', function(event) {
    event.preventDefault();
    navigator.id.logout();
  });

  var email = $.cookie('email') || null;

  // Mozilla Persona integration
  navigator.id.watch({
    loggedInUser: email,
    onlogin: function(assertion) {
      var token = $('#token').val();
      $.post('/auth/login', {assertion: assertion, _csrf: token}, function(data) {
        window.location.reload();
      });
    },
    onlogout: function() {
      window.location = '/auth/logout';
    }
  });
  
  // twitter
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
});
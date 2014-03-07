
$(document).ready(function () {
  var $modalNotification = $('.modal-notification');

  var $loginRequest = function(data){
    $.ajax({
      url: "/login",
      type: "POST",
      data: data
    }).error(function(err){
      var msg = err.responseJSON.error;
      if (err.status == 400){
        msg = msg + ' (are you using localhost?)';
      } else if (err.status == 403){
        msg = 'Not authorized to access that resource.';
      } else if (err.status == 401){
        msg = 'Email or password not found.';
      }
      $modalNotification.html(msg).finish().slideDown().delay(5000).slideUp();
    }).done(function(data){
      window.location = data.location;
    });
  };

  $('.login').on('submit',function(e){
    e.preventDefault();
    $loginRequest({
      u: e.target[0].value,
      p: e.target[1].value
    });
  });

  $('.modal').find('.js-btn').on('click', function() {
    $(document.body).addClass('modal-open');
  });

  $('.modal-close').on('click', function() {
    $(document.body).removeClass('modal-open');
  });

  $('.modal-bg').on('click', function() {
    $(document.body).removeClass('modal-open');
  });
});

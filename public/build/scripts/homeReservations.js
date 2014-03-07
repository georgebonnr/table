$('.reservationInit').on('submit', function(e){
    e.preventDefault();
    var phone = $(this)[0][1].value.replace(/\D/g,'');
    $.ajax({
      url: "/api/v1/users",
      type: "GET",
      data: {phone: phone}
    }).error(function(err){
      console.log(err);
    }).done(function(data){
      var person;
      if (data.data && data.data[0]){
        person = data.data[0];
        $reservationInit.html('');
        $reservationInit.append('<h1>' + person.firstName + ' ' + person.lastName +'</h1>');
        $reservationInit.data('person', person);
      } else {
        $modalNotification.text('number not found').finish().slideDown().delay(5000).slideUp();
      }
    });
  });

$('.reservationComplete').on('submit', function(e){
  e.preventDefault();
  var size = this[1].valueAsNumber;
  if (size > $reservationInit.data('capacity')) {
    return $modalNotification.html('table does not have capacity').finish().slideDown().delay(5000).slideUp();
  }
  $.ajax({
    url: "/api/v1/reservations",
    type: "POST",
    data: {
      email: $reservationInit.data('person').email,
      phone: $reservationInit.data('person').phone,
      time: $reservationInit.data('dateTime'),
      size: size,
      table: $reservationInit.data('table')
    }
  }).error(function(err){
    console.log(err);
    $modalNotification.html(err.responseText).finish().slideDown().delay(5000).slideUp();
  }).done(function(data){
    console.log('success',data);
    $reservationInit = null;
    $('.modal-close').trigger('click');
    $('.tab.active').trigger('click');
  });
});

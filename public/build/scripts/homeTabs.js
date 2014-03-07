$(document).ready(function(){
  $('.tabs').on('click', '.tab', function(e){
    e.preventDefault();
    var dateTime = getDateTime(datePicker, this);
    client.dateTime = target = new Date(dateTime.year, dateTime.month-1, dateTime.day, dateTime.hour, dateTime.minutes);
    var start = new Date(dateTime.year, dateTime.month-1, dateTime.day, dateTime.hour, dateTime.minutes);
    var end = new Date(dateTime.year, dateTime.month-1, dateTime.day, dateTime.hour, dateTime.minutes);
    start.setHours(target.getHours() - 2);
    end.setHours(target.getHours() + 2);
    $.ajax({
      url: "/api/v1/reservations",
      type: "GET",
      data: {
        start: start,
        end: end
      }
    }).error(function(err){
      console.log(err);
    }).done(function(data){
      $tables.removeClass('reserved');
      if (!data) {return console.log('no reservations for this period');}
      if (data.data) {data = data.data;}
      for (var i=0; i<data.length; i++){
        var tableId = '#' + data[i].table;
        $(tableId).addClass('reserved');
      }
    });
  });


  /* if in tab mode */
  $(".tabs").on('click', '.tab', function() {
    event.preventDefault();
    var activeTab = $(this).attr("rel");
    $(".tabs .tab").removeClass("active");
    $(this).addClass("active");
  });
});

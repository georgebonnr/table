var reservations, day;
var days = [0,0,0,0,0,0,0];
var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

$.ajax({
  url: '/api/v1/reservations',
  type: 'GET',
}).error(function(err){
  console.log(err);
}).done(function(data){
  reservations = data.data;
  for (var i in reservations){
    addToDays(reservations[i].time);
  }
  renderDays();
});



function renderDays(){
  console.log('days', days);
  var y = d3.scale.linear().domain([0, d3.max(days)]).range([0, 400]);

  d3.select(".d3")
    .selectAll("div")
      .data(days)
    .enter().append("div")
      .style("height", function(d) { return y(d) + "px"; })
      .style('width', '100px')
      .append('span')
      .text(function(d, i) { return dayNames[i]; })
      .append('span')
      .attr('class', 'label')
      .text(function(d) { return d; })
}

function addToDays(string){
  var day = new Date(string).getDay();
  days[day] += 1;
}
;
// dates and times
datePicker = $('.datePicker')[0];

function getDateTime(date, time){
  date = date.value.split('-');
  time.value = time.value || time.text;
  time = time.value.split(':');
  var isPm = time[1].slice(2);
  time[1] = time[1].slice(0,2);
  if (isPm === "pm" && time[0] < 12){
    time[0] = (parseInt(time[0],10) + 12).toString();
  }
  var result = {
    year: parseInt(date[0],10),
    month: parseInt(date[1],10),
    day: parseInt(date[2],10),
    hour: parseInt(time[0],10),
    minutes: parseInt(time[1],10)
  };
  return result;
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    console.log(local.toJSON());
    return local.toJSON().slice(0,10);
});

function resetDate(dateInput){
  dateInput.value = (new Date().toDateInputValue());
}

resetDate(datePicker);

datePicker.onchange = function(e){
  $('.tab.active').trigger('click');
};

$.ajax({
  url: "/api/v1/preferences",
  type: "GET",
}).error(function(err){
  console.log(err);
}).done(function(data){
  console.log('success',data);
  data = data.data ? data.data : data;
  if (data.hours){
    hoursStart = hoursPicker.indexOf(data.hours.open);
    hoursEnd = hoursPicker.indexOf(data.hours.close);
    // for simplicity, ignoring restaurants that close in the AM
    $tabs[0].firstElementChild.text = data.hours.open;
    index = hoursStart;
    index++;
    while (index < hoursEnd){
      index++;
      $tabs.append("<a href='' class='tab'>" + hoursPicker[index] + '</a>');
    }
  } else {
    $tableContaner.html('<h1>No hours have been set for this organization – unable to populate time picker</h1>');
  }
});

$('#today').on('click',function(e){
  e.preventDefault();
  resetDate(datePicker);
  $('.tab.active').trigger('click');
});


// variables
client = {};
hoursPicker = ['12:00am','12:30am','1:00am','1:30am','2:30am','3:00am',
'3:30am','4:00am','4:30am','5:00am','5:30am','6:00am','6:30am','7:00am',
'7:30am','8:00am','8:30am','9:00am','9:30am','10:00am','10:30am','11:00am',
'11:30am','12:00pm','12:30pm','1:00pm','1:30pm','2:00pm','2:30pm','3:00pm','3:30pm',
'4:00pm','4:30pm','5:00pm','5:30pm','6:00pm','6:30pm','7:00pm','7:30pm',
'8:00pm','8:30pm','9:00pm','9:30pm','10:00pm','10:30pm','11:00pm','11:30pm'];


// tabs
$tabs = $('.tabs');
$(".tab-content").show();


// forms
$modalNotification = $('.modal-notification');
$reservationInit = null;
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
$tableContainer = $('#tables');
var $tables;

function makeTable(container, t){
  container.append('<li> <div id="' + t.name + '" class="table"><div>' + t.max + '</div><span>' + t.name + '</span></div></li>');
}

$.ajax({
  url: "/api/v1/tables",
  type: "GET"
}).error(function(err){
  console.log(err);
}).done(function(data){
  var tables = data.data;
  $tableContainer.html('');
  for (var i=0; i<tables.length; i++){
    makeTable($tableContainer, tables[i]);
  }
  $tables = $('.table');
  $('.tab.active').trigger('click');
});

$('#tables').on('click', '.table:not(.reserved)', function (e) {
  $('.js-btn li').trigger('click');
  $('.modal-inner').addClass('reservationsModal');
  $reservationInit = $('.reservationInit');
  $reservationInit.data('table', e.currentTarget.lastElementChild.innerHTML);
  $reservationInit.data('capacity', parseInt(e.currentTarget.firstElementChild.innerHTML, 10));
  $reservationInit.data('dateTime', client.dateTime);
});
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
    console.log('data',data);
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

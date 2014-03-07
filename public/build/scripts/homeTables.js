var $tableContainer;
var $tables;

function makeTable(container, t){
  container.append('<li> <div id="' + t.name + '" class="table"><div>' + t.max + '</div><span>' + t.name + '</span></div></li>');
}

$(document).ready(function(){
  $tableContainer = $('#tables');

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

});


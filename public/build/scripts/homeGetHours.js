$(document).ready(function(){
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
  
});

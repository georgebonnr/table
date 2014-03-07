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

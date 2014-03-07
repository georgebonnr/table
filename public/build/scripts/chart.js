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

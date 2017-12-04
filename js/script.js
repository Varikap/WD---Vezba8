$(document).ready(function(e){

	var api_key = "3726fe9cef4ab9d506ee77d8d8f7f3d1";
	var current_weather_url = "http://api.openweathermap.org/data/2.5/weather?";
	var five_day_forecast = "http://api.openweathermap.org/data/2.5/forecast?";
	var icon_url = "http://openweathermap.org/img/w/";

	$("#searchForm").submit(function(e) {
		e.preventDefault();

		var city = $("#txtLocation").val().trim();
		if (city != "")
		{
			var parameters = $.param({q: city,appid: api_key});

			$.ajax({
				url: current_weather_url + parameters,
				type: 'GET',
				dataType: 'json',
				success: function(response) {
					var location = response.name;
					var icon = response.weather[0].icon;
					var temp = convert(response.main.temp);
					var condition = response.weather[0].main;

					$("#results_containter .panel-body").empty();

					var h3 = $("<h3></h3>");
					h3.text(location);
					var tempSpan = $("<span class='label label-info'></span>");
					tempSpan.html(temp+"&#8451;");
					h3.append(tempSpan);
					$("#results_containter .panel-body").append(h3);

					var h4 = $("<h4></h4>");
					h4.text(condition);
					var iconImg = $("<img src='" + icon_url + icon + ".png'/>");
					h4.append(iconImg);
					$("#results_containter .panel-body").append(h4);
				},
				error: function(request, message, error) {
					alert(message);
				}
			});
		}
	});

});

function convert(temp)
{
	return (temp-273.15).toFixed(1);
}
//import CalendarHM from '../src/calendar_visualization/calendar_chart';
//import React from "react";
//import ReactDOM from "react-dom";


looker.plugins.visualizations.add({
	create: function(element, config){
		element.innerHTML = "<h1>Ready to render!</h1>";
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
		var html = "<h1>Ready to render!</h1>";
		// for(var row of data) {
		// 	var cell = row[queryResponse.fields.dimensions[0].name];
		// 	html += LookerCharts.Utils.htmlForCell(cell);
		// }
		element.innerHTML = html;
		doneRendering()
	}
});
"use strict";

/* Get or create the application global variable */
var App = App || {};

var d3Canvas = function() {
	var svgContainer;

	function draw(zvalueslider){
     	

	d3.csv('data/058.csv' , function(data){

	d3.selectAll("svg").remove();
	svgContainer = d3.select("body").append("svg")
	                                  .attr("width", 500)
	                                   .attr("height", 500);

	var zvalues = d3.nest()
	  .key(function(d) { return (parseFloat(d.Points1)).toFixed(2); })
	  .entries(data);

	    function findPointZvalueY(key){
	  		for(var i in zvalues){
	  			if(zvalues[i].key == key){
	  				// for(var j in zvalues[i].values){
	  				// return parseFloat(zvalues[i].values[j].Points2);
	  			// }r
	  			console.log("key is", key);
	  			return zvalues[i].values;
	  			}
	  		}

	  }

	  // var key = zvalueslider;
	  // console.log("key now is", key);

     var keyvalues = findPointZvalueY(zvalueslider);


	svgContainer.selectAll("circle")
	                         .data(keyvalues)
	                         .enter()
	                         .append("circle")
	                         .attr("cx", function (d) {  return parseFloat(d.Points0)*25 + 350; })
							.attr("cy",  function (d) {  return parseFloat(d.Points2)*25 + 50; })
							.attr("r", 2)
							.attr("stroke", "#FF69B4");

		})
	}


	var publiclyAvailable = {


   render: function(zvalueslider){
     	

	d3.csv('data/058.csv' , function(data){

		d3.selectAll("svg").remove();
	var svgContainer = d3.select("body").append("svg")
	                                  .attr("width", 500)
	                                   .attr("height", 500);

	var zvalues = d3.nest()
	  .key(function(d) { return (parseFloat(d.Points1)).toFixed(1); })
	  .entries(data);

	    function findPointZvalueY(key){
	  		for(var i in zvalues){
	  			if(zvalues[i].key == key){
	  				// for(var j in zvalues[i].values){
	  				// return parseFloat(zvalues[i].values[j].Points2);
	  			// }r
	  			console.log("key is", key);
	  			return zvalues[i].values;
	  			}
	  		}

	  }



	  var key = zvalueslider;
	  console.log("key now is", key);

	  // var keyvalues = findPointZvalueY("0.0");

     var keyvalues = findPointZvalueY(zvalueslider);



	svgContainer.selectAll("circle")
	                         .data(keyvalues)
	                         .enter()
	                         .append("circle")
	                         .attr("cx", function (d) {  return parseFloat(d.Points0)*25 + 350; })
							.attr("cy",  function (d) {  return parseFloat(d.Points2)*25 + 50; })
							.attr("r", 2)
							.attr("stroke", "#FF69B4");

		})

    
    },

    clearCanvas: function(zvalueslider){
    	// d3.selectAll("svg > *").remove();
    	draw(zvalueslider);
    }

    // render("-4.2");

   };

   return publiclyAvailable;


	};


   




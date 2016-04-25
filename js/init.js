$(document).ready(function(){
  if ($("html.svg").length) {
    html =  '<div id="stepper"></div>';
    html += '<div class="wrapper"><div id="slider6"></div></div><div id="footer"></div>';
    $("#mnv-ec-stepper").append(html);

    // var fouron;

      MakeBody();
      playbutton();
      navibuttons();
      landermap();


	}
});




// var fouron = true;

var totalWidth = 595;
var totalHeight = 690;

// var legends;

var indexPlay = 0;

// var bbox = text.node().getBBox();


var margin = {top: 130, right: 20, bottom: 130, left: 20},
    width = totalWidth - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var coordinates;
var mouseX;
var mouseY;

var chartPadding = {top: 74, right: 20, bottom: 40, left: 20}
var chartHeight = 200;
var chartWidth = 240;

var projectionleft = d3.geo.stereographic()
        .center([8,56.2])
        .scale(6200)
        .translate([width/2 , height/2]);

var path = d3.geo.path()
                     .projection(projectionleft);


var projectionright = d3.geo.stereographic()
        .center([-3.5,50.5])
        .scale(3500)
        .translate([totalWidth / 4 , 270]);

var pathright = d3.geo.path()
                     .projection(projectionright);


var headerHeight = 50;

var tagColour = "#e11b17";

// var arrColours = ["#861912","#d41318","#da4f37","#e07c3e","#e5a55b","#eacd90","#e8d2c9","#f4e8e4"]
var arrColours = ["#861912","#d41318","#da4f37","#e07c3e","#e5a55b","#eacd90","#f8d999","#dcc7bf"]


var navigationText = ["Where the jobs are", "Where the homes are", "Where they will be safe", "Migrant location index", "Where they went in 2015"];

var IntroText = ["Job vacancies", "Vacant properties", "Attacks on migrants", "The Economist index", "Refugee resettlement"]

var IntroSubText = ["Per 1,000 working people aged 20-60, Aug 2015", "% of total houses, 2011", "Attacks by state, Jan 2015-Feb 2016", "Jobs, housing and safety, equally weighted", "By district, January - June 2015"]
// Scales and domains

var TEXT = [
"1. Germany desperately needs low-skilled workers, and faces shortages in some high-skilled jobs. Its overall labour force is expected to shrink sharply in the next few decades. Migrants can offer a vital boost. Smaller rural districts such as Tuttlingen, Baden-Württemberg and Sonneberg, Thuringia have more job vacancies than other parts of the country.",
"2. Only around 40% of migrants arriving in Germany in 2016 are expected to stay, but with estimates suggesting an influx of up to 2m new asylum seekers this year, the country would need to house 800,000 additional citizens and provide an extra 320,000 houses. It has the capacity for that, just not in the larger cities. Providing accommodation for families is easier in rural areas, particularly those with shrinking populations.",
"3. There has been a marked increase in the number of attacks on refugees recently. In 2015, 279 attacks on asylum seekers or their hostels caused either direct harm or put residents at serious risk. Fears of hostility in certain areas can influence migrants' destination choices. But there is no geographic pattern. Saxony has reported the most alarming figures for violent attacks, whereas neighbouring Brandenburg appears to be one of the most benign states. ",
"4. By creating an index based on housing, employment and safety data, we were able to identify districts that offer the best combination of all three metrics for newly-arrived refugees. The areas that perform well are not clustered around any particular part of Germany, rather they are scattered throughout the country away from major cities.",
"5. Germany’s recent migrant arrivals have not settled in the areas identified as ideal in our index. Many were moved by the government to big cities, like Berlin and Hannover, where spare housing is scarce and there are fewer available jobs."];

// Jobs
var colorsjobs = ["#DFB3A9", "#D58B83", "#C55458"];
var joblegend = [["More than 16", "#C55458"], ["11-16", "#D58B83"], ["Less than 11", "#DFB3A9"]];
// var joblegend = [["<11", "#DFB3A9"], ["11-15", "#D58B83"], [">15", "#C55458"]]
var colormapJobs = d3.scale.linear()
                  .domain([1, 2, 3])
                  .range(colorsjobs)


// Housing
var colorshousing = ["#B5DCCF", "#7DC4B4", "#185048"];
// var colorshousing2 = ["#B5DCCF", "#7DC4B4", "#185048"]
// ["#185048", "#7DC4B4", "#B5DCCF"];
var housinglegend = [["More than 5.0", "#5D847F"], ["2.5-5.0", "#7DC4B4"], ["Less than 2.5 ", "#B5DCCF"]]
// var housinglegend = [[">5", "#B5DCCF"], ["2.5-5", "#7DC4B4"],["<2.5", "#185048"]]

var colormapHousing = d3.scale.linear()
                  .domain([1, 2, 3])
                  .range(colorshousing)


                  // var xShare = d3.scale.linear()
                  // 	.domain([-70,70])
                  // 	.range([0, 200]);
                  //
                  //
                  // var xShareAxis = d3.svg.axis()
                  //     .scale(xShare)
                  //     .tickSize(-12)
                  //     .orient("bottom")
                  //     .ticks(5)
                  //     .tickFormat(function(d, i){
                  //     if(d==0){return d}
                  //     return d;
                  //     if(i%2==1){return d}
                  //   })

var colorsattacks = ["#B99AA5",  "#A57F8D", "#835167", "#723956", "#612546"];
// reverse:
// "#835167", "#723956", "#835167", "#A57F8D", "#B99AA5";
// ["#B99AA5",  "#A57F8D", "#835167", "#723956", "#612546"];
var attacklegend = [["More than 80", "#612546"], ["60-79", "#723956"], ["40-59", "#835167"], ["20-39", "#A57F8D"], ["Less than 20", "#B99AA5"]]
var attackscale = d3.scale.linear()
					.domain([20, 40, 60, 80, 100])
					.range(colorsattacks);
					// number_of_attacks_2


var colorSweetspot = ["#C55458", "#D58B83", "#DFB3A9", "#A5BFD3", "#658CAA", "#0059b3", "#000099"];
// ["#1B4C63", "#20668E", "#658CAA", "#A5BFD3", "#DFB3A9", "#D58B83", "#C55458"];
var sweetspotlegend = [["Excellent", "#000099"], ["Good", "#0059b3"], ["Moderately good", "#658CAA"], ["Neither good nor bad", "#A5BFD3"], ["Moderately poor", "#DFB3A9"], ["Poor", "#D58B83"], ["Very poor", "#C55458"]];
var Sweetplotscale = d3.scale.linear()
                  .domain([3, 4, 5, 6, 7, 8, 9])
                  .range(colorSweetspot)


var colorsZuweisungen = ["#F2C282","#E59B59", "#DE8947", "#D97937", "#984E30"];
// reverse:
// ["#984E30", "#D97937", "#DE8947", "#E59B59", "#F2C282", "#F9D59A"]
// "#F9D59A","#F2C282","#E59B59", "#DE8947", "#D97937", "#984E30"
var influxlegend = [["More than 2,000", "#984E30"], ["1,500-1,999","#D97937"], ["1,000-1,499","#DE8947"], ["500-999","#E59B59"], ["Less than 500","#F2C282"]];
// var influxlegend = [["<500", "#984E30"], ["500-999","#D97937"], ["1000-1499","#DE8947"], ["1500-1999","#E59B59"], ["2000-2499","#F2C282"]];

var refugeescaleZuweisungen = d3.scale.quantize()
                  .domain([0, 500, 1000, 1500, 2000, 2500])
                  .range(colorsZuweisungen)


var legendsarray = [joblegend, housinglegend, attacklegend, sweetspotlegend, influxlegend];



// faca65
// f6f4b8


// Buttons
var positionToggles = [50,100,150, 200, 250];
var toggles = ['1. Job', '2. Housing', '3. Attacks', '4. Influx', 'Sweetspot'];
var colorstoggles = ['white', 'white','white', 'white', 'white'];
var toggletextcolor = ['white', 'white','white', 'white', 'white'];
var colorstogglesrect = ['#C55458', '#52B6A0','#835167', '#20668E', '#DE8947'];

var headerrectColor = ['#C55458', '#52B6A0','#835167', '#20668E', '#DE8947'];





var arrrayCells = [3, 3, 5, 6, 7];
var scales = [colormapJobs, colormapHousing, attackscale, Sweetplotscale, refugeescaleZuweisungen];


var arrBands = [100000000,800000,500000,375000,250000,150000,100000,50000]

var arrPropertyTypes = ["All types","Detached","Semi-detached","Terraced","Flats & maisonettes"]

var selNav = 0;
selBand = "ALL";
selPC = "A00000000";

intStartYear = 1995;
intEndYear = 2016;
blankColour = "#efefef";
blankColour = "#fff";
missingColour = "#a2d8e7";
missingColour = "#9b8573";

intYear = 2016;
blnPlaying = false;
yCounter = 0;
blnFirstTime=true;

// var hSize = 10;

blnLoopedOnce = false;


strStandardHeader = "stepper test";





jwerty.key('←', function (i) {

	console.log("left")
	keybackwards();



});

//jwerty.key('↓', function () {
jwerty.key('→', function () {

	console.log("right")
	keyforward();



});

jwerty.key('↓', function () {
	console.log("down")
	keyforward();


});

jwerty.key('↑', function () {

	console.log("up")
	keybackwards();

});


function toggle (i, d) {

					indexPlay = i;

					colorlegend(legendsarray[indexPlay]);

          if (indexPlay == 0) {
            d3.select("#Playforwardpoly").attr("visibility", "visible")
            d3.select("#PlayBackwardpoly").attr("visibility", "hidden")
          } else if (indexPlay == 4) {
            d3.select("#Playforwardpoly").attr("visibility", "hidden")
            d3.select("#PlayBackwardpoly").attr("visibility", "visible")
          } else {
            d3.select("#Playforwardpoly").attr("visibility", "visible")
            d3.select("#PlayBackwardpoly").attr("visibility", "visible")
          }


					if (indexPlay <4) {
            d3.selectAll(".bundesland2").attr("opacity", 1)

						d3.selectAll(".BestPlaces").attr("visibility", "hidden")
						d3.selectAll(".counties").style("stroke", "white").style("stroke-width", 0)
					}

          if (indexPlay == 1) {
            d3.selectAll(".counties").attr("opacity", 0.7)
          }

          if (indexPlay == 0) {
            d3.selectAll(".cityText").attr("opacity", 1)
          } else {
            d3.selectAll(".cityText").attr("opacity", 0)
          }

          d3.select("#PlayBackward")
          .style("fill", "white")
          // .style("fill", function (d, i) {
          //   return headerrectColor[indexPlay];
          //   })

          if (indexPlay == 2) {
            d3.selectAll(".WorstPlacesText").attr("visibility", "visible")
            d3.selectAll(".lineworstplace").attr("visibility", "visible")

            d3.selectAll(".TuttlingenLine").attr("visibility", "hidden")
            d3.selectAll(".Tuttlingen").attr("visibility", "hidden")
            d3.selectAll(".HildburghausenLine").attr("visibility", "hidden")
            d3.selectAll(".Hildburghausen").attr("visibility", "hidden")
            d3.selectAll(".MainTauberKreisLine").attr("visibility", "hidden")
            d3.selectAll(".MainTauberKreis").attr("visibility", "hidden")
            d3.selectAll(".MainTauberKreisBackground").attr("visibility", "hidden")


          } else if (indexPlay == 0) {

            d3.selectAll(".TuttlingenLine").attr("visibility", "visible")
            d3.selectAll(".Tuttlingen").attr("visibility", "visible")
            d3.selectAll(".HildburghausenLine").attr("visibility", "visible")
            d3.selectAll(".Hildburghausen").attr("visibility", "visible")
            d3.selectAll(".MainTauberKreisLine").attr("visibility", "visible")
            d3.selectAll(".MainTauberKreis").attr("visibility", "visible")
            d3.selectAll(".MainTauberKreisBackground").attr("visibility", "visible")

            d3.selectAll(".WorstPlacesText").attr("visibility", "hidden")
            d3.selectAll(".lineworstplace").attr("visibility", "hidden")

          } else {
            d3.selectAll(".WorstPlacesText").attr("visibility", "hidden")
            d3.selectAll(".lineworstplace").attr("visibility", "hidden")
            d3.selectAll(".TuttlingenLine").attr("visibility", "hidden")
            d3.selectAll(".Tuttlingen").attr("visibility", "hidden")
            d3.selectAll(".HildburghausenLine").attr("visibility", "hidden")
            d3.selectAll(".Hildburghausen").attr("visibility", "hidden")
            d3.selectAll(".MainTauberKreisLine").attr("visibility", "hidden")
            d3.selectAll(".MainTauberKreis").attr("visibility", "hidden")
            d3.selectAll(".MainTauberKreisBackground").attr("visibility", "hidden")


           }

          d3.select("#Playforward")
          .style("fill", "white")
          // .style("fill", function (d, i) {
          // return headerrectColor[indexPlay];
          // })









					if (indexPlay == 4) {

            // fouron = true;

            d3.selectAll(".bundesland").attr("opacity", 1)

            d3.selectAll(".bundesland2").attr("opacity", 0)

						d3.selectAll(".BestPlaces").attr("visibility", "visible")

						d3.selectAll(".counties")
						.filter(function(d) {
						// console.log(d.properties.Sweetspot_2 >= 8);
						return (d.properties.Sweetspot_2 >= 8);
						})
            .attr("stroke-miterlimit", 1)
						.style("stroke", "#0059b3")
						.style("stroke-width", 3);
					} else {
            d3.selectAll(".bundesland").attr("opacity", 0)
          }


					d3.select(".headerRect").attr("fill", headerrectColor[indexPlay])
					d3.select(".buttonstext").text(navigationText[indexPlay])
					d3.select(".header2").text(IntroText[indexPlay])
					d3.select(".subheader2").text(IntroSubText[indexPlay])

          if (indexPlay == 4) {

            d3.selectAll(".bundesland").attr("opacity", 1)

            d3.select("#TextExplainer")
            .text(TEXT[indexPlay])
            .attr("y", 365)

          }  else if (indexPlay == 3) {

              d3.selectAll(".bundesland").attr("opacity", 0)

              d3.select("#TextExplainer")
              .text(TEXT[indexPlay])
              .attr("y", 365)
             }


          else {

            d3.selectAll(".bundesland").attr("opacity", 0)

            d3.select("#TextExplainer")
            .text(TEXT[indexPlay])
            .attr("y", 365)
          }

					WrapIt();


                    d3.selectAll(".counties")
		                    .transition()
		                    .duration(function (d, index) {
		                    	return index * 3;
		                    })
		                    .attr("fill", function (d) {

                    if (d3.select(this).attr("id") == "land_null") {return "#fff"}

                  	var Attacks = +d.properties.number_of_attacks_2;
                		var OffStell = +d.properties.OffStell;
										var LEQfort = +d.properties.LEQfort;
										var Zuweisungen = +d.properties.Zuweisungen;
										var Sweetspots = +d.properties.Sweetspot_2;
										// var ret;
										// console.log(d.properties.OffStell[1]);
										if (i == 0) { return colormapJobs(OffStell);}
										else if (i == 1) { return colormapHousing(LEQfort);}
										else if (i == 2) {
                          if (isNaN(Attacks)) {return "#B696A2"}
                          return attackscale(Attacks)
                    }
										else if (i == 3) { return Sweetplotscale(Sweetspots); }
										else if (i == 4) { return refugeescaleZuweisungen(Zuweisungen); }

										// console.log(ret);
										//  console.log(i)

								  //       return ret;
		                    })

		   //          legends = function (numberCells, scaling) {

					// 		var legending = d3.legend.color()
					// 				  .shapeWidth(50)
					// 				  .shapeHeight(12)
					// 				  .orient('vertical')
					// 				   .cells(numberCells)
					// 				   .scale(scaling);

					// 		d3.selectAll(".d3legend")
					// 				  .attr("font-family", "Officina, Calibri, Arial")
					// 				  .style("font-weight", 13)
					// 				  .call(legending);
					// }



                    d3.selectAll(".togglerect").attr("fill", "#e6e6e6")
                    .attr("stroke", function(i) { return colorstoggles[d]}).attr("stroke-width", 0.7);
	                // d3.selectAll(".toggletext").style("fill", "red");

                    d3.select('#rectus_' + indexPlay).attr('fill', function (d, i) {
                      return colorstogglesrect[indexPlay];
                    }).attr("stroke", function(d) { return colorstoggles[i]})
                    .attr("stroke-width", 0.7);


	                 d3.select('#textus_' + i).style('fill', function (d, i) {
                      return toggletextcolor[i];
                    });



                    d3.select('#textus_' + d).attr('fill', function (d, i) {
                      return "white";
                      // return colorstoggles[d];
                    });
                    // .attr("stroke", function(d) { return colors[d]});
                    // selected = true;

                    // legends(arrrayCells[i], scales[i]);
                }











function player () {


				        d3.select("#Playforward")
									.on("click",function (){


									if (indexPlay<4) {  indexPlay += 1;}
									else if (indexPlay == 4) {  indexPlay = 4;}

                  if (indexPlay == 0 || indexPlay == 4) {
                    d3.selectAll(".cityText").attr("opacity", 1)
                  } else {
                    d3.selectAll(".cityText").attr("opacity", 0)
                  }

                  if (indexPlay == 1) {
                    d3.selectAll(".counties").attr("opacity", 0.7)
                  }






                  d3.select("#PlayBackward")
                  .style("fill", "white")
                  // .style("fill", function (d, i) {
                  //   return headerrectColor[indexPlay];
                  //   })

                  d3.select("#Playforwardpoly").style("fill", "grey")
                  d3.select("#PlayBackwardpoly").style("fill", "grey")


									d3.select(".buttonstext").text(navigationText[indexPlay])
									d3.select(".header2").text(IntroText[indexPlay])
									d3.select(".subheader2").text(IntroSubText[indexPlay])

                  if (indexPlay == 4) {

                    d3.selectAll(".bundesland").attr("opacity", 1)


                    d3.select("#TextExplainer")
                    .text(TEXT[indexPlay])
                    .attr("y", 365)

                  } else if (indexPlay == 3) {

                      d3.selectAll(".bundesland").attr("opacity", 0)

                      d3.select("#TextExplainer")
                      .text(TEXT[indexPlay])
                      .attr("y", 365)
                     }


                  else {

                    d3.selectAll(".bundesland").attr("opacity", 0)

                    d3.select("#TextExplainer")
                    .text(TEXT[indexPlay])
                    .attr("y", 365)
                  }

									WrapIt();

                  if (indexPlay == 2) {
                    d3.selectAll(".WorstPlacesText").attr("visibility", "visible")
                    d3.selectAll(".lineworstplace").attr("visibility", "visible")

                  } else if (indexPlay == 0) {

                    d3.selectAll(".TuttlingenLine").attr("visibility", "visible")
                    d3.selectAll(".Tuttlingen").attr("visibility", "visible")
                    d3.selectAll(".HildburghausenLine").attr("visibility", "visible")
                    d3.selectAll(".Hildburghausen").attr("visibility", "visible")
                    d3.selectAll(".MainTauberKreisLine").attr("visibility", "visible")
                    d3.selectAll(".MainTauberKreis").attr("visibility", "visible")
                    d3.selectAll(".MainTauberKreisBackground").attr("visibility", "visible")


                  } else {
                    d3.selectAll(".WorstPlacesText").attr("visibility", "hidden")
                    d3.selectAll(".lineworstplace").attr("visibility", "hidden")
                    d3.selectAll(".TuttlingenLine").attr("visibility", "hidden")
                    d3.selectAll(".Tuttlingen").attr("visibility", "hidden")
                    d3.selectAll(".HildburghausenLine").attr("visibility", "hidden")
                    d3.selectAll(".Hildburghausen").attr("visibility", "hidden")
                    d3.selectAll(".MainTauberKreisLine").attr("visibility", "hidden")
                    d3.selectAll(".MainTauberKreis").attr("visibility", "hidden")
                    d3.selectAll(".MainTauberKreisBackground").attr("visibility", "hidden")


                   }

									d3.select(".headerRect").attr("fill", headerrectColor[indexPlay])

									d3.selectAll(".togglerect").attr("fill", "#e6e6e6");
				                    // d3.select('#rectus_' + indexPlay).attr('fill', "grey");

				                    d3.select('#rectus_' + indexPlay).attr('fill', function (d, i) {
				                      return colorstogglesrect[indexPlay];
				                    }).attr("stroke", function(d) { return colorstoggles[indexPlay]})
				                    .attr("stroke-width", 0.7);


									// console.log(indexPlay)

									toggle(indexPlay);

									if (indexPlay == 4) {

                    d3.selectAll(".bundesland").attr("opacity", 1)

												d3.selectAll(".counties")
                        .sort(function(a, b) {
                          return a.Sweetspot_2 - b.Sweetspot_2; })
												.filter(function(d) {
												// console.log(d.properties.Sweetspot_2 >= 8);

													return (d.properties.Sweetspot_2 >= 8);
												})
												.style("stroke", "#0059b3")
                        .attr("stroke-miterlimit", 1)
												.style("stroke-width", 3);
											} else {
                        d3.selectAll(".bundesland").attr("opacity", 0)

                      }

                      if (indexPlay == 1) {
                        d3.selectAll(".counties").attr("opacity", 0.7)
                      }

									// LoopThrough(false);
									// blnLoopedOnce = false;
									})
                  .on("mouseenter",function (){
                    d3.select(this).style("fill", "white")
                    d3.select("#Playforwardpoly")
                    .style("fill", "grey")
                    .style("fill", function (d, i) {
                      return headerrectColor[indexPlay];
                      })
                  })
                  .on("mouseleave",function (){
                    d3.select(this).transition().duration(100)
                    .style("fill", "white")
                    // .style("fill", function (d, i) {
                    //   return headerrectColor[indexPlay];
                    //   })
                    // .style("stroke", "white")
                    d3.select("#Playforwardpoly").transition().duration(100)
                        .style("fill", "grey")
                        // .attr("stroke", function (d, i) { return headerrectColor[indexPlay]} );
                  })

							d3.select("#PlayBackward")
									.on("click",function(){


                    if (indexPlay == 0) {
                      d3.select("#Playforwardpoly").attr("visibility", "visible")
                      d3.select("#PlayBackwardpoly").attr("visibility", "hidden")
                    } else if (indexPlay == 4) {
                      d3.select("#Playforwardpoly").attr("visibility", "hidden")
                      d3.select("#PlayBackwardpoly").attr("visibility", "visible")
                    } else {
                      d3.select("#Playforwardpoly").attr("visibility", "visible")
                      d3.select("#PlayBackwardpoly").attr("visibility", "visible")
                    }

									if (indexPlay<=4 && indexPlay >0) { indexPlay -= 1;}

                  if (indexPlay == 0 || indexPlay == 4) {
                    d3.selectAll(".cityText").attr("opacity", 1)
                  } else {
                    d3.selectAll(".cityText").attr("opacity", 0)
                  }


                  d3.select("#Playforward").style("fill", function (d, i) {
                    return headerrectColor[indexPlay];
                    })

                    d3.select("#Playforwardpoly").style("fill", "grey")
                    d3.select("#PlayBackwardpoly").style("fill", "grey")

                  if (indexPlay == 2) {
                    d3.selectAll(".WorstPlacesText").attr("visibility", "visible")
                    d3.selectAll(".lineworstplace").attr("visibility", "visible")

                  } else if (indexPlay == 0) {

                    d3.selectAll(".TuttlingenLine").attr("visibility", "visible")
                    d3.selectAll(".Tuttlingen").attr("visibility", "visible")
                    d3.selectAll(".HildburghausenLine").attr("visibility", "visible")
                    d3.selectAll(".Hildburghausen").attr("visibility", "visible")
                    d3.selectAll(".MainTauberKreisLine").attr("visibility", "visible")
                    d3.selectAll(".MainTauberKreis").attr("visibility", "visible")
                    d3.selectAll(".MainTauberKreisBackground").attr("visibility", "visible")


                  } else {
                    d3.selectAll(".WorstPlacesText").attr("visibility", "hidden")
                    d3.selectAll(".lineworstplace").attr("visibility", "hidden")
                    d3.selectAll(".TuttlingenLine").attr("visibility", "hidden")
                    d3.selectAll(".Tuttlingen").attr("visibility", "hidden")
                    d3.selectAll(".HildburghausenLine").attr("visibility", "hidden")
                    d3.selectAll(".Hildburghausen").attr("visibility", "hidden")
                    d3.selectAll(".MainTauberKreisLine").attr("visibility", "hidden")
                    d3.selectAll(".MainTauberKreis").attr("visibility", "hidden")
                    d3.selectAll(".MainTauberKreisBackground").attr("visibility", "hidden")


                   }
									d3.select(".header2").text(IntroText[indexPlay])
									d3.select(".subheader2").text(IntroSubText[indexPlay])

									d3.select(".buttonstext").text(navigationText[indexPlay])
									d3.select(".headerRect").attr("fill", headerrectColor[indexPlay])

                  if (indexPlay == 4) {

                    d3.select("#TextExplainer")
                    .text(TEXT[indexPlay])
                    .attr("y", 365)

                  } else if (indexPlay == 3) {

                      d3.selectAll(".bundesland").attr("opacity", 0)

                      d3.select("#TextExplainer")
                      .text(TEXT[indexPlay])
                      .attr("y", 365)
                     }

                  else {
                    d3.select("#TextExplainer")
                    .text(TEXT[indexPlay])
                    .attr("y", 365)
                  }

                  WrapIt();






									// else if (indexPlay=4) { indexPlay-=1;}
									// else if (indexPlay=0) { indexPlay = 0;}

									d3.selectAll(".Clickoptions")

									console.log(indexPlay)

									toggle(indexPlay);



									// LoopThrough(false);
									// blnLoopedOnce = false;
									})
                  .on("mouseenter",function (){
                    d3.select(this).style("fill", "white")
                    d3.select("#PlayBackwardpoly").style("fill", function (d, i) {
                      return headerrectColor[indexPlay];
                      })
                  })
                  .on("mouseleave",function (){
                    d3.select(this).transition().duration(100)
                    .style("fill", "white")
                    // .style("fill", function (d, i) {
                    //   return headerrectColor[indexPlay];
                    //   })
                    // .style("stroke", "white")
                    d3.select("#PlayBackwardpoly").transition().duration(100)
                        .style("fill", "grey")
                        // .attr("stroke", function (d, i) { return headerrectColor[indexPlay]} );
                  })

		}










function playbutton () {

	d3.select("#bodySVG")
		.append("g")
		    .attr("id","butPlay")
		    .attr("cursor","pointer")
			.append("title")
		    .text("Move forward in the story")
		    .attr("id","butPlayText")



		// DrawTriangle("butPlay","Playforward");
		// DrawTriangle("butPlay","PlayBackward");




		player(0);

		// d3.select("#Playforward")
		//   .attr("transform","translate(440,90),rotate(270),scale(1)")
		//   .attr("fill","#ccc")
		//   .style("visibility","visible")
    //
		// d3.select("#PlayBackward")
		//   .attr("transform","translate(170,60),rotate(90),scale(1)")
		//   .attr("fill","#ccc")
		//   .style("visibility","visible")
    //
    //
    //
    //
		// function DrawTriangle(strSVG, strID){
		// d3.select("#" + strSVG)
		// .append("polygon")       // attach a polygon
		//     // .style("stroke", "#CCCCCC")  // colour the line
		//     .style("fill", headerrectColor[0])
    //     .attr("stroke", headerrectColor[0])
		//     .style("stroke-width", 3)    // remove any fill colour
		//     .attr("points", "7,5, 15,40, 23,5")  // x,y points
		//     .attr("id",strID)
		//     ;
		// }


}







function MakeBody(){


  var divMaptip = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

      divMaptip
                  				.html(
                  				"<div style='font-family:Officina;font-size: 18px;line-height:16px;margin-bottom: 4px;' id='strIndustry'></div>"
                  				+ "<div id='jobs'></div>"
                          + "<div id='housing'></div>"
                          + "<div id='safety'></div>"
                          + "<div id='sweet'></div>"
                          + "<div id='go'></div>"
                  				// + "<svg id='shareChart' width='250' height='120'></svg>"
                  				)



// var fullCanvas = d3.select("#stepper").append("g")

// //Add header
//  headerSection = fullCanvas.append("svg")
//     .attr("id","headerSVG")
//     .attr("width", totalWidth)
//     .attr("height", headerHeight)
//     .append("g");





// headerSection.append("text")
//         .text(intYear)
//         .attr("x", 526)
//         .attr("y", 35)
//         .style("font-family", "Officina, Calibri, Arial")
//         .attr("class","yearDisplay");




var fullCanvas = d3.select("#stepper")
    .append("svg")
    .attr("id","bodySVG")
    .attr("width", totalWidth)
    .attr("height", totalHeight);



var redrect = fullCanvas
.append("rect")
        .style("fill",tagColour)
        .attr("x", 0)
        .attr("y", 1)
        .attr("width", 10)
        .attr("height", 30);

var redline = fullCanvas.append("line")
        .attr("x1",0)
        .attr("y1",1)
        .attr("x2",totalWidth)
        .attr("y2",1)
        .style("stroke",tagColour)
        .style("stroke-width","1px")
        .attr("shape-rendering","crispEdges");


var header = fullCanvas.append("text")
        .text("The refugee relocation index: Germany")
        .attr("x", 21)
        .attr("y", 29)
          // .style("font-weight", "600")
          .style("font-size", 18)
        .style("font-family", "Officina_bold, Calibri, Arial")
        .attr("class","header");

var header = fullCanvas.append("text")
        .text("Where in Germany offers refugees the best opportunities?")
        .attr("x", 21)
        .attr("y", 50)
        .style("font-family", "Officina, Calibri, Arial")
        .style("font-size", 14)
        .attr("class","subheader");


var TextExplainer1 = fullCanvas
		.append("text")
		.attr("class", "TextExplainer1")
        .attr("id","TextExplainer")
        .text(TEXT[0])
        .style("font-size", 16)
        .style("text-anchor", "left")
        .attr("x", 20)
        .attr("y", 365)
        // .style("fill", "#586a74 ")
        .style("font-family", "Officina, Calibri, Arial")

WrapIt();



// d3.select("#shareChart")
//   .append("g")
//     .attr("class", "x Shareaxis")
//     .attr("transform", "translate(9," + 92 + ")")
//     .call(xShareAxis)
//     .attr("id","xShareAxis")

d3.select("#shareChart")
  .append("line")
  .attr("x1",0)
  .attr("x2",236)
  .attr("y1",4)
  .attr("y2",4)
  .attr("shape-rendering","crispEdges")
  .attr("stroke","#ddd");

d3.select("#shareChart")
  .append("text")
  .attr("x",150)
  .attr("y",60)
  .attr("font-family","Officina")
  .attr("font-size","12px")
  .append("tspan")
  .attr("font-family","Officina 600")
  .attr("id","strRev")


// d3.select("#shareChart")
//   .append("text")
//   .attr("x",0)
//   .attr("y",20)
//   .attr("font-size","12px")
//   .attr("font-family","Officina")
//   .text("% change if voted like Equatorial Guinea or Egypt")

d3.select("#shareChart")
    .append("text")
    .attr("x",0)
    .attr("y",60)
    .attr("font-family","Officina")
    .attr("font-size","12px")
    .append("tspan")
    .style("font-weight", "900")
    .attr("font-family","Officina")
    .attr("id","percentChange")

// d3.select("#shareChart")
//   .append("text")
//   .attr("x",xShare(55) + 27)
//   .attr("y",93)
//   .attr("font-family","Officina")
//   .text("+")
//   .attr("font-size","22px")
//
// d3.select("#shareChart")
//   .append("text")
//   .attr("x",xShare(-55) - 8)
//   .attr("y",91)
//   .attr("font-family","Officina")
//   .text("-")
//   .attr("font-size","22px")
//
//
// d3.select("#shareChart")
//   .append("line")
//   .attr("x1",xShare(-55) + 6)
//   .attr("x2",xShare(55) + 22)
//   .attr("y1",85)
//   .attr("y2",85)
//   .attr("stroke-width",3)
//   .attr("shape-rendering","crispEdges")
//   .attr("stroke","#ddd");


// d3.select("#shareChart")
//   .append("line")
//   .attr("x1",xShare(0) + 10)
//   .attr("x2",xShare(0) + 10)
//   .attr("y1",75)
//   .attr("y2",95)
//   .attr("stroke-width",3)
//   .attr("shape-rendering","crispEdges")
//   .attr("stroke","#ddd");

// d3.select("#shareChart")
//   .append("rect")
//   .classed("rectneg", true)
//   .attr("height",12)
//   .attr("width",18)
//   .attr("x",40)
//   .attr("y",79)
//   .attr("fill","#db5c58")



// d3.select("#shareChart")
//     .append("rect")
//     .classed("rectpos", true)
//     .attr("height",12)
//     .attr("width",18)
//     .attr("x",160)
//     .attr("y",79)
//     .attr("fill","#006aa0")


var WhereToGo = fullCanvas.append("g").classed("BestPlaces", true).attr("visibility", "hidden")

	WhereToGo
		.append("rect")
		.classed("BestPlacesRect", true)
		.attr("x", 20)
		.attr("y", 542)
		.attr("rx", 2)
		.attr("ry", 2)
		.attr("width", 130)
		.attr("height", 50).attr("fill", "none")
		.attr("stroke-width", 2.5)
		.attr("stroke", "#0059b3")
    .attr("fill", "white")
    // .attr("cursor", "pointer")
    // .on("click", function (d, i) {
    //
    //   console.log(fouron)
    //
    //   d3.selectAll(".counties").attr("fill-opacity", function (d, i) {
    //
    //     if (fouron == true) {
    //                     if (d.properties.Sweetspot_2 >= 8) { return 0.8;}
    //                     else { return 0.2 }
    //                     fouron = false;
    //                 } else if (!fouron = ) {
    //
    //                                      fouron = false;
    //                                     }
    //       })
    //
    //   fouron = true;
    //       })
    // .on("mouseover", function () {
    //   d3.select(this).attr("fill", "#0059b3")
    //   d3.select(".BestPlacesText1").style("fill", "white")
    //   d3.select(".BestPlacesText2").style("fill", "white")
    // })
    // .on("mouseleave", function () {
    //   d3.select(this).attr("fill", "white")
    //   d3.select(".BestPlacesText1").style("fill", "#0059b3")
    //   d3.select(".BestPlacesText2").style("fill", "#0059b3")
    // })

	// WhereToGo
	// 	.append("line")
	// 	.classed("BestPlacesline1", true)
	// 	.attr("x1", 149)
	// 	.attr("y1", 352)
	// 	.attr("x2", 330)
	// 	.attr("y2", 400)
	// 	.attr("stroke-width", 2.5)
	// 	.attr("stroke", "black")

	// WhereToGo
	// 	.append("line")
	// 	.classed("BestPlacesline2", true)
	// 	.attr("x1", 149)
	// 	.attr("y1", 352)
	// 	.attr("x2", 180)
	// 	.attr("y2", 510)
	// 	.attr("stroke-width", 2.5)
	// 	.attr("stroke", "black")

// where not to go






// Lines and towns mentioned



///





/// where to go

   WhereToGo
		.append("text")
		.classed("BestPlacesText1", true)
		.attr("x", 85)
		.attr("y", 562)
		.style("fill", "#0059b3")
		.text("Where refugees")
		.style("font-weight", "bold")
		.style("font-size", 18)
		.style("font-family", "Officina, Calibri, Arial")
		.attr("text-anchor", "middle")




   WhereToGo
		.append("text")
		.classed("BestPlacesText25", true)
    .attr("x", 85)
		.attr("y", 582)
		.style("fill", "#0059b3")
		.text("could go")
		.style("font-weight", "bold")
		.style("font-size", 18)
		.style("font-family", "Officina, Calibri, Arial")
		.attr("text-anchor", "middle")

   WhereToGo
		.append("text")
		.classed("BestPlacesText3", true)
    .attr("x", 30)
		.attr("y", 612)
		.style("fill", "rgb(0, 89, 179)")
		.text("Districts rated good")
		// .style("font-weight", "bold")
		.style("font-size", 14)
    .style("text-anchor", "center")
		.style("font-family", "Officina, Calibri, Arial")
		// .attr("text-anchor", "left")


    WhereToGo
 		.append("text")
 		.classed("BestPlacesText3", true)
     .attr("x", 28)
 		.attr("y", 632)
 		.style("fill", "rgb(0, 89, 179)")
 		.text("or excellent in index")
    .style("text-anchor", "center")
 		// .style("font-weight", "bold")
 		.style("font-size", 14)
 		.style("font-family", "Officina, Calibri, Arial")
 	// 	.attr("text-anchor", "left")
    // WhereToGo
  	// 	.append("rect")
  	// 	.classed("BestPlacesRectLegend", true)
    //   .attr("x", 20)
  	// 	.attr("y", 300)
  	// 	.attr("rx", 0)
  	// 	.attr("ry", 0)
  	// 	.attr("width", 18)
  	// 	.attr("height", 18).attr("fill", "none")
  	// 	// .attr("stroke-width", 2.5)
  	// 	.attr("fill", "#0059b3");

  //  WhereToGo
	// 	.append("text")
	// 	.classed("BestPlacesText4", true)
  //   .attr("x", 425)
	// 	.attr("y", 230)
	// 	.style("fill", "#0059b3")
	// 	.text("good or excellent")
	// 	.style("font-weight", "bold")
	// 	.style("font-size", 14)
	// 	.style("font-family", "Officina, Calibri, Arial")
	// 	.attr("text-anchor", "middle")

  //  WhereToGo
	// 	.append("text")
	// 	.classed("BestPlacesText5", true)
	// 	.attr("x", 85)
	// 	.attr("y", 430)
	// 	.style("fill", "black")
	// 	.text("sweetspot index")
	// 	.style("font-weight", "bold")
	// 	.style("font-size", 14)
	// 	.style("font-family", "Officina, Calibri, Arial")
	// 	.attr("text-anchor", "middle")





// d3.selectAll("rect.legendToggle")
// 	.on("click", function (d, i) {
		d3.selectAll("rect.legendToggle").on("click", function () {
			d3.selectAll(".counties")
			.style("opacity", function (d, i) {
			if (d3.select(this) == 10) {return 1}
				else {return 0.1};
			});

		})







fullCanvas.append("g")
		  .attr("class", "d3legend")
		  .attr("transform", "translate(320,50)");

var legendLabel = fullCanvas.append('g')
  .classed('legend-label-container', true);

// IntroText
// IntroSubText

var header2 = legendLabel
    .append("text")
    .attr("class", "header2")
    .text(IntroText[0])
    .attr("x", 20)
    .attr("y", 170)
    .style("fill", "black")
    .style("font-weight", "600")
        .style("font-size", 16)
    .style("font-family", "Officina, Calibri, Arial, bold")

var subheader2 = legendLabel
	.append("text")
    .attr("class", "subheader2")
    .text(IntroSubText[0])
    .attr("x", 20)
    .attr("y", 190)
    .style("fill", "#586a74 ")
        .style("font-size", 13.5)
        .style("font-weight", "900")

    .style("font-family", "Officina, Calibri, Arial")



var buttonsrect = fullCanvas
	.append("rect")
	.attr("class", "headerRect")
	.attr("x", 180)
	.attr("y", 72)
	.attr("fill", headerrectColor[0])
	.attr("rx", 1)
	.attr("ry", 1)
	.attr("width", 210)
	.attr("height", 40)
	.attr("opacity", 1);

var buttonsrectforward = fullCanvas
  	.append("rect")
  	.attr("class", "headerRectForward")
  	.attr("x", 393)
  	.attr("y", 72)
    .attr("fill", "white")
    // .style("fill", headerrectColor[0])
  	// .attr("stroke", headerrectColor[0])
    // .attr("stroke-width", 2)
    .attr("cursor","pointer")
    .attr("fill", "none")
    .attr("id","Playforward")
  	.attr("rx", 3)
  	.attr("ry", 3)
    .attr("width", 180)
  	.attr("height", 40)
  	.attr("opacity", 1);

var buttonsrectforward = fullCanvas
  	.append("rect")
  	.attr("class", "headerRectBackward")
    .attr("fill", "none")
    // .style("fill", headerrectColor[0])
  	.attr("x", 0)
  	.attr("y", 72)
    // .attr("stroke", headerrectColor[0])
    .attr("id","PlayBackward")
    .attr("cursor","pointer")
    // .attr("stroke-width", 2)
  	.attr("rx", 3)
  	.attr("ry", 3)
    .attr("width", 180)
  	.attr("height", 40)
  	.attr("opacity", 1);

var buttonstext = fullCanvas
	.append("text")
  .attr("class","buttonstext")
	.text(navigationText[0])
	.attr("x", 285)
	.attr("y", 96)
	.style("fill", "white")
	.style("text-anchor", "middle")
  .style("font-weight", "600")
	.style("pointer-events", "none")
	.style("font-family", "Officina, Calibri, Arial, bold")



fullCanvas
.append("polygon")       // attach a polygon
.style("fill", "grey")
  // .style("fill", "white")
  // .attr("stroke", headerrectColor[0])
  // .style("stroke-width", 3)    // remove any fill colour
  .attr("points", "7,5, 15,20, 23,5")  // x,y points
  .attr("id","PlayBackwardpoly")
  .style("pointer-events", "none")
  // .attr("class", "#PlayBackward")
  .attr("transform","translate(170,75),rotate(90),scale(1)")
  // .attr("fill","#ccc")
  .style("visibility","hidden")

fullCanvas
  .append("polygon")       // attach a polygon
  .style("fill", "grey")
      // .attr("stroke", headerrectColor[0])
      // .style("stroke-width", 3)    // remove any fill colour
      .attr("points", "7,5, 15,20, 23,5")  // x,y points
      .attr("id","Playforwardpoly")
      .style("pointer-events", "none")
      // .attr("class", "#Playforward")
  	  .attr("transform","translate(400,105),rotate(270),scale(1)")
  	  // .attr("fill","#ccc")
  	  .style("visibility","visible")


      if (indexPlay == 0) {
        d3.select("#Playforwardpoly").style("visibility", "visible")
        d3.select("#PlayBackwardpoly").style("visibility", "hidden")
      } else if (indexPlay == 4) {
        d3.select("#Playforwardpoly").style("visibility", "hidden")
        d3.select("#PlayBackwardpoly").style("visibility", "visible")
      } else {
        d3.select("#Playforwardpoly").style("visibility", "visible")
        d3.select("#PlayBackwardpoly").style("visibility", "visible")
      }



d3.json("datafinal/finalfinal.json", function (error, de) {



function jobsString (input) {
if (input == 1) {return "Less than 11%"}
else if (input == 2) {return "11-16%"}
else if (input == 3) {return "More than 16%"}
}

function HousingString (input) {
if (input == 1) {return "Less than 2.5%"}
else if (input == 2) {return "2.5-5.0%"}
else if (input == 3) {return "More than 5.0%"}
}

function AttackString (input) {
if (input <20) {return "Less than 20"}
else if (input >= 20 && input <= 39) {return "20-39"}
else if (input >= 40 && input <= 59) {return "40-59"}
else if (input >= 60 && input <= 79) {return "60-79"}
else if (input >= 80) {return "80 or more"}
}

function SweetspotString (input) {
if (input == 9) {return "Excellent"}
else if (input == 8) {return "Good"}
else if (input == 7) {return "Moderately good"}
else if (input == 6) {return "Neither good nor bad"}
else if (input == 5) {return "Moderately poor"}
else if (input == 4) {return "Poor"}
else if (input == 3) {return "Very poor"}
}


function InfluxString (input) {
if (input < 500) {return "Less than 500"}

else if (input >= 500 && input < 1000) {return "500-999"}
else if (input >= 1000 && input < 1500) {return "1,000-1,499"}
else if (input >= 1500 && input < 2000) {return "1,500-1,999"}
else if (input >= 2000 && input < 2500) {return "2,000-2,499"}
else if (input > 2500) {return "More than 2,500"}
}


d3.json("datafinal/lander.json", function (error, LanderData) {

      var d3map2 = fullCanvas
              .append("g")
              .classed("groupAnnotations", true)
              .selectAll("path")
              .data(topojson.feature(LanderData, LanderData.objects.lander).features)
              .enter()
              .append("path")
              .attr("id", function (d) {
              return "bundesland_" + d.properties.ID_1;
              })
              .attr("class", "bundesland2")
              .attr("stroke-miterlimit", 1)
              .attr("fill", "none")
              .style("stroke", "#fff")
              .style("stroke-width", 1.5)
              // .style("pointer-events", "visible")
              .attr("pointer-events", "none")
              .attr("d", path)
              .attr("opacity", 1)

              // d3.select(".groupAnnotations").append("line")
              //           .classed("MainTauberKreisLine", true)
              //           .attr("x1",382)
              //           .attr("y1",508)
              //           .attr("x2",493)
              //           .attr("y2",508)
              //           .style("stroke","black")
              //           .style("stroke-width","1px")
              //           // .style("stroke-dasharray","2, 2")
              //           .attr("shape-rendering","crispEdges");
              //
              // d3.select(".groupAnnotations")
              //        .append("rect")
              //        .classed("MainTauberKreisBackground", true)
              //        .attr("x", 487)
              //        .attr("y", 499)
              //        .attr("width", 100)
              //        .attr("height", 13)
              //        .attr("fill", "white")
              //        .attr("opacity", 0.8)
              //        .attr("visibility", "visible")
              //
              // d3.select(".groupAnnotations")
              //        .append("text")
              //        .classed("MainTauberKreis", true)
              //        .attr("x", 540)
              //        .attr("y", 510)
              //        .style("fill", "black")
              //        .text("Main-Tauber-Kreis")
              //        .style("font-weight", "bold")
              //        .style("font-size", 13)
              //        .style("font-family", "Officina, Calibri, Arial")
              //        .attr("text-anchor", "middle")
              //        .attr("visibility", "visible")




             d3.select(".groupAnnotations").append("line")
                     .classed("TuttlingenLine", true)
                     .attr("x1",347)
                     .attr("y1",620)
                     .attr("x2",232)
                     .attr("y2",620)
                     .style("stroke","black")
                     .style("stroke-width","1px")
                    //  .style("stroke-dasharray","2, 2")
                     .attr("shape-rendering","crispEdges");

             d3.select(".groupAnnotations")
                    .append("text")
                    .classed("Tuttlingen", true)
                    .attr("x",200)
                    .attr("y",623)
                    .style("fill", "black")
                    .text("Tuttlingen")
                    .style("font-weight", "bold")
                    .style("font-size", 13)
                    .style("font-family", "Officina, Calibri, Arial")
                    .attr("text-anchor", "middle")
                    .attr("visibility", "visible")


              d3.select(".groupAnnotations").append("line")
                      .classed("HildburghausenLine", true)
                      .attr("x1",440)
                      .attr("y1",455)
                      .attr("x2",503)
                      .attr("y2",455)
                      .style("stroke","black")
                      .style("stroke-width","1px")
                      // .style("stroke-dasharray","2, 2")
                      .attr("shape-rendering","crispEdges");

              d3.select(".groupAnnotations")
                     .append("text")
                     .classed("Hildburghausen", true)
                     .attr("x", 538)
                     .attr("y", 457)
                     .style("fill", "black")
                     .text("Sonneberg")
                     .style("font-weight", "bold")
                     .style("font-size", 13)
                     .style("font-family", "Officina, Calibri, Arial")
                     .attr("text-anchor", "middle")
                     .attr("visibility", "visible")


// State of Saxony annotation
            d3.select(".groupAnnotations").append("line")
                     .classed("lineworstplace", true)
                     .attr("x1",514)
                     .attr("y1",426)
                     .attr("x2",514)
                     .attr("y2",465)
                     .style("stroke","black")
                     .style("stroke-width","1px")
                     .attr("shape-rendering","crispEdges")
                     .attr("visibility", "hidden");

            d3.select(".groupAnnotations")
                    .append("text")
                    .classed("WorstPlacesText", true)
                    .attr("x", 545)
                    .attr("y", 478)
                    .style("fill", "black")
                    .text("State of Saxony")
                    .style("font-weight", "bold")
                    .style("font-size", 13)
                    .style("font-family", "Officina, Calibri, Arial")
                    .attr("text-anchor", "middle")
                    .attr("visibility", "hidden")


        });




	var d3map = fullCanvas
	          .append("g")
	          .selectAll("path")
	          .data((topojson.feature(de, de.objects.finalfinal).features).sort(function(a, b) {
              console.log(a.properties.Sweetspot_2)
              return a.properties.Sweetspot_2 - b.properties.Sweetspot_2; }))
	          .enter()
	          .append("path")
	          .attr("opacity", 0.9)
	          .attr("id", function (d) {
	          return "land_" + d.properties.CCA_2;
	          })
	          .attr("class", "counties")
	          .attr("fill", function (d, i) {

              if (d3.select(this).attr("id") == "land_null") {return "#fff"}
	          	return colormapJobs(+d.properties.OffStell);
	          })
            .attr("stroke-miterlimit", 1)
            .style("cursor", "pointer")
	          .style("stroke", "white")
	          .style("stroke-width", 0)
	          .attr("pointer-events", "visible")
	          .attr("d", path)
            .attr("opacity", 0.8)
	          // .attr("pointer-events", "none")
	          // .attr("opacity", 0.6)
	          .on("mouseover", ShowTT)
            .on("mouseleave", HideTT)

            // sticking this right at the top
            fullCanvas.node().appendChild(legendLabel.node());



// Tooltips

            function ShowTT (d, i) {
                coordinates = d3.mouse(this);
                mouseX = coordinates[0];
                mouseY = coordinates[1];

              d3.selectAll(".cityText").transition().duration(200).attr("opacity", 1)
              // d3.selectAll(".cities").transition().duration(200).attr("opacity", 0.6).attr("width", 7).attr("height", 7)

              d3.select(this).attr("opacity", 1);


              divMaptip
                          .style("left", function(){
                            // if(d3.event.pageX>340){return (d3.event.pageX - 260) + "px"}
                            return (d3.event.pageX -0) + "px";
                          })
                          .style("top", (d3.event.pageY - 0) + "px")
                          .style("display", "block")
                          .transition()
                          .delay(100)
                          .duration(300)
                          .style("opacity", 1);

                          d3.select("#strIndustry").text(d.properties.NAME_2).attr("fill", "red").attr("opacity", 1)

                          if (mouseX > (0.7*width)) {
                            divMaptip
                              .style("left", (d3.event.pageX - 160) + "px")
                          }

                          if (mouseY < 40) {
                            divMaptip
                              .style("top", (d3.event.pageY + 50) + "px")
                          }


                          if (indexPlay == 4) {
                            d3.select("#jobs").text("Open job positions: " + (jobsString(d.properties.OffStell)));
                            d3.select("#housing").text("Vacant properties: " + (HousingString(d.properties.LEQfort)));
                            d3.select("#safety").text("Attacks by state: " + (AttackString(d.properties.number_of_attacks_2)));
                            d3.select("#sweet").text("Index: " + (SweetspotString(d.properties.Sweetspot_2)));
                            d3.select("#go").text("Influx in 2015: " + (InfluxString(d.properties.Zuweisungen)));
                          } else if (indexPlay == 0) {
                            d3.select("#jobs").text("Open job positions: " + (jobsString(d.properties.OffStell)));
                            d3.select("#housing").text("")
                            d3.select("#safety").text("")
                            d3.select("#sweet").text("")
                            d3.select("#go").text("");
                          } else if (indexPlay == 1) {
                            d3.select("#jobs").text("");
                            d3.select("#housing").text("Vacant properties: " + (HousingString(d.properties.LEQfort)));
                            d3.select("#safety").text("")
                            d3.select("#sweet").text("")
                            d3.select("#go").text("");
                          } else if (indexPlay == 2) {
                            d3.select("#jobs").text("");
                            d3.select("#housing").text("");
                            d3.select("#safety").text("Attacks by state: " + (AttackString(d.properties.number_of_attacks_2)));
                            d3.select("#sweet").text("")
                            d3.select("#go").text("");
                          } else if (indexPlay == 3) {
                            d3.select("#jobs").text("");
                            d3.select("#housing").text("");
                            d3.select("#safety").text("");
                            d3.select("#sweet").text("Index: " + (SweetspotString(d.properties.Sweetspot_2)));
                          }

            }

            function HideTT (d, i) {

            d3.selectAll(".cityText").transition().duration(200).attr("opacity", 0)
            d3.selectAll(".cities").transition().duration(200).attr("opacity", 0.7).attr("width", 10).attr("height", 10)

            if (indexPlay == 1) {
              d3.select(this).attr("opacity", 0.7);
            } else {  d3.select(this).attr("opacity", 0.8); }







            divMaptip
            .transition()
            .duration(300)
            .style("opacity", 0)



            };



              d3.csv("datafinal/citydataFinal.csv",  function (error, datacity) {

                      d3.select("#bodySVG").selectAll(".cities")
                                           .append("g")
                                           .data(datacity)
                                           .enter()
                                           .append("rect")
                                           .classed("cities", true)
                                           .attr("x", function(d) {
                                                   return projectionleft([d.Longitude, d.Latitude])[0] - 5;
                                           })
                                           .attr("y", function(d) {
                                                   return projectionleft([d.Longitude, d.Latitude])[1] - 5;
                                           })
                                           .style("pointer-events", "none")
                                           .attr("rx", 10)
                                           .attr("ry", 10)
                                           .attr("width", 10)
                                           .attr("height", 10)
                                           .style("fill", "black")
                                           .style("stroke", "white")
                                            .style("stroke-width", 3)
                                           .attr("opacity", 0.9)
                                           .attr("id", function (d, i) {
                                            return "cities_" + i;
                                           })


                                 d3.select("#bodySVG").selectAll(".cityText")
                                       .data(datacity)
                                       .enter()
                                       .append("g")
                                       .classed("cityText", true)
                                       .style("font-family", "Officina, Calibri, Arial")
                                       .attr('transform', function(d) {
                                         var x = d.city === "Potsdam" ? projectionleft([d.Longitude, d.Latitude])[0] - 6 : projectionleft([d.Longitude, d.Latitude])[0] + 6;
                                         // indexOf > -1 means the array contains the element.
                                         var y = ['Erfurt', 'Mainz', 'Magdeburg', 'Hamburg'].indexOf(d.city) > -1 ? projectionleft([d.Longitude, d.Latitude])[1] + 10 : projectionleft([d.Longitude, d.Latitude])[1] + 3;
                                         return "translate(" + x + "," + y + ")";
                                       })
                                        .style("fill", function (d) {
                                          // if (d.city == "Saarbrücken" || d.city == "Saarbrücken") {
                                          //   return "white";
                                          // }
                                          return "black"

                                        })
                                        .style("pointer-events", "none")
                                        // .text(function(d) {
                                        // return d.city
                                        // })
                                        // .style("font-size", 9)
                                        .style("font-size", 14)
                                        .attr("opacity", 1)
                                        .each(function(d) {
                                          var sel = d3.select(this);
                                          var potsdam = d.city === "Potsdam";
                                          // stroke backing
                                          sel.append('svg:text')
                                            .attr({x:0,y:0,'text-anchor':potsdam ? 'end' : 'start'})
                                            .text(d.city)
                                            .style({stroke:'white','stroke-width':'1.75px'});

                                          // actual text
                                          sel.append('svg:text')
                                            .attr({x:0,y:0,'text-anchor':potsdam ? 'end' : 'start'})
                                            .text(d.city)
                                            .style({fill:'black'});
                                        });

                            })






                            			// legends(arrrayCells[0], scales[0]);
			// legends(arrrayCells[0], scales[0]);

		    MakeTooltip();

        // drawAnnotionations();



		}); //end Body



}






function MakeTooltip(){

        d3.select("#bodySVG")
            .append("g")
            // append the id tooltip
            .attr("id","toolTip")
            .attr("visibility","hidden")
            .attr("class","toolTip");

        d3.select("#toolTip")
            .append("rect")
            .attr("id","toolTipRect")
            .attr("width",100)
            .attr("height",46)
            .attr("rx",6)
            .attr("ry",6)
            .attr("fill","#fff")
            .attr("opacity",0.9)
            .attr("stroke","#ddd")

        d3.select("#toolTip")
            .append("text")
            .attr("id","textPCName")
            .attr("x",10)
            .attr("y",16)
            .attr("font-weight","bold")
            ;

        d3.select("#toolTip")
            .append("text")
            .attr("id","textPCVal")
            .attr("x",10)
            .attr("y",36)
            ;
        }















function navibuttons() {


var buttonsMap = d3.select("#bodySVG")
	.append("svg")
    .attr("id","NavButts")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
    .append("g");







// Buttons
    buttonsMap.selectAll(".Clickoptions")
                .data(d3.range(0, 5))
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(" + (positionToggles[i]) + ", 80)"
                })
                .attr("class", "Clickoptions")
                .attr("id", function (d, i) {
                    return "opt_" + i;
                })
                .attr("opacity", 1)
                .attr("cursor", "pointer")




    buttonsMap.selectAll(".Clickoptions")
                .append("rect")
                .classed("togglerect", true)
                .attr("x", 130)
                .attr("y", 45)
                // .attr("x", function(d) {
                //   return (((toggles[d].length) * 0.6)+7);
                // })
                .attr("rx", 100)
                .attr("ry", 100)
                .attr("width", 10)
                .attr("height", 10)
                .attr('id', function (i) { return "rectus_" + i})
                .attr("stroke", function (d, i) {
                    return colorstoggles[i]
                })
                .style("stroke-width", 0.3)
                .style("stroke-dasharray", "10, 1")
                .style("pointer-events", "visible")
                .attr("opacity", 1)
                .on("click", toggle);



                toggle(0);
                // cities();


}









function landermap () {


	var fullCanvas = d3.select("#bodySVG")
								.append("g")


	d3.json("datafinal/lander.json", function (error, LanderData) {

	var d3map = fullCanvas
          .append("g")
          .selectAll("path")
          .data(topojson.feature(LanderData, LanderData.objects.lander).features)
          .enter()
          .append("path")
          .attr("id", function (d) {
          return "bundesland_" + d.properties.ID_1;
          })
          .attr("class", "bundesland")
          .attr("stroke-miterlimit", 1)
          .attr("stroke-width", 2)
          .attr("fill", "none")
          .style("stroke", "black")
          // .style("pointer-events", "visible")
          .attr("pointer-events", "none")
          .attr("d", path)
          .attr("opacity", 0);





	});



}



function wrap(text, width) {

			   text.each(function () {
			       var text = d3.select(this);
			       // if(width>100){
			           var words = text.text().split(/\s+/).reverse();
			       // }else{
			           // var words = d3.select(this).data()[0].phrase.split(/\s+/).reverse();
			       // }

			       var word,
			           line = [],
			           lineNumber = 0,
			           lineHeight = 1.1, // ems
			           wx = text.attr("x"),
			           wy = text.attr("y"),
			           dy = 0, //parseFloat(text.attr("dy")),
			           tspan = text.text(null)
			                       .append("tspan")
			                       .attr("x", wx)
			                       .attr("y", wy)
			                       .attr("dy", dy + "em");
			       while (word = words.pop()) {
			           line.push(word);
			           tspan.text(line.join(" "));
			           if (tspan.node().getComputedTextLength() > width) {
			               line.pop();
			               tspan.text(line.join(" "));
			               line = [word];
			               // if(width==300){alert('jkj')}
			               tspan = text.append("tspan")
			                           .attr("x", wx)
			                           .attr("y", wy)
			                           .attr("dy", ++lineNumber * lineHeight + dy + "em")
			                           .text(word);
			           }
			       }
			   });
			}



function WrapIt(){
			 d3.select("#TextExplainer")
			 .transition().duration(300)
			   .call(wrap,(180));

			}



function ToggleTooltip(strName, intVal, arrCoordinates, blnShow, strColour){
			if(!blnShow){
			    d3.select("#toolTip").attr("visibility","hidden");
			    return null;
			}

			d3.select("#textPCName")
			    .text(strName)
			    .attr("fill",strColour);

			intRectWidth  = 100;
			// intRectWidth  = d3.max([d3.select("#textPCName").node().getBBox().width + 22, d3.select("#textPCVal").node().getBBox().width + 22]);

			if(isNaN(intVal)){
			  intDisplayVal = "No data";
			}else{
			  intDisplayVal = "£" + numberWithCommas(intVal).split(".")[0];
			}

			d3.select("#textPCVal")
			    .text(intDisplayVal)
			    .attr("fill",strColour)
			    ;
			    // console.log(intRectWidth)

			xOffset = 88;
			if(arrCoordinates[0]>200){xOffset=-50}
			    intNewOffset = 0;
			    if(intRectWidth>200){intNewOffset = -40}

			d3.select("#toolTipRect").attr("width",intRectWidth)
			d3.select("#toolTip")
			    .attr("transform", "translate(" + ((arrCoordinates[0] * 1.5) + intNewOffset) + "," + ((arrCoordinates[1] * 1.5) - 76) + ")")
			    .attr("visibility","visible")
}

function colorlegend (legend) {

		  var legendMap = d3.select("#bodySVG")
					.selectAll(".legendMap")
					.data(legend);

		  var legendMapenter = legendMap
					.enter()
					.append("g")
					.attr("class", "legendMap")
					.attr("transform", function(d, i) { return "translate(-300," + (120+(i * 20)) + ")"; });

			legendMap
					.exit().remove();

			legendMapenter
					.append("rect")
					.attr("class", "legendToggle")
					.attr("x", 320)
					.attr("y", 85)
					.attr("width", 18)
					.attr("height", 18);


			 // draw legend text
			legendMapenter
					.append("text")
					.classed("legendtext", true)
					.attr("x", 340)
					.attr("y", 94)
					.attr("dy", ".35em")
          .style("font-size", 14)
					.style("text-anchor", "start")
          .style("fill", "#586a74 ")
					.style("font-family", "Officina, Calibri, Arial")
					.text(function(d, i) { return legend[i][0]
					})


			legendMap.each(function (d, i) {
					var sel = d3.select(this);

					sel.selectAll(".legendToggle")
					.style("fill", legend[i][1]);

					sel.selectAll(".legendtext")
					.text(legend[i][0])

				// works also with selectAll
					// sel.selectAll(".legendToggle")
					// .style("fill", legend[i][1]);

					// sel.selectAll(".legendtext")
					// .text(legend[i][0])

					});


	}





function keyforward () {

													if (indexPlay<4) {

                            // fouron = false;
														indexPlay += 1;
														d3.select(".BestPlaces").attr("visibility", "hidden")
														d3.selectAll(".counties").style("stroke", "white").style("stroke-width", 0).attr("opacity", 0.8)


													}
													else if (indexPlay == 4) {  indexPlay = 4;}



													d3.select(".buttonstext").text(navigationText[indexPlay])
													d3.select(".header2").text(IntroText[indexPlay])
													d3.select(".subheader2").text(IntroSubText[indexPlay])


                          if (indexPlay == 1) {
                            d3.selectAll(".counties").attr("opacity", 0.7)
                          }

                          if (indexPlay == 4) {

                            d3.selectAll(".bundesland").attr("opacity", 1)

                            d3.select("#TextExplainer")
                            .text(TEXT[indexPlay])
                            .attr("y", 365)

                          } else if (indexPlay == 3) {

                            d3.selectAll(".bundesland").attr("opacity", 0)

                            d3.select("#TextExplainer")
                            .text(TEXT[indexPlay])
                            .attr("y", 365)
                           }

                          else {
                            d3.selectAll(".bundesland").attr("opacity", 0)

                            d3.select("#TextExplainer")
                            .text(TEXT[indexPlay])
                            .attr("y", 365)
                          }


                          // var TextExplainer1 = fullCanvas
                          // 		.append("text")
                          // 		.attr("class", "TextExplainer1")
                          //         .attr("id","TextExplainer")
                          //         .text(TEXT[0])
                          //         .style("font-size", 16)
                          //         .style("text-anchor", "left")
                          //         .attr("x", 20)
                          //         .attr("y", 365)
                          //         // .style("fill", "#586a74 ")
                          //         .style("font-family", "Officina, Calibri, Arial")



													WrapIt();


													d3.select(".headerRect").attr("fill", headerrectColor[indexPlay])

													d3.selectAll(".togglerect").attr("fill", "#e6e6e6");
								                    // d3.select('#rectus_' + indexPlay).attr('fill', headerrectColor[indexPlay]);


													// console.log(indexPlay)

													toggle(indexPlay);

                          if (indexPlay == 2) {
                            d3.selectAll(".WorstPlacesText").attr("visibility", "visible")
                            d3.selectAll(".lineworstplace").attr("visibility", "visible")

                          } else if (indexPlay == 0) {

                            d3.selectAll(".TuttlingenLine").attr("visibility", "visible")
                            d3.selectAll(".Tuttlingen").attr("visibility", "visible")
                            d3.selectAll(".HildburghausenLine").attr("visibility", "visible")
                            d3.selectAll(".Hildburghausen").attr("visibility", "visible")
                            d3.selectAll(".MainTauberKreisLine").attr("visibility", "visible")
                            d3.selectAll(".MainTauberKreis").attr("visibility", "visible")
                            d3.selectAll(".MainTauberKreisBackground").attr("visibility", "visible")




                          } else {
                            d3.selectAll(".WorstPlacesText").attr("visibility", "hidden")
                            d3.selectAll(".lineworstplace").attr("visibility", "hidden")
                            d3.selectAll(".TuttlingenLine").attr("visibility", "hidden")
                            d3.selectAll(".Tuttlingen").attr("visibility", "hidden")
                            d3.selectAll(".HildburghausenLine").attr("visibility", "hidden")
                            d3.selectAll(".Hildburghausen").attr("visibility", "hidden")
                            d3.selectAll(".MainTauberKreisLine").attr("visibility", "hidden")
                            d3.selectAll(".MainTauberKreis").attr("visibility", "hidden")
                            d3.selectAll(".MainTauberKreisBackground").attr("visibility", "hidden")


                           }




													if (indexPlay == 4) {

                                  d3.selectAll(".bundesland").attr("opacity", 1)


                                  // fouron = true;
                                  d3.selectAll(".counties")
                                  .filter(function(d) {
                                    return (d.properties.Sweetspot_2 >= 8);
                                  })
                                  .style("stroke", "#0059b3")
                                  .attr("stroke-miterlimit", 1)
                                  .style("stroke-width", 3);
																d3.selectAll(".BestPlaces").attr("visibility", "visible")

															} else {
                                d3.selectAll(".bundesland").attr("opacity", 0)

                              }

												    colorlegend(legendsarray[indexPlay]);


				}

function keybackwards () {


													if (indexPlay<=4 && indexPlay >0) {
														indexPlay -= 1;
														d3.selectAll(".BestPlaces").attr("visibility", "hidden")
														d3.selectAll(".counties").style("stroke", "white").style("stroke-width", 0)
													}

                          if (indexPlay == 2) {
                            d3.selectAll(".WorstPlacesText").attr("visibility", "visible")
                            d3.selectAll(".lineworstplace").attr("visibility", "visible")

                          } else if (indexPlay == 0) {

                            d3.selectAll(".TuttlingenLine").attr("visibility", "visible")
                            d3.selectAll(".Tuttlingen").attr("visibility", "visible")
                            d3.selectAll(".HildburghausenLine").attr("visibility", "visible")
                            d3.selectAll(".Hildburghausen").attr("visibility", "visible")
                            d3.selectAll(".MainTauberKreisLine").attr("visibility", "visible")
                            d3.selectAll(".MainTauberKreis").attr("visibility", "visible")
                            d3.selectAll(".MainTauberKreisBackground").attr("visibility", "visible")



                          } else {
                            d3.selectAll(".WorstPlacesText").attr("visibility", "hidden")
                            d3.selectAll(".lineworstplace").attr("visibility", "hidden")
                            d3.selectAll(".TuttlingenLine").attr("visibility", "hidden")
                            d3.selectAll(".Tuttlingen").attr("visibility", "hidden")
                            d3.selectAll(".HildburghausenLine").attr("visibility", "hidden")
                            d3.selectAll(".Hildburghausen").attr("visibility", "hidden")
                            d3.selectAll(".MainTauberKreisLine").attr("visibility", "hidden")
                            d3.selectAll(".MainTauberKreis").attr("visibility", "hidden")
                            d3.selectAll(".MainTauberKreisBackground").attr("visibility", "hidden")

                           }


													d3.select(".header2").text(IntroText[indexPlay])
													d3.select(".subheader2").text(IntroSubText[indexPlay])


                          if (indexPlay == 1) {
                            d3.selectAll(".counties").attr("opacity", 0.7)
                          }

													d3.select(".buttonstext").text(navigationText[indexPlay])
													d3.select(".headerRect").attr("fill", headerrectColor[indexPlay])
													d3.select("#TextExplainer").text(TEXT[indexPlay])
													WrapIt();






													// else if (indexPlay=4) { indexPlay-=1;}
													// else if (indexPlay=0) { indexPlay = 0;}

													d3.selectAll(".Clickoptions")

													// console.log(indexPlay)

													toggle(indexPlay);

													colorlegend(legendsarray[indexPlay]);




				}

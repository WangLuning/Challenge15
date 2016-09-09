(function(){
function View1b(Observer){
	
	var view1b={};
	

	//var width=$("div#view1b").width(); 
	//var height=$("div#view1b").width()*1.1;
	//$("div#view1b").css("height",height);
	
	//$("div#view1b").attr("height",height);
	var width=$("#view1svg").width(); 
	//console.log(width);
	var height=$("div#view1").width()*1.1;
	$("div#view1").css("height",height);
	
	$("div#view1").attr("height",height);
	$("div#view1b3").attr("height",width*0.25);
	
	var vb2top=$("div#view1b3").css("top");
	//$("div#viewb2outer").css("top",vb2top);
	//$("div#viewb2outer").css("height",width*0.6+25);
	var color = d3.scale.category20();  			  
	/*var svg = d3.select("#view1b")
				.append("svg")  
				.attr("class","view1bsvg")
				.attr("width",width)  
				.attr("height",height);*/
	var svg=d3.select("#view1svg").append("g").attr("id","view1bg");
	var svg2 = d3.select("#view1b3")
				.append("svg")  
				.attr("class","view1b2svg")
				.attr("width",width)  
				.attr("height",width*0.25);

	var destable=[[0,67],[6,43],[16,49],[16,66],[17,43],[17,67],[23,54],[26,59],[27,15],[28,66]
		,[32,33],[34,68],[38,90],[42,37],[43,56],[43,78],[45,24],[47,11],[48,87],[50,57],[60,37],
		[63,99],[67,37],[69,44],[73,79],[73,84],[76,22],[76,88],[78,37],[78,48],[79,87],[79,89],[81,77],
		[82,80],[83,88],[85,86],[86,44],[87,48],[87,63],[87,81],[92,81],[99,77]];
		
	var datalocSat=[];
	d3.csv("data/SatResult.csv", function(error, data) {		
		for(var i=0;i<960;i++){
			var L1=data[i].L1-'0';var L2=data[i].L2-'0';var L3=data[i].L3-'0';var L4=data[i].L4-'0';var L5=data[i].L5-'0';
			var L6=data[i].L6-'0';var L7=data[i].L7-'0';var L8=data[i].L8-'0';var L9=data[i].L9-'0';var L10=data[i].L10-'0';
			var L11=data[i].L11-'0';var L12=data[i].L12-'0';var L13=data[i].L13-'0';var L14=data[i].L14-'0';var L15=data[i].L15-'0';
			var L16=data[i].L16-'0';var L17=data[i].L17-'0';var L18=data[i].L18-'0';var L19=data[i].L19-'0';var L20=data[i].L20-'0';
			var L21=data[i].L21-'0';var L22=data[i].L22-'0';var L23=data[i].L23-'0';var L24=data[i].L24-'0';var L25=data[i].L25-'0';
			var L26=data[i].L26-'0';var L27=data[i].L27-'0';var L28=data[i].L28-'0';var L29=data[i].L29-'0';var L30=data[i].L30-'0';
			var L31=data[i].L31-'0';var L32=data[i].L32-'0';var L33=data[i].L33-'0';var L34=data[i].L34-'0';var L35=data[i].L35-'0';
			var L36=data[i].L36-'0';var L37=data[i].L37-'0';var L38=data[i].L38-'0';var L39=data[i].L39-'0';var L40=data[i].L40-'0';
			var L41=data[i].L41-'0';var L42=data[i].L42-'0';
			datalocSat.push([L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21,L22,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L41,L42]);
		}
	});
	

	var datalocSun=[];			
	d3.csv("data/SunResult.csv", function(error, data) {		
		for(var i=0;i<960;i++){
			var L1=data[i].L1-'0';var L2=data[i].L2-'0';var L3=data[i].L3-'0';var L4=data[i].L4-'0';var L5=data[i].L5-'0';
			var L6=data[i].L6-'0';var L7=data[i].L7-'0';var L8=data[i].L8-'0';var L9=data[i].L9-'0';var L10=data[i].L10-'0';
			var L11=data[i].L11-'0';var L12=data[i].L12-'0';var L13=data[i].L13-'0';var L14=data[i].L14-'0';var L15=data[i].L15-'0';
			var L16=data[i].L16-'0';var L17=data[i].L17-'0';var L18=data[i].L18-'0';var L19=data[i].L19-'0';var L20=data[i].L20-'0';
			var L21=data[i].L21-'0';var L22=data[i].L22-'0';var L23=data[i].L23-'0';var L24=data[i].L24-'0';var L25=data[i].L25-'0';
			var L26=data[i].L26-'0';var L27=data[i].L27-'0';var L28=data[i].L28-'0';var L29=data[i].L29-'0';var L30=data[i].L30-'0';
			var L31=data[i].L31-'0';var L32=data[i].L32-'0';var L33=data[i].L33-'0';var L34=data[i].L34-'0';var L35=data[i].L35-'0';
			var L36=data[i].L36-'0';var L37=data[i].L37-'0';var L38=data[i].L38-'0';var L39=data[i].L39-'0';var L40=data[i].L40-'0';
			var L41=data[i].L41-'0';var L42=data[i].L42-'0';
			datalocSun.push([L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21,L22,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L41,L42]);
		}
	});
	//console.log(datalocSun[3][3]);
	var dataloc=[];
	d3.csv("data/FriResult.csv", function(error, data) {	
		for(var i=0;i<960;i++){
			var L1=data[i].L1-'0';var L2=data[i].L2-'0';var L3=data[i].L3-'0';var L4=data[i].L4-'0';var L5=data[i].L5-'0';
			var L6=data[i].L6-'0';var L7=data[i].L7-'0';var L8=data[i].L8-'0';var L9=data[i].L9-'0';var L10=data[i].L10-'0';
			var L11=data[i].L11-'0';var L12=data[i].L12-'0';var L13=data[i].L13-'0';var L14=data[i].L14-'0';var L15=data[i].L15-'0';
			var L16=data[i].L16-'0';var L17=data[i].L17-'0';var L18=data[i].L18-'0';var L19=data[i].L19-'0';var L20=data[i].L20-'0';
			var L21=data[i].L21-'0';var L22=data[i].L22-'0';var L23=data[i].L23-'0';var L24=data[i].L24-'0';var L25=data[i].L25-'0';
			var L26=data[i].L26-'0';var L27=data[i].L27-'0';var L28=data[i].L28-'0';var L29=data[i].L29-'0';var L30=data[i].L30-'0';
			var L31=data[i].L31-'0';var L32=data[i].L32-'0';var L33=data[i].L33-'0';var L34=data[i].L34-'0';var L35=data[i].L35-'0';
			var L36=data[i].L36-'0';var L37=data[i].L37-'0';var L38=data[i].L38-'0';var L39=data[i].L39-'0';var L40=data[i].L40-'0';
			var L41=data[i].L41-'0';var L42=data[i].L42-'0';
			dataloc.push([L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21,L22,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L41,L42]);
		}
		setTimeout(function(){initial();},1000);
		
	});
	var loctotal=42;
	var locidnum=new Array();
	var locname=new Array();
	var loctype=new Array();
	d3.csv("data/spot.csv",function(error,data){
		for(var i=0;i<loctotal;i++){
			locidnum[i]=data[i].idnum;
			locname[i]=data[i].name;
			loctype=data[i].type;
		}
		
	});
	
	
	//////////////////////////////////////////////////////
	//communication
	var commmax=6307;
	var linear1 = d3.scale.linear()
			   .domain([0, commmax])
			   .range([83/500*width,6/500*width]);
	var commlineFunction = d3.svg.line()
					 .x(function(d) { return (15+d.x/2)/500*width; })
					 .y(function(d) { return linear1(d.y); })
					 .interpolate("linear");
	var comm=svg2.append("g");
	var linefricomm;var linesatcomm;var linesuncomm;
	var comdatafri=[];var comdatasat=[];var comdatasun=[];
	d3.csv("data/FriTime.csv",function(error,data){
			for(var i=0;i<data.length;i++){
				comdatafri.push({"x":data[i].num,"y":data[i].count});
			}

		});
	d3.csv("data/SatTime.csv",function(error,data){
			for(var i=0;i<data.length;i++){
				comdatasat.push({"x":data[i].num,"y":data[i].count});
			}

		});
	d3.csv("data/SunTime.csv",function(error,data){
			for(var i=0;i<data.length;i++){
				comdatasun.push({"x":data[i].num,"y":data[i].count});
			}

		});
	
	////////////////////////////////////////////////////////
	
	
	var lengthlimit=480/500*width;
	//console.log(width);
	var linear = d3.scale.linear()
			   .domain([0, lengthlimit])
			   .rangeRound([28800,86340]);		//08:00:00~23:59:00
	var dmax=0;
	var linear2;
	var ddx=linear(0);
	var hourrelative=Math.floor(ddx/3600);
	var minuterelative=Math.floor((ddx-hourrelative*3600)/60);
	if(minuterelative<10){minuterelative="0"+minuterelative;}
	
			
	var dd=[1];	
/*	
	var timetag=svg.append("g")
				.selectAll("text")
				.data(dd)  
				.enter()
				.append("text")
				.attr("transform","translate("+10/500*width+","+80/500*width+")")
				.text(function(d,i){return (hourrelative)+":"+minuterelative;})
				.attr("font-size", 30/500*width+"px")
				.attr("font-family", "Georgia");
	*/
	var timeindex1=0;
	var circles;
	var dfri=[];var dsat=[];var dsun=[];		
	
	
	var fri2;
	var frimax;
	var sat2;
	var satmax;
	var sun2;
	var sunmax;
	
	var linear0;
	
	var linearfri;
	var linearsat;
	var linearsun;
	
	var lineFunctionfri;
	var lineFunctionsat;
	var lineFunctionsun;						 

	var lineGraphfri;
	var lineGraphsat;
	var lineGraphsun;
	
	var locnum=0;
		
	var parseDate = d3.time.format("%H:%M").parse;
	
	var x = d3.time.scale().range([0,width-20]);
	var datax=[];
	var datax1 = parseDate("8:00");
	var datax2 = parseDate("23:59");
	datax.push(datax1);datax.push(datax2);
	x.domain(d3.extent(datax.map(function(d) { return d; })));
	var xAxis = d3.svg.axis().scale(x).orient("bottom");
/*
	var v2axis=svg.append("g")
				.attr("class","axisx")
				.attr("transform", "translate("+15/500*width+","+510/500*width+")")
				.call(xAxis);
	*/
	var data4=[0];
	var rect2xnewx=10/500*width;
	/*
	var rects2=svg.append("g")
			.selectAll("rect")
			.data(data4)
			.enter()
			.append("rect")
			.attr("fill","red" )
			.attr("y",510/500*width)
			.attr("x",10/500*width)
			.attr("height", 20/500*width)
			.attr("width", 7/500*width)
			.call(d3.behavior.drag()
				.on("drag", dragmove)
			);	
			*/
	var data5=[0];
	var rects3=svg2.append("g")
			.selectAll("rect")
			.data(data5)
			.enter()
			.append("rect")
			.attr("fill","red" )
			.attr("y",0)
			.attr("x",12.5/500*width)
			.attr("height", 120/500*width)
			.attr("width", 2/500*width);					
			
	var x2 = d3.time.scale().domain(d3.extent(datax.map(function(d) { return d; }))).range([0,318/500*width]);
	//x2.domain(d3.extent(datax.map(function(d) { return d; })));
	var xAxisb1 = d3.svg.axis().scale(x).orient("bottom");
	//var xAxisb2 = d3.svg.axis().scale(x2).orient("bottom").ticks(5);
	//var xAxisb3 = d3.svg.axis().scale(x2).orient("bottom").ticks(5);
	var xax1=svg2.append("g")
				.attr("class","axisx")
				.attr("transform", "translate("+15/500*width+","+83/500*width+")")
				.call(xAxisb1);
	
				/*
	var xax2=svg2.append("g")
				.attr("class","axisx")
				.attr("transform", "translate("+15/500*width+","+165/500*width+")")
				.call(xAxisb2);
	var xax3=svg2.append("g")
				.attr("class","axisx")
				.attr("transform", "translate("+15/500*width+","+247/500*width+")")
				.call(xAxisb3);
				*/
	var circlelag;
	/*
	var view1b3=  svg2.append("g")
					.selectAll("text")	
					.data(["num in selected attraction time profile"])
					.enter()
					.append("text")
					.attr("transform","translate("+30/500*width+","+3/500*width+")")
					.attr("dy",10/500*width) 
					.attr("dx",35/500*width)
					.attr("font-size", 10/500*width+"px")								
					.text(function(d,i){return d;}); 
					*/
					/*
	var y2=svg.append("g");
	var label=["steelblue","yellowgreen","grey"];
	var labelRect = y2.append("g")
					.selectAll("rect")	
					.data(label)
					.enter()
					.append("rect")
					.attr("x",10/500*width)  
					.attr("y",function(d,i){return (450+15 * i)/500*width;})  
					.attr("width",25/500*width)
					.attr("height",12/500*width)
					.attr("fill",function(d,i){return d;})
					.on("click", function(d,i){click(i);});
	var label2=["Fri","Sat","Sun"];
	var labelText = y2.append("g")
					.selectAll("text")	
					.data(label2)
					.enter()
					.append("text")
					.attr("transform",function(d,i){return "translate("+10/500*width+","+ (450+15 * i)/500*width+ ")";})
					.attr("dy",10/500*width) 
					.attr("dx",35/500*width)
					.attr("font-size", 15/500*width+"px")								
					.text(function(d,i){return d;}); 
*/
	var timeindex1=0;
	var daynum=0;
	/*
	var d2=[1];		
	var timetag2=svg.append("g")
				.selectAll("text")
				.data(d2)  
				.enter()
				.append("text")
				.attr("transform","translate("+10/500*width+","+45/500*width+")")
				.text(function(d,i){
					if(daynum==0){return "Fri";}
					if(daynum==1){return "Sat";}
					if(daynum==2){return "Sun";}
				})
				.attr("font-size", 30/500*width+"px")
				.attr("font-family", "Georgia");
	*/
	
	
	
	
	var brush = d3.svg.brush()
						.x(x)
						.on("brushend", brushed);
	var brushg;
	var brushrect;
	var pfri=svg2.append("g");
	function initial(){
		
		
		for(var i=0;i<960;i++){
			for(var j=0;j<42;j++){
				if(dataloc[i][j]>dmax){								
					dmax=dataloc[i][j];
				}
			}
		}

		linear2 = d3.scale.linear()
				   .domain([0, dmax])
				   .rangeRound([2.5/500*width,17.5/500*width]);
 
		circles = svg.append("g").selectAll("circle")  
                            .data(dataloc[0])  
                            .enter()  
                            .append("circle")  
                            .attr("r",2.5/500*width)  
                            .attr("fill","steelblue")  
							.attr("opacity",0.6)
                            .attr("cx",function(d,i){return (destable[i][0]*5)/500*width;})
							.attr("cy",function(d,i){return (500-destable[i][1]*5)/500*width;})
							.on("mouseover",function(d,i){
								Observer.fireEvent("spothighlightstart", [i], "view1b");
								d3.select(this).attr("fill","yellow");
							})
							.on("mouseout",function(d,i){
								d3.select(this).attr("fill", "steelblue");
								Observer.fireEvent("spothighlightend", [i], "view1b");
							})
							.on("dblclick",function(d,i){dblclick(i);});


							
		////////////////////////////////////////////////////////
		//communication lines
		
		linefricomm = comm.append("path")
						   .attr("d", commlineFunction(comdatafri))
						   .attr("stroke", "steelblue")
						   .attr("stroke-width", 0.5/500*width) 
						   .attr("opacity","0.5")
						   .attr("fill", "none");						

		linesatcomm = comm.append("path")
						   .attr("d", commlineFunction(comdatasat))
						   .attr("stroke", "yellowgreen")
						   .attr("stroke-width", 0.5/500*width) 
						   .attr("opacity","0.5")
						   .attr("fill", "none");

		linesuncomm = comm.append("path")
						   .attr("d", commlineFunction(comdatasun))
						   .attr("stroke", "grey")
						   .attr("stroke-width", 0.5/500*width) 
						   .attr("opacity","0.5")
						   .attr("fill", "none");
		////////////////////////////////////////////
		
		for(var m=0;m<960;m++){ 
			dfri.push({"x":m,"y":dataloc[m][0]});
			dsat.push({"x":m,"y":datalocSat[m][0]});
			dsun.push({"x":m,"y":datalocSun[m][0]});
		}	
		fri2=d3.transpose(dataloc);
		frimax=d3.max(fri2[0]);
		sat2=d3.transpose(datalocSat);
		satmax=d3.max(sat2[0]);
		sun2=d3.transpose(datalocSun);
		sunmax=d3.max(sun2[0]);
		var tmax=d3.max([frimax,satmax,sunmax]);
		linear0 = d3.scale.linear()
					   .domain([0, tmax])
					   .range([83/500*width,6/500*width]);
		linearsat = d3.scale.linear()
				   .domain([0, tmax])
				   //.range([165/500*width,88/500*width]);
				   .range([83/500*width,6/500*width]);
		linearsun = d3.scale.linear()
				   .domain([0, tmax])
				   //.range([247/500*width,170/500*width]);
				   .range([83/500*width,6/500*width]);
		
		lineFunctionfri = d3.svg.line()
								 .x(function(d) { return (15+d.x/2)/500*width; })
								 .y(function(d) { return linear0(d.y); })
								 .interpolate("linear");
		lineFunctionsat = d3.svg.line()
								 .x(function(d) { return (15+d.x/2)/500*width; })
								 .y(function(d) { return linear0(d.y); })
								 .interpolate("linear");
		lineFunctionsun = d3.svg.line()
								 .x(function(d) { return (15+d.x/2)/500*width; })
								 .y(function(d) { return linear0(d.y); })
								 .interpolate("linear");						 
					
		lineGraphfri = pfri.append("path")
						   .attr("d", lineFunctionfri(dfri))
						   .attr("stroke", "steelblue")
						   .attr("stroke-width", 1/500*width) 
						   .attr("fill", "none");
						   
		//var psat=svg2.append("g");			
		lineGraphsat = pfri.append("path")
						   .attr("d", lineFunctionsat(dsat))
						   .attr("stroke", "yellowgreen")
						   .attr("stroke-width", 1/500*width) 
						   .attr("fill", "none");
		//var psun=svg2.append("g");			
		lineGraphsun = pfri.append("path")
						   .attr("d", lineFunctionsun(dsun))
						   .attr("stroke", "grey")
						   .attr("stroke-width", 1/500*width) 
						   .attr("fill", "none");

		circlelag=circles.append("title")
					.text(function(d,i){
						return dataloc[0][i]+" people in "+locidnum[i]+":"+locname[i];
					});	
		brushg=svg2.append("g")
			.attr("transform", "translate("+15/500*width+",0)")
			.attr("class", "x brush")
			.call(brush);
		brushrect=brushg.selectAll("rect")
				.attr("y", 6/500*width)
				.attr("height", 77/500*width);

	}
	
	
		
	function brushed() {
	  var brushtime=brush.empty() ? x.domain() : brush.extent();
	  var brushtime2=[0,0];
	  brushtime2[0]=brushtime[0].getHours()*3600+brushtime[0].getMinutes()*60+brushtime[0].getSeconds();
	  brushtime2[1]=brushtime[1].getHours()*3600+brushtime[1].getMinutes()*60+brushtime[1].getSeconds();
	  //console.log(brushtime2);
	  Observer.fireEvent("chooseIdTimeRange", brushtime2, "view1b");
	}

		
					   
	function numberindata(t){
		for(i=28800;i<86341;i=i+60){
			if(i>=t){return (i-28800)/60;}
		}
		
	}		   
	
	function dblclick(n){
		
		locnum=n;
		//console.log(destable[locnum]);
		dfri=[];dsat=[];dsun=[];		
		for(var m=0;m<960;m++){ 
			dfri.push({"x":m,"y":dataloc[m][n]});
			dsat.push({"x":m,"y":datalocSat[m][n]});
			dsun.push({"x":m,"y":datalocSun[m][n]});
		}	
		fri2=d3.transpose(dataloc);
		frimax=d3.max(fri2[n]);
		sat2=d3.transpose(datalocSat);
		satmax=d3.max(sat2[n]);
		sun2=d3.transpose(datalocSun);
		sunmax=d3.max(sun2[n]);
		var tmax=d3.max([frimax,satmax,sunmax]);
		linear0 = d3.scale.linear()
				   .domain([0, tmax])
				   .range([83/500*width,6/500*width]);
		linearsat = d3.scale.linear()
				   .domain([0, tmax])
				   //.range([165/500*width,88/500*width]);
				   .range([83/500*width,6/500*width]);
		linearsun = d3.scale.linear()
				   .domain([0, tmax])
				   //.range([247/500*width,170/500*width]);	
				   .range([83/500*width,6/500*width]);
		
		
		lineGraphfri.transition()
					.duration(1000)
					.attr("d", lineFunctionfri(dfri));
						   
		lineGraphsat .transition()
					  .duration(1000)
					  .attr("d", lineFunctionsat(dsat));
		lineGraphsun.transition()
					  .duration(1000)
					  .attr("d", lineFunctionsun(dsun));						   
		Observer.fireEvent("chooseSpot", destable[locnum], "view1b");
		//document.getElementById("viewb2outer").style.display = "block";
		

	}
	
	
	
	
	
	
	function click(m){
		daynum=m;
		/*
		timetag2.text(function(d,i){
					if(daynum==0){return "Fri";}
					if(daynum==1){return "Sat";}
					if(daynum==2){return "Sun";}
				});
				*/
		if(m==0){
			circles.data(dataloc[timeindex1])  
							.transition()
							.duration(0) 
							.attr("r",function(d,i){
								return linear2(dataloc[timeindex1][i]);
								})  ;
		}
		else{
			if(m==1){
				circles.data(datalocSat[timeindex1])  
							.transition()
							.duration(0) 
							.attr("r",function(d,i){
								return linear2(datalocSat[timeindex1][i]);
								})  ;
			}
			else{
				circles.data(datalocSun[timeindex1])  
							.transition()
							.duration(0) 
							.attr("r",function(d,i){
								return linear2(datalocSun[timeindex1][i]);
								})  ;
			}
		}
		//Observer.fireEvent("changeday",m, "view1b");
	}
							
	function dragmove() {		
			var newx=d3.event.x-10;
			//console.log(newx);
			if(newx<0){newx=0;}
			if(newx>lengthlimit){newx=lengthlimit;}
			var dataloctmp=[];
			if(daynum==0){
				dataloctmp=dataloc;
				//console.log(dataloctmp[10][10]);
			}
			else{
				if(daynum==1){
					dataloctmp=datalocSat;
				}
				else{
					dataloctmp=datalocSun;
				}
			}
			timeindex1=numberindata(linear(newx));
			circles.data(dataloc[timeindex1])  
						.transition()
						.duration(0) 
						.attr("r",function(d,i){
							return linear2(dataloctmp[timeindex1][i]);
							})  ;

			circlelag.text(function(d,i){
					return dataloctmp[timeindex1][i]+" people in "+locidnum[i]+":"+locname[i];
				});
			
			
			var newx2=(linear(newx)-28800)/60
			rects2.attr("x",(10+newx2/2)/500*width);
			rects3.attr("x",(12.5+newx2/3)/500*width);
			//rects3.attr("x",(10+newx2/2)/500*width);			
			ddx=linear(newx);

			hourrelative=Math.floor(ddx/3600);
			minuterelative=Math.floor((ddx-hourrelative*3600)/60);
			if(minuterelative<10){minuterelative="0"+minuterelative;}
			timetag.text(function(d,i){return (hourrelative)+":"+minuterelative;});
			
			newx3=Math.floor(newx2+0.5);
				
	}
	
	function dragmove2(newx){
			var dataloctmp=[];
			if(daynum==0){
				dataloctmp=dataloc;
				//console.log(dataloctmp[10][10]);
			}
			else{
				if(daynum==1){
					dataloctmp=datalocSat;
				}
				else{
					dataloctmp=datalocSun;
				}
			}
			timeindex1=numberindata(linear(newx));
			circles.data(dataloc[timeindex1])  
						.transition()
						.duration(0) 
						.attr("r",function(d,i){
							return linear2(dataloctmp[timeindex1][i]);
							})  ;

			circlelag.text(function(d,i){
					return dataloctmp[timeindex1][i]+" people in "+locidnum[i]+":"+locname[i];
				});
			var newx2=(linear(newx)-28800)/60
			//rects3.attr("x",(12.5+newx2/3)/500*width);	
			rects3.attr("x",(10+newx2/2)/500*width);	
			rect2xnewx=(10+newx2/2)/500*width;
	}
	
	
	$("#descheck").click(function(){
			  if(!document.getElementById("descheck").checked){
				circles.attr("opacity",0);
			  }else{
				circles.attr("opacity",1);
			  }
		  });
	$("#desnumcheck").click(function(){
			  if(!document.getElementById("desnumcheck").checked){
				pfri.attr("opacity",0);
			  }else{
				pfri.attr("opacity",1);
			  }
		  });
	$("#commnumcheck").click(function(){
			  if(!document.getElementById("commnumcheck").checked){
				comm.attr("opacity",0);
			  }else{
				comm.attr("opacity",1);
			  }
		  });
	
	$(window).resize(function(){
		var prewidth=width;
		//width=$("div#view1b").width(); 
		//height=$("div#view1b").width()*1.1;
		width=$("div#view1").width(); 
		height=$("div#view1").width()*1.1;
		//$("div#view1b").css("height",height);
		//$("div#view1b").attr("height",height);
		//$("div#view1b3").attr("height",width*0.);
	
		svg =svg.attr("width",width)  
				.attr("height",height);
		svg2 =svg2.attr("width",width)  
				.attr("height",width*0.25);
				
		lengthlimit=480/500*width;
		linear =linear.domain([0, lengthlimit]);
		
		/*timetag=timetag.attr("transform","translate("+10/500*width+","+80/500*width+")")
						.attr("font-size", 30/500*width+"px");
						*/
		x = x.range([0,width-20]);
		//xAxis = xAxis.scale(x);
		//v2axis=v2axis.attr("transform", "translate("+15/500*width+","+510/500*width+")")
				//.call(xAxis);				
		//preR2x=$("#view1dragrect").attr("x")*500/prewidth;
		preR2x=rect2xnewx*500/prewidth;
		//console.log($("#view1dragrect").attr("x"));
		preR3x=rects3.attr("x")*500/prewidth;
		/*
		rects2=rects2.attr("y",510/500*width)
					.attr("x",preR2x/500*width)
					.attr("height", 20/500*width)
					.attr("width", 7/500*width);*/	
	    rects3=rects3.attr("x",preR3x/500*width)
					.attr("height", 120/500*width)
					.attr("width", 2/500*width);					
			
	    x2 = x2.range([0,318/500*width]);
	
		xAxisb1 = xAxisb1.scale(x);
		//xAxisb2 = xAxisb2.scale(x2);
		//xAxisb3 = xAxisb3.scale(x2);
		xax1=xax1.attr("transform", "translate("+15/500*width+","+83/500*width+")")
				.call(xAxisb1);
				/*
		xax2=xax2.attr("transform", "translate("+15/500*width+","+165/500*width+")")
				.call(xAxisb2);
		xax3=xax3.attr("transform", "translate("+15/500*width+","+247/500*width+")")
				.call(xAxisb3);*/
				
/*
		view1b3=view1b3.attr("transform","translate("+30/500*width+","+3/500*width+")")
					.attr("dy",10/500*width) 
					.attr("dx",35/500*width)
					.attr("font-size", 10/500*width+"px"); 
*//*
		labelRect = labelRect.attr("x",10/500*width)  
							.attr("y",function(d,i){return (450+15 * i)/500*width;})  
							.attr("width",25/500*width)
							.attr("height",12/500*width);

		labelText = labelText.attr("transform",function(d,i){return "translate("+10/500*width+","+ (450+15 * i)/500*width+ ")";})
							.attr("dy",10/500*width) 
							.attr("dx",35/500*width)
							.attr("font-size", 15/500*width+"px"); 
	
		timetag2=timetag2.attr("transform","translate("+10/500*width+","+45/500*width+")")
						.attr("font-size", 30/500*width+"px");				
				*/
		linear2 = linear2.rangeRound([2.5/500*width,17.5/500*width]);
		var dataloctmp=[];
		if(daynum==0){
				dataloctmp=dataloc;
		}
		else{
			if(daynum==1){
				dataloctmp=datalocSat;
			}
			else{
				dataloctmp=datalocSun;
			}
		}
		timeindex1=numberindata((preR2x-10)*2*60+28800);
		//console.log(rect2xnewx);
		circles = circles.attr("r",function(d,i){return linear2(dataloctmp[timeindex1][i]);})
                            .attr("cx",function(d,i){return (destable[i][0]*5)/500*width;})
							.attr("cy",function(d,i){return (500-destable[i][1]*5)/500*width;});				
				
		linear0 = linearfri.range([83/500*width,6/500*width]);
		linearsat = linearsat.range([83/500*width,6/500*width]);
		linearsun = linearsun.range([83/500*width,6/500*width]);
		//linearsat =linearsat.range([165/500*width,88/500*width]);
		//linearsun =linearsun.range([247/500*width,170/500*width]);
		
		lineFunctionfri = lineFunctionfri.x(function(d) { return (15+d.x/2)/500*width; });
		lineFunctionsat = lineFunctionsat.x(function(d) { return (15+d.x/2)/500*width; });
		lineFunctionsun = lineFunctionsun.x(function(d) { return (15+d.x/2)/500*width; });						 
		
		lineGraphfri = lineGraphfri.attr("stroke-width", 1/500*width) ;		
		lineGraphsat = lineGraphsat.attr("stroke-width", 1/500*width);		
		lineGraphsun = lineGraphsun.attr("stroke-width", 1/500*width);				
		//linearfri =linearfri.range([83/500*width,6/500*width]);
		//linearsat =linearsat.range([165/500*width,88/500*width]);
		//linearsun =linearsun.range([247/500*width,170/500*width]);					
				
		lineGraphfri.attr("d", lineFunctionfri(dfri)); 
		lineGraphsat.attr("d", lineFunctionsat(dsat));
		lineGraphsun.attr("d", lineFunctionsun(dsun));		
		
		
		
		
		
		brush = brush.x(x).on("brushend", brushed);
		brushg=brushg.attr("transform", "translate("+15/500*width+",0)").call(brush);
		brushrect=brushg.selectAll("rect")
				.attr("y", 6/500*width)
				.attr("height", 77/500*width);
				
	});




		view1b.onMessage = function(message, datal, from){
			if(message == "spothighlightstart"){
				if(from != "view1b"){
					datal=_.uniq(datal);
					console.log("view1b spothighlightstart "+datal);
					circles.transition()
							.duration(1).attr("fill",function(d,i){
								if(_.indexOf(datal,""+i)>=0){
									return "yellow";
									}
								else{return "steelblue";}
							})
							.attr("r",function(d,i){
								if(_.indexOf(datal, ""+i)>=0){return 6/500*width;}
								else{return 3/500*width;}
							});
				}
			}
			if(message == "spothighlightend"){
				console.log("view1b spothighlightend "+datal);
				if(from != "view1b"){
					circles.attr("fill","steelblue")
							.attr("r",3/500*width);
				}
			}
			if(message=="changeday"){
				console.log("change day");
				if(from=="view1a"){
					click(datal);
				}
			}
			if(message=="timedrag"){
				if(from=="view1a"){
					dragmove2(datal);
				}
			}
		}
		Observer.addView(view1b);
		return view1b;
	}
	window["View1b"] = View1b;
}
)()
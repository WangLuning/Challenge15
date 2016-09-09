function View2(Observer){
	var view = {};
	Observer.addView(view);
	//var baseDiv = getElementById("View2");

	var XY = 67;///////////////景点的接口
	var selectedId = [];///////输出id的接口	
	var selectedX = "num";
	var selectedY = "stay";	
	var colorList=["#fdae6b","#d62728"];
	var dayEnlarge = 1;
	document.getElementById("xAxisChoose").onchange=function(){
		choose();
		//alert("haha");
	}
	document.getElementById("yAxisChoose").onchange=function(){
		choose();
	}
	
	view.onMessage = function(message, data, from){
		//console.log("view2---"+message);
		if(message == "showPath"){
			data = selectedId;
		}
		else if(message == "chooseSpot"){
			XY = data[0] * 100 + data[1];
			console.log("view2---"+"chooseSpot"+XY);
			document.getElementById("numPlaceX").selected = "selected";
			document.getElementById("stayPlaceY").selected = "selected";
			choose();
		}
		else if(message == "highlightstart"){
			highLightId = data;
			d3.selectAll(".circleId")
				.attr("r",2)
				.style("fill",colorList[0])
				.style("fill-opacity",0.4);
			console.log("view2---"+"highlightstart!");
			console.log(highLightId);
			//highLightId=[103006, 313073, 439584, 657863, 1283386, 1412235, 1763672, 1781128, 1937834, 2049974];
			highLightId.forEach(function(id,i){
				var idClass=".id"+id;
				//console.log(idClass);
				d3.selectAll(idClass)
					.attr("r",5)
					.style("fill",colorList[1])
					.style("fill-opacity",1);
			})			
		}
		else if(message == "highlightend"){
			console.log("view2---"+"highlightend!");
			d3.selectAll(".circleId")
				.attr("r",2)
				.style("fill",colorList[0])
				.style("fill-opacity",0.4);
		}else if(message == "attrRanges"){
			console.log("view2---"+"get attrRanges!");
			attrRanges = data;
			//attrRanges = [{"attr":"stay","isChange":1,"min":0,"max":20000},{"attr":"num","isChange":0,"min":0,"max":20000}];
			choose();
		}
		else{
		}
	}

	var width = $(window).width() * 0.35;
	var height = $(window).height() * 0.35;
		//console.log($(window).width());
		//console.log($("div#View2").width());
		//console.log(width);	
	var sizeStandard = width/3;
	var paddingStandard = sizeStandard/5;
	var sizeEnlarge = sizeStandard * 2.25;
	var paddingEnLarge = paddingStandard * 2.25;

	var size = sizeStandard * 1;
	var padding = paddingStandard *1;

    var iWidth = document.documentElement.clientWidth;  
    var iHeight = document.documentElement.clientHeight;	
	var view2bDisplay = 0;
	alertView2b(2.35*size+3*padding,2.35*size+4*padding);
	
	var svgFri = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgFri")
		.attr("width", size + padding*1.2)
		.attr("height", size + padding*3)
		.append("g")
		.attr("transform", "translate(" + 1 * padding + "," + padding / 2 + ")");

	var svgSat = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgSat")
		.attr("width", size + padding*1.2)
		.attr("height", size + padding*3)
		.append("g")
		.attr("transform", "translate(" + 1 * padding + "," + padding / 2 + ")");

	var svgSun = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgSun")
		.attr("width", size + padding*1.2)
		.attr("height", size + padding*3)
		.append("g")
		.attr("transform", "translate(" + 1 * padding + "," + padding / 2 + ")");

	var svgEnlarge = d3.select("#View2b").append("svg")  
		.attr("class","svgEnlarge")
		.attr("id","svgEnlarge")
		.attr("width", sizeEnlarge + paddingEnLarge)  
		.attr("height", sizeEnlarge + 2*paddingEnLarge)
		.append("g")
		.attr("transform", "translate(" + (paddingEnLarge) + "," + paddingEnLarge/2  + ")");
		
	var attrJson = [];
	attrJson["Fri"] = {};
	attrJson["Sat"] = {};
	attrJson["Sun"] = {};
	var attrRanges = [];
	
	choose();
	
	$(window).resize(function(){
		var prePadding = padding;
		var preWidth = width;
		var preHeight = height;
		var width = $(window).width() * 0.35;
		var height =$(window).width() * 0.35;
		//console.log($(window).width());
		//console.log($("div#View2").width());
		sizeStandard = width/3;
		paddingStandard = sizeStandard/5;
		sizeEnlarge = sizeStandard * 2.25;
		paddingEnLarge = paddingStandard * 2.25;

		size = sizeStandard * 1;
		padding = paddingStandard * 1;
		d3.select("#View2")
			.selectAll(".svg")
			.attr("width", size + padding*1.2)
			.attr("height", size  + padding*3);
		svgFri.attr("transform", "translate(" + 1 * padding + "," + padding / 2 + ")");	
		svgSat.attr("transform", "translate(" + 1 * padding + "," + padding / 2 + ")");
		svgSun.attr("transform", "translate(" + 1 * padding + "," + padding / 2 + ")");
		d3.select("#View2b")
			.select("#svgEnlarge")
			.attr("width", sizeEnlarge + 1.5 * paddingEnLarge)
			.attr("height", sizeEnlarge + 2 * paddingEnLarge)
			.attr("transform", "translate(" + 2*paddingEnLarge + "," + paddingEnLarge/2  + ")");
		svgEnlarge.attr("transform", "translate(" + (paddingEnLarge) + "," + paddingEnLarge/2  + ")");
		document.getElementById("View2b").style.cssText = "position:absolute;z-index:9999;font:11px '宋体';top:"+0+"px;width:"+(2*size+3*padding)+"px;height:"+(2*size+4*padding)+"px;";
		choose();
	});	

	
	function choose(){
		d3.select("#View2b").style.height=d3.select("#View2b").style.width*1.05;
		console.log("view2---"+"000");
		//alert(document.getElementById("xAxisChoose").value);
		selectedX = document.getElementById("xAxisChoose").value;
		//alert(selectedX);
		selectedY = document.getElementById("yAxisChoose").value;
		if(selectedX=="numPlaceChoosen")selectedX="num"+XY;
		if(selectedX=="stayPlaceChoosen")selectedX="stay"+XY;
		if(selectedY=="numPlaceChoosen")selectedY="num"+XY;
		if(selectedY=="stayPlaceChoosen")selectedY="stay"+XY;
		d3.select("#View2").selectAll("text").remove();
		d3.select("#View2").selectAll(".cell").remove();
		d3.select("#View2").selectAll(".xAxis").remove();
		d3.select("#View2").selectAll(".yAxis").remove();

		d3.select("#View2b").selectAll("text").remove();
		d3.select("#View2b").selectAll(".cell").remove();
		d3.select("#View2b").selectAll(".xAxis").remove();
		d3.select("#View2b").selectAll(".yAxis").remove();
		if(dayEnlarge == 1){getAttrValueDraw(selectedX,selectedY,"Fri",attrRanges,1);}
		else if(dayEnlarge == 2){getAttrValueDraw(selectedX,selectedY,"Sat",attrRanges,2);}
		else if(dayEnlarge == 3){getAttrValueDraw(selectedX,selectedY,"Sun",attrRanges,3);}
		getAttrValueDraw(selectedX,selectedY,"Fri",attrRanges,0);
		getAttrValueDraw(selectedX,selectedY,"Sat",attrRanges,0);
		getAttrValueDraw(selectedX,selectedY,"Sun",attrRanges,0);	
		if(view2bDisplay == 1){	
			alertView2b(2.35*size+3*padding,2.35*size+4*padding);
			document.getElementById("View2b").style.display="block";
		}
	}

	function getAttrValueDraw(selectedX,selectedY,day,attrRanges,isEnlarge){ 
		var url = "v2.php";
		url = url + "?array=" + selectedX + "," + selectedY;
		url = url + "&day=" + day;
		console.log(attrRanges);
		for(attrRangeIndex in attrRanges){
			attrRange = attrRanges[attrRangeIndex];
			if(attrRange["zero"]==1){
				url = url + "&" + attrRange["name"] + "=" + attrRange["from"] + "," + attrRange["to"];
			}
		}
		console.log(url);
		//url = "v2.php?array=num,stay&day=Fri";
		d3.json(url, function(data){
			console.log(data);
			attrJson[day]=data; 
			draw(day,isEnlarge);
		});
	 }	
	
	function draw(day,isEnlarge){
		var svg;
		var colorI;
		if(isEnlarge==0){
			size = sizeStandard;
			padding = paddingStandard;
			if(day=="Fri"){svg = svgFri; colorI=0;}
			else if(day=="Sat"){svg = svgSat; colorI=0;}
			else {svg = svgSun; colorI=0;}
		}
		else{
			size = sizeEnlarge;
			padding = paddingEnLarge;
			svg = svgEnlarge; colorI = 0;
			if(isEnlarge == 1){day = "Fri";}
			else if(isEnlarge == 2){day = "Sat"}
			else if(isEnlarge == 3){day = "Sun";}
		}
		
		var x = d3.scale.linear()
			.range([padding / 2, size - padding / 2]);
		var y = d3.scale.linear()
			.range([size - padding / 2, padding / 2]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(5);
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5);

		//console.log(attrJson[day]["id"]);

		if(isEnlarge==0){size = sizeStandard; padding = paddingStandard;}
		else{size = sizeEnlarge; padding = paddingEnLarge;}
		var domainByTrait = {},
			//traits = d3.keys(data[0]).filter(function(d) { return d == selectedX || d == selectedY; }),
			traits=[selectedX,selectedY],
			n = traits.length;
		traits.forEach(function(trait,i) {//确定真实值域		
			if(trait =="inin"||trait =="outout"){
				domainByTrait[trait] = [d3.min(attrJson[day][trait]),d3.max(attrJson[day][trait])];
			}
			else if(trait == "wayPercent"){
				domainByTrait[trait] = [0,(d3.max(attrJson[day][trait]))*1000/1000];
			}
			else {domainByTrait[trait] = [0,d3.max(attrJson[day][trait])];}
			//console.log(domainByTrait[trait]);
		});
		var traitsX=[selectedX],traitsY=[selectedY];

		
		xAxis.tickSize(size);//辅助线
		yAxis.tickSize(-size);
		if(isEnlarge==0){

		}
		else{
			svg.append("text")
				.attr("x",size-25-axisName(selectedX).length*12)
				.attr("y",size-padding/8)
				.text(function(){return axisName(selectedX)});
			svg.append("text")
				.attr("x",-15)
				.attr("y",10)
				.text(function(){return axisName(selectedY)});
		}
		function axisName(selected){
			if(selected=="inin")return "in";
			else if(selected=="outout")return "out";
			else if(selected=="fromfrom")return "from";
			else if(selected=="toto")return "to";
			else if(selected=="allall")return "all";
			else return selected;
		}			
		svg.append("text")
			.attr("x",function(){if(isEnlarge==0)return size/2-25;else return size/2-40;})
			.attr("y",0)
			.text(function(){
				if(day=="Fri")return "Friday";
				else if(day=="Sat")return "Saturday";
				else return "Sunday";
			})
			.style({
				stroke: "black", 
				"stroke-width": "0.5px",
				"font-size":function(){if(isEnlarge==0)return "15px";else return "25px";}
			});
		svg.append("text").attr("x",size/2-45).attr("y",size+padding*1)
			.text(function(){
				if(isEnlarge==0){
					return "Click to zoom in."
				}
				else return;
			})
			.style({stroke: "black", "stroke-width": "0.5px"})
			.on("mouseover",function(){
				d3.select(this).style({stroke: "blue", "stroke-width": "1px"});
			})
			.on("mouseout",function(){
				d3.select(this).style({stroke: "black", "stroke-width": "0.5px"});
			})
			.on("click", function(){
				d3.select("#View2b").selectAll("text").remove();
				d3.select("#View2b").selectAll(".cell").remove();
				d3.select("#View2b").selectAll(".xAxis").remove();
				d3.select("#View2b").selectAll(".yAxis").remove();
				if(day == "Fri"){getAttrValueDraw(selectedX,selectedY,"Fri",attrRanges,1); dayEnlarge = 1;}
				else if(day == "Sat"){getAttrValueDraw(selectedX,selectedY,"Sat",attrRanges,2); dayEnlarge =2;}
				else if(day == "Sun"){getAttrValueDraw(selectedX,selectedY,"Sun",attrRanges,3); dayEnlarge =3;}
				//d3.select("#View2b").style.display="block";
				view2bDisplay = 1;
				document.getElementById("View2b").style.display="block";			
			});	

		var brush = d3.svg.brush()
			.x(x)
			.y(y)
			.on("brushstart", brushstart)
			.on("brush", brushmove)
			.on("brushend", brushend);

		svg.selectAll(".xAxis")
			.data(traitsX)
			.enter().append("g")
			.attr("class", "xAxis")
			.attr("transform", function(d, i) { return "translate(" + (traitsX.length - i - 1) * size + ",0)"; })
			.each(function(d) {
				x.domain([domainByTrait[d][0],domainByTrait[d][1]]);
				d3.select(this).call(xAxis);
			});


		svg.selectAll(".yAxis")
			.data(traitsY)
			.enter().append("g")
			.attr("class", "yAxis")
			.attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
			.each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

		var cell = svg.selectAll(".cell")
			.data(cross(traitsX, traitsY,"id"))
			.enter().append("g")
			.attr("class", "cell")
			//.attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
			.each(plot);

		cell.call(brush);

		function plot(p) {
		//p.x--traitsX, p.y--traitsY
			var cell = d3.select(this);
			//x.domain(domainByTrait[p.x]);
			//y.domain(domainByTrait[p.y]);
			//框的外部
			cell.append("rect")
				.attr("class", "frame")
				.attr("x", function(){return padding / 2;})
				.attr("y", padding / 2)
				.attr("width", size - padding)
				.attr("height", size - padding);
			//描点d[p.x]--该点x属性值
			cell.selectAll("circleId")
				.data(attrJson[day]["id"])
				.enter().append("circle")
				.attr("class",function(d,i) {var id = +d;id="id"+id;return "circleId "+id; })
				.attr("cx", function(d,i) {return x(attrJson[day][selectedX][i]); })
				.attr("cy", function(d,i) {return y(attrJson[day][selectedY][i]); })
				.attr("r", 2)
				.style("fill", function(d) { return colorList[colorI]; });
		}

		var brushCell;
		var selectedId = [];
		
		// Clear the previously-active brush, if any.
		function brushstart(p) {
			Observer.fireEvent("highlightend", selectedId, view);
			selectedId=[];
			if (brushCell !== this) {
			d3.select(brushCell).call(brush.clear());
			x.domain(domainByTrait[p.x]);
			y.domain(domainByTrait[p.y]);
			brushCell = this;
			}
		}

		// Highlight the selected circles.
		function brushmove(p) {
			var e = brush.extent();
			/*svg.selectAll("circle").classed("hidden", function(d) {
				return e[0][0] > d[p.x] || d[p.x] > e[1][0] || e[0][1] > d[p.y] || d[p.y] > e[1][1];
			});*/
		}


		// If the brush is empty, select all circles.
		function brushend(p) {
			
			if (brush.empty()) ;//svg.selectAll(".hidden").classed("hidden", false);
			else {
			var e = brush.extent();
			//console.log(e);
			//console.log(attrJson[day]["id"].length);
			//for(i=-1;++i<attrJson[day]["id"].length;)
			for(i=0; i<attrJson[day]["id"].length; ++i)
			{
				if(e[0][0]<=attrJson[day][selectedX][i]&&attrJson[day][selectedX][i]<=e[1][0]
					&&e[0][1]<=attrJson[day][selectedY][i]&&attrJson[day][selectedY][i]<=e[1][1]){
					selectedId.push(parseInt(attrJson[day]["id"][i]));
				}
			}
			console.log("view2---");
			console.log(selectedId);//被选中的id列表
			Observer.fireEvent("highlightstart", selectedId, view);
			Observer.fireEvent("showPath", selectedId, view);////////////////////////////////
			}
		}

		function cross(a, b, id) {
			//var c = [], n = a.length, m = b.length, i, j;
			//for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
			var c = [];
			c.push({x:a[0],y:b[0],id:id});
			return c;
		}
		

	};

	
	function alertView2b(w,h){
		var titleheight = "22px"; // 提示窗口标题高度  
		var bordercolor = "#666699"; // 提示窗口的边框颜色  
		var titlecolor = "#FFFFFF"; // 提示窗口的标题颜色  
		var titlebgcolor = "#666699"; // 提示窗口的标题背景色 
		var bgcolor = "#FFFFFF"; // 提示内容的背景色 
		var msgObj=document.getElementById("View2b"); 
		//msgObj.style.display="block";
		msgObj.style.cssText = "position:absolute;font:11px '宋体';top:"+0+"px;left:"+0+"px;width:"+(size*2.35+3*padding)+"px;height:"+(size*2.35+4*padding)+"px;text-align:center;border:1px solid "+bordercolor+";background-color:"+bgcolor+";padding:1px;line-height:22px;z-index:9999;"; 
		//document.body.appendChild(msgObj); 
				 
		var table = document.createElement("table"); 
		msgObj.appendChild(table); 
		table.style.cssText = "margin:0px;border:0px;padding:0px;"; 
		table.cellSpacing = 0; 
		var tr = table.insertRow(-1); 
		var titleBar = tr.insertCell(-1); 
		titleBar.style.cssText = "width:100%;height:"+titleheight+"px;text-align:left;padding:3px;margin:0px;font:bold 13px '宋体';color:"+titlecolor+";border:1px solid " + bordercolor + ";cursor:move;background-color:" + titlebgcolor; 
		titleBar.style.paddingLeft = "10px"; 
		titleBar.innerHTML = "Enlarge"; 
		var moveX = 0; 
		var moveY = 0; 
		var moveTop = 0; 
		var moveLeft = 0; 
		var moveable = false; 
		var docMouseMoveEvent = document.onmousemove; 
		var docMouseUpEvent = document.onmouseup; 
		titleBar.onmousedown = function() { 
			var evt = getEvent(); 
			moveable = true;  
			moveX = evt.clientX; 
			moveY = evt.clientY; 
			moveTop = parseInt(msgObj.style.top); 
			moveLeft = parseInt(msgObj.style.left); 
			 
			document.onmousemove = function() { 
				if (moveable) { 
					var evt = getEvent(); 
					var x = moveLeft + evt.clientX - moveX; 
					var y = moveTop + evt.clientY - moveY; 
					if ( x > 0 &&( x + w < iWidth) && y > 0 && (y + h < iHeight) ) { 
						msgObj.style.left = x + "px"; 
						msgObj.style.top = y + "px"; 
					} 
				}     
			}; 
			document.onmouseup = function () {  
				if (moveable) {  
					document.onmousemove = docMouseMoveEvent; 
					document.onmouseup = docMouseUpEvent; 
					moveable = false;  
					moveX = 0; 
					moveY = 0; 
					moveTop = 0; 
					moveLeft = 0; 
				}  
			}; 
		} 
		 
		var closeBtn = tr.insertCell(-1); 
		closeBtn.style.cssText = "cursor:pointer; padding:2px;background-color:" + titlebgcolor; 
		closeBtn.innerHTML = "<span style='font-size:15pt; color:"+titlecolor+";'>×</span>"; 
		closeBtn.onclick = function(){  
			view2bDisplay = 0;
			document.getElementById("View2b").style.display="none";  
		}  
		 
		// 获得事件Event对象，用于兼容IE和FireFox 
		function getEvent() { 
		//console.log(window.event);
			return window.event || arguments.callee.caller.arguments[0]; 
		}
	}		
	return view;
};
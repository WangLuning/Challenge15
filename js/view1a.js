(function(){
	
	
	
	function View1a(Observer){
		//var width=$("div#view1a").width();//1350*37%=499
		//var height=$("div#view1a").width()*1.1;
		//$("div#view1a").css("height",height);
		var width=$("div#view1").width();//1350*37%=499
		var height=$("div#view1").width()*1.1;
		$("div#view1").css("height",height);
		
		$("div#v1await").css("height",height);
		
		var width2=$(window).width()*0.5;
		var height3=width2*0.4;
		var height2=width2*0.4*0.8;
		$("div#view1a2").css("width",width2);
		$("div#view1a2").css("height",width2*0.4);
		$("#va2zoom").css("width",width2);
		$("#va2zoom").css("height",width2*0.4);
		
		var color = d3.scale.category20();  			
/*		
		var svg = d3.select("#view1a")
					.append("svg")  
					.attr("class","view1asvg")
					.attr("width",width)  
					.attr("height",height);
					*/
		var svg=d3.select("#view1svg").append("g").attr("id","view1bg");
		$("#view1svg").css("width",width);
		$("#view1svg").css("height",height);
		//var idnum=2;
		//var id=["577530","1204869"];
		var id=[];
		var idnum=0;
		var idnumlimit=150;
		var loc=[[],[],[]];
		var daynum=0;//0代表fri 1代表sat 2代表sun

		var xmlHttp
		var xmlDoc=[[],[],[]];
		var datajson=[{
			"id":"",
			"x":["0"],
			"y":["0"],
			"time":["28800"]
			},
			{
			"id":"",
			"x":["0"],
			"y":["0"],
			"time":["28800"]
			},
			{
			"id":"",
			"x":["0"],
			"y":["0"],
			"time":["28800"]
			}];
		////////////////////////////
		
		var brush = d3.svg.brush()
					.x(d3.scale.identity().domain([0, width]))
					.y(d3.scale.identity().domain([0, width]))
					.on("brushend", brushed);
		function brushed() {
		  var brushrange=brush.empty() ?[[0, 0], [width, width]] : brush.extent();
		  //console.log(brushrange[0][0]/width*100+" "+brushrange[0][1]/width*100+" "+brushrange[1][0]/width*100+" "+brushrange[1][1]/width*100);
		  var brushrange2=[[0,0],[0,0],daynum];
		  brushrange2[0][0]=brushrange[0][0]/width*100;
		  brushrange2[0][1]=100-brushrange[0][1]/width*100;
		  brushrange2[1][0]=brushrange[1][0]/width*100;
		  brushrange2[1][1]=100-brushrange[1][1]/width*100;
		  Observer.fireEvent("chooseIdLocRange", brushrange2, "view1a");
		}
		var brusharea=svg.append("g")
			.attr("class", "brush")
			.call(brush);
		
		
		
			///////////////////////////////////////////////////
		//人的点
		
		var circles = svg.append("g")
						 .selectAll("circle")  
							.data(id)  
							.enter()  
							.append("circle")  
							.attr("r",3)  
							.style("fill","red")  
							.attr("cx",0)
							.attr("cy",width);

		var sto;
		var ttime=28800;
		document.getElementById("view1autoplay").onclick=function(){
			if(document.getElementById("view1autoplay").value=="autoplay"){
				document.getElementById("view1autoplay").value="stop";
				autop();
			}else{
				document.getElementById("view1autoplay").value="autoplay";
				clearTimeout(sto);

			}
			
		}

		function autop(){
			
			ttime=ttime+60;
			rects2.attr("x",(10+(ttime-28800)/120)/500*width);
			hourrelative=Math.floor(ttime/3600);
			minuterelative=Math.floor((ttime-hourrelative*3600)/60);
			if(minuterelative<10){minuterelative="0"+minuterelative;}
			timetag.text(function(d,i){return (hourrelative)+":"+minuterelative;});

			for(var i=0;i<idnum;i++){
				findtime(i,ttime);
			}
			if(ttime<=86400){
			sto=setTimeout(function(){autop();},100);
			}
			//abtilinear
			Observer.fireEvent("timedrag", abtilinear(ttime), "view1a");
		}

		var opts = {            
            lines: 13, // 花瓣数目
            length: 20, // 花瓣长度
            width: 10, // 花瓣宽度
            radius: 30, // 花瓣距中心半径
            corners: 1, // 花瓣圆滑度 (0-1)
            rotate: 0, // 花瓣旋转角度
            direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
            color: '#999999', // 花瓣颜色
			opacity: 0.65,
            speed: 1, // 花瓣旋转速度
            trail: 60, // 花瓣旋转时的拖影(百分比)
            shadow: false, // 花瓣是否显示阴影
            hwaccel: false, //spinner 是否启用硬件加速及高速旋转            
            className: 'spinner', // spinner css 样式名称
            zIndex: 2e9, // spinner的z轴 (默认是2000000000)
            top: '50%', // spinner 相对父容器Top定位 单位 px
            left: '50%'// spinner 相对父容器Left定位 单位 px
        };
		var spinner = new Spinner(opts);
		
		function showUser(idlist,day){ 
			 //console.log(idlist.length);
			 //document.getElementById("judge").innerHTML='0';
			 var idstr="";
			 for(var i=0;i<idlist.length;i++){
				 idstr=idstr+idlist[i]+",";
			 }
			 idstr=idstr.substr(0,idstr.length-2);

			 var url="b2.php";
			 url=url+"?id="+id;
			 url=url+"&day="+day;
			 url=url+"&sid="+Math.random();
			 

			 $.ajax({ url:url, 
				//async:false,  
				cache:false, dataType:'json',
				 beforeSend: function () {
					 $("#v1await").show();
                    var target= document.getElementById('v1await');
                    spinner.spin(target);                    
                 },
				 success:function(data){  
					 console.log(data);
					 datajson[day]=data;  
					 spinner.spin();
					 if(idlist.length==0){
						 //$("#viewa2draw").click();
						 console.log("empty");
						 }
					 else{
						 $("#viewa2draw").click();
						 $("div#va2outer").show();
						 }
					 
					 $("#v1await").hide();
				 },

				 error:function(xhr){
					 spinner.spin(target); 
					 console.log("error");
					 $("#v1await").hide();
					 } 
			 })

		 }

		////////////////////////////////////////////////////////////
		
		function findtime(i,time){
			var k=0;
			//console.log(datajson[daynum][i].length);
			var limit=datajson[daynum][i].time.length;
			//var limit=xmlDoc[daynum][i].getElementsByTagName("time").length;
			if(datajson[daynum][i].time[0]>=time){
				loc[daynum][i].x=0;
				loc[daynum][i].y=0;
			}else{
				for(;(k+1)<limit;k++){
					if(datajson[daynum][i].time[k+1]>time){break;}
				}
				if(k==(limit-1)){
					loc[daynum][i].x=0;loc[daynum][i].y=0;
				}
				else{
					loc[daynum][i].x=datajson[daynum][i].x[k];
					loc[daynum][i].y=datajson[daynum][i].y[k];
				}
			}
			if(i==idnum-1){
				circles.data(id)  
					   .transition()
					   .duration(0) 
					   .attr("cx",function(d,i){
							return (loc[daynum][i].x*5)/500*width;							
						})
						.attr("cy",function(d,i){
							return (500-5*loc[daynum][i].y)/500*width;
						});
			}
		}
		////////////////////////////////////////////////
		//view1a2
		//var labelheight=50;
		var loctype=["gate","Rides For Everyone","Thrill Rides","Shows & Entertainment","unknown","Information & Assistance","Kiddie Rides"];
		var typenum=loctype.length;
		var loctype2=[];
		for(var i=0;i<typenum;i++){
			loctype2.push(loctype[i].split(" "));
		}
		
		//console.log(loctype2);
		var typenum=loctype.length;
		var va2label=d3.select("#va2svg")
						.append("g")
						.selectAll("rect")	
						.data(loctype)
						.enter()
						.append("rect")
						.attr("x",function(d,i){return 10+(width2/typenum)*i ;})  
						.attr("y",(height3*0.9))  
						.attr("width",function(d,i){return (width2/typenum-25);})
						.attr("height",10)
						.attr("fill",function(d,i){return color(d);});

		var va2labelg =d3.select("#va2svg")
						.append("g")
						.selectAll("g")	
						.data(loctype2)
						.enter()
						.append("g")
						.attr("transform",function(d,i){return "translate("+(width2/typenum)*i+","+(height3*0.9)+")";}); 
		var va2labelText=va2labelg.selectAll("g")
								.data(function(d) { return d; })
								.enter()
								.append("text")
								.attr("dx",10)
								.attr("dy",function(d,i){return (10+11*i)+"px";})
								.attr("font-size", 10+"px")
								.text(function(d){return d;});
		
		var destable=[];
		var totalloc=42;
		
		d3.csv("data/spot.csv", function(error, data) {		
			for(var i=0;i<totalloc;i++){
				var L1=data[i].x;
				var L2=data[i].y;
				var L3=data[i].idnum;
				var L4=data[i].name;
				var L5=data[i].type;
				destable.push([L1,L2,L3,L4,L5]);
			}
		});
		var recth=(height3*0.8)/idnum-2;
		function isdes(x,y){
			for(var i=0;i<totalloc;i++){
				if((destable[i][0]==+x)&&(destable[i][1]==+y)){ return i; }
			}
			return -1;
		}
		var spothl=[];
		var receiveD=[-1];var hlflag=0;
		var idhl=[];//var idhlflag=0;
		var recidhl=[];
		var app = angular.module('svg', []);
		app.controller('SvgHistogram', ['$scope', function($scope){
			$scope.Properties=[];
			var count=-1;
			
			$scope.showrects=function($event){
				count=-1;
				$scope.Properties=[];
				for(var i=0;i<idnum;i++){
					count=count+1;
					$scope.Properties.push({"x":10, "y": i*(recth+2), "width": width2, "height": recth, "fill": "#EEEFED","idnum":"-2,"+count+","+i});
					for(var j=0;j<datajson[daynum][i].x.length-1;j++){
						var typeid=isdes(datajson[daynum][i].x[j],datajson[daynum][i].y[j]);
						if(typeid!=-1){
							//console.log(destable[typeid][4]);
							count=count+1;
							$scope.Properties.push({"x": 10+(datajson[daynum][i].time[j]-28800)*width2/(86340-28800), "y": i*(recth+2), "width": ((datajson[daynum][i].time[j+1]-(datajson[daynum][i].time[j]))*width/(86340-28800)), "height": recth, "fill": color(destable[typeid][4]),"type": destable[typeid][4], "idnum":destable[typeid][2]+","+count+","+typeid});
						}
					}
				
				}

				$event.stopPropagation();
			}
			$scope.hlspot=function(d,$event){
				
				var ds=d.split(",")
				var counttmp=ds[1];
				if(ds[0]!="-2"){//click的是景点
					if($scope.Properties[counttmp].fill=="yellow"){
						$scope.Properties[counttmp].fill=color(destable[ds[2]][4]);
						//spothl=_.without(spothl,ds[0]);
						var di=_.indexOf(spothl,ds[2]);
						if(di>=0){
							var tmp2=spothl[0];
							spothl[0]=spothl[di];
							spothl[di]=tmp2;
							spothl=_.rest(spothl);
						}
						//console.log(spothl);
						Observer.fireEvent("spothighlightstart", spothl, "view1a2");
					}else{
						//console.log($scope.Properties[counttmp].fill);
						$scope.Properties[counttmp].fill="yellow";
						spothl.push(ds[2]);
						Observer.fireEvent("spothighlightstart", spothl, "view1a2");
					}
				}else{//click的是id
					if($scope.Properties[counttmp].fill=="yellow"){
						$scope.Properties[counttmp].fill="#EEEFED";
						//console.log(datajson[daynum][parseInt(ds[2])]);
						idhl=_.without(idhl,parseInt(datajson[daynum][parseInt(ds[2])].id));
						Observer.fireEvent("highlightstart", idhl, "view1a2");
					}else{
						$scope.Properties[counttmp].fill="yellow";
						idhl=_.union(idhl,[parseInt(datajson[daynum][parseInt(ds[2])].id)]);
						Observer.fireEvent("highlightstart", idhl, "view1a2");
					}
					
				}
				$event.stopPropagation();
				$event.preventDefault();
				//event.stopPropagation();
			}
			$scope.hlid=function($event){
				//console.log(recidhl);
				for(var i=0;i<count+1;i++){
					//console.log(i);
					var dtmp=$scope.Properties[i].idnum.split(",");
					if(dtmp[0]=="-2"){
						var idtmp=parseInt(datajson[daynum][+dtmp[2]].id);
						if(_.indexOf(recidhl, idtmp)>=0){
							$scope.Properties[i].fill="yellow";
						}else{
							$scope.Properties[i].fill="#EEEFED";
						}
					}
				}
				$event.preventDefault();
				$event.stopPropagation();
				//event.stopPropagation();
			}
			$scope.rcvhlspot=function($event){
				for(var i=0;i<count+1;i++){
					var dtmp=$scope.Properties[i].idnum.split(",")[2];
					var isid=$scope.Properties[i].idnum.split(",")[0];
					if(parseInt(dtmp)==receiveD[0]&&(isid!="-2")){
						if(hlflag==0){$scope.Properties[i].fill=color(destable[receiveD[0]][4]);}
						else{
							$scope.Properties[i].fill="yellow";
						}
					}
				}
				$event.stopPropagation();
				$event.preventDefault();
			}

		}]);

		//////////////////////////////////////////////////////////
		//view1a2 resize
		$(function() {
			$( "#view1a2" ).resizable({
				//aspectRatio: 460 / 174
				aspectRatio: 5 / 2
			});

			var rt;
			$("#view1a2").resize(function() {
				clearTimeout(rt);
				rt = setTimeout(function(){
					//console.log("view1a2 resize");
					var width0=$("div#view1a2").width();
					width2=width0*zoomscale;
					height3=width0*0.4;
					height2=width0*0.4*0.8;
					$("#va2zoom").css("width",width2);
					$("#va2zoom").css("height",height3);
					
					va2x2 =va2x2.range([0,width2]);
					va2x3 =va2x3.range([0,width2]);
					zoom.x(va2x3);
					xAxis2 = xAxis2.scale(va2x2);
					va2label= va2label.attr("x",function(d,i){return 10+(width0/typenum)*i ;})  
						.attr("y",(height3*0.9))  
						.attr("width",function(d,i){return (width0/typenum-25);});
					
					va2labelg=va2labelg.attr("transform",function(d,i){return "translate("+(width0/typenum)*i+","+(height3*0.9)+")";}); 
					va2labelText=va2labelText.attr("dy",function(d,i){return (10+11*i)+"px";});
					via2xis=via2xis.attr("transform", "translate(10,"+(height3*0.8)+")").call(xAxis2);
					recth=(height2)/idnum-2;
					$("#viewa2draw").click();
				},500);
			});
		});

		///////////////////////////////////////////////////////
		//鼠标放在点上，显示id
		var circlelag=circles.append("title")
					.text(function(d,i){
						return d;
					});
		////////////////////////////////////////////////////
		
		var lengthlimit=480/500*width;
		var linear = d3.scale.linear()
				   .domain([0, lengthlimit])
				   .rangeRound([28800,86340]);		//08:00:00~23:59:00
		var abtilinear = d3.scale.linear()
					.domain([28800,86340])
				   .range([0, lengthlimit]);
		/////////////////////////////////////////////////////
		//时间 标签
		var ddx=linear(0);
		var hourrelative=Math.floor(ddx/3600);
		var minuterelative=Math.floor((ddx-hourrelative*3600)/60);
		if(minuterelative<10){minuterelative="0"+minuterelative;}
		var dd=[1];		
		var timetag=svg.append("g")
					.selectAll("text")
					.data(dd)  
					.enter()
					.append("text")
					.attr("transform","translate("+10/500*width+","+80/500*width+")")
					.text(function(d,i){return (hourrelative)+":"+minuterelative;})
					.attr("font-size", 30/500*width+"px")
					.attr("font-family", "Georgia");  
					   

		/////////////////////////////////////
		//fri、sat、sun的标签
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
						.attr("transform",function(d,i){return "translate("+10/500*width+"," + (450+15 * i)/500*width+ ")";})
						.attr("dy",10/500*width) 
						.attr("dx",35/500*width)
						.attr("font-size", 15/500*width+"px")								
						.text(function(d,i){return d;}); 
		///////////////////////////////////////
		//点击日期标签触发
		function click(m){
			daynum=m;
			circles.data(id)  
					   .transition()
					   .duration(0) 
					   .attr("cx",function(d,i){
							return 0;							
						})
						.attr("cy",function(d,i){
							return width;
						});
			
			timetag2.text(function(d,i){
						if(daynum==0){return "Fri";}
						if(daynum==1){return "Sat";}
						if(daynum==2){return "Sun";}
					});
			Observer.fireEvent("changeday", m, "view1a");
			$("#v4submit").click();
			
		}
		/////////////////////////////////////
		//时间上方日期的显示
		var d2=[1];		
		var daynum=0;
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
		//////////////////////////////////
		//数轴
		var parseDate = d3.time.format("%H:%M").parse;
		var x = d3.time.scale().range([0,480/500*width]);
		var datax=[];
		var datax1 = parseDate("8:00");
		var datax2 = parseDate("23:59");
		datax.push(datax1);datax.push(datax2);
		x.domain(d3.extent(datax.map(function(d) { return d; })));
		var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);
		var viaxis=svg.append("g")
					.attr("class","axisx")
					.attr("transform", "translate("+15/500*width+","+510/500*width+")")
					.call(xAxis);
		///////////////////////////////////////
		//view1a2数轴
		var va2x2 = d3.time.scale().range([0,width2]);
		va2x2.domain(d3.extent(datax.map(function(d) { return d; })));
		var va2x3= d3.time.scale().range([0,width2]);
		va2x3.domain(d3.extent(datax.map(function(d) { return d; })));
		var xAxis2 = d3.svg.axis().scale(va2x2).orient("bottom").ticks(10);
		var via2xis=d3.select("#va2svg")
					.append("g")
					.attr("class","axisx")
					.attr("transform", "translate(10,"+(height3*0.8)+")")
					.call(xAxis2);
		////////////////////////////////////////////////////////////
		//view1a2 zoom
		var zoomscale;
		var zoom = d3.behavior.zoom()
					.on("zoom", draw)
					.center([0,0])
					.x(va2x3)
					.scaleExtent([1, Infinity]);

		 d3.select("#va2zoom").call(zoom);
		 function draw(){
			  //console.log(d3.event.translate);
			 // d3.select(this).attr("transform", "translate(" + d3.event.translate[0] + ",0)");
			  zoomscale=d3.event.scale;
			  width2=$("div#view1a2").width()*zoomscale;
			  va2x2=va2x2.range([0,width2]);
			  xAxis2.scale(va2x2);
			  via2xis.call(xAxis2);
			  $("#va2svg").css("width",width2);
			  $("#va2zoom").css("width",width2);
			  $("#viewa2draw").click();
			  //zoom.x(va2x2);
		 }
		////////////////////////////
		
		//拖动的方块
		var data4=[0];
		var rects2=svg.append("g")
				.selectAll("rect")
				.data(data4)
				.enter()
				.append("rect")
				.attr("fill","red" )
				.attr("y",510/500*width)
				.attr("x",10/500*width)
				.attr("id","view1dragrect")
				.attr("height", 20/500*width)
				.attr("width", 7/500*width)
				.call(d3.behavior.drag()
					.on("drag", dragmove)
				);	

		var lineFunction = d3.svg.line()
									 .x(function(d) { return (d.x*5)/500*width; })
									 .y(function(d) { return (500-5*d.y)/500*width; })
									 .interpolate("basis");
		var lineGraph=_.range(idnumlimit);
		var loctmp=_.range(idnumlimit);
		for(var i=0;i<idnumlimit;i++){
			lineGraph[i]=svg.append("g")
						   .append("path")
						   .attr("d", lineFunction([{x:0,y:0}]))
						   .attr("stroke", "blue")
						   .attr("stroke-width", 1/500*width) 
						   .attr("fill", "none");
		}
			
		
		//////////////////////////////
		function dragmove(){
			//console.log(id);
			//var scroll=document.getElementById("view1a").scrollLeft;
			var scroll=document.getElementById("view1").scrollLeft;
			var newx=event.clientX+scroll-10;
			//console.log(newx);

			if(newx<0){newx=0;}
			if(newx>lengthlimit){newx=lengthlimit;}
			ttime=linear(newx);
			//console.log(lengthlimit);
			var newx2=(linear(newx)-28800)/60
			//console.log(517+newx2/2);
			rects2.attr("x",(10+newx2/2)/500*width);
			
			ddx=linear(newx);

			hourrelative=Math.floor(ddx/3600);
			minuterelative=Math.floor((ddx-hourrelative*3600)/60);
			if(minuterelative<10){minuterelative="0"+minuterelative;}
			timetag.text(function(d,i){return (hourrelative)+":"+minuterelative;});

			for(var i=0;i<idnum;i++){
					findtime(i,ttime);
			}
			Observer.fireEvent("timedrag", newx, "view1a");

		}

		

	  
	  
	  
		
	
		var view1a={};
		var tmpi=[];//需要高亮的id的序号i
		view1a.onMessage = function(message, data, from){
			//console.log("view1a received message "+message+"  "+data+" from "+from );
			if(message == "showPath"){
				
				if(from == "view4"){
					//console.log("view4 select");
					//if(data==[]){}
					//else{
						onSelectPeople(data);
						circles.data(id)
							.exit()  
							.remove();
						showUser(id,daynum);
					//}
					
				}
			}
			if(message == "highlightstart"){
				//console.log("data  "+data)
				if(from != "view1a1"){
					circles.transition()
							.duration(1)
							.attr("fill","red")
							.attr("r",3);
					//console.log(tmpi);
					for(var i=0;i<tmpi.length;i++){
						loctmp[i]=[{x:0,y:0}];
						lineGraph[i].transition()
								.duration(0)
								.attr("d", lineFunction(loctmp[i]));
					}
					tmpi=[];
					circles.transition()
							.duration(1)
							.attr("fill",function(d,i){
								if(_.indexOf(data, d)>=0||_.indexOf(data, parseInt(d))>=0){
									//console.log("exist "+d);
									tmpi.push(i);
									return "yellow";
								
								}
								else{return "red";}
							})
							.attr("r",function(d,i){
								if(_.indexOf(data, d)>=0){return 6/500*width;}else{return 3/500*width;}
							});
					//console.log("tmpi  "+tmpi);
					for(var k=0;k<tmpi.length;k++){
						loctmp[k]=[];
						var len=datajson[daynum][tmpi[k]].x.length;
						for(var m=0;m<len;m++){
							var xx=datajson[daynum][tmpi[k]].x[m];
							var yy=datajson[daynum][tmpi[k]].y[m];
							loctmp[k].push({"x":xx,"y":yy});
						}
						lineGraph[k].transition()
								.duration(0)
								.attr("d", lineFunction(loctmp[k]));
					}
				}
				if(from != "view1a2"){
						recidhl=data;
						setTimeout(function(){
							$("#viewa2hlid").click();
						},100);
				}
			}
			if(message == "highlightend" || data==[]){

				if(from != "view1a1"){
					circles.transition()
							.duration(1)
							.attr("fill","red")
							.attr("r",3/500*width);
					for(var i=0;i<tmpi.length;i++){
						loctmp[i]=[{x:0,y:0}];
						lineGraph[i].transition()
								.duration(0)
								.attr("d", lineFunction(loctmp[i]));
					}
					
					tmpi=[];
					
				}
				if(from != "view1a2"){
						recidhl=[];
						idhl=[];
						setTimeout(function(){
							$("#viewa2hlid").click();
						},100);
				}

			}
			if(message == "spothighlightstart"){
				if(from != "view1a2"){
					receiveD[0]=data[0];
					hlflag=1;
					setTimeout(function(){
						$("#viewa2rcvhl").click();
					},100);
					//
				}
			}
			if(message == "spothighlightend"){
				if(from != "view1a2"){
					receiveD[0]=data[0];
					hlflag=0;
					setTimeout(function(){
						$("#viewa2rcvhl").click();
					},100);
					//$("#viewa2rcvhl").click();
				}
			}
			
		}
		
		
		function onSelectPeople(data){
			//console.log("view1a data: "+data);
			idnum=data.length;
			if(idnum>idnumlimit){idnum=idnumlimit;}
			id=data;
			width2=$("div#view1a2").width();
			recth=(width2*0.4*0.8)/idnum-2;
			sunloc=[];satloc=[];friloc=[];
			datajson=[0,0,0];
			for(var i=0;i<idnum;i++){
				loc[0].push({x:0,y:0});loc[1].push({x:0,y:0});loc[2].push({x:0,y:0});
				//xmlDoc[0].push(0);xmlDoc[1].push(0);xmlDoc[2].push(0);
			}
			circles = circles.data([]).exit().remove();
			circles = circles.data(id)  
						.enter()  
						.append("circle")  
						.attr("r",3/500*width)  
						.attr("fill","red")  
						.attr("cx",0)
						.attr("cy",500/500*width)
						.on("mouseover",function(d,i){
							
							loctmp[0]=[];
							var len=datajson[daynum][i].x.length;
							
							for(var m=0;m<len;m++){
								var xx=datajson[daynum][i].x[m];
								var yy=datajson[daynum][i].y[m];
								loctmp[0].push({"x":xx,"y":yy});
								//loctmp[0].push({"x":0,"y":0});
							}
							lineGraph[0].transition()
									.duration(0)
									.attr("d", lineFunction(loctmp[0]));				   
							Observer.fireEvent("highlightstart", [parseInt(d)], "view1a1");
							d3.select(this).attr("fill","yellow").attr("r",6/500*width);
						})
						.on("mouseout",function(d,i){
							loctmp[0]=[{x:0,y:0}];
							lineGraph[0].transition()
									.duration(0)
									.attr("d", lineFunction(loctmp[0]));
							d3.select(this).attr("fill", "red").attr("r",3/500*width);
							Observer.fireEvent("highlightend", [d], "view1a1");
						});
			circlelag=circles.append("title")
				.text(function(d,i){
					return d;
				});
		}
		$("#trackcheck").click(function(){
			  if(!document.getElementById("trackcheck").checked){
				circles.attr("opacity",0);
				for(var i=0;i<lineGraph.length;i++){
					lineGraph[i].attr("opacity",0);
				}
				
			  }else{
				circles.attr("opacity",1);
				for(var i=0;i<lineGraph.length;i++){
					lineGraph[i].attr("opacity",1);
				}
			  }
		  });

		$(window).resize(function(){
			// resize the view
			var prewidth=width;
			//width=$("div#view1a").width();
			//height=$("div#view1a").width()*1.1;
			width=$("div#view1").width();
			height=$("div#view1").width()*1.1;
			$("div#v1await").css("height",height);
			//$("div#view1a").css("height",height);
			$("div#view1").css("height",height);
			width2=$("div#view1a2").width();
			//var preheight=$("div#view1a2").height();
			$("div#view1a2").css("height",0.4*width2);
			height3=width2*0.4;
			height2=width2*0.4*0.8;
			$("div#view1a2").css("height",width2*0.4);
			//console.log(width);
			recth=(width2*0.4*0.8)/idnum-2;
			//svg = svg.attr("width",width)  
			//		.attr("height",height);
			$("#view1svg").css("width",width)  
					.css("height",height);
			for(var i=0;i<idnum;i++){
					findtime(i,ttime);
			}
			lengthlimit=480/500*width;
			linear =linear.domain([0, lengthlimit]);
			
			timetag=timetag.attr("transform","translate("+10/500*width+","+80/500*width+")")
						.attr("font-size", 30/500*width+"px");  
			labelRect = labelRect.attr("x",10/500*width)  
							.attr("y",function(d,i){return (450+15 * i)/500*width;})  
							.attr("width",25/500*width)
							.attr("height",12/500*width);
			labelText = labelText.attr("transform",function(d,i){return "translate("+10/500*width+"," + (450+15 * i)/500*width+ ")";})
							.attr("dy",10/500*width) 
							.attr("dx",35/500*width)
							.attr("font-size", 15/500*width+"px");
						
			timetag2=timetag2.attr("transform","translate("+10/500*width+","+45/500*width+")")
							.attr("font-size", 30/500*width+"px");

			x =x.range([0,480/500*width]);
			xAxis = xAxis.scale(x);
			viaxis=viaxis.attr("transform", "translate("+15/500*width+","+510/500*width+")").call(xAxis);
			
			va2x2 =va2x2.range([0,width2]);
			xAxis2 = xAxis2.scale(va2x2);
			//via2xis=via2xis.attr("transform", "translate(10,"+(height2*0.68)+")").call(xAxis2);
			
			var prex=(rects2.attr("x"))/prewidth*500;
			rects2=rects2.attr("x",prex/500*width)
						.attr("y",510/500*width)
						.attr("height", 20/500*width)
						.attr("width", 7/500*width);	
			//Observer.fireEvent("timedrag", prex, "view1a");
			lineFunction = lineFunction.x(function(d) { return (d.x*5)/500*width; })
										 .y(function(d) { return (500-5*d.y)/500*width; });
			for(var i=0;i<idnumlimit;i++){
				lineGraph[i]=lineGraph[i].attr("stroke-width", 1/500*width);
			}
			circles.attr("r",3/500*width);
			va2label= va2label.attr("x",function(d,i){return 10+(width2/typenum)*i ;})  
				.attr("y",(height3*0.9))  
				.attr("width",function(d,i){return (width2/typenum-25);});

			va2labelg=va2labelg.attr("transform",function(d,i){return "translate("+(width2/typenum)*i+","+(height3*0.9)+")";}); 
			va2labelText=va2labelText.attr("dy",function(d,i){return (10+11*i)+"px";});
			via2xis=via2xis.attr("transform", "translate(10,"+(height3*0.8)+")").call(xAxis2);

			
			brush = brush.x(d3.scale.identity().domain([0, width]))
						.y(d3.scale.identity().domain([0, width]));
			brusharea=brusharea.call(brush);
			$("#viewa2draw").click();
			
		});
		Observer.addView(view1a);
		return view1a;
		
		
	}
	
	window["View1a"] = View1a;
}
)()
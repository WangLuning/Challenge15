(function(){
function View6(Observer){
	var view6={};
	
	var timestart=28800;
	var timeend=86340;
	var timeflag=0;
	var locflag=0;
	var precommf=0;
	var daynum=0;
	
	var idlist=[];
	var commdata=[];
	var commcount=[];
	var countflatten=[];
	var commax=0;
	
	var sortarr=[];
	var limitidnum=50;
	
	var width=$(window).width()/4;
	var width2=$("div#view1").width();
	var height=width;
	var svg = d3.select("#view6")
				.append("svg")  
				.attr("class","view6svg")
				.attr("width",width)  
				.attr("height",height);
	var svg2=d3.select("#view1bg");
	var height2=height*0.95		
	var linear = d3.scale.linear()
					.domain([0, commax])
					.range([0,height*0.2]);//矩形占整个svg的高度
				
	var padding=2;
	var totalid=idlist.length;
	////////////////////////////////////
	//count rects
	var g_rects=svg.append("g");
	var rects=g_rects.selectAll("rect")
				.data(countflatten)
				.enter()
				.append("rect");
				//.on("mouseout", mouseout)
				//.on("click", click);
	var counttag=rects.append("title")
					.text(function(d,i){
						return d;
					});
	///////////////////////////////////////
	//id rects
	var g_idrects = svg.append("g");
	var idrects=g_idrects.selectAll("rect")  
							.data(idlist)  
							.enter()  
							.append("rect") ;
	var idtag=idrects.append("title")
					.text(function(d,i){
						return d;
					});
					
	///////////////////////////////////////
	//rects的标签
	var la=svg.append("g");
	var label=["#a4c2f4","#f4cccc","#6aa84f"];
	var labelRect = la.append("g")
					.selectAll("rect")	
					.data(label)
					.enter()
					.append("rect")
					.attr("x",0.85*width)  
					.attr("y",function(d,i){return 0.8*height+i*0.05*height;})  
					.attr("width",0.06*width)
					.attr("height",0.04*width)
					.attr("fill",function(d,i){return d;});
	var label2=["from","to","id"];
	var labelText = la.append("g")
					.selectAll("text")	
					.data(label2)
					.enter()
					.append("text")
					.attr("transform",function(d,i){return "translate("+0.85*width+"," + (0.8*height+i*0.05*height)+ ")";})
					.attr("dy",0.04*width) 
					.attr("dx",0.06*width+2)
					.attr("font-size", 15+"px")								
					.text(function(d,i){return d;}); 
	
	///////////////////////////////////////////
	//force
	var nodesarr=[];
    var edgesarr=[];
	var force = d3.layout.force()  
					  .nodes(nodesarr)
					  .links(edgesarr)
                      .size([width,height*0.8])  
                      .linkDistance(width/15) 
					  .friction(0.9) 			  
                      .charge([-50])
					  .gravity(1.5)
					  .theta(0.9)
					  .alpha(0.9)
					  .on("tick", tick);

	var edges = svg.append("g").selectAll("line")  
								.data(edgesarr)  
								.enter()  
								.append("line")  
								.style("stroke","#ccc")  
								.style("stroke-width",0.1);
	var nodes = svg.append("g").selectAll("circle")  
								.data(nodesarr)  
								.enter()  
								.append("circle")  
								.attr("r",3)  
								.attr("fill","red");
	var nodetag=nodes.append("title")
					.text(function(d,i){
						return d.name;
					});					
	function tick() {
	  edges.attr("x1", function(d) { return d.source.x; })
		  .attr("y1", function(d) { return d.source.y; })
		  .attr("x2", function(d) { return d.target.x; })
		  .attr("y2", function(d) { return d.target.y; });

	  nodes.attr("cx", function(d) { return d.x; })
		  .attr("cy", function(d) { return d.y; });
	}				  
	function forcestart() {
		
	  edges = edges.data(edgesarr);
	  edges.exit().remove();
	  edges.enter().append("line")
		  .attr("class", "link")
		  .style("stroke","#ccc")  
		  .style("stroke-width",0.1);

	  nodes = nodes.data(nodesarr);
	  nodes.exit().remove();
	  nodes.enter().append("circle")
		  .attr("class", "node")
		  .attr("fill","red")
		  .attr("r", 3)
		  .on("click",function(d,i){
			  if(_.indexOf(highlightid, d.name)>=0||_.indexOf(highlightid, parseInt(d.name))>=0){//已经高亮了
				  d3.select(this).attr("fill","red");
				  highlightid=_.without(highlightid, d.name, parseInt(d.name));
				  Observer.fireEvent("highlightstart", highlightid, "view6");
			  }else{
				  d3.select(this).attr("fill","yellow");
				  highlightid.push(parseInt(d.name));
				  Observer.fireEvent("highlightstart", highlightid, "view6");
			  }
			  
		  });
	  nodetag=nodes.append("title")
					.text(function(d,i){
						return d.name;
					});
					
	  force.nodes(nodesarr)
		  .links(edgesarr)
		  .start();
	}
	//forcestart();
				  
					  
	//////////////////////////////////////////////
	//line
	var lineData=[];
	
	var lineFunction = d3.svg.line()
							 .x(function(d) { return (d.x*5)/500*width2; })
							 .y(function(d) { return (500-5*d.y)/500*width2; })
							 .interpolate("linear");
	var lineGraphs=svg2.append("g").attr("id","v6line");

	var defs = svg2.append("defs");

	var arrowMarker = defs.append("marker")
							.attr("id","arrow")
							.attr("markerUnits","strokeWidth")
							.attr("markerWidth","12")
							.attr("markerHeight","12")
							.attr("viewBox","0 0 12 12") 
							.attr("refX","6")
							.attr("refY","6")
							.attr("orient","auto");

	var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
							
	arrowMarker.append("path")
				.attr("d",arrow_path)
				.attr("fill","#000");
	
	var lineGraph;
	
	//////////////////////////////////////////////////////
	var highlightid=[];
	//var nodeshli=[];
	//var rectshli=[];
	var lineclick=-1;
	//////////////////////
	view6.onMessage = function(message, data, from){
		console.log("view6 received "+message+" "+data+" from "+from);
		if(message == "showPath"){
			if(from == "view4"){
				idlist=data;
				//console.log(data);
				totalid=idlist.length;
				if(data.length!=0){
					if(precommf==1){
						console.log("exist");
						$("div#v6outer").show();
						$("#v6line").show();
						precommf=0;
					}
					else{
						chooseid(data,0);
						$("div#v6outer").show();
						$("#v6line").show();
					}
				}
			}
		}
		if(message == "clear"){
			if(from == "view4"){
				idlist=[];
				totalid=0;
				commdata=[];
				commcount=[];
				countflatten=[];
				sortarr=[];
				lineData=[];
				lineGraphs.selectAll("path").remove();
				highlightid=[];
				lineclick=-1;
			}
		}
		if(message == "chooseComm"){
			if(from == "view4"){
				//idlist=[];
				timestart=data[0];
				timeend=data[1];
				daynum=data[2];
				chooseid2();
				precommf=1;
			}
		}
		
		
		if(message=="chooseIdLocRange"){
			if(from != "view6"){
				locflag=1;
				daynum=data[2];
				//if(x0==0&&x1==100&&y0==0&&y1==100){locflag=0;}
			}
		}
		if(message=="chooseIdTimeRange"){
			if(from != "view6"){
				timestart=data[0];
				timeend=data[1];
				timeflag=1;
				if(timestart==28800&&timeend==86340){timeflag=0;}
			}
		}
		if(message=="highlightstart"){
			
			//if(from != "view6"){
				highlightid=data;
				//nodeshli=[];
				//rectshli=[];
				nodes.transition()
						.duration(1)
						.attr("fill",function(d,i){
							if(_.indexOf(data, d.name)>=0||_.indexOf(data, parseInt(d.name))>=0){
								//nodeshli.push(i);
								return "yellow";
							
							}
							else{return "red";}
						});
				idrects.transition()
						.duration(1)
						.attr("fill",function(d,i){
									if(_.indexOf(data, d)>=0||_.indexOf(data, parseInt(d))>=0){
										//rectshli.push(i);
										return "yellow";
									
									}
									else{return "#6aa84f";}
						});
						
				//console.log(commdata[1].idfrom);
				//console.log(idlist);
				//console.log(lineGraph.length);
				
				for(var k=1;k<commdata.length;k++){
					lineGraph[k].transition()
								.duration(1)
								.attr("stroke", "black")
								.attr("stroke-width",5/500*width) 
								.attr("opacity",0.01*5000/commdata.length);
				}
				for(var k=1;k<commdata.length;k++){

						lineGraph[k].transition()
									.duration(1)
									.attr("stroke", function(d,i){
										if(_.indexOf(data, commdata[k].idfrom)>=0||_.indexOf(data, parseInt(commdata[k].idfrom))>=0||_.indexOf(data, commdata[k].idto)>=0||_.indexOf(data, parseInt(commdata[k].idto))>=0){
											return "yellow";
										}
										else{return "black";}
									})
									.attr("stroke-width", function(d,i){
										if(_.indexOf(data, commdata[k].idfrom)>=0||_.indexOf(data, parseInt(commdata[k].idfrom))>=0||_.indexOf(data, commdata[k].idto)>=0||_.indexOf(data, parseInt(commdata[k].idto))>=0){
											return 10/500*width;
										}else{return 5/500*width;}
									}) ;
				}
						/*
			//}*/
		}
		if(message=="highlightend"||data==[]){
			//if(from != "view6"){
				
				nodes.transition()
						.duration(1)
						.attr("fill","red");
				idrects.transition()
						.duration(1)
						.attr("fill","#6aa84f");
				for(var k=1;k<commdata.length;k++){
					lineGraph[k].transition()
								.duration(1)
								.attr("stroke", "black")
								.attr("stroke-width",5/500*width) 
								.attr("opacity",0.01*5000/commdata.length);
				}
			//}
		}

	}
	
	function chooseid(idarr,flag){
		var idstr="";
		for(var i=0;i<idarr.length;i++){
			idstr=idstr+idarr[i]+",";
		}
		idstr=idstr.substr(0,idstr.length-1);
		
		var url="b4.php";
		//url=url+"?timestart="+timestart;
		//url=url+"&timeend="+timeend;
		//url=url+"&day="+daynum;
		//url=url+"&idstr="+idstr;
		//url=url+"&flag="+flag;
		//url=url+"&sid="+Math.random();
		//console.log(url);
		$.ajax({ url:url, 
			//async:false,  
			type:"post",
			data:{timestart:timestart,timeend:timeend,day:daynum,idstr:idstr,flag:flag},
			//cache:false, 
			dataType:'json',
			success:function(data){  
				//console.log(data);
				if(idarr.length==0){
						console.log("view6 empty");
				}
				else{
					commdata=data;
					console.log(commdata);
					var tmplen=idlist.length;
					console.log(tmplen);
					if(limitidnum<tmplen){
						console.log("sort");
						for(var i=0;i<tmplen;i++){
							var tmp1=data[0].idcount[i];
							var tmp2=data[0].fromcount[i]+data[0].tocount[i];
							var tmp={id:tmp1,countall:tmp2};
							sortarr.push(tmp);
						}
						sortarr.sort(getSortFun('desc', 'countall'));
						var idlisttmp=[];
						for(var i=0;i<tmplen;i++){
							idlisttmp.push(sortarr[i].id);
						}
						idlisttmp=_.uniq(idlisttmp);
						idlist=_.initial(idlisttmp,tmplen-limitidnum);
						totalid=idlist.length;
						//console.log("hhhhh"+limitidnum);
						console.log(idlist);
					}
					if(flag==1){
						console.log("choose by view6");
						console.log(idlist);
						Observer.fireEvent("showPath", idlist, "view6");
					}
					
					updateview();
					//$("div#v6outer").show();
				}
				 //console.log(commcount);
			 },
			 error:function(xhr){
				 console.log("error");
				 } 
		 })
	}
	
	function chooseid2(){//找出当前时段有通讯记录的ID，再去调用chooseid()，取前n个
		var url="b5.php";
		url=url+"?timestart="+timestart;
		url=url+"&timeend="+timeend;
		url=url+"&day="+daynum;
		url=url+"&sid="+Math.random();
		console.log("chooseid2 by comm");
		$.ajax({ url:url, 
			//async:false,  
			cache:false, dataType:'json',
			 success:function(data){ 
				idlist=data[0].id;
				console.log(idlist);
				totalid=idlist.length;
				for(var i=0;i<idlist.length;i++){idlist[i]=parseInt(idlist[i]);}
				chooseid(idlist,1);
			 },
			 error:function(xhr){
				 console.log("error");
				 } 
		 })
	}
	
	
	
	
	function getSortFun(order, sortBy) {
		var ordAlpah = (order == 'asc') ? '>' : '<';
		var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
		return sortFun;
	}

	
	
	
	
	
	
	
	
	
	
	
	function updateview(){
		commcount=commdata[0];
		console.log(commcount);
		countflatten=[];
		totalid=commdata[0].idcount.length;
		console.log(totalid);
		for(var i=0;i<commdata[0].idcount.length;i++){
			//console.log(commcount.idcount[i]);
			if(_.indexOf(idlist,""+commcount.idcount[i])>=0||_.indexOf(idlist,parseInt(commcount.idcount[i]))>=0){
				countflatten.push(commcount.fromcount[i]);
			}
		}
		for(var i=0;i<commdata[0].idcount.length;i++){
			if(_.indexOf(idlist,""+commcount.idcount[i])>=0||_.indexOf(idlist,parseInt(commcount.idcount[i]))>=0){
				countflatten.push(commcount.tocount[i]);
			}
		}
		//countflatten=_.flatten([commcount.fromcount,commcount.tocount]);
		
		//console.log(totalid);
		//console.log(countflatten.length);
		var tmp=_.range(totalid-1);
		
		for(var i=0;i<totalid;i++){
			tmp[i]=countflatten[i]+countflatten[i+totalid-1];
		}
		console.log(tmp);
		commax=d3.max(tmp);
		//console.log(commax);
		linear = linear.domain([0, commax]);
		console.log(countflatten);
		rects.remove();
		rects = g_rects.selectAll("rect");
		rects=rects.data(countflatten).enter()
				.append("rect")
				.attr("fill",function(d,i){
					if(i>=totalid){return "#f4cccc";}
					else{return "#a4c2f4";}
				})
				.attr("x",function(d,i){
					//console.log(d);
					return 10+(i%totalid)*(width*0.8/totalid);
					})
				.attr("y", function(d,i){
					if(i>=totalid){return height2-linear(d)-linear(countflatten[i-totalid]);}
					else{return height2-linear(d);}
				})
				.attr("width", width*0.8/totalid-padding)
				.attr("height", function(d,i){
					return linear(d);
				});
		//rects.data(countflatten).exit().remove();
		counttag=rects.append("title")
					.text(function(d,i){
						return d;
					});
		
		idrects.remove();
		idrects = g_idrects.selectAll("rect")
		idrects=idrects.data(idlist).enter()
				.append("rect")
				.attr("fill","#6aa84f")  
				.attr("x",function(d,i){
					return 10+i*(width*0.8/totalid);
					})
				.attr("y", height-(height-height2-5))
				.attr("width", width*0.8/totalid-padding)
				.attr("height",(height-height2-5))
				.on("click",function(d,i){
					  if(_.indexOf(highlightid, d)>=0||_.indexOf(highlightid, parseInt(d))>=0){//已经高亮了
						  d3.select(this).attr("fill","#6aa84f");
						  highlightid=_.without(highlightid, d, parseInt(d));
						  Observer.fireEvent("highlightstart", highlightid, "view6");
					  }else{
						  d3.select(this).attr("fill","yellow");
						  highlightid.push(parseInt(d));
						  Observer.fireEvent("highlightstart", highlightid, "view6");
					  }
					  
				  });
		idtag=idrects.append("title")
					.text(function(d,i){
						return d;
					});
		//////////////////////////////////////////////////
		nodesarr=[];
		edgesarr=[];
		console.log(commdata.length);
		console.log(idlist);
		for(var i=1;i<commdata.length;i++){
			if(_.indexOf(idlist,parseInt(commdata[i].idfrom))>=0||_.indexOf(idlist,parseInt(commdata[i].idto))>=0){
				//console.log("ggg");
				nodesarr.push(commdata[i].idfrom);
				nodesarr.push(commdata[i].idto);
			}
			
		}
		nodesarr=_.uniq(nodesarr);
		console.log(nodesarr);
		console.log(nodesarr.length);
		
		lineData=_.range(commdata.length);
		lineGraph=_.range(commdata.length);
		for(var i=1;i<commdata.length;i++){
			var fromindex=_.indexOf(nodesarr,commdata[i].idfrom);
			var toindex=_.indexOf(nodesarr,commdata[i].idto);
			
			if(fromindex>=0&&toindex>=0){
				var tmp={source:fromindex,target:toindex};
				edgesarr.push(tmp);
			}
			if(commdata[i].idfrom==839736||commdata[i].idfrom=="839736"){
				lineData[i-1]=[{"x":0,"y":75},{"x":commdata[i].tox,"y":commdata[i].toy}];
			}
			else{
				if(commdata[i].idto==839736||commdata[i].idto=="839736"){
					lineData[i-1]=[{"x":commdata[i].fromx,"y":commdata[i].fromy},{"x":0,"y":75}];
				}else{
					if(commdata[i].idfrom==1278894||commdata[i].idfrom=="1278894"){
						lineData[i-1]=[{"x":0,"y":50},{"x":commdata[i].tox,"y":commdata[i].toy}];
					}else{
						if(commdata[i].idto==1278894||commdata[i].idto=="1278894"){
							lineData[i-1]=[{"x":commdata[i].fromx,"y":commdata[i].fromy},{"x":0,"y":50}];
						}else{
							if(commdata[i].idto==0||commdata[i].idto=="0"){
								lineData[i-1]=[{"x":commdata[i].fromx,"y":commdata[i].fromy},{"x":0,"y":25}];
							}else{
								lineData[i-1]=[{"x":commdata[i].fromx,"y":commdata[i].fromy},{"x":commdata[i].tox,"y":commdata[i].toy}];
							}
							
						}
					}
				}
			}
		}
		nodesarr=_.map(nodesarr, function(d){ return {name:d}; });
		//forcestart();
		/////////////////////////////////////////////////////////////////
		
		
		lineGraphs.selectAll("path").remove();
		if(timeflag==1){
			for(var i=1;i<commdata.length;i++){
				lineGraph[i]=lineGraphs.append("path")
							   .attr("d", lineFunction(lineData[i]))
							   .attr("stroke", "black")
							   .attr("stroke-width", 5/500*width) 
							   .attr("opacity",0.01*5000/commdata.length)
							   .attr("fill", "none")
							   //.attr("marker-end","url(#arrow)")
							   .on("mouseover",function(d,i){
								   //console.log(d3.select(this).attr("stroke"));
								   if(d3.select(this).attr("stroke")=="black"){
									    d3.select(this).attr("stroke", "red");
										d3.select(this).attr("opacity", 1);
										d3.select(this).attr("stroke-width", 10/500*width);
								   }
								    
							   })
							   .on("mouseout",function(d,i){
								   var k=$(this).index();
								   
								   if(lineclick==k){
										d3.select(this).attr("stroke", "red");
									    d3.select(this).attr("stroke-width", 5/500*width)
								   }else{
									   //console.log(d3.select(this).attr("stroke"));
									   if(d3.select(this).attr("stroke")=="red"){
										   d3.select(this).attr("opacity",0.01*5000/commdata.length);
											d3.select(this).attr("stroke", "black");
											d3.select(this).attr("stroke-width", 5/500*width);
									   }
									   
								   }
								    
							   })
							   .on("click",function(d,i){
								   var k=$(this).index();
								   
								   console.log(k);
								   console.log(lineclick);
								  if(_.indexOf(highlightid, commdata[k].idfrom)>=0||_.indexOf(highlightid, parseInt(commdata[k].idfrom))>=0||_.indexOf(highlightid, commdata[k].idto)>=0||_.indexOf(highlightid, parseInt(commdata[k].idto))>=0){

								  //if(_.indexOf(highlightid, d)>=0||_.indexOf(highlightid, parseInt(d))>=0){//已经高亮了
									  d3.select(this).attr("fill","black");
									  highlightid=_.without(highlightid, commdata[k].idfrom, parseInt(commdata[k].idfrom));
									  highlightid=_.without(highlightid, commdata[k].idto, parseInt(commdata[k].idto));
									  //lineclick=_.without(lineclick,k);
									  lineclick=-1;
									  Observer.fireEvent("highlightstart", highlightid, "view6");
								  }else{
									  d3.select(this).attr("fill","red");
									  if(_.indexOf(idlist, commdata[k].idfrom)>=0||_.indexOf(idlist, parseInt(commdata[k].idfrom))>=0){
										  highlightid.push(parseInt(commdata[k].idfrom));
									  }
									  if(_.indexOf(idlist, commdata[k].idto)>=0||_.indexOf(idlist, parseInt(commdata[k].idto))>=0){
										  highlightid.push(parseInt(commdata[k].idto));
									  }
									  //highlightid.push(parseInt(commdata[k].idto));
									  //lineclick.push(k);
									  lineclick=k;
									  Observer.fireEvent("highlightstart", highlightid, "view6");
								  }
								  
							  });
			}
		}
		

		//console.log(nodesarr);
		//console.log(edgesarr);

	}
	

	$("#commcheck").click(function(){
			  if(!document.getElementById("commcheck").checked){
				//lineGraphs.attr("opacity",0);
				$("#v6line").hide();
			  }else{
				//lineGraphs.attr("opacity",1);
				$("#v6line").show();
			  }
		  });
	
	
	Observer.addView(view6);
	return view6;
	}
	window["View6"] = View6;
}
)()
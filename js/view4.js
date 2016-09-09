(function(){
function View4(Observer){
	var view4={};
	var num=1;
	var idlist=[];
	//var idlist=[629048, 1486047, 1690685, 1797150] 
	var numlimit=50;
	
	var idlisttmp=[];
	var idhighlight=[];
	var preheight=$(window).height() - $("#View5").height();
	
	var x0,x1,y0,y1;
	var timestart,timeend;
	var timeflag=0;
	var locflag=0;
	var selected="loc";
	var daynum=0;
	
	//console.log(preheight);
	$("div#view4").css("height",preheight-94);
	view4.onMessage = function(message, data, from){
			if(message == "showPath"){
				if(from != "view4"){
					if(from=="view6"){
						idlisttmp=data;
						for(var i=0;i<idlisttmp.length;i++){idlisttmp[i]=parseInt(idlisttmp[i]);}
						$("input#file").attr("flag","0");
						timeflag=0;
						locflag=0;
						add();
					}
					else{
						//changelist(data);
						idlisttmp=data;
						for(var i=0;i<idlisttmp.length;i++){idlisttmp[i]=parseInt(idlisttmp[i]);}
						$("input#file").attr("flag","0");
						timeflag=0;
						locflag=0;
					}
					
				}
			}
			if(message=="chooseIdLocRange"){
				if(from != "view4"){
					x0=data[0][0];
					y0=data[0][1];
					x1=data[1][0];
					y1=data[1][1];
					daynum=data[2];
					locflag=1;
					if(x0==0&&x1==100&&y0==0&&y1==100){locflag=0;}
					console.log("chooseIdLocRange "+data);
					//console.log(x0+" "+x1+" "+y0+" "+y1);
				}
			}
			if(message=="chooseIdTimeRange"){
				if(from != "view4"){
					timestart=data[0];
					timeend=data[1];
					timeflag=1;
					if(timestart==28800&&timeend==86340){timeflag=0;}
					console.log("chooseIdTimeRange "+data);
				}
			}
			if(message == "highlightstart"){
				if(from != "view4"){
					console.log("view4 highlightstart "+data);
					idhighlight=data;
					$("#view4 p").css("background-color","white");
					for(var i=0;i<data.length;i++){
						$("#view4 p").filter("#"+data[i]).css("background-color","yellow");
					}
					
				}
			}
			if(message == "highlightend"){
				if(from != view4){
					console.log("view4 highlightend "+data);
					idhighlight=_.without(idhighlight, parseInt(data));
					for(var i=0;i<data.length;i++){
						//$("#view4 p").filter("#"+data[i]).removeAttr("background-color");
						$("#view4 p").filter("#"+data[i]).css("background-color","white");
					}
				}
			}
	}

	$("#add").click(add);
	
	
	document.getElementById("vb2Choose").onchange=function(){
		selected = document.getElementById("vb2Choose").value;
	}
	
	
	function add(){
		if(timeflag==1){
			if(locflag==1&&selected=="loc"){chooseid();}
			else{
				if(selected=="comm"){
					Observer.fireEvent("chooseComm", [timestart,timeend,daynum], "view4");
					timeflag=0;
				}
			}
		}else{
		  if($("input#file").attr("flag")=="1"){
			  var aaa=[];
			  idlist=[];
			  aaa=$("input#file").attr("ls").split(",");
			  for(var i=0;i<aaa.length;i++){
				  idlist.push(parseInt(aaa[i]));
			  }
			  idlisttmp=[];
			  //console.log(idlist);
			  //idlisttmp=$("input#file").attr("ls").split(",");
			  $("input#file").attr("flag","0");
			  //console.log($("input#file").attr("flag"));
			  
		  }else{
			  idlist=_.union(idlist,idlisttmp);
		  }
		  redraw();
		}
	}

	function chooseid(){
		var url="b3.php";
		url=url+"?timestart="+timestart;
		url=url+"&timeend="+timeend;
		url=url+"&day="+daynum;
		url=url+"&x0="+Math.floor(x0);
		url=url+"&x1="+Math.floor(x1);
		url=url+"&y0="+Math.floor(y1);
		url=url+"&y1="+Math.floor(y0);
		console.log(url);
		url=url+"&sid="+Math.random();
		
		$.ajax({ url:url, 
			//async:false,  
			cache:false, dataType:'json',

			 success:function(data){  
				 console.log(data);
				 idlist=[];
				 idlisttmp=[];
				 //console.log(Math.min(data.length,numlimit));
				 for(var i=0;i<Math.min(data.length,numlimit);i++){
					 idlist.push(parseInt(data[i]));
				 }
				 redraw();
			 },
			 error:function(xhr){
				 console.log("error");
				 } 
		 })
	}

	
	function redraw(){  
	  $("#view4").children("p").remove();
	  for(var i=0;i<idlist.length;i++){
		  $("#view4").append("<p>"+idlist[i]+"</p>");
		  $("#view4 p:last").attr("id",+idlist[i]);
		  //$("#view4 p:last").css("background-color","white");
		  $("#view4 p:last").addClass("idlistp");
		  //$("#view4 p:last").append('<input type="button" class="deleteid" value="delete">');
		  $("#view4 p:last").append('<a class="deleteid"><i class="fa fa-remove "></i></a>');
		  $(".deleteid:last").click(function(){
				var d=parseInt($(this).parent("p").attr("id"));
				Observer.fireEvent("highlightend", [+$(this).parent("p").attr("id")], "view4");
				$(this).parent("p").remove();
				idlist=_.without(idlist,d);
				idhighlight=_.without(idhighlight,d);
				//console.log(idlist);
			});
			/*
		  $("#view4 p:last").mouseover(function(){
			  $(this).css("background-color","yellow");
			  //console.log($(this).attr("id"));
			  Observer.fireEvent("highlightstart", [+$(this).attr("id")], view4);
		  });
		  $("#view4 p:last").mouseout(function(){
			  $(this).css("background-color","white");
			  //console.log($(this).attr("id"));
			  Observer.fireEvent("highlightend", [+$(this).attr("id")], view4);
		  });
		  */
		  
		  $("#view4 p:last").click(function(){
			  if($(this).css("background-color")=="rgb(255, 255, 0)"){
				  $(this).css("background-color","white");
				  idhighlight=_.without(idhighlight,parseInt($(this).attr("id")));
				  //console.log("idhighlight  "+idhighlight);
				  Observer.fireEvent("highlightstart", idhighlight, "view4");
				  console.log("view4 highlight "+idhighlight);
			  }else{
				  $(this).css("background-color","yellow");
				  idhighlight.push(parseInt($(this).attr("id")));
				  //console.log("idhighlight  "+idhighlight);
				  Observer.fireEvent("highlightstart", idhighlight, "view4");
				  console.log("view4 highlight "+idhighlight);
			  }
		  });
	  }
	}
	
	
	
	$("#clear").click(function(){
		//console.log("clear");
	  idlist=[];
	  $("#view4").children("p").remove();
	  Observer.fireEvent("highlightend", idhighlight, "view4");
	  idhighlight=[];
	  Observer.fireEvent("highlightstart", idhighlight, "view4");
	  Observer.fireEvent("clear", [], "view4");
	});
	
	
	$("#v4submit").click(function(){
	  //Observer.fireEvent("highlightstart", [], "view4");
	  Observer.fireEvent("showPath", [], "view4");
	  Observer.fireEvent("showPath", idlist, "view4");
	  //Observer.fireEvent("showPath", idlist, "view4");
	});
	
	
	function saveAs(blob, filename) {
		var type = blob.type;
		var force_saveable_type = 'application/octet-stream';
		if (type && type != force_saveable_type) { // ǿ׆Ђ՘ì׸؇՚䰀F󖐴򿪍
			var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
			blob = slice.call(blob, 0, blob.size, force_saveable_type);
		}

		var url = URL.createObjectURL(blob);
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href = url;
		save_link.download = filename;

		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
		URL.revokeObjectURL(url);
	}
	
	
	$("#save").click(function(){
		var textBlob1 = new Blob([idlist.toString()], { type: "text/plain"});
	    saveAs(textBlob1,num+'.txt');
	    num=num+1;
	});





	Observer.addView(view4);
	return view4;
	}
	window["View4"] = View4;
}
)()
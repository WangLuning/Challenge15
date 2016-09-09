$(document).ready(function(){
  $(function() {
    $( "div#viewb2outer" ).draggable();
	$( "div#va2outer" ).draggable();
	$("div#v6outer").draggable();
  });

  //$(function() {
    //$( "div#view4" ).draggable();
  //});
  $("#v6line").hide();
  $("div#view1a").hide();
  $("#v1await").hide();
  $("div#viewb2outer").hide();
  $("div#v6outer").hide();
  $("div#va2outer").hide();
  $("div#va2outer").click(function(){
	  $("div#va2outer").css("z-index",30);
	  $("div#v6outer").css("z-index",10);
  });
  $("div#v6outer").click(function(){
	  $("div#va2outer").css("z-index",10);
	  $("div#v6outer").css("z-index",30);
  });
  $("#view1change").click(function(){
	  if(document.getElementById("view1change").value=="show track"){
		document.getElementById("view1change").value="show attraction";
	  }else{
		document.getElementById("view1change").value="show track";
	  }
	  $("div#view1a").toggle();
	  $("div#view1b").toggle();
	  $("div#viewb2outer").hide();
  });
  $("#viewb2close").click(function(){
	  $("div#viewb2outer").hide();
  });
  $("#view6close").click(function(){
	  $("div#v6outer").hide();
  });

  $("#viewa2close").click(function(){
	$("div#va2outer").hide();
  });
  $("#view1a2").bind("click",function(event){
         event.stopPropagation();

   })
  
});

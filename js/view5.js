function View5(Observer){
	var view = {};
	Observer.addView(view);
	
	view.onMessage = function(message, data, from){
		
		//if(message == "showPath"){
			
		//}
	}		
	var groupId = document.getElementById("groupId");
	var resultOfGroup = document.getElementById("resultOfGroup");
	
	var file = "data/leader2id-100.json";
	$("button#inputNum").click(function num2group(){
		var numAll=0;
		groupId.innerHTML="<option value = 'none'>leader's id</option>";
		minNum = document.getElementById("minNum").value;
		if(minNum==""){minNum=0;}
		maxNum = document.getElementById("maxNum").value;
		if(maxNum==""){maxNum=1000;}
		d3.json(file,function(data){
			//console.log(data);
			for (leader in data){
				if(data[leader]["num"]>=minNum && data[leader]["num"]<=maxNum){
					groupId.options.add(new Option(leader,leader));
					++numAll;
				}			
			}
			if(numAll==1)resultOfGroup.innerHTML="Find "+numAll+" group!";
			else resultOfGroup.innerHTML="Find "+numAll+" groups!";
		});
	});
	groupId.onchange=function(){
		leader = groupId.value;
		if (leader!="none"){
			d3.json(file,function(data){
				//console.log(parseInt(leader));
				selectedId = data[leader]["members"];
				selectedId.push(parseInt(leader));
				console.log(selectedId);
				Observer.fireEvent("showPath", selectedId, view);
				Observer.fireEvent("highlightend", selectedId, view);
				Observer.fireEvent("highlightstart", selectedId, view);
			});
		}
	}
		
	
	return view;
};
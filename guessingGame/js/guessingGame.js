(function(){
	var creatvalue;
    var actionButten = DIU.$('action-butten');
    var action = DIU.$('action');
    var determine = DIU.$('determine');
    var notrepeat = DIU.$('notrepeat');
    var wrongResults = DIU.$('wrongResults');
    var rightResults = DIU.$('rightResults');
    var wrongNumber = DIU.$('wrong-number');
    var rightNumber = DIU.$('right-number');
    var prompt = DIU.$('prompt');
    var answer = DIU.$('answer');
    var exit = DIU.$('exit');
    var explain = DIU.$('explain');


    var fourinput = DIU.Tag('input');
    var tdtext = DIU.Tag('li');


    var nowimport = "";
    var numberOfInput=0; 
	var newNode=[];


    var Reminder;
    var ComputerMatchSign;
    var userMatchSign;
    var randomnumber;
    var truthBeTold;

	var gameAction = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			DIU.event.addEvent(actionButten,'click', function(){
				action.style.display="none";
				self.clearData();
				newNode=[];
				self.creatnumber();
			});
			DIU.event.addEvent(determine,'click', function(){
				self.legalJudgment();
				
			});
			DIU.event.addEvent(exit,'click', function(){
				truthBeTold = window.confirm("您确定要退出本关么");
				if (truthBeTold) {
					self.clearData();
					newNode=[];
					self.creatnumber();
				}  
			});
		},
		creatnumber : function(){
			creatvalue="";
			if(notrepeat.checked){
				this.newNotRepeated();
			}
			else{
				var index = 4;
				while(index--) {
					creatvalue+=Math.floor(Math.random()*10);
				}
			}
			//alert(creatvalue);
		},
		newNotRepeated : function(){
			var index = 4;
			while(index) {
				randomnumber = Math.floor(Math.random()*10);
				if (creatvalue.indexOf(randomnumber)===-1) {
					creatvalue+=randomnumber;
					index--;
				}
			}
		},
		legalJudgment : function(){
			nowimport = "";
			for (var i = 1; i < 5; i++) {
				if(fourinput[i].value == ""){
					this.alert(prompt,"请先输入");
					return;
				}
				else if((!this.isalphanumber(fourinput[i].value))||fourinput[i].value==" "){
					this.alert(prompt,"请输入数字0~9");
					return;
				}
				nowimport+=fourinput[i].value;
			}

			Reminder = this.promptReminder(nowimport);
			this.writeIn(nowimport,Reminder);
			var index = 4;
			while(index--) {
				fourinput[index+1].value = "";
			}
		},
		isalphanumber : function(str){
			return !isNaN(str);
		},
		promptReminder : function(nowimport){
		    var Anum = 0;
		    var Bnum = 0;
			ComputerMatchSign= [0,0,0,0];
			userMatchSign= [0,0,0,0];
			for (var i = 0; i < 4; i++) {
				if(creatvalue[i] == nowimport[i]){
					ComputerMatchSign[i] = 1;
					userMatchSign[i] = 1;
					Anum++;
					continue;
				}
			}
			for (var i = 0; i < 4; i++) {
				if(userMatchSign[i]==1) continue;
				for (var j = 0; j < 4; j++) {
					if(ComputerMatchSign[j]==1) continue;
					else if(creatvalue[j] == nowimport[i]){
					ComputerMatchSign[j] = 1;
					userMatchSign[i] = 1;
						Bnum++;
						break;
					}
				}
			}
			if(Anum==4){
				this.end(rightResults,rightNumber);
			}
			return Anum+"A"+Bnum+"B";
		},
		writeIn:function(nowimport,Result){
			this.addli(nowimport,Result);
			numberOfInput++;
			if(numberOfInput==1000){
				this.end(wrongResults,wrongNumber);
			}
		},
		end :function(Result,number){
			action.style.display="block";
			for (var i = 0; i < action.children.length; i++) {
				DIU.hidden(action.children[i])
			};
			DIU.show(actionButten);
			DIU.show(Result);
			number.innerHTML = creatvalue;
			actionButten.innerHTML = "<h2>再玩一次</h2>";
		},
		clearData : function(){
			for (var i = 0; i < tdtext.length; i++) {
				answer.innerHTML="";
			}
		},
        addli:function(nowimport,Result){
			var uiString = 
				'<li>'+
				'	<span class="wrong">'+nowimport+'</span>'+
				'	<span class="result">'+Result+'</span>'+
				'</li>';
				newNode.push(uiString);
			answer.innerHTML = newNode.reverse().join("");
		},
		alert:function(prompt,text){
			DIU.show(prompt);
			prompt.innerHTML=text;
			DIU.event.settimeout(1000,prompt);
		}
	}
	gameAction.init();
})()
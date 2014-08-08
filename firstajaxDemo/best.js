var AjaxApp = (function(){
	var ajaxcontent = dd.$("contentajax");
	var btn = dd.$("btn");
	var content = [];
	function init(){
		bindEvent();
	};

	function bindEvent(){
		btn.addEventListener("click",function(){
			ajaxEvent();
		},false);
	};

	function ajaxEvent(){
		var obj = {
			url:"information.json",
			type:"get",
			success:function(rep){
				var response =  JSON.parse(rep);
				for(var i =0;i <response.length;i++){
					generateContent(response,i);
				}
			},
			error:function(){
				alert("have Bug!!")
			}
		}
		$.ajax(obj);
	};

	function generateContent(array,index){
		var uiString = 
			'<div class="information bd">'+
			'	<div class="photo bd"><img src="'+array[index].photo+'"></div>'+
			'       <div class="content">'+
			'            <ul>'+
			'					<li><span>姓名:</span><span class="name">'+array[index].name+'</span></li>'+
			'					<li><span>地址:</span><span class="address">'+array[index].address+'</span></li>'+
			'					<li><span>年龄:</span><span class="age">'+array[index].age+'</span></li>'+
			'			</ul>'+
			'		</div>'+
			'</div>';
		contentajax.innerHTML += uiString;
	};

	return {
		run:init
	}

})();

AjaxApp.run();


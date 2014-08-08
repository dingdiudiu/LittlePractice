(function(){
	var url = "js/aaa.json?rand="+Math.random();
	var jsondata;
	var oname = [];

	var scriptText = DK.$("article-item").text;
	var mysect = DK.Tag("section")[0];
	var button = DK.Tag("button")[0];

	var ajaxApp = {
		init:function(){
			this.bind();
		},
		bind:function(){
			this.buttonclick();
		},
		buttonclick:function(){
			var self = this;
			button.addEventListener("click",function(){
				self.getData();
			},false);
		},
		getData:function(){
			var xhr = DK.creatXHR();
			var self = this;
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status >= 200 && xhr.status<300||xhr.status == 304) {
						self.manage(xhr.responseText);
					}else{
						alert("fail"+xhr.status);
					}
				};
			};
			xhr.open("get",url,true);
			xhr.send(null);
		},
		manage:function(data){
			jsondata = JSON.parse(data);
			for (var i = 0,len = jsondata.length; i < len; i++){
				this.showtext(jsondata[i]);
			};
		},
		showtext:function(o){
			var result = this.resultText(o);
			var article = document.createElement("article");
			article.innerHTML = result;
			mysect.appendChild(article);
		},
		resultText:function(o){
			var i =0,j=0;
			for(t in o){
				oname[j++]=t;
			}
			return scriptText.replace(/%s/g,function(){
				return (i<oname.length) ? o[oname[i++]] : "";
			});
		}
	}
	ajaxApp.init();
})()


	
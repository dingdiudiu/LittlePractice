(function(){
	var option;
	var numSorting = ["three","two","one"];
	var i,j;
	var node;
	var _newNode;
	var obj;
	var ZU;
	var save;
	var findSelectone = dd.$("selectone");
	var findSelecttwo = dd.$("selecttwo");
	var ajaxApp = {
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			this.clickselect();
			var me = this;
			findSelectone.onchange = function(){
                me.changemethod(1,this.value);
            }
			findSelecttwo.onchange = function(){
                me.changemethod(0,this.value);
            }
		},
		clickselect:function(){
			this.ajaxMethod();
		},
		ajaxMethod:function(){
			var me = this;
			$.ajax({
				type:"get",
				url:"js/diu.json",
				success:function(rep){
					obj = jQuery.parseJSON(rep);
					for(i=0;i<obj.length;i++){
						me.creatProvince(i,obj);
					}
				},
				error:function(error){
					alert("error");
				}
			})
		},
        addNode:function(newNode,parentNode){
            _newNode = dd.create(newNode);
            parentNode.appendChild(_newNode);
            return _newNode;
        },
        creattext:function(newNode,parentNode,value,number){
			newNode = this.addNode(newNode,parentNode);
			newNode.innerHTML = value;
			newNode.setAttribute("value",number);
            return newNode;
        },
		creatProvince:function(num,array){
			node = this.creattext("option",findSelectone,array[num]["name"],array[num]["number"]);
		},
		changetwo:function(parentnode,valnum){
			save = obj[valnum]["city"];
			for(j=0;j<save.length;j++){
				option = this.creattext("option",parentnode,save[j]["name"],save[j]["number"]);
			}
		},
		changethree:function(parentnode,valnum){
			save = obj[findSelectone.value-1]["city"][valnum]["district"];
			for(j=0;j<save.length;j++){
				option = this.creattext("option",parentnode,save[j]["name"],save[j]["number"]);
			}
		},
		changemethod:function(cgenum,valnum){
			for(i=cgenum;i>=0;i--){
				node = dd.$("select"+numSorting[i]);
				node.innerHTML = "<option value='请选择'>请选择</option>";}
			for(i=cgenum;i>=0;i--){
				node = dd.$("select"+numSorting[i]);
				if(i==1) {this.changetwo(node,valnum-1);return;}
				if(i==0) this.changethree(node,valnum-1);
			}
		}
	}
	ajaxApp.init();
})()
(function(){
    var contentajax;
    var $btn = $("#btn");
    var information;
    var leftphoto;
    var content;
    var img;
    var ul;
    var li;
    var span;
    var describe = ["姓名","地址","年龄"];
    var keys = ["name","address","age"];
    var ajaxApp = {
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            this.buttonclick();
        },
        buttonclick:function(){
            var me = this;
            $btn.click(function(){
                me.ajaxmethoed();
            });
        },
        ajaxmethoed:function(){
            var me = this;
            $.ajax({
                type: "get",
                url: "information.json",
                success:function(rep){
                    alert(rep);
                    var obj = jQuery.parseJSON(rep);
                    for(var i=0;i<10;i++){
                        me.createDom(obj,i);
                    }
                },
                error:function(error){
                    contentajax.text(error.statusText);
                }
            });
        },
        setClassName:function(classname,parentNode,currentNode){
            currentNode.className = classname;
            parentNode.appendChild(currentNode);
        },
        addNode:function(newNode,parentNode){
            var _newNode = dd.create(newNode);
            parentNode.appendChild(_newNode);
            return _newNode;
        },
        createDiv:function(){
            information = dd.create("div");
            this.setClassName("information",contentajax,information);

            leftphoto = dd.create("div");
            this.setClassName("photo",information,leftphoto);

            content = dd.create("div");
            this.setClassName("content",information,content);
        },
        createImg:function(obj,num){
            img = dd.create("img");
            img.src =obj[num].photo;
            return img;
        },
        createLi:function(array,ul,obj,num){
            for(var i=0;i<array.length;i++){
                li = this.addNode("li",ul);
                this.createSpan(array[i],li);
                this.createRightSpan(keys,i,li,num,obj);
            }

        },
        createSpan:function(value,li){
            span = this.addNode("span",li);
            span.innerHTML=value;
        },
        createRightSpan:function(keys,i,li,num,obj){
            span = this.addNode("span",li);
            span.innerHTML= obj[num][keys[i]];
        },
        createDom:function(obj,num){

            contentajax = dd.$("contentajax");
            ul = dd.create("ul");

            this.createDiv();

            leftphoto.appendChild(this.createImg(obj,num));
            content.appendChild(ul);

            this.createLi(describe,ul,obj,num);
        }

    }
    ajaxApp.init();
})()

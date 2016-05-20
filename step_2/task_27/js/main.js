//获取当前时间
function getTime(){
	 var date = new Date();
	 var year = date.getFullYear();
	 var month =("00" + (date.getMonth()+1)).substr(-2);
	 var day = ("00" + date.getDay()).substr(-2);
	 var h = ("00" + date.getHours()).substr(-2);
	 var m = ("00" + date.getMinutes()).substr(-2);
	 var s = ("00" + date.getSeconds()).substr(-2);
	 var time ="<span>"+year+"-"+month+"-"+day+" "+h+":"+m+":"+s+"&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	 return time;
}
//Adapter适配器
var Adapter = {
	//发射器部分的Adapter模块
	send : function(message){ 
		var info;
		switch (message.id){
			case 0 :
				info = "0000";
				break;
			case 1 :
				info = "0001";
				break;
			case 2 : 
				info = "0010";
				break;
			case 3 :
				info = "0011";
		};
		switch(message.command){
			case "create" :
				info = info.concat("0000");
				break;
			case "start" :
				info = info.concat("0001");
				break;
			case "stop" :
				info = info.concat("0010");
				break;
			case "destory" :
				info = info.concat("0011");
		};
		return info;
	},
	//接受器部分的Adapter模块
	accept : function(info){
		var info_up = info.slice(0,4);
		var info_low = info.slice(4);
		var message = {};
		switch (info_up){
			case "0000" :
				message.id = 0
				break;
			case "0001" :
				message.id = 1;
				break;
			case "0010" : 
				message.id = 2
				break;
			case "0011" :
				message.id = 3
		};
		switch (info_low){
			case "0000" :
				message.command = "create";
				break;
			case "0001" :
				message.command = "start";
				break;
			case "0010" : 
				message.command = "stop";
				break;
			case "0011" :
				message.command = "destory";
		};
		return message;
	}
};
//按钮事件
(function(){
	var control_module = document.getElementById("control-module");
	control_module.addEventListener("click",function(e){
		var target = e.target;
		if(target.tagName == "BUTTON"){
			var orbit = target.parentNode.dataset.id - 0;
			if(target.className == "create"){ // 创建销毁按钮
				if(target.dataset.status == "create"){
					commander.createShip(orbit);
					target.innerHTML = "销毁飞船";	
					target.dataset.status = "destory";
					target.nextElementSibling.disabled = false;			
				} else {
					commander.destroyShip(orbit);
					target.innerHTML = "创建飞船";
					target.dataset.status = "create";
					target.nextElementSibling.disabled = true;
				}
			}
			if(target.className == "fly"){ //飞行和停止按钮
				if(target.dataset.status == "fly"){
					commander.startShip(orbit);
					target.innerHTML = "停止";
					target.dataset.status = "stop";
				} else {
					commander.stopShip(orbit);
					target.innerHTML = "飞行";
					target.dataset.status = "fly";
				}	
			}
		}
	})
})()
//Console输出
var console_text = document.getElementById("console-text");
function log(message,color){
	var p = document.createElement("p");
	p.innerHTML =getTime() + message;
	p.style.color = color;
	p.firstChild.style.color = "white";
	p.style.fontSize = "12px";
	p.style.margin = 0;
	console_text.appendChild(p);
	console_text.scrollTop = console_text.scrollHeight;
}
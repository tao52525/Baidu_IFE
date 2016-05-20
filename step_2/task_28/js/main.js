//二进制转换函数库
var transform = {
	//数据转二进制
	s2b : function(message){
		var info;
		switch(message){
			case "create" : 
				info = "1010";
				break;
			case "start" :
				info = "1011";
				break;
			case "stop" : 
				info = "1100";
				break;
			case "destory" :
				info = "1101";
				break;
			default :
				info = message.toString(2);
		}
		return info;
	},
	//二进制转数据
	b2s : function(info){
		var message;
		switch(info){
			case "1010" :
				message = "create";
				break;
			case "1011" :
				message = "start";
				break;
			case "1100" :
				message = "stop";
				break;
			case "1101" :
				message = "destory";
				break;
			default : 
				message = parseInt(info,2);
		}
		return message;
	},
	//飞船status
	status : function(info){
		var message;
		if(info == "0001"){
			message = "飞行中";
		} else if( info == "0010"){
			message = "停止";
		} else if( info == "0011"){
			message = "销毁";
		} else if( info == "0000"){
			message = "创建成功";
		}
		return message;
	},
	//动力系统
	drive : function(speed){
		var drive_info;
		switch (speed) {
			case 30 : 
				drive_info = "前进号";
				break;
			case 50 :
				drive_info = "奔腾号";
				break;
			case 80 : 
				drive_info = "超越号";
		}
		return drive_info;
	},
	//能源系统
	energy : function(energy_add){
		var energy_info;
		switch (energy_add){
			case 2 : 
				energy_info = "劲量型";
				break;
			case 3 :
				energy_info = "光能型";
				break;
			case 4 :
				energy_info = "永久型";
		}
		return energy_info;
	}
};
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
					commander.destoryShip(orbit);
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
})();
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


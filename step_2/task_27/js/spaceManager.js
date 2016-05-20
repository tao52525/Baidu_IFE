//宇宙管理员
var spaceManager = {
	//宇宙管理员的记事本
	notebook : {
		//飞船列表
		spaceShipList : [new Ship(0),new Ship(1),new Ship(2),new Ship(3)],
		//飞船的动力和能源设置
		spaceShipSetting : 0,
		//飞船的飞行管理id
		spaceShipStatus : 0,
		//太阳能管理ID
		solarManager : 0
	},
	//创建宇宙飞船
	createShip : function(orbitId){
		//创建飞船对象并保存到数组
		this.notebook.spaceShipList[orbitId] = new Ship(orbitId);
		//让飞船显示出来
		var orbit = document.getElementById("ship"+orbitId);
		orbit.style.display = "block";
	},
	//无线电向宇宙发送广播消息
	// Mediator : {
	// 	//发送消息
	// 	sendMessage : function(message){
	// 		setTimeout(function(){
	// 			if(Math.random() < 0.3){
	// 				log("发送到轨道"+(message.id+1)+"的"+message.command+"指令丢包了","red");
	// 			} else {
	// 				for(var i=0; i<4; i++){  

	// 					spaceManager.notebook.spaceShipList[i].sendMessage(message);
	// 				}
	// 			}
	// 		},1000);
	// 	},
	// }
	//新的传送媒介BUS
	BUS : {
		sendMessage : function(info){
			var timer = setInterval(function(){
				if(Math.random() < 0.1){
					log("发送的指令丢包，重新发送","red");
				} else {
					for(var i=0; i<4; i++){
						spaceManager.notebook.spaceShipList[i].sendMessage(info);
					}
					clearInterval(timer);
				}
			},300);
		}
	}
};
//飞船的飞船的动力和能源设置
(function(){
	spaceManager.notebook.spaceShipSetting = setInterval(function(){
		var power_list = document.querySelectorAll("#power input");
		var energy_list = document.querySelectorAll("#energy input");
		for(var i=0; i<power_list.length; i++){
			if(!!power_list[i].checked){
				if(power_list[i].value == 1){
					Ship.prototype.speed = 30;
					Ship.prototype.energy_consume = 5;
				} else if(power_list[i].value == 2){
					Ship.prototype.speed = 50;
					Ship.prototype.energy_consume = 7;
				} else if(power_list[i].value == 3){
					Ship.prototype.speed = 80;
					Ship.prototype.energy_consume = 9;
				}
			}
		}
		for(var j=0; j<energy_list.length; j++){
			if(!!energy_list[j].checked){
				if(energy_list[j].value == 1){
					Ship.prototype.energy_add = 2;
				} else if(energy_list[j].value == 2){
					Ship.prototype.energy_add = 3;
				} else if(energy_list[j].value == 3){
					Ship.prototype.energy_add = 4;
				}
			}
		}
	},100)
})();
//飞船的飞行及显示管理
(function(){
	spaceManager.notebook.spaceShipStatus = setInterval(function(){
		for(var i=0; i<4; i++){

				var ship = document.getElementById("ship"+i);
				switch(spaceManager.notebook.spaceShipList[i].status){
					case 0 : //创建
						var orbit = document.getElementById("ship"+i);
						orbit.style.display = "block";
						commander.orbitStatus[i] = true;
						break;
					case 1 : //飞行			
						ship.style.transform = "rotate(" + spaceManager.notebook.spaceShipList[i].fly() + "deg)";
						break;
					case 2 : //停止
						break;
					case 3 : //销毁
						ship.style.display = "none";
						commander.orbitStatus[i] = false;
				}

		}
	},100)
})();
//燃料管理
(function(){
	spaceManager.notebook.solarManager = setInterval(function(){
		for(var i=0; i<4; i++){
			if(!!spaceManager.notebook.spaceShipList[i]){
				var _ship = spaceManager.notebook.spaceShipList[i];
				var ship = document.getElementById("ship"+i);
				if(_ship.status != 3){
					_ship.energyAdd();					
				}
				if(_ship.status == 1){
					_ship.energyConsume();
				}			
				ship.lastChild.innerHTML = _ship.energy + "%";
				ship.firstChild.style.width = (100 - _ship.energy) + "%";
			}
		}
	},1000)
})();
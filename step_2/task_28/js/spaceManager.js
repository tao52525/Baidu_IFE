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
	//新的传送媒介BUS
	BUS : {
		sendMessage : function(whosend,info){
			var timer = setInterval(function(){
				if(Math.random() < 0.1){
					if(whosend == "commander"){
						log("发送的指令丢包，重新发送","red");	
					}
				} else {
					clearInterval(timer);
					if(whosend == "commander"){
						for(var i=0; i<4; i++){
							spaceManager.notebook.spaceShipList[i].acceptMessage(info);
						}
					} else if(whosend == "ship") {
						commander.acceptMessage(info);
					}
				}
			},300);
		}
	}
};

//飞船的飞行、燃料管理以及显示
(function(){
	spaceManager.notebook.spaceShipStatus = setInterval(function(){
		for(var i=0; i<4; i++){
			var ship = document.getElementById("ship"+i);
			var _ship = spaceManager.notebook.spaceShipList[i];
			switch(_ship.status){  //飞船的不同状态下的飞行及燃料
				case 0 : //创建
					_ship.energy = 100;
					_ship.angel = 0;
					ship.style.transform = "rotate(0deg)";
					shipInit(_ship);
					//console-disp创建新的tr
					if(!commander.orbitStatus[i]){
						var table_body = document.querySelector("#console #disp table tbody");
						table_body.innerHTML += "<tr data-id='"+i+"'><td>"+(i+1)+"号</td><td>"+transform.drive(_ship.speed)+"</td><td>"+transform.energy(_ship.energy_add)+"</td><td>创建成功</td><td>100%</td></tr>";
					}

					commander.orbitStatus[i] = true; 
					ship.style.display = "block"; //ship显示出来
					break;
				case 1 : //飞行			
					ship.style.transform = "rotate(" + _ship.fly() + "deg)";
					_ship.energyAdd();
					_ship.energyConsume();
					// spaceManager.BUS.sendMessage("ship",_ship.sendMessage());
					break;
				case 2 : //停止
					_ship.energyAdd();
					// spaceManager.BUS.sendMessage("ship",_ship.sendMessage());
					break;
				case 3 : //销毁
					ship.style.display = "none";
					commander.orbitStatus[i] = false;
					// spaceManager.BUS.sendMessage("ship",_ship.sendMessage());
			}
			//显示
			ship.lastChild.innerHTML = parseInt(_ship.energy) + "%";
			ship.firstChild.style.width = parseInt((100 - _ship.energy)) + "%";
		}
	},100)
})();
//飞船发给commander的消息显示
(function(){
	var timer = setInterval(function(){
		for(var i=0; i<4; i++){
			if(commander.orbitStatus[i] == true ){
				var _ship = spaceManager.notebook.spaceShipList[i]; //飞船实例
				spaceManager.BUS.sendMessage("ship",_ship.sendMessage());
			}
		}
	},100);
})();
//飞船的飞船的动力和能源初始化设置
function shipInit(ship){
		var power_list = document.querySelectorAll("#power input");
		var energy_list = document.querySelectorAll("#energy input");
		for(var i=0; i<power_list.length; i++){
			if(!!power_list[i].checked){
				if(power_list[i].value == 1){
					ship.speed = 30;
					ship.energy_consume = 5;
				} else if(power_list[i].value == 2){
					ship.speed = 50;
					ship.energy_consume = 7;
				} else if(power_list[i].value == 3){
					ship.speed = 80;
					ship.energy_consume = 9;
				}
			}
		}
		for(var j=0; j<energy_list.length; j++){
			if(!!energy_list[j].checked){
				if(energy_list[j].value == 1){
					ship.energy_add = 2;
				} else if(energy_list[j].value == 2){
					ship.energy_add = 3;
				} else if(energy_list[j].value == 3){
					ship.energy_add = 4;
				}
			}
		}
}
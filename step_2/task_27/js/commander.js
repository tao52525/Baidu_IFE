//指挥
var commander = {
	//各个轨道的状态
	orbitStatus : [false,false,false,false],
	createShip : function(orbitId){
		if(this.orbitStatus[orbitId]){
			log("轨道"+(orbitId+1)+"上已经有飞船了！","blue");
		} else {
			this.orbitStatus[orbitId] == true;
			log("在轨道"+(orbitId+1)+"上创建飞船","yellow");
			spaceManager.BUS.sendMessage(Adapter.send({ //发射器Adapter，把原来的指令格式翻译成二进制码
				id : orbitId,
				command : "create"
			}));
		}
	},
	startShip : function(orbitId){
		if(!this.orbitStatus[orbitId]){
			log("轨道"+(orbitId+1)+"上没有飞船","blue");
		} else {
			log("向轨道"+(orbitId+1)+"上的飞船发起飞行指令","yellow");
			spaceManager.BUS.sendMessage(Adapter.send({
				id : orbitId,
				command : "start"
			}));
		}
	},
	stopShip : function(orbitId){
		if(!this.orbitStatus[orbitId]){
			log("轨道"+(orbitId+1)+"上没有飞船","blue");
		} else {
			log("向轨道"+(orbitId+1)+"上的飞船发起停止指令","yellow");
			spaceManager.BUS.sendMessage(Adapter.send({
				id : orbitId,
				command : "stop"
			}));
		}
	},
	destroyShip : function(orbitId){
		if(!this.orbitStatus[orbitId]){
			log("轨道"+(orbitId+1)+"上没有飞船","blue");
		} else {
			log("向轨道"+(orbitId+1)+"上的飞船发起摧毁指令","yellow");
			spaceManager.BUS.sendMessage(Adapter.send({
				id : orbitId,
				command : "destroy"
			}));
		}
	} 

}
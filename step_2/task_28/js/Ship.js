function Ship(orbit){
	this.orbit = orbit;
	this.energy= 100;
	this.status = 3; //0:创建,1:飞行,2:停止,3:销毁(消失不存在)
	this.angel = 0;
	this.speed = 30, //每100ms 
	this.energy_consume = 5,
	this.energy_add = 2,
	this.radiu = [100,150,200,250];
}
Ship.prototype = {
	constructor  : Ship,
	acceptMessage : function(info){
		message = this.Adapter(info); //飞船的接收器Adapter，把二进制码翻译成能够理解的指令格式
		if(message.id == this.orbit){ //判断该命令是不是发给自己的
			log("发送到轨道"+(message.id+1)+"的"+message.command+"命令成功","green");
			switch (message.command){
				case "create" : 
					this.status = 0;
					break;
				case "start" : 
					this.status = 1;
					break;
				case "stop" :
					this.status = 2;
					break;
				default :
					this.status = 3;
			}		
		}

	},
	//飞船信号发生器
	sendMessage : function(){
		var info = ("0000"+transform.s2b(this.orbit)).slice(-4); // 飞船标示
		info += ("0000"+transform.s2b(this.status)).slice(-4); // 飞船的状态
		info +=("00000000"+transform.s2b(parseInt(this.energy))).slice(-8); //飞机的能源
		return info;
	},
	fly : function(){
			this.angel += this.speed / this.radiu[this.orbit];
			return this.angel;
	},
	energyConsume : function(){
			this.energy -= this.energy_consume/10;
			if(this.energy < 0){
				this.energy = 0;
				this.status = 2;
			}	
	},
	energyAdd : function(){
			this.energy += this.energy_add/10;
			if(this.energy > 100){
				this.energy = 100;
				if(this.status == 2){
					this.status = 1;
				}
			}
	},
	Adapter : function(info){
		var info_up = info.slice(0,4);
		var info_low = info.slice(4);
		var message = {};
		message.id = transform.b2s(info_up);
		message.command = transform.b2s(info_low);
		return message;
	}
}
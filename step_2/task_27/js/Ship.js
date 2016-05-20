function Ship(orbit){
	this.orbit = orbit;
	this.energy= 100;
	this.status = 3; //0:创建,1:飞行,2:停止,3:销毁(消失不存在)
	this.angel = 0;

	this.radiu = [100,150,200,250];
}
Ship.prototype = {
	constructor  : Ship,
	speed : 30, //每100ms 
	energy_consume : 5,
	energy_add : 2,
	sendMessage : function(info){
		message = Adapter.accept(info); //飞船的接收器Adapter，把二进制码翻译成能够理解的指令格式
		if(message.id == this.orbit){ //判断该命令是不是发给自己的
			log("放送到轨道"+(message.id+1)+"的"+message.command+"命令成功","green");
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
	fly : function(){
			this.angel += this.speed / this.radiu[this.orbit];
			return this.angel;
	},
	energyConsume : function(){
			this.energy -= this.energy_consume;
			if(this.energy < 0){
				this.energy = 0;
				this.status = 2;
			}	
	},
	energyAdd : function(){
			this.energy += this.energy_add;
			if(this.energy > 100){
				this.energy = 100;
				if(this.status == 2){
					this.status = 1;
				}
			}
	}
}
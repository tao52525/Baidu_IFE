//定义变量
var tags_input = document.getElementById("tags_input"),
	tags_disp = document.getElementById("tags_disp"),
	hobbies_input = document.getElementById("hobbies_input"),
	hobbies_btn = document.getElementById("hobbies_btn"),
	hobbies_disp = document.getElementById("hobbies_disp");

//创建构造函数模式与原型模式的组合
function CreateDisp(disp){
	this.queue = [];
	this.render = function(){
		disp.innerHTML = this.queue.map(function(item){
			return "<span>"+item+"</span>";
		}).join("");
	}
}
CreateDisp.prototype.rightPush = function(str){
	this.queue.push(str);
};
CreateDisp.prototype.leftShift = function(){
	this.queue.shift();
};

//创建实例对象
var tagsObj = new CreateDisp(tags_disp);
var hobbiesObj = new CreateDisp(hobbies_disp);

//事件绑定
tags_input.addEventListener("keyup",showTags);
hobbies_btn.addEventListener("click",showHobbies);

tags_disp.addEventListener("mouseover",function(e){
	if(e.target && e.target.nodeName == "SPAN"){
		e.target.firstChild.insertData(0,"点击删除");
		e.target.style.background = "red";
	}
});
tags_disp.addEventListener("mouseout",function(e){
	if(e.target && e.target.nodeName == "SPAN"){
		e.target.firstChild.deleteData(0,4);
		e.target.style.background = "#91E6EC";
	}
});
tags_disp.addEventListener("click",function(e){
	if(e.target && e.target.nodeName == "SPAN"){
		tags_disp.removeChild(e.target);
		tagsObj.queue = tagsObj.queue.filter(function(item) {
			return ("点击删除"+item != e.target.innerText);
		});
	}
})

//显示函数
//
function splitInput(str){
	var inputArray = str.trim().split(/[,，;；.。、\s\n]+/);
	return inputArray;
}
function showTags(){
	if(/[,，;；.。、\s\n]+/.test(tags_input.value) || event.keyCode == 13){
		var data = splitInput(tags_input.value);
		if(tagsObj.queue.indexOf(data[0]) === -1){
			tagsObj.rightPush(data[0]);
			if(tagsObj.queue.length > 10){
				tagsObj.leftShift();
			}
		}
		tagsObj.render();
		tags_input.value = "";
	}

}
function showHobbies(){
		var data = splitInput(hobbies_input.value);
		data.forEach(function(item){
			if(hobbiesObj.queue.indexOf(item) === -1){
				hobbiesObj.rightPush(item);		
			}
		})
		while(hobbiesObj.queue.length > 10){
			hobbiesObj.leftShift();
		}
		hobbiesObj.render();
		hobbies_input.value = "";
}
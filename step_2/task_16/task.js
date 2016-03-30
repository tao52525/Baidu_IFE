window.onload = function(){

var city_input = document.getElementById("aqi-city-input");
var air_input = document.getElementById("aqi-value-input");
var table = document.getElementById("aqi-table");
var add_btn = document.getElementById("add-btn");

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	city = city_input.value.trim();
	air = air_input.value.trim();
	if(!city.match(/^[\u4e00-\u9fa5{a-zA-Z]+$/)){
		alert("城市名称请输入中文或英文字母！");
		return false;
	}else if(!air.match(/^\d+$/)){
		alert("空气质量指数请输入整数！");
		return false;
	} else{
	  aqiData[city] = air;
	}
	// console.log(addAqiData);
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList(index) {
	table_content = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	for(var schweppes in aqiData){
		table_content+= "<tr><td>"+schweppes+"</td><td>"+aqiData[schweppes]+"</td><td><button>删除</button></td></tr>";
	}
    table.innerHTML = table_content;		
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  delete aqiData[this.parentNode.parentNode.firstChild.innerText];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  add_btn.onclick = function(){
  	addBtnHandle();
  }
 //  del_btn[0].onclick = function(){
	// console.log("HI");
	// }
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  table.addEventListener("click",function(event){
  	if(event.target.nodeName.toLowerCase() === "button"){
  		delBtnHandle.call(event.target);
  	}
  })
}

init();
	
}
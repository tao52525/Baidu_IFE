//定义变量
var tree_root = document.getElementById("tree-1"),
	dfs = document.getElementById("dfs"),
	bfs = document.getElementById("bfs"),
	input = document.getElementById("search-content"),
	input_search = document.getElementById("input_search"),
	timer = null, //定时器
	queue = [], //存储数组
	tree_divs = document.querySelectorAll("#tree div"),//树的所有div元素
	options = document.querySelectorAll("select option"),//选项
	del_btn = document.getElementById("del-btn"),
	add_btn = document.getElementById("add-btn"),
	add_input = document.getElementById("add-content"),
	selectNode;

//事件
//深度优先搜索遍历
dfs.addEventListener("click",function(){
	reset(); //初始化
	dfsTree(tree_root); //深度优先搜索树
	render(); //渲染显示
});
//广度优先搜索遍历
bfs.addEventListener("click",function(){
	reset();
	bfsTree(tree_root);
	render();
})
//输入搜索
input_search.addEventListener("click",function(){
	reset();
	if(options[0].selected){
		dfsTree(tree_root)
	} else{
		bfsTree(tree_root);
	}
	render(input.value.trim());
})
//选中

tree_root.addEventListener("click",function(e){
	if(selectNode){
		selectNode.className -= " select-node";
	}
	selectNode = e.target;
	selectNode.className += " select-node";
})
//选中删除
del_btn.addEventListener("click",function(){
	if(selectNode){
		selectNode.parentNode.removeChild(selectNode);
	}
})
//选中添加子节点
add_btn.addEventListener("click",function(){
	var input_value = add_input.value.trim();
	if(selectNode){
		if(input_value){
			selectNode.innerHTML += "<div id='"+input_value+"'>"+input_value+"</div>";
		}
	}
})


//函数
//初始化
function reset(){
	clearInterval(timer);
	queue = [];
	selectNode = null;
	for(var i=0; i<tree_divs.length; i++){
		tree_divs[i].style.background = "#fff";
	}
}
//dfs
function dfsTree(node){
	if(node.nodeName == "DIV"){
		queue.push(node);
		dfsTree(node.firstChild);
	}
	if(!(node.nextSibling == null)){
		dfsTree(node.nextSibling);	
	}
}
//bfs
function bfsTree(node){
	var current = node;
	var queue_1 = [];
	queue.push(current);
	queue_1.push(current);
	while(queue_1.length > 0){
		current = queue_1.shift();
		for(var i=0; i<current.childNodes.length; i++){
			if(current.childNodes[i].nodeName == "DIV"){
				queue.push(current.childNodes[i]);
				queue_1.push(current.childNodes[i]);
			}
		}
	}
}
//渲染显示
function render(str){
	var selectIndex;
	if (str){
		for(var i=0; i<queue.length; i++){
			// console.log(item);
			// console.log(item.innerText.split("\n")[0]);
			if(queue[i].innerText.split("\n")[0] == str){
				selectIndex = i;
				break;
			}
		};
		if( selectIndex == null){
			alert ("输入信息有误！");
			return;
		} 	
	} 
	var i = 0;
	timer = setInterval(function(){
		if(i >= 1 ){
			queue[i-1].style.background = "#fff";			
		}
		if( i == queue.length){
			clearInterval(timer);
		} else {
			queue[i].style.background = "#60BC94";
			if( i++ == selectIndex){
				clearInterval(timer);
			}
		}
	},300);
}
window.onload = function(){
var counter = 0;//发牌次数
var winner = "";//胜利者
var cards1=[];//庄家的手牌
var cards2=[];//玩家的手牌
var btn_hit = document.getElementById("hit");//按键hit
var btn_stand = document.getElementById("stand");//按键stand
var btn_restart = document.getElementById("restart");//按键restart
var btn_confirm = document.getElementById("confirm");
var btn_right = document.querySelectorAll("#page1 button");
var result = document.querySelector("#page2 .center .result em");//结果
var disp1 = document.querySelector("#page2 .dealer .score em");//庄家的分数
var bet  = document.getElementById("bet");//赌注
var amount = document.getElementById("amount");//总金
bet_num = parseInt(bet.innerText);//赌注数目
amount_num = parseInt(amount.innerText); //总金数目
var documentWidth = window.innerWidth;
var documentHeight = window.innerHeight;

//所有的牌
var cards = ["club01", "club02", "club03", "club04", "club05", "club06", "club07", 
"club08", "club09", "club10", "club11", "club12", "club13", "diamond01", 
"diamond02", "diamond03", "diamond04", "diamond05", "diamond06", "diamond07",
"diamond08", "diamond09", "diamond10", "diamond11", "diamond12", "diamond13", 
"heart01", "heart02", "heart03", "heart04", "heart05", "heart06", "heart07", 
"heart08", "heart09", "heart10", "heart11", "heart12", "heart13", 
"spade01", "spade02", "spade03", "spade04", "spade05", "spade06", "spade07", 
"spade08", "spade09", "spade10", "spade11", "spade12", "spade13"];
//适应不同设备的页面尺寸设定
function pageSize(){
	document.getElementById("page1").style.width = (documentWidth)+"px";	
	document.getElementById("page1").style.height = (documentHeight)+"px";
	document.getElementById("page2").style.width = (documentWidth)+"px";
	document.getElementById("page2").style.height = (documentHeight)+"px";
	document.querySelector("#page2 .player").style.width = (documentWidth)+"px";
	document.querySelector("#page2 .center").style.width = (documentWidth)+"px";
	document.querySelector("#page2 .dealer").style.width = (documentWidth)+"px";
	document.querySelector("#page2 .center .result ").style.width = (documentWidth)+"px";
	if(documentWidth < 500){
		//page1适应移动端
		var page1_add_btn = document.querySelectorAll("#page1 .add button");
		for(var i=0; i<page1_add_btn.length; i++){
			page1_add_btn[i].style.display = "block";
			page1_add_btn[i].style.marginBottom = "10px";
			page1_add_btn[i].style.width = "80px";
			page1_add_btn[i].style.height = "35px";
		}
		var page1_menu = document.querySelector("#page1 .menu");
		page1_menu.style.marginTop = "250px";
		//page2适应移动端
	}

} 
//生成随机数
function getRandom(){
	return Math.floor(Math.random() * 52);
}
//开牌(DEAL)
function deal(){
	document.getElementById("page2").style.display="none";
	document.getElementById("page1").style.display="block";
	//洗牌
	shuffle();
	//玩家的手牌初始化
	cards1 = [cards[counter++],cards[counter++]];
	cards2 = [cards[counter++],cards[counter++]];

	var dealer_card = document.querySelector("#page2 .dealer .card");
	var player_card = document.querySelector("#page2 .player .card");
	//按键的初始化
	btn_hit.disabled = true;
	btn_stand.disabled = true;
	btn_restart.disabled = true;
	for(var i=0; i<btn_right.length; i++){
		btn_right[i].disabled = false;
	}
	//显示得分，结果、赢家、庄家分数显示初始化
	showScore();
	result.innerText = "";
	winner = "";
	disp1.style.display = "none";
	bet.innerText = 1;
	//page1区的确定按钮添加事件
	btn_confirm.addEventListener("click",function(){
		document.getElementById("page2").style.display="block";
		document.getElementById("page1").style.display="none";

		btn_hit.disabled = false;
		btn_stand.disabled = false;
		btn_restart.disabled = false;
		for(var i=0; i<btn_right.length; i++){
			btn_right[i].disabled = true;
		}

		dealer_card.innerHTML = "<img src='images/pokers/cardback.png'>"+"<img src='images/pokers/"+cards1[1]+".jpg'>";
		player_card.innerHTML = "<img src='images/pokers/"+cards2[0]+".jpg'>"+"<img src='images/pokers/"+cards2[1]+".jpg'>";
	},false)
}
//洗牌
function shuffle(){
	var shuffle,tmp;
	for(var j=0; j<5; j++){
		for(var i=0; i< 52; i++){
			shuffle=getRandom();
			tmp = cards[i];
			cards[i] = cards[shuffle];
			cards[shuffle] = tmp;
		}		
	}
	counter=0;
}

//计算玩家得分
function calcScore(player){
	var score = 0;
	var countA = 0;
	var score_cards=[];
	if (player == "player1"){
		score_cards = cards1;
	} else {
		score_cards = cards2;
	}

	for(var i=0; i<score_cards.length; i++){
		var c = parseInt(score_cards[i].substr(-2),"10");
		if(c>10){
			c=10;
		} else if(c == 1){
			countA ++;
		}
		score += c;
	}
	for (var i=0; i<countA ;i++){
		score = score+10<=21 ? score+10 : score; 
	}
	return score;
}

//检查有没有爆掉
function checkIfBust(player){
	var score = calcScore(player);
	if(score>21){
		return true;
	} else {
		return false;
	}
}

//显示分数
function showScore(){
	
	var disp1_score = calcScore("player1");
	
	var disp2 = document.querySelector("#page2 .player .score");
	var disp2_score = calcScore("player2");

	disp1.innerHTML = disp1_score;
	disp2.innerHTML ="score: "+disp2_score;

}

//要牌hit
function hit(){
	var new_card = cards[counter++];
	var len = cards2.length;
	cards2[len] = new_card;
	var player_card = document.querySelector("#page2 .player .card");
	player_card.innerHTML += "<img src='images/pokers/"+cards2[len]+".jpg'>";

	if(checkIfBust("player2")){
		result.innerText ="You BUST! You LOSE!";
		btn_hit.disabled = true;
		btn_stand.disabled = true;
		winner = "player1";
		amountUpdate("player1");
	}
	showScore();
}

//停牌stand
function stand(){
	var dealer_card = document.querySelector("#page2 .dealer .card");
	var player_score = calcScore("player2");
	btn_hit.disabled = true;
	btn_stand.disabled = true;

	dealer_card.innerHTML = "<img src='images/pokers/"+cards1[0]+".jpg'>"+"<img src='images/pokers/"+cards1[1]+".jpg'>";
	//电脑开始要牌了
	while(calcScore("player1")<17){
		cards1[cards1.length] = cards[counter++];
		dealer_card.innerHTML += "<img src='images/pokers/"+cards1[cards1.length-1]+".jpg'>"
		if(checkIfBust("player1")){
			result.innerText ="Computer BUST! You WIN!";
			btn_hit.disabled = true;
			btn_stand.disabled = true;
			winner = "player2";
			amountUpdate("player2");
			break;
		}
	}
	//如果都没爆，比较分数得结果
	if (winner == ""){
		 dealer_score = calcScore("player1");
		 if(dealer_score == player_score){
			result.innerText ="PUSH!";
		 } else if(dealer_score < player_score){
			result.innerText ="You WIN!";
			amountUpdate("player2");
		 } else {
			result.innerText ="You LOSE!";
			amountUpdate("player1");
		 }
	}
	showScore();
	disp1.style.display = "inline";
}
//right栏gamble函数
function gamble(){
	var add1 = document.querySelector(".add1");
	var add5 = document.querySelector(".add5");
	var add10 = document.querySelector(".add10");
	var add50 = document.querySelector(".add50");
	var reset = document.querySelector(".reset")

	//赌注增加函数
	function addBet(add_num){
		if(bet_num+add_num <= amount_num){
			bet_num = bet_num+add_num;
			bet.innerText = bet_num;
		}
	}
	//添加事件
	add1.addEventListener("click",function(){
		addBet(1);
	},false);
	add5.addEventListener("click",function(){
		addBet(5);
	},false);
	add10.addEventListener("click",function(){
		addBet(10);
	},false);
	add50.addEventListener("click",function(){
		addBet(50);
	},false);
	reset.addEventListener("click",function(){
		bet_num = 0;
		bet.innerText = bet_num;
	},false);

}
//计算显示输赢结果
function amountUpdate(winner){
	if(winner == "player1"){
		if(amount_num-bet_num >0){
			amount_num = amount_num-bet_num;
			amount.innerText = amount_num;
		} else{
			amount.innerText = 0;
			//选择是否重新开始
			if(confirm("Game Over! 是否重新开始？")){
				window.location.reload();
			} else {
				window.close();
			}
		}
	} else if(winner == "player2"){
		amount_num = amount_num+bet_num;
		amount.innerText = amount_num;
	}
}
//初始化init
function init(){
	pageSize();
	deal();
	gamble();
	btn_hit.addEventListener("click",hit,false);
	btn_stand.addEventListener("click",stand,false);
	btn_restart.addEventListener("click",deal,false);
}
init();

}
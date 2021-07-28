var r = 212; // roulette radius
var x = 615,y = 315; //circle center
var i1 = 1; 
var n,d;
var CanThrow = true;
var p = 360/111;
var maxNum = 111;  
var minNum = 1;  
var credit = 3000; //$
var bet_cash = 0;
var win_credit = 0; //win $
var click = 0;  //bet counts
var num =[20,14,31,9,22,18,29,7,28,12,35,3,26,0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1];

for(i = p, k = 1; i <= 360; i += p, k++) { //cal the location of all number slots
	getdiv("c"+k,x+r*Math.cos((i+270-p)*(Math.PI/180))-6,y+r*Math.sin((i+270-p)*(Math.PI/180))-6,5,5,"");
}

document.getElementById('bet').innerHTML = "0";
document.onmousemove = Show;

function Table() {  //establish a bet table
	var table = "<table border='0' width='185' height='435' cellspacing='0' style='table-layout:fixed;' >";
	for(i=0, k=1; i <= 12; i++)
	{
		table+= "<tr>";
		if( i ==0 ){table += "<td id='odd' rowspan='4' align='center' onclick='bet(this)'>.</td>";}
		else if( i == 4 ){table += "<td id='even' rowspan='4' align='center' onclick='bet(this)'>.</td>";}
		else if( i > 7 ){table += "<td></td>";}
		
		for( j = 1 ; j<=3 ; j++ ){
			table += "<td id="+k+" align='center' onclick='bet(this)'>.</td>";
			k++;
		}
		table += "</tr>";
	}
	table += "</table>";
	document.getElementById("game").innerHTML = table;
}

function getdiv(id1,x2,y2,w2,h2,color2) {
	document.writeln("<div id='"+id1+"'style='position:absolute;top:"+y2+";left:"+x2+";width:"+w2+";height:"+h2+";background-color:"+color2+";'></div>");
}

function Init() {
	if( CanThrow == true && click != 0 && bet_cash > 0 ) {
		CanThrow = false;
		n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum; 
		d = 5;
		credit -= click*bet_cash;
		run1 = window.setInterval("move()" , 50);
	}
}

function GiveMoney() {  //show the current $ and chips
    if(localStorage.getItem("credit") != null)
        credit = localStorage.getItem("credit");
	document.getElementById("credit").innerHTML = credit;
	document.getElementById("win_credit").innerHTML = win_credit;
	document.getElementById("chips").innerHTML =  "";
	chips(100,Math.floor(credit/100),0,0);
	chips(5,Math.floor((credit%100)/5),30,60);
}

function chips( chips_value, chips_num, chips_x, chips_y ) {  //show the chips

	var piles = chips_num/10;
	for(j=1; j <= piles ; j++ ){
		for(i=0 ; i<10; i++){
			document.getElementById("chips").innerHTML +=  "<img id='m' src='"+ chips_value +".gif' style=top:"+ (chips_y-5*i) +";left:"+ chips_x +";>";
		} 
	chips_x+=75
	}

	chips_num %= 10;

	for(i=0 ; i<chips_num ; i++){
		document.getElementById("chips").innerHTML +=  "<img id='m' src='"+ chips_value +".gif' style=top:"+ (chips_y-5*i) +";left:"+ chips_x +";>";
	} 
}

function Special() {  //special events
	var happened = false;
	if(n%10 == 8){
		happened = true;
		credit+=200;
		document.getElementById("special").innerHTML = "<img src='event0.jpg' style='height:250'>";
	}
	if(n%10 == 4){
		happened = true;
		credit-=500;
		document.getElementById("special").innerHTML = "<img src='event1.jpg' style='height:250'>";
	}
	if( num[Math.floor(((i1-1)/3))] == 0){
		happened = true;
		credit = 0;
		document.getElementById("special").innerHTML = "<img src='event2.jpg' style='height:520'>";
		if( confirm("Hahaha..you lose!!! Wanna play again??") ){ window.location.reload(); }
		else{
			if( confirm("One more chance.. Wanna play again??") ){ window.location.reload(); }
			else{ alert("So why are you still here?");}
		}
	}
	if( happened == true ) {
		window.setTimeout("document.getElementById('special').innerHTML =''" , 3000);
	}
    localStorage.setItem("credit", credit); //save in the local storage
}

function Show(e) {
	if ((typeof e == "undefined")||(!e))
		e = window.event;

	var mouseX = e.clientX +20;
	var mouseY = e.clientY +20;

	document.getElementById("Show").style.left = mouseX;
	document.getElementById("Show").style.top = mouseY;

	window.setTimeout("document.getElementById('Show').style.display='none'" , 5000);
}

function bet(obj) {  //show the bet on the slot
	if(obj.className != "in")
	{
		obj.innerHTML = "<img src='coin.gif' style='height:20'>";
		obj.className = "in" ;
		click+=1;
	}
	else
	{
		obj.innerHTML = ".";
		obj.className = "" ;
		click-=1;
	}
}

function checkwin() {  //count the win $
    var win_num = num[Math.floor(((i1-1)/3))];
	win_credit = 0;
	
	if( document.getElementById(37).className == "in" && win_num%3 == 1 ) //check first row
		{ credit += 3*bet_cash; win_credit += 3*bet_cash;}
	if( document.getElementById(38).className == "in" && win_num%3 == 2 )	//check second row
		{ credit += 3*bet_cash; win_credit += 3*bet_cash;}
	if( document.getElementById(39).className == "in" && win_num%3 == 0 )	//check third row
		{ credit += 3*bet_cash; win_credit += 3*bet_cash;}
	if( document.getElementById("even").className == "in" && win_num%2 == 0 ) //check even number
		{ credit += 2*bet_cash; win_credit += 2*bet_cash;}
	if( document.getElementById("odd").className == "in" && win_num%2 == 1 )  //check odd number
		{ credit += 2*bet_cash; win_credit += 2*bet_cash;}
		
	for (var i = 1 ; i <= 36; i++) //check a single number
	{
		if (document.getElementById(i).className == "in" && i == win_num)
		{
			credit += 36*bet_cash; win_credit += 36*bet_cash;
		}
	}
    localStorage.setItem("credit", credit); //save in the local storage
}

function move() {  //move the small ball
	var id = "c" + i1;

	document.getElementById('score').innerHTML=num[Math.floor((i1/3))];

	bx = parseInt( document.getElementById(id).style.left)-15;
	by = parseInt( document.getElementById(id).style.top)-15;

	document.getElementById("ball").style.left = bx;
	document.getElementById("ball").style.top = by;
	i1+=d;
	if(d==1 && i1 == n)  //make the moving over
	{
		checkwin();
		Special();
		GiveMoney();
		CanThrow = true;
		clearInterval(run1);
	}
	if(i1 > 110 ){i1=1;d-=2;}
}
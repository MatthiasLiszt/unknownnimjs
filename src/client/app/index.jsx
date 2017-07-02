import React from 'react';
import {render} from 'react-dom';

const empty="empty.png";
const xpng="x.png";
const opng="o.png";
const errorI="error.png";

// gameBoard and player Settings 
let gameBoard=Array(16).fill('0');
let playerMode='2';
let playerColor='x';

// ----------------------
// class Field ; requires global variables playerColor ...
class Field extends React.Component {
  constructor(props){
    super(props);
    this.state={s: this.props.s, img: empty};
    this.handleClick=this.handleClick.bind(this);
  }
  
  checkLong(){
   if(gameBoard[0]=='a'&&gameBoard[1]=='a')return true;
   if(gameBoard[0]=='a'&&gameBoard[4]=='a')return true; 
   if(gameBoard[0]=='a'&&gameBoard[2]=='a'&&gameBoard[1]=='0'){gameBoard[1]='a';return true;}
   if(gameBoard[0]=='a'&&gameBoard[8]=='a'&&gameBoard[4]=='0'){gameBoard[4]='a';return true;} 

   if(gameBoard[1]=='a'&&gameBoard[5]=='a')return true; 
   if(gameBoard[1]=='a'&&gameBoard[9]=='a'&&gameBoard[5]=='0'){gameBoard[5]='a';return true;} 

   if(gameBoard[2]=='a'&&gameBoard[6]=='a')return true; 
   if(gameBoard[2]=='a'&&gameBoard[10]=='a'&&gameBoard[6]=='0'){gameBoard[6]='a';return true;} 

   if(gameBoard[3]=='a'&&gameBoard[2]=='a')return true;
   if(gameBoard[3]=='a'&&gameBoard[1]=='a'&&gameBoard[2]=='0'){gameBoard[2]='a';return true;} 
   if(gameBoard[3]=='a'&&gameBoard[7]=='a')return true;
   if(gameBoard[3]=='a'&&gameBoard[11]=='a'&&gameBoard[7]=='0'){gameBoard[7]='a';return true;}   

   if(gameBoard[4]=='a'&&gameBoard[5]=='a')return true; 
   if(gameBoard[4]=='a'&&gameBoard[6]=='a'&&gameBoard[5]=='0'){gameBoard[5]='a';return true;} 

   if(gameBoard[8]=='a'&&gameBoard[9]=='a')return true; 
   if(gameBoard[8]=='a'&&gameBoard[10]=='a'&&gameBoard[9]=='0'){gameBoard[9]='a';return true;} 

   if(gameBoard[7]=='a'&&gameBoard[6]=='a')return true; 
   if(gameBoard[7]=='a'&&gameBoard[5]=='a'&&gameBoard[6]=='0'){gameBoard[6]='a';return true;} 

   if(gameBoard[11]=='a'&&gameBoard[10]=='a')return true; 
   if(gameBoard[11]=='a'&&gameBoard[9]=='a'&&gameBoard[10]=='0'){gameBoard[10]='a';return true;} 

   if(gameBoard[12]=='a'&&gameBoard[13]=='a')return true;
   if(gameBoard[12]=='a'&&gameBoard[14]=='a'&&gameBoard[13]=='0'){gameBoard[13]='a';return true;} 
   if(gameBoard[12]=='a'&&gameBoard[8]=='a')return true;
   if(gameBoard[12]=='a'&&gameBoard[4]=='a'&&gameBoard[8]=='0'){gameBoard[8]='a';return true;} 

   if(gameBoard[13]=='a'&&gameBoard[9]=='a')return true; 
   if(gameBoard[13]=='a'&&gameBoard[5]=='a'&&gameBoard[9]=='0'){gameBoard[9]='a';return true;} 

   if(gameBoard[14]=='a'&&gameBoard[10]=='a')return true; 
   if(gameBoard[14]=='a'&&gameBoard[6]=='a'&&gameBoard[10]=='0')
    {gameBoard[10]='a';return true;}   

   if(gameBoard[15]=='a'&&gameBoard[14]=='a')return true;
   if(gameBoard[15]=='a'&&gameBoard[13]=='a'&&gameBoard[14]=='0')
       {gameBoard[14]='a';return true;}  
   if(gameBoard[15]=='a'&&gameBoard[11]=='a')return true;
   if(gameBoard[15]=='a'&&gameBoard[7]=='a'&&gameBoard[11]=='0')
      {gameBoard[11]='a';return true;} 
  }
  switchA(){
   gameBoard=gameBoard.map(function(x){
                             if(x=='a'){return playerColor;}    
                             else {return x;}       
             });
  }
  switchColor(){
   if(playerColor=='x'){playerColor='o';return true;}
   if(playerColor=='o'){playerColor='x';return true;}
  }
  toomuch(){
    let i=0;
    gameBoard.forEach(function(x){
                             if(x=='a'){++i;console.log("a found");}
                             
                            });
    console.log("toomuch i = "+i);
    if(i>=2){
     gameBoard=gameBoard.map(function(x){
                             if(x=='a'){return '0';}    
                             else {return x;}       
             });
    }
  }
  handleClick(){
    var iD=parseInt(this.props.id,10);
    console.log("id "+iD);     
    if(gameBoard[iD]=='a') 
     {gameBoard[iD]=playerColor;
      if(playerColor=='x') 
       {this.setState(function(){ return {img: xpng}; });
        if(playerMode=='2'){this.switchColor();}
        if(playerMode=='1'){makeMove();}
       }
      else  
       {this.setState(function(){ return {img: opng}; });
        if(playerMode=='2'){this.switchColor();}  
        if(playerMode=='1'){makeMove();} 
       }                
     } 
    if(gameBoard[iD]=='0') 
     {gameBoard[iD]='a';}
    if(this.checkLong())
     {console.log("checkLong passed");
      this.switchA();
      if(playerMode=='2'){this.switchColor();reFresh();} 
      if(playerMode=='1'){makeMove();}
     }      
    this.toomuch();
    console.log(JSON.stringify(gameBoard));
  }
  render() {
    var thC=this.handleClick, f="field", id=this.props.id;
    var img=this.state.img,s=this.props.s;
    //console.log("status"+id+" "+s);
    switch(this.props.s)
     {  
      case '0':  
        return <img onClick={thC} className={f} id={id} src={img} alt="_" />;

      case 'x':
        return <img className="field" id={id} src={xpng} alt="x" />; 
      case 'o':
        return <img className="field" id={id} src={opng} alt="o" />;
      case 'a':  
        return <img onClick={thC} className={f} id={id} src={img} alt="_" />; 
      default: 
        return <img className={f} id={id} src={errorI} alt="error!" />; 
     }   
   } 
 
}
//----------------


class PlayField extends React.Component {
  
  constructor(props){
   super(props);
   
  }
 
  render() {
    let board=gameBoard;
    let keyIndex=-1;
    const playField=board.map(function(){
                                let key,x;
                                ++keyIndex;
                                key=keyIndex.toString();
                                //console.log(key);
                                x=board[keyIndex];
                                //console.log(x);  
                                return <Field id={key} key={key} s={x}/>; 
                                                            
                              });
    return <div className="playField" id="playfield">{playField}</div>;
    
   } 

}


class PlayerButton extends React.Component{
  constructor(props){
   super(props);
   this.handleClick=this.handleClick.bind(this);
  } 

  handleClick(){
    playerMode=this.props.mode;
    console.log("player Mode = "+playerMode);
    reFresh();
  }
 
  render(){
   if(this.props.mode=='1')
    {return <button onClick={this.handleClick}>One Player</button>;} 
   if(this.props.mode=='2')
    {return <button onClick={this.handleClick}>Two Players</button>;} 
  }
}


class App extends React.Component {
  
  constructor(props){
   super(props);
    
  } 
    
  render () {
    const hl = <p className="hl"> Unknown Abandoned Nim Variation </p>;
    const playField=<PlayField />;  
    
    return <div className="app">{hl}{playField}</div>;
    
    
  }
}

class PlayerMode extends React.Component{
  render()
   {const hl = <p className="hl"> Unknown Abandoned Nim Variation </p>;
    const pMode=<div className="bline"><PlayerButton mode="1"/><PlayerButton mode="2"/></div>;
    
    return <div>{hl}{pMode}</div>;
   }
}


render(<PlayerMode/>, document.getElementById('app')); // Program Entry

function reFresh(){
  console.log("refresh activated");
  gameBoard=gameBoard.map(function(x){
                            if(x=='a'){return '0';}
                            else {return x;}    
                          });
  console.log(JSON.stringify(gameBoard));
  render(<App/>, document.getElementById('app'));
}

//------------------------
// this is supposed to be the great Game AI 
function makeMove(){
  let comColor,x;
  let ef,cq;
  
  if(playerColor=='x'){comColor='o';}
  if(playerColor=='o'){comColor='x';}

  // returns -1 if there is none , otherwise the index of the field
  // requires global variable gameBoard
  function emptyField(){
    let x;
 
    function a(i){
      if(gameBoard[i]=='0'){x=i;return i;}
      if(i>gameBoard.length){x=-1;return -1;}
      a(i+1);
    }  
    a(0);    
    return x;
  }

  // requires global variable gameBoard
  // returns false on error
  function makeRandomMove(){
    var x=Math.round(Math.random()*gameBoard.length); 
    var e=emptyField();  
    
    if(gameBoard[x]=='0')
      {gameBoard[x]=comColor;
       return true;}
    if(emptyField()<0){return false;}
    gameBoard[e]=comColor;
    //makeRandomMove(); 
  }
  
  // requires global variable gameBoard
  // returns number of empty fields 
  function getEmptyFieldNumber(){
    var x=gameBoard.reduce(function(t,f){
                     if(f=='0'){return t+1;}
                     else {return t;}
                    },0);       
    return x;       
  }

  x=emptyField();
  console.log("emptyField  x returned "+x);
  ef=getEmptyFieldNumber();
  console.log("number of empty fields "+ef);
  if(ef%2==0)
   {console.log("computer might lose!");
    cq=CounterStrike(comColor);//returns true when successfull
    if(cq){console.log("counterstrike successful!");reFresh();}
   }
  if((x>=0)&&!cq){makeRandomMove();reFresh();}
  if(x<0){console.log("Game Over !!!");}

}


function CounterStrike(x){
   
  console.log("counter strike activated"); 

  if(gameBoard[0]=='0'&&gameBoard[1]=='0'){gameBoard[0]=x;gameBoard[1]=x;return true;}
  if(gameBoard[0]=='0'&&gameBoard[4]=='0'){gameBoard[0]=x;gameBoard[4]=x;return true;}
  
  if(gameBoard[1]=='0'&&gameBoard[5]=='0'){gameBoard[1]=x;gameBoard[5]=x;return true;}
  if(gameBoard[2]=='0'&&gameBoard[6]=='0'){gameBoard[2]=x;gameBoard[6]=x;return true;}
  if(gameBoard[3]=='0'&&gameBoard[2]=='0'){gameBoard[3]=x;gameBoard[2]=x;return true;}
  if(gameBoard[3]=='0'&&gameBoard[7]=='0'){gameBoard[3]=x;gameBoard[7]=x;return true;}
 
  if(gameBoard[4]=='0'&&gameBoard[5]=='0'){gameBoard[4]=x;gameBoard[5]=x;return true;}
  if(gameBoard[8]=='0'&&gameBoard[9]=='0'){gameBoard[8]=x;gameBoard[9]=x;return true;}
  if(gameBoard[7]=='0'&&gameBoard[6]=='0'){gameBoard[7]=x;gameBoard[6]=x;return true;}
  if(gameBoard[11]=='0'&&gameBoard[10]=='0'){gameBoard[11]=x;gameBoard[10]=x;return true;}
 
  if(gameBoard[12]=='0'&&gameBoard[13]=='0'){gameBoard[12]=x;gameBoard[13]=x;return true;}
  if(gameBoard[12]=='0'&&gameBoard[8]=='0'){gameBoard[12]=x;gameBoard[8]=x;return true;}
  if(gameBoard[13]=='0'&&gameBoard[9]=='0'){gameBoard[13]=x;gameBoard[9]=x;return true;}
    
  if(gameBoard[14]=='0'&&gameBoard[10]=='0'){gameBoard[14]=x;gameBoard[10]=x;return true;}
  if(gameBoard[15]=='0'&&gameBoard[14]=='0'){gameBoard[15]=x;gameBoard[14]=x;return true;}
  if(gameBoard[15]=='0'&&gameBoard[11]=='0'){gameBoard[15]=x;gameBoard[11]=x;return true;}

  return false;  
}

//-----------------------------

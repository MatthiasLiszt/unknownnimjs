import React from 'react';
import {render} from 'react-dom';

const empty="empty.png";
const xpng="x.png";
const opng="o.png";
const errorI="error.png";

let gameBoard=Array(16).fill('0');

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
                             if(x=='a'){return 'x';}    
                             else {return x;}       
             });
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
     {gameBoard[iD]='x';
      this.setState(function(){ return {img: xpng}; });        
     } 
    if(gameBoard[iD]=='0') 
     {gameBoard[iD]='a';}
    if(this.checkLong())
     {console.log("checkLong passed");
      this.switchA();
      reFresh();
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

render(<App/>, document.getElementById('app'));

function reFresh(){
  console.log("refresh activated");
  gameBoard=gameBoard.map(function(x){
                            if(x=='a'){return '0';}
                            else {return x;}    
                          });
  console.log(JSON.stringify(gameBoard));
  render(<App/>, document.getElementById('app'));
}


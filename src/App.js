import React from 'react';
import './App.css';

function App() {

  function clear(divName) {
    let boxOne = document.getElementsByClassName(divName)
    console.log(boxOne[0].classList)
    boxOne[0].classList.add('blurTranslate')
  }

  return (
    <>
    <div className="header">
      <nav>
        <ul>
          <li>Home</li>
          <li>Etc</li>
          <li>Etc</li>

        </ul>
      </nav>
    </div>
    <div className="game-board">
      <div className="row">

        <div className="box1" onClick={() => clear('box1')}></div>
        <div className="box2" onClick={() => clear('box2')}></div>
        <div className="box3" onClick={() => clear('box3')}></div>

      </div>
      <div className="row">

        <div className="box4" onClick={() => clear('box4')}></div>
        <div className="box5" onClick={() => clear('box5')}></div>
        <div className="box6" onClick={() => clear('box6')}></div>

      </div>
      <div className="row">

        <div className="box7" onClick={() => clear('box7')}></div>
        <div className="box8" onClick={() => clear('box8')}></div>
        <div className="box9" onClick={() => clear('box9')}></div>

      </div>
    </div>
    </>
  );
}

export default App;

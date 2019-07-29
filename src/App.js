import React from 'react';
import './App.css';

import sword from './images/sword1.png'
import shield from './images/shield1.png'
import potion from './images/potion1.png'


import ProgressBarExample from './components/HealthBar'

function App() {

  function clear(divName) {
    let boxOne = document.getElementsByClassName(divName)
    console.log(boxOne[0].classList)
    boxOne[0].classList.add('blurTranslate')
  }

  return (
    <>
    <div className="header">
      <nav className="nav-bar">
        <h2>Adventure Game</h2>
        <ul className="nav-links">
          <li>Home</li>
          <li>Inventory</li>
          <li>Logout</li>

        </ul>
      </nav>
    </div>
    <div className="body-wrapper">
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
      <div className="sidebar">
        <h3> Room Description</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ess</p>

        <h3> Equipped </h3>
        <ul>
          {/* <li>Sword</li>
          <li>Health Potion</li>
          <li>Shield</li> */}
          <img src={sword}/>
          <img src={shield}/>
          <img src={potion}/>

        </ul>

        <h3> Enemies </h3>
        <ul>
          <li>Evil Wizard</li>
        </ul>


        <h3> Health Bar </h3>
        <ProgressBarExample />

      </div>

    </div>

    </>
  );
}

export default App;

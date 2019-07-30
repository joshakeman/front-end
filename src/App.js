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
        <h2 className="kill-margin">Adventure Game</h2>
        <ul className="nav-links kill-margin">
          <li>Home</li>
          <li>Inventory</li>
          <li>Logout</li>

        </ul>
      </nav>
    </div>
    <div className="body-wrapper">
      <div className="game-board">
        <div className="left-column">

        </div>
        <div className="right-column">

          <div className="top-half">
          
          </div>
          <div className="bottom-half">
            <div className="items">
              <h2>Equipped Items</h2>
              <div className="equipped-items">
                <div className="item-slot">
                  <img src={sword}/>
                </div>
                <div className="item-slot">
                  <img src={shield}/>                  
                </div>
                <div className="item-slot">
                  <img src={potion}/>                  
                </div>
              </div>
            </div>
          
          </div>

        </div>
      </div>
      {/* <div className="sidebar">
        <h3> Room Description</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ess</p>

        <h3> Equipped </h3>
        <ul className="equipped-items">
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

      </div> */}

    </div>

    </>
  );
}

export default App;

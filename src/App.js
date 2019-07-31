import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios'

import sword from './images/sword1.png'
import shield from './images/shield1.png'
import potion from './images/potion1.png'


import ProgressBarExample from './components/HealthBar'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentRoom: '',
      roomDescription: '',
      players: [],
      errorMessage: ''
    }
  }



  changeRoom = (oldRoom, newRoom) => {
    console.log(oldRoom, newRoom)
    let background = document.getElementsByClassName('game-board')
    console.log(background[0].classList)
    // console.log(background[0].classList.contains(oldRoom))
    // console.log(background[0].classList.item(0))
    // const firstClass = background[0].classList.item(1)
    background[0].classList.remove(`${oldRoom}`)
    // // background[0].classList.remove(`${oldRoom}`)
    background[0].classList.add(`${newRoom}`)
    // console.log(firstClass)
  }

  register = () => {
    const fetchData = async () => {
      const result = await axios.post(
       'https://murmuring-earth-14820.herokuapp.com/api/registration/', 
       { username: "testuser6", password1:"testpassword", password2:"testpassword" }    
       )

      console.log(result)
      // setRoom(result.data);
    };

    fetchData();
  }

  login = () => {
    const fetchData = async () => {
      const result = await axios.post(
       'https://murmuring-earth-14820.herokuapp.com/api/login/', 
       { username: "testuser6", password:"testpassword" }    
       )

      console.log(result)
      // setRoom(result.data);
      localStorage.setItem('key', result.data.key)
    };

    fetchData();
  }

  init = () => {

    const fetchData = async () => {
      const key = localStorage.getItem('key')
      const result = await axios({
        url: 'https://murmuring-earth-14820.herokuapp.com/api/adv/init/',
        method: 'GET',
        headers: {
            'Authorization': `Token ${key}`,
        }   
      })

      console.log(result)
      this.setState({
        currentRoom: result.data.title,
        roomDescription: result.data.description,
        players: result.data.players
      })
    };

    fetchData();
  }

  move = (direction) => {
    
    const fetchData = () => {
      const key = localStorage.getItem('key')
      axios({
        url: 'https://murmuring-earth-14820.herokuapp.com/api/adv/move/',
        method: 'POST',
        data: {
          'direction': `${direction}`
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${key}`
        }   
      }).then(res => {
        console.log(res)
        this.setState({
          currentRoom: res.data.title,
          roomDescription: res.data.description,
          players: res.data.players,
          errorMessage: res.data.error_msg
        })
      })
      .catch(err => {
        console.log('whoops')
      })
    };

    fetchData()

  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.post(
  //      'https://murmuring-earth-14820.herokuapp.com/api/registration/', 
  //      { username: "testuser1", password1:"testpassword", password2:"testpassword" }    
  //      )

  //     console.log(result.data)
  //     setRoom(result.data);
  //   };

  //   fetchData();
  // }, []);

  render() {
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
        <div className={`game-board ${this.state.currentRoom}`}>
          <div className="left-column">
            <button onClick={this.register}>Register</button>
            <button onClick={this.login}>Login</button>
            <button onClick={this.init}>Init</button>
            <button onClick={() => this.move('n')}>North</button>
            <button onClick={() => this.move('w')}>West</button>
            <button onClick={() => this.move('e')}>East</button>
            <button onClick={() => this.move('s')}>South</button>

  
          </div>
          <div className="right-column">
  
            <div className="top-half">
            Current Room: {this.state.currentRoom} <br></br><br></br>
            Room Description: {this.state.roomDescription} <br></br><br></br>
            Players: {this.state.players.map(player =>
              <p>{player}</p>
            )} <br></br><br></br>
            
            <strong>{this.state.errorMessage}</strong>

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
  
}

export default App;

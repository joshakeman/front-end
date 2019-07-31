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
      currentRoom: 'Entrance',
      lastRoom: 'Entrance'
    }
  }



  changeRoom = (oldRoom, newRoom) => {
    console.log(oldRoom, newRoom)
    let background = document.getElementsByClassName(oldRoom)
    console.log(background[0].classList)
    // background[0].classList.remove(`${oldRoom}`)
    background[0].classList.add(`${newRoom}`)
    console.log(background[0].classList)


    // console.log(this.state.currentRoom)
  }

  register = () => {
    const fetchData = async () => {
      const result = await axios.post(
       'https://murmuring-earth-14820.herokuapp.com/api/registration/', 
       { username: "testuser3", password1:"testpassword", password2:"testpassword" }    
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
       { username: "testuser3", password:"testpassword" }    
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
        currentRoom: result.data.title
      })
    };

    fetchData();
  }

  move = (room, direction) => {
    
    const oldroom = room
    console.log(oldroom)

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
        console.log(this.state.currentRoom)
        console.log(res.data.title)
        this.setState({
          currentRoom: res.data.title,
          lastRoom: room
        })
        console.log(this.state.currentRoom)
      })
      .then(x => {
        this.changeRoom(this.state.lastRoom, this.state.currentRoom)
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
        <div className="Entrance game-board">
          <div className="left-column">
            <button onClick={this.register}>Register</button>
            <button onClick={this.login}>Login</button>
            <button onClick={this.init}>Init</button>
            <button onClick={() => this.move(this.state.currentRoom, 'n')}>North</button>
            <button onClick={() => this.move(this.state.currentRoom, 'w')}>West</button>
            <button onClick={() => this.move(this.state.currentRoom, 'e')}>East</button>
            <button onClick={() => this.move(this.state.currentRoom, 's')}>South</button>

  
          </div>
          <div className="right-column">
  
            <div className="top-half">
            Current Room: {this.state.currentRoom} <br></br><br></br>
            Last Room: {this.state.lastRoom} 

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

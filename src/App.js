import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios'

import sword from './images/sword1.png'
import shield from './images/shield1.png'
import potion from './images/potion1.png'


import ProgressBarExample from './components/HealthBar'
import Map from './components/Map'

import rooms from './Rooms'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentRoom: '',
      roomDescription: '',
      players: [],
      errorMessage: '',
      discoveredRooms: []
    }
  }

  componentDidMount() {

    const fetchData = () => {
      const key = localStorage.getItem('key')
      axios({
        url: 'https://murmuring-earth-14820.herokuapp.com/api/adv/init/',
        method: 'GET',
        headers: {
            'Authorization': `Token ${key}`,
        }   
      }).then(result => {
        this.setState({
          currentRoom: result.data.title,
          roomDescription: result.data.description,
          players: result.data.players
        })

        this.unblur(this.state.currentRoom)
        this.movePlayer(this.state.currentRoom)

      }).catch(err => {
        // Do something
      })

      
    };

    fetchData()
    this.generateRooms()
    // this.unblur(this.state.currentRoom)

  }

  unblur = (unblurRoom) => {
    const roomSquare = document.querySelectorAll(`[data-room~=${unblurRoom}]`);
    roomSquare[0].classList.add('blurTranslate')
  }

  movePlayer = (thisRoom) => {

    const origin_left = 240  
    const origin_top = 240

    const array = Object.entries(rooms)
    const new_array = []

    for (let i in array) {
        const x_coord = array[i][1][0][0]
        const y_coord = array[i][1][0][1]

        const x_transform = origin_left + x_coord * 100
        const y_transform = origin_top + -y_coord * 100

        const exits = Object.keys(array[i][1][1])

        new_array.push([array[i][0], x_transform, y_transform, exits])
    }

    let x = 0
    let y = 0

    for (let i in new_array) {
      if (new_array[i][0] == thisRoom) {
        x = new_array[i][1]
        y = new_array[i][2]      
      }
    } 

    const player = document.getElementsByClassName('knight')
    player[0].style.left = `${x}px`
    player[0].style.top = `${y}px`
  }

  discoverRoom = (currentRoom) => {

    if (!this.state.discoveredRooms.includes(currentRoom)) {

      this.setState({
        discoveredRooms: [...this.state.discoveredRooms, currentRoom]
      })


    }
  }

  register = () => {
    const fetchData = async () => {
      const result = await axios.post(
       'https://murmuring-earth-14820.herokuapp.com/api/registration/', 
       { username: "newGuy", password1:"testpassword", password2:"testpassword" }    
       )
    };

    fetchData();
  }

  login = () => {
    const fetchData = async () => {
      const result = await axios.post(
       'https://murmuring-earth-14820.herokuapp.com/api/login/', 
       { username: "newGuy", password:"testpassword" }    
       )

      localStorage.setItem('key', result.data.key)
    };

    fetchData();
  }

  init = () => {

    const fetchData = () => {
      const key = localStorage.getItem('key')
      axios({
        url: 'https://murmuring-earth-14820.herokuapp.com/api/adv/init/',
        method: 'GET',
        headers: {
            'Authorization': `Token ${key}`,
        }   
      }).then(result => {
          this.setState({
            currentRoom: result.data.title,
            roomDescription: result.data.description,
            players: result.data.players
          })
          
        this.unblur(this.state.currentRoom)
        this.movePlayer(this.state.currentRoom)
      })
      .catch(err => {
        // Do something
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
        this.setState({
          currentRoom: res.data.title,
          roomDescription: res.data.description,
          players: res.data.players,
          errorMessage: res.data.error_msg
        })
        this.unblur(this.state.currentRoom)
        this.movePlayer(this.state.currentRoom)

      })
      .catch(err => {
        /* add error handler */
      })
    };

    fetchData()
  }

  addDiv = (left, top, room, type) => {

    const wrapper = document.getElementsByClassName('map-wrapper')
    const div = document.createElement('div');

    // console.log(div)

    if (type == 'room') {
      div.classList.add('room')
      div.innerText = room
    }
    else if (type == 'path') {
      div.classList.add('box')
    }
    
    div.style.left = `${left}px`
    div.style.top = `${top}px`
    div.dataset.room = room

    wrapper[0].append(div)
  }

  generateRooms = () => {
      const origin_left = 240  
      const origin_top = 240

      const array = Object.entries(rooms)
      const new_array = []

      for (let i in array) {
          const x_coord = array[i][1][0][0]
          const y_coord = array[i][1][0][1]

          const x_transform = origin_left + x_coord * 100
          const y_transform = origin_top + -y_coord * 100

          const exits = Object.keys(array[i][1][1])

          new_array.push([array[i][0], x_transform, y_transform, exits])
      }


      for (let i in new_array) {

          const room_name = new_array[i][0]
          const left_value = new_array[i][1]
          const top_value = new_array[i][2]
          
          this.addDiv(left_value, top_value, room_name, 'room')
          if (new_array[i][3].includes('n')) {
          const path_left = left_value + 25
          const path_top = top_value - 25

          this.addDiv(path_left, path_top, '', 'path')
          }
          if (new_array[i][3].includes('w')) {
          const path_left = left_value - 25
          const path_top = top_value + 25

          this.addDiv(path_left, path_top, '', 'path')
          }
          if (new_array[i][3].includes('s')) {
          const path_left = left_value + 25
          const path_top = top_value + 75

          this.addDiv(path_left, path_top, '', 'path')
          }
          if (new_array[i][3].includes('e')) {
          const path_left = left_value + 75
          const path_top = top_value + 25

          this.addDiv(path_left, path_top, '', 'path')
          }
      }
  }

  reset = () => {
    localStorage.removeItem('key')
    window.location.reload()
  }


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
            <div className="buttons-wrapper">
              <button onClick={this.reset}>Reset</button>
              <button onClick={this.login}>Login</button>
              <button onClick={this.init}>Start New Game</button>
              <button onClick={() => this.move('n')}>North</button>
              <button onClick={() => this.move('w')}>West</button>
              <button onClick={() => this.move('e')}>East</button>
              <button onClick={() => this.move('s')}>South</button>
            </div>

            <div className="map-wrapper">
              <h2 className="map-header kill-margin">Game Map</h2>
              <div className="knight"></div>
            </div>
          </div>
          {/* <div className="right-column">
  
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
  
          </div> */}
        </div>
        <div className="sidebar">
          <h2>{this.state.currentRoom}</h2>
          <p>{this.state.roomDescription}</p>
  
          <h3> Equipped </h3>
          <ul className="equipped-items">
            <img src={sword}/>
            <img src={shield}/>
            <img src={potion}/>
  
          </ul>
  
          <h3> Players </h3>
          {this.state.players.map(player =>
              <p style={{display: 'inline-block'}}>&nbsp; {player}&nbsp; </p>
            )}
          
          <strong>{this.state.errorMessage}</strong>
  
  
          <h3> Health Bar </h3>
          <ProgressBarExample />
  
        </div>
  
      </div>  
      </>
    );
  }
  
}

export default App;

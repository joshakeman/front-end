import React from 'react'

import rooms from '../Rooms'


class Map extends React.Component {

    addDiv = (left, top, room, type) => {

        const wrapper = document.getElementsByClassName('map-wrapper')
        const div = document.createElement('div');
    
        if (type == 'room') {
          div.classList.add('room')
          div.innerText = room
        }
        else if (type == 'path') {
          div.classList.add('box')
        }
        
        div.style.left = `${left}px`
        div.style.top = `${top}px`
    
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
    
      render() {
        return (
            <>
            <button onClick={this.generateRooms}> Generate Map </button>    
            </>
          );
      }
      
    }

    export default Map
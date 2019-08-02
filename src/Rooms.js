const rooms = {
    'Entrance': [[0, 0], {'e': 'Waterfall', 's': 'Desert', 'w': 'Volcano', 'n': 'Castle'}], 
    'Waterfall': [[1, 0], {'e': 'Cave', 'w': 'Entrance', 'n': 'River'}], 
    'Cave': [[2, 0], {'w': 'Waterfall'}], 
    'River': [[1, 1], {'e': 'Rapids', 's': 'Waterfall'}], 
    'Rapids': [[2, 1], {'w': 'River'}], 
    'Desert': [[0, -1], {'e': 'Sandy Hills', 'w': 'Dust Devil Country', 'n': 'Entrance'}], 
    'Sandy Hills': [[1, -1], {'e': 'Abandoned Crates', 'w': 'Desert'}], 
    'Abandoned Crates': [[2, -1], {'w': 'Sandy Hills'}], 
    'Dust Devil Country': [[-1, -1], {'e': 'Desert'}], 
    'Volcano': [[-1, 0], {'e': 'Entrance', 'w': 'Obsidian Doorway', 'n': 'Stairs'}], 
    'Obsidian Doorway': [[-2, 0], {'e': 'Volcano'}], 
    'Stairs': [[-1, 1], {'s': 'Volcano', 'w': 'Chest'}], 
    'Chest': [[-2, 1], {'e': 'Stairs'}], 
    'Castle': [[0, 1], {'s': 'Entrance', 'n': 'Chamber'}], 
    'Chamber': [[0, 2], {'e': 'Treasury', 's': 'Castle'}], 
    'Treasury': [[1, 2], {'w': 'Chamber'}]
}

export default rooms
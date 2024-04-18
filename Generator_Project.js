let map = [];
let space = 10;     // space will determine the space between characters
let font;
let Xcount = 0;
let MUTATION_COUNT = 5; // Allow the user to set this?
let ascii

function preload(){
  font = loadFont('assets/unispace/Unispace Rg.otf');
}

function setup() {
  createCanvas(640, 480);
  //randomSeed(0);    // set a random seed 
  //background(random(50,100), random(50,100), random(175,255));
  //textFont(font);
  fill(0);
  rectMode(CENTER);
  textSize(15);

  ascii = ["X", "-", "o", "O", "~", "s", "π", "φ", "∩", "£"];  // this will be the list of environment objects

  // fill out the array with nothing but dashes (grass)
  for(x = 0; x < width; x++){
    map[x] = [];
    for(y = 0; y < height; y++){    
      map[x][y] = "-";
    }
  }

  for(i = 0; i < MUTATION_COUNT; i++){
    mutate(map);
  }

  displayMap(map);
}

function mutate(map){
  for(c = 0; c < map.length; c++){
    if(map[c] == null){
      console.error("ERROR: mutate(): uninitialized map")
    }
    for(r = 0; r < map[c].length; r++){
      chance = random();
      if(chance <= 0.25){
        new_sym = random(ascii);
        if(new_sym == 'X' && Xcount <= 0){
              Xcount++;
        }
        else{
          while(new_sym == "X"){
            new_sym = random(ascii);
          }
        }
        map[r][c] = new_sym;
      }
    }
  }
  
  for(c = 0; c < map.length; c++){
    for(r = 0; r < map[c].length; r++){
      let symbol = map[r][c];

      if(symbol == "X"){ // if it's the treasure
        if(Xcount <= 0){
          Xcount++;
        }
        else{
          symbol = "-";
        }
      }
      else if(symbol == "o"){
        neighbors = check_neighbors(map, r, c);
        if(neighbors != null){
          choice = random(neighbors);
          if(choice != null){
            map[choice[0]][choice[1]] = random(["o", "-", "-", "-"]);
          }
        }
      }
      else if(symbol == "~"){ // if it's water
        neighbors = check_neighbors(map, r, c);
        if(neighbors != null){
          for(i = 0; i < random(1, neighbors.length); i++){
            choice = random(neighbors);
            if(choice != null){
              map[choice[0]][choice[1]] = random(["~", "~", "-", "-", "-"]);
            }
            
          }
        }
        
      }
      else if(symbol == "π"){
        neighbors = check_neighbors(map, r, c);
        if(neighbors != null){
          for(i = 0; i < random(1, neighbors.length); i++){
            choice = random(neighbors);
            if(choice != null){
              map[choice[0]][choice[1]] = "-";
            }
            
          }
          
        }
      }
      else if(symbol == "φ"){             // if it's a tree
        neighbors = check_neighbors(map, r, c);
        if(neighbors != null){
          for(i = 0; i < random(1, neighbors.length); i++){   // make some more trees
            choice = random(neighbors);
            if(choice != null){
              map[choice[0]][choice[1]] = random(["o", "-", "-", "-", "o", "φ"]);
            }
          }
        }
      }

    }

  }

}

function check_neighbors(map, x, y){
  // a function that checks which of the surrounding "squares" are within the bounds of the array
  // if a neighbor is "valid," add it's x and y values to the list of valid neighbors that gets returned at the end of the function 
  // this function will be used to add more realism and clustering certain objects together
  let boundY = map.length;
  if(map[x] == null){
    console.error("ERROR: check_neighbors(): uninitialized map");
    return;
  }
  let boundX = map[x].length;
  let valid_neighbors = [];

  if( (x-1 < boundX && x-1 >= 0) && (y-1 < boundY && y-1 >= 0) ){   // top left neighbor
    valid_neighbors.push([x-1, y-1]);
  }
  if( (x < boundX && x >= 0) && (y-1 < boundY && y-1 >= 0) ){       // top middle neighbor
    valid_neighbors.push([x, y-1]);
  }
  if( (x+1 < boundX && x+1 >= 0) && (y-1 < boundY && y-1 >= 0) ){   // top right neighbor
    valid_neighbors.push([x+1, y-1]);
  }
  if( (x-1 < boundX && x-1 >= 0) && (y < boundY && y >= 0) ){       // left neighbor
    valid_neighbors.push([x-1, y]);
  }
  if( (x+1 < boundX && x+1 >= 0) && (y < boundY && y >= 0) ){       // right neighbor
    valid_neighbors.push([x+1, y]);
  }
  if( (x-1 < boundX && x-1 >= 0) && (y+1 < boundY && y+1 >= 0) ){   // bottom left neighbor
    valid_neighbors.push([x-1, y+1]);
  }
  if( (x < boundX && x >= 0) && (y+1 < boundY && y+1 >= 0) ){       // bottom middle neighbor
    valid_neighbors.push([x, y+1]);
  }
  if( (x+1 < boundX && x+1 >= 0) && (y+1 < boundY && y+1 >= 0) ){   // bottom right neighbor
    valid_neighbors.push([x+1, y+1]);
  }

  // return the list of all valid neighbors

  return valid_neighbors;

}

function displayMap(map){
  let r = 0;
  let c = 0;
  for(x = 0; x < width; x += space){
    for(y = 0; y < height; y += space){
      let symbol = map[r][c];

      if(symbol == "-"){  // if it's grass
        fill(46, 128, 50);  // fill it green 
      }
      else if(symbol == "X"){ // if it's the treasure
        if(Xcount == 0){
          fill(181, 25, 16);
          Xcount++;
        }
        else{
          symbol = "-";
        }
      }
      else if(symbol == "o"){ // if it's a bush
        fill(46, 128, 50);  // fill it green
      }
      else if(symbol == "O"){ // if it's a boulder
        fill(92, 74, 73);
      }
      else if(symbol == "~"){ // if it's water
        fill(33, 91, 184);
      }
      else if(symbol == "s"){ // if it's a snake
        fill(255, 0, 47); // fill it red
      }
      else if(symbol == "π"){
        fill(0);
      }
      else if(symbol == "φ"){             // if it's a tree
        fill(46, 128, 50);                // make it green 
      }
      else if(symbol == "∩"){  // if it's an arch
        fill(66, 0, 7);         // fill it dark red
      }
      else if(symbol == "£"){   // if it's a monster
        fill(255, 0, 47); // fill it red
      }

      text(symbol, x, y);   // display the current symbol 

      if(c < map[x].length){  // increment the row counter
        c++;
      }
      else{
        c = 0;
      }
      
    }
    if(r < map.length){   // increment the column counter
      r++;
    }
    else{
      r = 0;
    }
  }
}

function draw() {
  
}

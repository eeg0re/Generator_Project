let map = [];
let space = 10;     // space will determine the space between characters
 
 function setup() {
  createCanvas(640, 480);
  //randomSeed(0);    // set a random seed 
  //background(random(50,100), random(50,100), random(175,255));
  fill(0);
  strokeWeight(3);
  rectMode(CENTER);
  textSize(20);

  let ascii = ["X", "m", "o", "O", "~", "s", "π", "φ", "∩", "£"];  // this will be the list of environment objects

  for(x = 0; x < width; x++){
    map[x] = [];
    for(y = 0; y < height; y++){    
      map[x][y] = "-";
    }
  }
  displayMap(map);
}

function mutate(map){


}

function check_neighbors(map){
  
}

function displayMap(map){
  let r = 0;
  let c = 0;
  for(x = 0; x < width; x += space){
    for(y = 0; y < height; y += space){
      let symbol = map[r][c];
      text(symbol, x, y);
      if(r < map[x].length){
        r++;
      }
      else{
        r = 0;
      }
      
    }
    if(c < map.length){
      c++;
    }
    else{
      c = 0;
    }
  }
}

function draw() {
  
}

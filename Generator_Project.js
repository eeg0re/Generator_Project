let map = [];
 
 function setup() {
  createCanvas(640, 480);
  //randomSeed(0);    // set a random seed 
  background(random(50,100), random(50,100), random(175,255));
  fill(0);
  strokeWeight(3);
  rectMode(CENTER);
  textSize(20);

  let space = 10;     // space will determine the space between characters
  //let ascii = ["╖", "╕", "╣", "║", "╗", "╝", "╜", "╛", "  ╡"]
  let ascii = ["X", "m", "-", "o", "O", "~", "s", "π", "φ", "∩", "£"];
  for(x = 0; x < width; x++){
    map[x] = [];
    for(y = 0; y < height; y++){    
      // text("-", x, y);

      //console.log("current x: ",x, " current row: ", map[x])
      map[x][y] = "-";
    }
  }
  let r, c = 0;
  //console.log(map[0]);
  for(x = 0; x < width; x += space){

    for(y = 0; y < height; y += space){
      //console.log(map[r]);
      text(map[c][r], x, y);
      if(c < height){
        c++;
      }
      else{
        c = 0;
      }
      
    }
    if(r < width){
      r++;
    }
    else{
      r = 0;
    }
  }

}

function displayMap(){

}

function draw() {
  
}

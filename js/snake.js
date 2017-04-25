
// Constants
var Right_Arrow = 39;
var Left_Arrow = 37;
var Up_Arrow = 38;
var Down_Arrow = 40;
var Still = 1;

//Snake
var snakeWidth = 10;
var snakeHeight = 10;

//Stage
var stageWidth = 600;
var stageHeight = 400;
var stage = new Kinetic.Stage({
container: 'kinetic-container',
width: stageWidth,
height: stageHeight 
});

//*****Initialize grid
grid = initGrid();

//********Initialize snake
var snakeTail;
var snakeHead;
var snakeNewPart;
var snakeParts = 1;
var initSnakePosition = randomCell(grid.length - 1);
var snakePart = new Kinetic.Rect({
    name: 'snake',
    x: grid[initSnakePosition].col,
    y: grid[initSnakePosition].row,
    width: snakeWidth,
    height: snakeHeight,
    fill: 'black',
});
snakePart.position = snakeParts;
snakeHead = snakePart;
snakeTail = snakePart;

var randomFoodCell = randomCell(grid.length - 1);
var food = new Kinetic.Circle({
    id: 'food',
    x:grid[randomFoodCell].col+5,
    y:grid[randomFoodCell].row+5,
    radius: 5,
    fill: 'red'
});

// add the shapes (sanke and food) to the layer
var layer = new Kinetic.Layer();
layer.add(snakePart);
layer.add(food);
// add the layer to the stage
stage.add(layer);

var where = Still;
var gameInterval = self.setInterval(function(){gameLoop()},70);
$( document ).ready(function() {
   $(document).keydown(function(e) {
      e.preventDefault();
      switch(e.keyCode) { 
         // User pressed "up" arrow
         case Up_Arrow:
            where = Up_Arrow;
         break;
         // User pressed "down" arrow
         case Down_Arrow:
            where = Down_Arrow;
         break;
         // User pressed "right" arrow
         case Right_Arrow:
                where = Right_Arrow;
         break;
         // User pressed "left" arrow
         case Left_Arrow:
                where = Left_Arrow;
         break;
      }
   });
});

function gameLoop() {
    if(checkGameStatus())
        move(where);
    else {
        clearInterval(gameInterval);//Stop calling gameLoop()
        alert('Game Over! Reload!');
        window.location.reload();
    }
}

function move(direction) {
    //Super hint: only move the tail
    var foodHit = false;
    switch(direction) {
        case Down_Arrow:
            foodHit = snakeEatsFood(direction);
                var anim2 = new Kinetic.Animation(function(frame) {
                    if(foodHit)
                    {
                        snakeHead.setY(snakeHead.getY()+10);
                        growSnake(direction);
                        if(snakeHead.getY() == stageHeight)
                            snakeHead.setY(0);
                        relocateFood();
                    }
                    else
                    {
                        snakeTail.setY(snakeHead.getY()+10);
                        snakeTail.setX(snakeHead.getX());
                        if(snakeTail.getY() == stageHeight)
                            snakeTail.setY(0);
                        rePosition();
                    }

                    }, layer);

                anim2.start(); 
                anim2.stop();

            break;
            
        case Up_Arrow:
            foodHit = snakeEatsFood(direction);
                var anim2 = new Kinetic.Animation(function(frame) {
                    if(foodHit)
                    {
                        snakeHead.setY(snakeHead.getY()-10);
                        growSnake(direction);
                        if(snakeHead.getY() < 0)
                            snakeHead.setY(stageHeight-10);
                        relocateFood();
                    }
                    else
                    {
                        snakeTail.setY(snakeHead.getY()-10);
                        snakeTail.setX(snakeHead.getX());
                        if(snakeTail.getY() < 0)
                            snakeTail.setY(stageHeight-10);
                        rePosition();
                    }
                    
                }, layer);

                anim2.start(); 
                anim2.stop();

            break;  
        case Right_Arrow: //right arrow
            
                foodHit = snakeEatsFood(direction);
                var anim2 = new Kinetic.Animation(function(frame) {
                        if(foodHit)
                        {
                            snakeHead.setX(snakeHead.getX()+10);
                            growSnake(direction);
                            if(snakeHead.getX() == stageWidth)
                                snakeHead.setX(0);
                            relocateFood();
                        }
                        else
                        {
                            snakeTail.setX(snakeHead.getX()+10);
                            snakeTail.setY(snakeHead.getY());
                            if(snakeTail.getX() == stageWidth)
                                snakeTail.setX(0);									
                            rePosition();
                        }
                    
                }, layer);

                anim2.start(); 
                anim2.stop();

            break;
        case Left_Arrow: //Left arrow
            
                foodHit = snakeEatsFood(direction);
                var anim2 = new Kinetic.Animation(function(frame) {
                        if(foodHit)
                        {
                            snakeHead.setX(snakeHead.getX() - 10);
                            growSnake(direction);
                            if(snakeHead.getX() < 0)
                                snakeHead.setX(stageWidth - 10);
                            relocateFood();
                        }
                        else
                        {
                            snakeTail.setX(snakeHead.getX()-10);
                            snakeTail.setY(snakeHead.getY());
                            if(snakeTail.getX() < 0)
                                snakeTail.setX(stageWidth-10);										
                            rePosition();
                        }
                    
                }, layer);

                anim2.start(); 
                anim2.stop();

            break;
    }
}

//Check game status like...game over
function checkGameStatus()
{
    var gameStatus = true;
    if(!(snakeHead == snakeTail))
    {
        var snakePartsArray = stage.get('.snake');
        for( partIndex = 0; partIndex < snakeParts; partIndex++)
        {
            if(snakeHead != snakePartsArray[partIndex])
            {
                if(snakeHead.getX() == snakePartsArray[partIndex].getX() && snakeHead.getY() == snakePartsArray[partIndex].getY())
                    gameStatus =  false;
            }
        }				
    }
    return gameStatus;
}

//Allocate position to food item
function relocateFood()
{
  //*****Reinitialize grid to find exclusive food position, eliminate the areas under snake
  var cell;
  var grid=[];
  var columns = stageWidth/snakeWidth;
  var rows = stageHeight / snakeHeight;
  for(col=1; col< columns; col++)
    for(row=1; row< rows; row++)
    {
        var addToGrid = true;
        cell = {"col":col*snakeHeight, "row":row*snakeWidth};
        var snakePartsArray = stage.get('.snake');
        for( partIndex = 0; partIndex < snakeParts; partIndex++)
        {
            if(snakePartsArray[partIndex].getX() == cell.col && snakePartsArray[partIndex].getY() == cell.row)
            {	
                addToGrid = false;
                break;
            }	
        }
        if(addToGrid)
            grid.push(cell);
    }
    
    var randomFoodCell = randomCell(grid.length - 1);
    food.setX(grid[randomFoodCell].col+5);
    food.setY(grid[randomFoodCell].row+5);

}
function snakeEatsFood(direction)
{
    var eats = false;
    switch(direction)
    {
        case Down_Arrow:
            eats = snakeHead.getX() == food.getX()-food.getWidth()/2 && snakeHead.getY()+10 == food.getY()-food.getHeight()/2;
        break;			
        case Up_Arrow:
            eats = snakeHead.getX() == food.getX()-food.getWidth()/2 && snakeHead.getY()-10 == food.getY()-food.getHeight()/2;
        break;
        case Right_Arrow:
            eats = snakeHead.getX()+10 == food.getX()-food.getWidth()/2 && snakeHead.getY() == food.getY()-food.getHeight()/2;
        break;
        case Left_Arrow:
            eats = snakeHead.getX()-10 == food.getX()-food.getWidth()/2 && snakeHead.getY() == food.getY()-food.getHeight()/2;
        break;
    }
    return eats ;
}

//Re-assign position numbers as snake moves
function rePosition()
{
    var snakePartsArray = stage.get('.snake');
    for( partIndex = 0; partIndex < snakeParts; partIndex++)
    {
        snakePartsArray[partIndex].position = snakePartsArray[partIndex].position +1 ;
    }
    for( partIndex = 0; partIndex < snakeParts; partIndex++)
    {
        if(snakePartsArray[partIndex].position > snakeParts)
        {	
            snakePartsArray[partIndex].position = 1;
            snakeHead = snakePartsArray[partIndex];
        }
        if(snakePartsArray[partIndex].position == snakeParts)
        {	
            snakeTail = snakePartsArray[partIndex];
        }
                                
    }	
}

//Reset snake parts and positions if new part is added 
function resetPositions(snakePart) {
     snakeParts++;
     
     if(snakeHead == snakeTail) {
        snakeTail = snakePart;
        snakePart.position = snakeParts;
     } else {
        snakePart.position = snakeHead.position + 1;
        snakeNewPart =  snakePart;
     }
    var snakePartsArray = stage.get('.snake');
    for( partIndex = 0; partIndex < snakeParts; partIndex++) {
        if(!(snakePartsArray[partIndex] == snakeHead || snakePartsArray[partIndex] == snakeNewPart)) {
            snakePartsArray[partIndex].position = snakePartsArray[partIndex].position + 1;
        }
    }
}
//Create new snake part
function createSnakePart(x,y) {
    var snakePart = new Kinetic.Rect({
        name: 'snake',
        x: x,
        y: y,
        width: snakeWidth,
        height: snakeHeight,
        fill: 'black',

      });
    layer.add(snakePart);
    
    return snakePart;
}
//Grow snake length after eating food
function growSnake(direction) {
    switch(direction) {
        case Down_Arrow:
            var x, y;
            x = snakeHead.getX();
            y = snakeHead.getY()-10;
            resetPositions(createSnakePart(x,y));
          
        break;
        case Up_Arrow:
            var x, y;
            x = snakeHead.getX();
            y = snakeHead.getY()+10;
            resetPositions(createSnakePart(x,y));

        break;
        case Right_Arrow:
            var x, y;
            x = snakeHead.getX()-10;
            y = snakeHead.getY();
            resetPositions(createSnakePart(x,y));
        
        break;
        case Left_Arrow:
            var x, y;
            x = snakeHead.getX()+10;
            y = snakeHead.getY();
            resetPositions(createSnakePart(x,y));
        
        break;
    }
}

function randomCell(cells) {
    return Math.floor((Math.random()*cells));
}
function initGrid() {
  //*****Initialize Grid
  var grid=[];
  var columns = stageWidth/snakeWidth;
  var rows = stageHeight / snakeHeight;
  for(col=0; col< columns; col++)
    for(row=0; row< rows; row++)
    {
        cell = {"col":col*snakeHeight, "row":row*snakeWidth};
        grid.push(cell);
    }
    return grid;
}

var stage = new Kinetic.Stage({container: 'card', width: 500, height: 300});
var layer = new Kinetic.Layer();
stage.add(layer);  
 
  
// Adds a white background with dark gray border
// The whole rectangle is still 500 x 300. The stroke is centered on the edge of the rectangle, so a stroke 4 pixels wide has two pixels sticking outside the edge. 496 width + 2 on the left + 2 on the right makes a 500 pixel long rect.
function addBackground(){
  var background = new Kinetic.Rect({x: 2, y: 2, width:496, height:296, fill:'#ffffff', stroke:'#333333', strokeWidth:4});
  layer.add(background); 
}
 

// Adds the title text at the top in large red type with a drop shadow and thin black outline
function addTitle(title){
  var titleText = new Kinetic.Text({
    text:title,
    x:20, 
    y:10, 
    fontFamily:'sans-serif',
    fontSize:40,
    fontStyle:'bold',
    fill:'#FF3333',
    stroke:'#000000',
    shadowColor: '#000000',
    shadowBlur: 5,
    shadowOffset: {x:3, y:3},
    shadowOpacity: 0.4
  });
  layer.add(titleText);
}
  

// Adds the quotation in smaller text in a pinkish color
function addQuotation(quote){
  var quoteText = new Kinetic.Text({
    text:quote,
    x:20, 
    y:65, 
    width:460,
    fontFamily:'sans-serif',
    fontSize:28,
    fill:'#D07090',
  });
  layer.add(quoteText);
}


// Adds the author in smaller text yet (preceded by a hyphen) and aligned to the right
function addAuthor(author){
  var authorText = new Kinetic.Text({
    text:'-' + author,
    x:20, 
    y:220,
    width:460,
    fontFamily:'sans-serif',
    fontSize:18,
    fill:'#D07090',
    align:'right'
  });
  layer.add(authorText);
}


// Adds the ending text in a font from Google Web Fonts, centered at the bottom
// See line 6 of the HTML for the line that loads this font from Google
function addEnding(ending){
  var endingText = new Kinetic.Text({
    text:ending,
    x:20, 
    y:265,
    width:460,
    fontFamily:'Lobster',
    fontSize:20,
    fill:'#777777',
    align:'center'
  });
  layer.add(endingText);
}


// Draws the card. 
function makeCard(){
  var title, quote, author, ending;
  
  title = document.getElementById('title').value;
  quote = document.getElementById('quote').value;
  author = document.getElementById('author').value;
  ending = document.getElementById('ending').value;
  
  layer.removeChildren();
  
  addBackground();
  addTitle(title);
  addQuotation(quote);
  addAuthor(author);
  addEnding(ending);
  
  stage.draw();
} 
  
  
document.getElementById('make').addEventListener('click', makeCard);
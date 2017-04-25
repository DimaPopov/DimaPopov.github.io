/* ------ Intersection start ------*/
// build stage
var intersection_stage = new Kinetic.Stage({
  container: 'container-intersection',
  width: 650,
  height: 300
});

//add layer and objects
var intersection_layer = new Kinetic.Layer();
var intersection_rectbg = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: 650,
  height: 300,
  fill: '#efefef',
  stroke: '#666',
  strokeWidth: 1,
  dash: [3, 3]
});
var intersection_rect1 = new Kinetic.Rect({
  x: 20,
  y: 20,
  width: 200,
  height: 100,
  fill: '#D7404F',
  stroke: '#000',
  strokeWidth: 1
});
var intersection_rect2 = new Kinetic.Rect({
  x: 430,
  y: 175,
  width: 100,
  height: 50,
  fill: '#E5D7C1',
  stroke: '#000',
  strokeWidth: 1,
  draggable: true
});
var intersection_text1 = new Kinetic.Text({
  x: 380,
  y: 20,
  text: 'Mouse...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
var intersection_text2 = new Kinetic.Text({
  x: 380,
  y: 40,
  text: 'Little box status...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
var intersection_text3 = new Kinetic.Text({
  x: 380,
  y: 60,
  text: 'Boxes intersection...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
var intersection_text4 = new Kinetic.Text({
  x: 380,
  y: 80,
  text: 'Intersection points...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});

//initialize items
intersection_layer.add(intersection_rectbg);
intersection_layer.add(intersection_text1);
intersection_layer.add(intersection_text2);
intersection_layer.add(intersection_text3);
intersection_layer.add(intersection_text4);
intersection_layer.add(intersection_rect1);
intersection_layer.add(intersection_rect2);
intersection_stage.add(intersection_layer);

//move bg to back
intersection_rectbg.setZIndex(-10);

//show mouse coords
intersection_layer.on('mousemove', function() {
  var mousePos = intersection_stage.getPointerPosition();
  var x = mousePos.x;
  var y = mousePos.y;
  intersection_text1.setText('Mouse coordinates: x ' + x + ', y ' + y);
  intersection_layer.draw();
});

//what happens when little box is moved
intersection_rect2.on('dragmove', function() {
  if (theyAreColliding(intersection_rect1, intersection_rect2)) {
    intersection_text3.setText('Big box intersects little box, YES');
  }
  else{
     intersection_text3.setText('Big box intersects little box, NO');
  }
  intersection_text2.setText('Little box is moving');
  intersection_rect2.setStroke('#ccc');
  intersection_layer.draw();
});

//little box stopped being dragged
intersection_rect2.on('dragend', function() {
  intersection_text2.setText('Little box is not moving');
  intersection_rect2.setStroke('#000');
  intersection_layer.draw();
});

// *** check if little box has touched coords of big box ***
function theyAreColliding(rect1, rect2) {
  return !(rect2.getX() > rect1.getX()+rect1.getWidth() || 
           rect2.getX()+rect2.getWidth() < rect1.getX() || 
           rect2.getY() > rect1.getY()+rect1.getHeight() ||
           rect2.getY()+rect2.getHeight() < rect1.getY());
}
//show little box is draggable
intersection_rect2.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});
intersection_rect2.on('mouseout', function() {
  document.body.style.cursor = 'default';
});

/* Intersection end */

/* ------ Containment start ------*/
//build stage
var containment_stage = new Kinetic.Stage({
  container: 'container-containment',
  width: 650,
  height: 300
});

//add layer and objects
var containment_layer = new Kinetic.Layer();
var containment_rectbg = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: 650,
  height: 300,
  fill: '#efefef',
  stroke: '#666',
  strokeWidth: 1,
  dash: [3, 3]
});
var containment_rect1 = new Kinetic.Rect({
  x: 20,
  y: 20,
  width: 200,
  height: 100,
  fill: '#70829B',
  stroke: '#000',
  strokeWidth: 1
});
var containment_rect2 = new Kinetic.Rect({
  x: 430,
  y: 175,
  width: 100,
  height: 50,
  fill: '#E5D7C1',
  stroke: '#000',
  strokeWidth: 1,
  draggable: true
});
var containment_text1 = new Kinetic.Text({
  x: 380,
  y: 20,
  text: 'Mouse...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
var containment_text2 = new Kinetic.Text({
  x: 380,
  y: 40,
  text: 'Little box status...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
var containment_text3 = new Kinetic.Text({
  x: 380,
  y: 60,
  text: 'Containment...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});

//initialize items
containment_layer.add(containment_rectbg);
containment_layer.add(containment_rect1);
containment_layer.add(containment_rect2);
containment_layer.add(containment_text1);
containment_layer.add(containment_text2);
containment_layer.add(containment_text3);
containment_stage.add(containment_layer);

//move bg to back
containment_rectbg.setZIndex(-10);

//set vars for big box containment zone
var dropLeft = containment_rect1.getX();
var dropRight = dropLeft + containment_rect1.getWidth();
var dropTop = containment_rect1.getY();
var dropBottom = dropTop + containment_rect1.getHeight();

// *** check if little box is inside big box ***
function isInside(shape){
  var x=containment_rect2.getX();
  var y=containment_rect2.getY();
  var w=containment_rect2.getWidth();
  var h=containment_rect2.getHeight();
  return(x>=dropLeft && x+w<=dropRight && y>=dropTop && y+h<=dropBottom);
}
//show mouse coords
containment_layer.on('mousemove', function() {
  var mousePos = containment_stage.getPointerPosition();
  var x = mousePos.x;
  var y = mousePos.y;
  containment_text1.setText('Mouse coordinates: x ' + x + ', y ' + y);
  containment_layer.draw();
});

//what happens when little box is dragged
containment_rect2.on('dragmove', function() {
  if (isInside(this)) {
    containment_text3.setText('Little box is contained in big box, YES');
  } else {
    containment_text3.setText('Little box is contained in big box, NO');
  }
  containment_text2.setText('Little box is moving');
  containment_rect2.setStroke('#ccc');
  containment_layer.draw();
});

//little box stopped being dragged
containment_rect2.on('dragend', function() {
  containment_text2.setText('Little box is not moving');
  containment_rect2.setStroke('#000');
  containment_layer.draw();
});

//show little box is draggable
containment_rect2.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});
containment_rect2.on('mouseout', function() {
  document.body.style.cursor = 'default';
});
/* Containment end */

/* ------ Adjacency start ------*/
var adjacency_stage = new Kinetic.Stage({
  container: 'container-adjacency',
 width: 650,
  height: 300
});
var adjacency_layer = new Kinetic.Layer();
var adjacency_rectbg = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: 650,
  height: 300,
  fill: '#efefef',
  stroke: '#666',
  strokeWidth: 1,
  dash: [3, 3]
});
var adjacency_rect1 = new Kinetic.Rect({
  x: 20,
  y: 20,
  width: 200,
  height: 100,
  fill: '#E5E086',
  stroke: '#000',
  strokeWidth: 1
});
var adjacency_rect2 = new Kinetic.Rect({
  x: 430,
  y: 175,
  width: 100,
  height: 50,
  fill: '#E5D7C1',
  stroke: '#000',
  strokeWidth: 1,
  draggable: true
});
var adjacency_text1 = new Kinetic.Text({
  x: 380,
  y: 20,
  text: 'Mouse...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
var adjacency_text2 = new Kinetic.Text({
  x: 380,
  y: 40,
  text: 'Little box status...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
var adjacency_text3 = new Kinetic.Text({
  x: 380,
  y: 60,
  text: 'Adjacency...',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#000'
});
adjacency_layer.add(adjacency_rectbg);
adjacency_layer.add(adjacency_rect1);
adjacency_layer.add(adjacency_rect2);
adjacency_layer.add(adjacency_text1);
adjacency_layer.add(adjacency_text2);
adjacency_layer.add(adjacency_text3);
adjacency_stage.add(adjacency_layer);

//move bg to back
adjacency_rectbg.setZIndex(-10);

//show mouse coords
adjacency_layer.on('mousemove', function() {
  var mousePos = adjacency_stage.getPointerPosition();
  var x = mousePos.x;
  var y = mousePos.y;
  adjacency_text1.setText('Mouse coordinates: x ' + x + ', y ' + y);
  adjacency_layer.draw();
});

//what happens when little box is dragged
adjacency_rect2.on('dragmove', function() {
  adjacency_text2.setText('Little box is moving');
  adjacency_text3.setText('Adjacency...');
  adjacency_rect2.setStroke('#ccc');
  adjacency_layer.draw();
});

//set vars for big box edges
var bigLeft = adjacency_rect1.getX();
var bigRight = bigLeft + adjacency_rect1.getWidth();
var bigTop = adjacency_rect1.getY();
var bigBottom = bigTop + adjacency_rect1.getHeight();

//little box stopped being dragged
adjacency_rect2.on('dragend', function() {
  adjacency_text2.setText('Little box is not moving');
  
  //check if we're close, 30px or so, then spap to big box so checking adjacency is easier for user. Alternative to snapping is making user line them up exactly or setting small box coords manually from the start.
  //set vars for little box edges
  var smallLeft = adjacency_rect2.getX();
  var smallRight = smallLeft + adjacency_rect2.getWidth();
  var smallTop = adjacency_rect2.getY();
  var smallBottom = smallTop + adjacency_rect2.getHeight();
  
  if(smallLeft > bigLeft && smallRight < bigRight){
    if(smallTop > bigBottom - 30 && smallTop < bigBottom + 30) {
      adjacency_rect2.setPosition({y:bigBottom});
      adjacency_text3.setText('Rectangles are adjacent, YES');
    }
  }
  if(smallLeft > bigLeft && smallRight < bigRight){
    if(smallBottom > bigTop - 30 && smallBottom < bigTop + 30) {
      adjacency_rect2.setPosition({y:bigTop - adjacency_rect2.getHeight()});
      adjacency_text3.setText('Rectangles are adjacent, YES');
    }
  }
  if(smallTop > bigTop && smallBottom < bigBottom){
    if(smallLeft > bigRight - 30 && smallLeft < bigRight + 30) {
      adjacency_rect2.setPosition({x:bigRight});
      adjacency_text3.setText('Rectangles are adjacent, YES');
    }
  }
  if(smallTop > bigTop && smallBottom < bigBottom){
    if(smallRight > bigLeft - 30 && smallRight < bigLeft + 30) {
      adjacency_rect2.setPosition({x:bigLeft - adjacency_rect2.getWidth()});
      adjacency_text3.setText('Rectangles are adjacent, YES');
    }
  }
  
   adjacency_rect2.setStroke('#000');
   adjacency_layer.draw();
});

//show little box is draggable
adjacency_rect2.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});
adjacency_rect2.on('mouseout', function() {
  document.body.style.cursor = 'default';
});

/* Adjacency end */

/* ------ Smooth scroll start */
$(function() {
  $('[data-toggle="elementscroll"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
/* Smooth scroll end */

/* ------ Google Font start */
WebFontConfig = {
  google: { families: [ 'Raleway:800:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
/* Google Font end */
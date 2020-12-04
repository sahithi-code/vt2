//Create variables here
var dog , foodStock ,database ;
var foodS;
var fedTime,lastFed;
var feed , addFood;
var foodObj;


function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png")
  happydg = loadImage("images/dogImg1.png")
}

function setup() {

  database= firebase.database();
 

  createCanvas(800, 600);
  dog = createSprite(400,350,20,20)
  dog.addImage(dogimg);
  dog.scale=0.125

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  feed=createButton("feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFood)
  
}


function draw() {  
background(46,139,87)

  drawSprites();
  
  //add styles here

 /* if(keyDown(UP_ARROW)){
    writeStock(foodS);
   
    dog.addImage(happydg)
    }
    else(
    
      dog.addImage(dogimg)

    )

  strokeWeight(4)
  fill("yellow")
  textSize(20)
  text("Note: Press UP_ARROW Key To feed Drago Milk!",300,200)
text("Food Remaining :"+foodS,350,250)*/

  fedTime=database.ref("feedtime")
fedTime.on("value",function(data){
  lastFed = data.val()
})


fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+lastFed%12 + "PM", 350,30);
}else if (lastFed==0){
text("Last Feed : 12 AM ",350, 30)

}else{
text("Last Feed : "+ lastFed+ "AM",350,30);

}

   


}

function readStock(data){
foodS = data.val();
}



/*function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1
}  
database.ref("/").update({
  Food:x
})}*/

function feedDog(){
dog .addImage(happydg);

//foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()


})
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}







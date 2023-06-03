img="";
Status="";
objects=[];
function preload(){
    img= loadImage("dog_cat.jpg");
}

function draw(){
    image(video,0,0,380,380);

    if(Status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
           document.getElementById("status").innerHTML="Status:Object Detected";
document.getElementById('no.of_objects').innerHTML="No.of objects detected are: "+objects.length;
           fill(r,g,b);
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+"%", objects[i].x+ 15, objects[i].y+ 15);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);
        }
    }
}


function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocussd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";
}
function modelLoaded(){
    console.log("Cocussd Is Intialized");
    Status=true;
    
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
    
}
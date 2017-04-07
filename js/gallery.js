// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	mCurrentIndex;
	if(mCurrentIndex >= mImages.length){
		mCurrentIndex = 0;
	}
	
	var curImg = mImages[mCurrentIndex];
	document.getElementById("photo").src = curImg.imgPath;
	document.getElementById("location")[0].innerHTML = "Location: " + curImg.imgLocation;
	document.getElementById("description")[0].innerHTML = "Description: " + curImg.description;
	document.getElementById("date")[0].innerHTML = "Date" + curImg.date;
	
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
//var mUrl = 'insert_url_here_to_image_json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
	$
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgLocation, description, date, imgPath) {
	this.imgLocation = imgLocation;
	this.description = description;
	this.date = date;
	this.imgPath = imgPath;
}


//XMLHttpRequest
var mUrl = "images.json";
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
	// Do something interesting if file is opened successfully
	if (mRequest.readyState == 4 && mRequest.status == 200) {
		try {
			// Let’s try and see if we can parse JSON
			mJson = JSON.parse(mRequest.responseText);
			// Let’s print out the JSON; It will likely show as “obj”
			console.log(mJson);
			for(var i = 0; i < mJson.images.length; i++){
				mImages.push(new GalleryImage(mJson.images[1].imgLocation, mJson.images[i].description, mJson.images[i].date, mJson.images[i].imgPath));
				console.log(mJson.images[i].imgLocation + " " + mJson.images[i].description + " " + mJson.images[i].date + " " + mJson.images[i].imgPath);
			}
		} catch(err) {
			console.log(err.message)
		}
	}
};
mRequest.open("GET",mUrl, true);
mRequest.send();




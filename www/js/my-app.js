var myApp = new Framework7({
    material: isIos? false : true
//  template7Pages: true,
//  precompileTemplates: true,
//    swipePanel: 'left',
//    swipePanelActiveArea: '30',
//    swipeBackPage: true,
//    animateNavBackIcon: true,
//    pushState: !!Framework7.prototype.device.os,
});

var $$ = Dom7;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

mainView.router.load({ pageName: 'index'});
mainView.router.load({pageName: 'index'});

// Code for platform detection
var isMaterial = Framework7.prototype.device.ios === false;
var isIos = Framework7.prototype.device.ios === true;

// Handle Cordova Device Ready Event
$$(document).on('deviceready',onDeviceReady,false);

function onDeviceReady() {
  console.log('Device is ready!');
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    receivedEvent('deviceready');

};


function receivedEvent(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },


// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('anomalie', function (page) {
    // Do something here for "about" page
//    myApp.alert('Here comes anomali page');
})



/*

function addOrRemoveFavorite(e) {
  // save it back to localStorage
  localStorage.setItem('favorites', JSON.stringify(this.favorites));
  localStorage.setItem('favoriteIds', JSON.stringify(this.favoriteIds));
  // if we got here from the favorites page, we need to reload its context
  //  so it will update as soon as we go "back"
  if (this.fromPage === 'favorites') {
    // Reload the previous page
    mainView.router.load({
      template: myApp.templates.favorites,
      context: {
        tracks: this.favorites,
      },
      reload: true,
      reloadPrevious: true,
    });
  }
}

myApp.onPageInit('details', function(page) {
//  var previewUrl = page.context.preview_url;
  });

  // fetch the favorites
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  var favoriteIds = JSON.parse(localStorage.getItem('favoriteIds')) || [];
  // set up a context object to pass to the handler
  var pageContext = {
//    track: page.context,
//    id: page.context.id,
//    isFavorite: isFavorite,
    favorites: favorites,
    favoriteIds: favoriteIds
//    fromPage: page.fromPage.name,
  };

  // bind the playback and favorite controls
//  $$('.playback-controls a').on('click', playbackControlsClickHandler);
  $$('.link.star').on('click', addOrRemoveFavorite.bind(pageContext));

*/
function getImage() {
      navigator.camera.getPicture( function( imageURI ) {
        alert( imageURI );
      },
      function( message ) {
        alert( message );
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
/*    navigator.camera.getPicture(uploadPhoto, function(message) {
        alert('get picture failed');
        myApp.alert("get picture failed");
    }, {
        quality: 100,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
	*/
}


    takePicture: function() {
      navigator.camera.getPicture( function( imageURI ) {
        alert( imageURI );
      },
      function( message ) {
        alert( message );
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
    }


function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    myApp.alert(options.fileName);
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://do1.langheit.com/phonegap/kboom/upload.php", function(result){
        console.log(JSON.stringify(result));
    }, function(error){
        console.log(JSON.stringify(error));
    }, options);
}

/*
(function () {
    $$('#form1').submit(function(){
        var landmarkID = $(this).parent().attr('data-landmark-id');
        var postData = $(this).serialize();

        $.ajax({
            type: 'POST',
            data: postData+'&lid='+landmarkID,
            url: 'http://localhost/phonegap/kboom/save.php',
            success: function(data){
                console.log(data);
                alert('Your comment was successfully added');
            },
            error: function(){
                console.log(data);
                alert('There was an error adding your comment');
            }
        });

        return false;
    });
})();
*/
//==============================================================================================
// PICTURE
//==============================================================================================
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoFileSuccess(imageData) {
    // Get image handle
    setTimeout(function() {
        myApp.alert("onPhotoFileSuccess OK");
        console.log(JSON.stringify(imageData));
        // do your thing here!
    }, 0);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = imageData;
}
// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);
    // Get image handle
    //
    setTimeout(function() {
        myApp.alert("onPhotoURISuccess OK");
        console.log(JSON.stringify(imageData));
        // do your thing here!
    }, 0);
    var largeImage = document.getElementById('largeImage');
    // Unhide image elements
    //
    largeImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}
// A button will call this function
//
function capturePhotoWithData() {
    // Take picture using device camera and retrieve image as base64-encoded string
    setTimeout(function() {
        myApp.alert("capturePhotoWithData");
        myApp.alert("capturePhotoWithFile");
        // do your thing here!
    }, 0);
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
}
function capturePhotoWithFile() {
    myApp.alert("capturePhotoWithFile");
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    myApp.alert("getPhoto");
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
}
// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}


//==============================================================================================
//==============================================================================================

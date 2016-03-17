var jQuery = {};

jQuery.ajax = function( settings ) {
  var url, method, async, data, headers;

  var xhr = new XMLHttpRequest();

  url = settings.url ? settings.url : window.location.href;

  method = settings.method ? settings.method : "GET";

  async = settings.async ? settings.async : true;

  data = settings.data ? settings.data : {};

  headers = settings.headers ? settings.headers : {};

  if ( !settings.success ) {
    settings['success'] = function(){
      console.log("success");
    };
  }

  if ( !settings.complete ) {
    settings['complete'] = function(){
      console.log("complete");
    };
  }

  if ( !settings.error ) {
    settings['error'] = function(){
      console.log("error");
    };
  }

  xhr.addEventListener( "load", function(event){
    if (xhr.status >= 200 && xhr.status < 300) {
      settings.success( xhr.responseText, xhr.statusText, xhr );
    } else {
    	settings.error( xhr, xhr.statusText, xhr.responseText );
    }

    settings.complete( xhr, xhr.statusText );
  } );
  xhr.addEventListener( "error", function(event){
    settings.error( xhr, xhr.statusText, xhr.responseText );
    settings.complete( xhr, xhr.statusText );
  } );

  xhr.open( method, url, async );

  for( var key in headers ) {
    xhr.setRequestHeader( key, headers[key] );
  }

  var dataArr = [];
  for( var key in data ) {
    dataArr.push( key + "=" + data[key] );
  }
  var dataString = dataArr.join("&");

  if ( method === "POST") {
    xhr.send( dataString );
  } else {
    xhr.send();

  // Check state of request
  // xhr.readyState;
  //
  //
  // // Pull properties off the response
  // //   (used in a callback)
  // xhr.responseText
  // xhr.responseXML
  // xhr.status
  // xhr.statusText
  }

  return xhr;
};

jQuery.get = function(settings) {

};

jQuery.post = function(settings) {

};


var $ = jQuery;

var request1;
window.onload = function() {
  request1 = $.ajax( {
    url: 'http://jsonplaceholder.typicode.com/posts/1',
    method: "GET"
  });


};

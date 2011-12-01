app = {
  base_url: "http://minisculus.edendevelopment.co.uk/",
  build_url: function(url) {
    return app.base_url + url;
  },

  request:function(type, url, callback, payload) {
    if (type === undefined) {
      type = "GET";
    }
    
    var url  = app.build_url(url);
    $.ajax({
      type: type,
      url: url,
      data: JSON.stringify(payload, null, 2),
      async: true,
      dataType:'json',
      accept:'application/json',
      crossDomain: true,
      success:function(data) {
        callback(data);
      },
      error: function(data) {
        log("error: "+url);
        log("payload: "+JSON.stringify(payload, null, 2));

        log("status: "+data.status);
        log("text: "+data.statusText);
        log("content: "+data.responseText);

      }
    })
  }

}

log = function(str) {
  console.dir(str);
  if (typeof str === "object") {
    for (i in str) {
      document.getElementById("log").innerHTML += i+": "+str[i]+"\n";
    }
  }
  else {
      document.getElementById("log").innerHTML += str+"\n";
  }
}
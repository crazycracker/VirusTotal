var python = require("python-shell");
var path = require("path");

class ScanResponse {
  constructor(
    permalink,
    resource,
    response_code,
    scan_id,
    verbose_msg,
    sha256
  ) {
    this.permalink = permalink;
    this.resource = resource;
    this.response_code = response_code;
    this.scan_id = scan_id;
    this.verbose_msg = verbose_msg;
    this.sha256 = sha256;
  }
}

function isApiKeyValid(apiKey) {
  if (apiKey === "") {
    swal("Enter api key");
    return false;
  }
  return true;
}
function scanFile() {
  var fullPath = document.getElementById("files").value;
  var filename = fullPath.replace(/^.*[\\\/]/, "");
  var apiKey = document.getElementById("apiKey").value;
  if (!isApiKeyValid(apiKey)) {
    return;
  }
  if (filename === "") {
    swal("Please select a file!");
  } else {
    var options = {
      scriptPath: path.join(__dirname, "/engine/"),
      args: [apiKey, filename]
    };

    var output = new python("scanFile.py", options);

    output.on("message", function(message) {
      message = message.replace(/'/g, '"');
      message = JSON.parse(message);
      var scanResponse = new ScanResponse(
        message.permalink,
        message.resource,
        message.response_code,
        message.scan_id,
        message.verbose_msg,
        message.sha256
      );
      swal("Resource :" + scanResponse.resource);
      document.getElementById("fileResource").textContent =
        scanResponse.resource;
    });
  }
}

function scanUrl() {
  var fullPath = document.getElementById("urls").value;
  var apiKey = document.getElementById("apiKey").value;
  if (!isApiKeyValid(apiKey)) {
    return;
  }
  if (isURL(fullPath)) {
    var options = {
      scriptPath: path.join(__dirname, "/engine/"),
      args: [apiKey, fullPath]
    };

    var output = new python("scanUrl.py", options);

    output.on("message", function(message) {
      message = message.replace(/'/g, '"');
      message = JSON.parse(message);
      var scanResponse = new ScanResponse(
        message.permalink,
        message.resource,
        message.response_code,
        message.scan_id,
        message.verbose_msg,
        message.sha256
      );
      swal("Resource :" + scanResponse.resource);
      document.getElementById("urlResource").textContent =
        scanResponse.resource;
    });
  } else {
    swal("Please enter a url!");
  }
}
function getFileReports() {
  var resource = document.getElementById("fileResourceValue").value;
  var apiKey = document.getElementById("apiKey").value;
  if (!isApiKeyValid(apiKey)) {
    return;
  }
  if (resource === "") {
    swal("resource is empty");
  } else {
    var options = {
      scriptPath: path.join(__dirname, "/engine/"),
      args: [apiKey, resource]
    };
    var output = new python("fileReports.py", options);

    output.on("message", function(message) {
      message = message.replace(/'/g, '"');
      // message = JSON.parse(message);
      swal(message);
    });
  }
}
function getUrlReports() {
  var resource = document.getElementById("urlResourceValue").value;
  var apiKey = document.getElementById("apiKey").value;
  if (!isApiKeyValid(apiKey)) {
    return;
  }
  if (resource === "") {
    swal("resource is empty");
  } else {
    var options = {
      scriptPath: path.join(__dirname, "/engine/"),
      args: [apiKey, resource]
    };
    var output = new python("urlReports.py", options);

    output.on("message", function(message) {
      message = message.replace(/'/g, '"');
      //   message = JSON.parse(message);
      swal(message);
    });
  }
}

function isURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}

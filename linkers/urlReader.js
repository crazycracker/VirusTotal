function readBlobs(opt_startByte, opt_stopByte) {
  var url = document.getElementById("urls").value;
  if (!url.length) {
    swal("Please enter a url!");
    return;
  }

  var file = url[0];
  var start = parseInt(opt_startByte) || 0;
  var stop = parseInt(opt_stopByte) || file.size - 1;

  var reader = new FileReader();

  // If we use onloadend, we need to check the readyState.
  reader.onloadend = function(evt) {
    if (evt.target.readyState == FileReader.DONE) {
      // DONE == 2
      document.getElementById("byte_content_url").textContent =
        evt.target.result;
      document.getElementById("byte_range_url").textContent = [
        "Read bytes: ",
        start + 1,
        " - ",
        stop + 1,
        " of ",
        file.size,
        " byte file"
      ].join("");
    }
  };

  var blob = file.slice(start, stop + 1);
  reader.readAsBinaryString(blob);
}

document.querySelector(".readBytesButtonsUrl").addEventListener(
  "click",
  function(evt) {
    if (evt.target.tagName.toLowerCase() == "button") {
      var startByte = evt.target.getAttribute("data-startbyte");
      var endByte = evt.target.getAttribute("data-endbyte");
      readBlobs(startByte, endByte);
    }
  },
  false
);

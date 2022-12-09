  // Add the QR code image to the div element
  var qrCode = new Image();
  qrCode.src = "https://example.com/qr-code.png";
  document.getElementById("qr-code").appendChild(qrCode);

  // Decode the QR code image using the QR code reader library
  var qr = new QRCode();
  qr.decode(qrCode.src, function(text) {
    // Display the decoded text
    alert(text);
  });
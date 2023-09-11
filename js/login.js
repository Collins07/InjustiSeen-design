console.log(45)

// // clear input fields on page load
// window.onload = function() {
//     document.getElementById("password").value = "";
//   }

//   // clear input fields on focus

//   document.getElementById("password").addEventListener("focus", function() {
//     this.value = "";
//   });




  // gr code scanner
  var scannerIsRunning = false;

      function openQRScanner() {
        if (scannerIsRunning) {
          stopQRScanner();
        }

        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: document.querySelector("#scanner-container"),
              constraints: {
                width: 480,
                height: 320,
                facingMode: "environment", // or "user" for front camera
              },
            },
            decoder: {
              readers: ["code_128_reader", "ean_reader", "upc_reader"],
            },
          },
          function (err) {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Initialization finished. Ready to start");
            scannerIsRunning = true;
            Quagga.start();
          }
        );

        Quagga.onDetected(function (result) {
          console.log("QR Code Data:", result.codeResult.code);
        });
      }

      function stopQRScanner() {
        if (scannerIsRunning) {
          Quagga.stop();
          scannerIsRunning = false;
        }
      }
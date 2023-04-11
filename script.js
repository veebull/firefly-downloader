/**
 * Download images without watermark "Text to Image"
 */

const url = window.location.href;

// Text to Image Page
if (url.indexOf("generate/images") > -1) {
    setInterval(() => {

      //  images selector
      const buttons = document.querySelectorAll("sp-action-button[aria-label='Download']")
      
      for (let i = 0; i < buttons.length; i++) {
        // find trigger button
        const button = buttons[i].closest('overlay-trigger')
        // find src of image
        const imageSrc = button.closest("[role='figure']").querySelector("img").src

        if (
            // check if image exists
            buttons.length > 0 &&
            // check if image source has a generated image
            imageSrc.indexOf("blob:") > -1 &&
            // check if button dirty
            !button.hasAttribute("data-dirty")
        ) {

            const imageName = document.querySelector("input,textarea").value.replace(/\s+/g, '_')
            console.log(button)
            console.log(imageSrc)
            // overwrite button event to download without watermark
            button.onclick = function (e) {
                e.stopPropagation();
                downloadImage(imageSrc, `${imageName}.png`)
            }
            
            // make button dirty
            button.setAttribute("data-dirty", true)
        }
      }
    }, 500);  
}

// Text to text page
if (url.indexOf("generate/font-styles") > -1) {
    setInterval(() => {

        //  images selector
        const buttons = document.querySelectorAll("sp-action-button[aria-label='Download']")
        
        for (let i = 0; i < buttons.length; i++) {
          // find trigger button
          const button = buttons[i].closest('overlay-trigger')
  
          if (
              // check if image exists
              buttons.length > 0 &&
              // check if button dirty
              !button.hasAttribute("data-dirty")
          ) {
  
              const imageName = document.querySelector("input,textarea").value.replace(/\s+/g, '_')

              // overwrite button event to download without watermark
              button.onclick = function (e) {
                //   e.stopPropagation();
                  donwloadCanvasImage(imageName)
              }
              
              // make button dirty
              button.setAttribute("data-dirty", true)
            }
        }
      }, 500);  
}

// download image from canvas text-to-text
function donwloadCanvasImage(name, ){
// Get the canvas element
    var canvas = document.querySelector("canvas");
    const canvHeight = canvas.height
    const canvWidth = canvas.width
    // let multiplier = 1
    // while (canvWidth < 2000) {
        
    // }

    // Create a new canvas with the maximum size you want the image to be
    var maxCanvas = document.createElement("canvas");
    maxCanvas.width = canvWidth * 2; // Maximum width
    maxCanvas.height = canvHeight * 2; // Maximum height

    // Draw the original canvas onto the new canvas at the maximum size
    var context = maxCanvas.getContext("2d");
    context.drawImage(canvas, 0, 0, maxCanvas.width, maxCanvas.height);

    // Get the Blob object containing the raw image data in the new canvas
    maxCanvas.toBlob(function(blob) {
    // Create a link element with the Blob object as the href attribute
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    // Set the download attribute to specify the filename of the downloaded image
    link.download = `${name}.jpg`;

    // Add the link element to the document and click it to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    }, "image/jpg");

}

// download image function Text
function downloadImage(url, name){
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    });
}
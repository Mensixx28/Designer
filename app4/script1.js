let canvas = document.getElementById("photoCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();
let isCropping = false;
let cropStartX = 0,
  cropStartY = 0,
  cropWidth = 0,
  cropHeight = 0;

// Handle file selection
document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

img.onload = function () {
  canvas.width = img.width / 2;
  canvas.height = img.height / 2;
  drawImage();
};

// Draw the image on the canvas
function drawImage() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Apply grayscale effect
function applyGrayscale() {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  ctx.putImageData(imageData, 0, 0);
}

// Apply sepia effect
function applySepia() {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
    data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
    data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
  }

  ctx.putImageData(imageData, 0, 0);
}

// Resize image functionality
function resizeCanvas() {
  const newWidth = prompt("Enter new width (px):");
  const newHeight = prompt("Enter new height (px):");

  if (newWidth && newHeight) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = parseInt(newWidth);
    tempCanvas.height = parseInt(newHeight);

    tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    ctx.drawImage(tempCanvas, 0, 0);
  }
}

// Add text with style
function addText() {
  const text = document.getElementById("textInput").value;
  const fontStyle = document.getElementById("fontSelect").value;

  ctx.font = fontStyle;
  ctx.fillStyle = "red";
  ctx.fillText(text, 250, 50,);
}

// Add sticker functionality
function addSticker() {
  const stickerURL = document.getElementById("stickerSelect").value;
  if (stickerURL) {
    const stickerImg = new Image();
    stickerImg.src = stickerURL;

    stickerImg.onload = function () {
      ctx.drawImage(stickerImg, 100, 100, 200, 200); // Draw sticker at a fixed position
    };
  }
}

// Reset the canvas
function resetImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
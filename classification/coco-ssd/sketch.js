// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

let video; // Capturar video
let vid;
let detector;  // Objeto detector
let detections = []; // Objeto detectado

function preload() { // Cargar modelo
  // img = loadImage('dog_cat.jpg');
  detector = ml5.objectDetector('cocossd'); // Cargar modelo de detección de objetos de COCO-SSD 
}

function gotDetections(error, results) { // Detectar objetos
  if (error) { // Si hay error
    console.error(error); // Mostrar error
  }
  detections = results; // Guardar objetos detectados
  detector.detect(video, gotDetections);    // Detectar objetos (Webcam)
}

function setup() { // Inicializar
  vid = createCanvas(640, 480); // Crear canvas de 640 x 480
  // vid = createCanvas(100, 500); // Crear canvas de 640 x 480
  vid.parent('vid'); // Colocar canvas en el elemento con id 'vid'
  video = createCapture(VIDEO); // Crear captura de video (Webcam)
  video.size(640, 480); // Tamaño del video (640 x 480)
  // video.size(500, 500); // Tamaño del video (640 x 480)
  video.hide(); // Ocultar video (Webcam)
  detector.detect(video, gotDetections); // Detectar objetos (Webcam)
}

function draw() { // Dibujar objetos detectados en el video
  image(video, 0, 0); // Dibujar video en pantalla

  for (let i = 0; i < detections.length; i++) { // Dibujar objetos detectados
    let object = detections[i]; // Objeto detectado
    stroke(0, 255, 0); // Color de borde
    strokeWeight(3); // Ancho del borde
    noFill(); // Sin relleno
    rect(object.x, object.y, object.width, object.height); // Dibujar rectángulo
    noStroke();  // Sin borde
    fill(255); // Color de relleno
    textSize(24); // Tamaño de texto
    text(object.label, object.x + 10, object.y + 24); // Dibujar texto
  }
}
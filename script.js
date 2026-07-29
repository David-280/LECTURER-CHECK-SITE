// =======================
// PREVIEW (HOME PAGE)
// =======================
const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const uploadContent = document.getElementById("uploadContent");
const uploadBox = document.getElementById("uploadBox");

if (input) {
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";

      // hide icon/text
      uploadContent.style.display = "none";

      // add outline style
      uploadBox.classList.add("has-image");
    }
  });
}

// =======================
// ANALYZE BUTTON
// =======================
function analyze() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput ? fileInput.files[0] : null;

  if (!file) {
    alert("Upload an image");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    localStorage.setItem("image", e.target.result);

    localStorage.setItem("strictness", randomItem([
      "Strictness: 9/10 (No phones allowed)",
      "Strictness: 6/10 (Can be negotiated)",
      "Strictness: 10/10 (Fear this one)"
    ]));

    localStorage.setItem("marking", randomItem([
      "Marks like your enemy",
      "Fair but confusing",
      "Gives marks only to chosen ones "
    ]));

    localStorage.setItem("attendance", randomItem([
      "Miss one class = problem",
      "Attendance optional (but risky)",
      "Tracks attendance like EFCC" ,
      "No phone should dare ring" 
    ]));

    localStorage.setItem("personality", randomItem([
      "I dont care if you fail",
      "If you come late no entrance",
      "The taught you this in secondary school",
      "The Calm but Deadly"
    ]));

    window.location.href = "results.html";
  };

  reader.readAsDataURL(file);
}

// =======================
// RESULTS PAGE LOGIC
// =======================
const loadingTexts = [
  "Scanning seriousness...",
  "Detecting attendance energy...",
  "Analyzing marking behavior...",
  "Calculating stress levels..."
];

if (document.getElementById("loadingScreen")) {

  let i = 0;
  const loadingTextEl = document.getElementById("loadingText");

  const interval = setInterval(() => {
    loadingTextEl.innerText = loadingTexts[i % loadingTexts.length];
    i++;
  }, 800);

  setTimeout(() => {
    clearInterval(interval);

    // SHOW RESULT
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("resultContent").style.display = "block";

    document.getElementById("resultImage").src = localStorage.getItem("image");
    document.getElementById("strictness").innerText = localStorage.getItem("strictness");
    document.getElementById("marking").innerText = localStorage.getItem("marking");
    document.getElementById("attendance").innerText = localStorage.getItem("attendance");
    document.getElementById("personality").innerText = localStorage.getItem("personality");

  }, 3000);
}

// =======================
// RANDOM
// =======================
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// =======================
// BACK BUTTON
// =======================
function goBack() {
  window.location.href = "index.html";
}

// =======================
// SLIDESHOW
// =======================
const images = document.querySelectorAll(".carousel img");
let index = 0;

function showNextImage() {
  images.forEach(img => img.classList.remove("active"));
  if (images.length > 0) {
    images[index].classList.add("active");
    index = (index + 1) % images.length;
  }
}

if (images.length > 0) {
  showNextImage();
  setInterval(showNextImage, 3000);
}
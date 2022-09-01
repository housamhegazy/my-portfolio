// loading
let loading = document.querySelector(".loading");
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};

// open and close aside
let aside = document.querySelector(".aside");
let toggle = document.querySelector(".toggle");
let closeBtn = document.querySelector(".aside .bi-x-circle");
let theme = document.querySelector(".theme");
let gear = document.querySelector(".gear");
let colors = document.querySelectorAll(".theme .colors li");
let darkMood = document.querySelector(".theme .dark .bi-moon-fill");
let list = document.querySelectorAll(".aside .nav a");
let sections = document.querySelectorAll(
  ".main-container .main-content > .box"
);

//get theme from local storage
if (localStorage.getItem("colorTheme")) {
  let colorTheme = localStorage.getItem("colorTheme");
  document.documentElement.style.setProperty("--header-color", colorTheme);
  colors.forEach((color) => {
    if (color.dataset.color === colorTheme) {
      color.classList.add("active");
    } else {
      color.classList.remove("active");
    }
  });
}

// get dark mood from local storage
if (localStorage.getItem("darkMood")) {
  // let dark = localStorage.getItem("darkMood");
  document.documentElement.classList.add("dark");
  darkMood.classList.remove("bi-moon-fill");
  darkMood.classList.add("bi-brightness-high");
} else {
  document.documentElement.classList.remove("dark");
  darkMood.classList.remove("bi-brightness-high");
  darkMood.classList.add("bi-moon-fill");
}

// toggle btn
toggle.addEventListener("click", (e) => {
  aside.classList.toggle("active");
});
closeBtn.onclick = () => {
  aside.classList.remove("active");
};

// open and close theme
gear.addEventListener("click", (e) => {
  theme.classList.toggle("open");
});
window.onscroll = function () {
  if (theme.classList.contains("open")) {
    theme.classList.remove("open");
  }
};

// choose colors from theme
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--header-color",
      color.dataset.color
    );
    //send them to local storage
    localStorage.setItem("colorTheme", color.dataset.color);
    handleActive(colors);
    e.target.classList.add("active");
  });
});
function handleActive(items) {
  items.forEach((ele) => {
    ele.classList.remove("active");
  });
}
// choose dark mood from theme
darkMood.addEventListener("click", (e) => {
  document.documentElement.classList.toggle("dark");
});
darkMood.addEventListener("click", () => {
  if (darkMood.classList.contains("bi-moon-fill")) {
    localStorage.setItem("darkMood", "dark");
    darkMood.classList.remove("bi-moon-fill");
    darkMood.classList.add("bi-brightness-high");
  } else {
    localStorage.removeItem("darkMood");
    darkMood.classList.remove("bi-brightness-high");
    darkMood.classList.add("bi-moon-fill");
  }
});

//start progress
let progress = document.querySelector(".about-info-container .progress");
let levelEle = document.querySelectorAll(".progress .percentage .level");

window.addEventListener("scroll", () => {
  let progressTop = progress.getBoundingClientRect().top;
  let windoHight = window.innerHeight;
  let eleVisible = 5;
  let scrollHeight = window.pageYOffset;
  if (progressTop < scrollHeight + eleVisible) {
    levelEle.forEach((ele) => {
      ele.style.width = ele.dataset.progress;
    });
  } else {
    levelEle.forEach((ele) => {
      ele.style.width = "0";
    });
  }
});
//put my Age dynamic
let myAgeEle = document.querySelector("ul li .age");
let birthDate = new Date("1991-04-27").getTime();
let dateNow = new Date().getTime();
let age = Math.floor((dateNow - birthDate) / (1000 * 60 * 60 * 24 * 30 * 12));
myAgeEle.textContent = age;

// scroll functions
let AboutBoxes = document.querySelectorAll(".details-box");
let servicesBoxes = document.querySelectorAll(".services .services-boxes .box");
console.log(servicesBoxes);

window.addEventListener("scroll", () => {
  scrollBoxes(AboutBoxes, 200);
  scrollBoxes(servicesBoxes, 800);
});

function scrollBoxes(boxes, distance) {
  boxes.forEach((box) => {
    let boxTop = box.getBoundingClientRect().top;
    let boxVisible = distance;
    let scrollHeight = window.pageYOffset;
    if (boxTop < scrollHeight - boxVisible) {
      box.style.transform = "TranslateY(0)";
      box.style.opacity = 1;
    } else {
      box.style.transform = "TranslateY(200px)";
      box.style.opacity = 0;
    }
  });
}
// active menu li with scroll
window.addEventListener("scroll", () => {
  var current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });
  list.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
});

// active menu li with click
list.forEach((item) => {
  item.addEventListener("click", (e) => {
    handleActive(list);
    e.target.classList.add("active");
  });
});

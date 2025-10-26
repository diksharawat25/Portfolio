//this is for animation on scroll of TECHNICAL SKILLS
function animatedProgressBars() {
  const bars = document.querySelectorAll(".progress");

  bars.forEach((bar) => {
    //We get the position and size of the bar relative to the viewport using getBoundingClientRect().
    const rect = bar.getBoundingClientRect();

    //hum check kar rahe hain ki progress bar screen par dikh rahi hai ya nahi (visible hai ya nahi).
    /* 
        rect.top < window.innerHeight
        rect.top → progress bar ka top part screen ke top se kitna neeche hai, pixels me.
        window.innerHeight → screen (viewport) ki height — jitna part user ko visible hai.

        Iska matlab:Agar bar ka top screen ke andar aagaya hai, yaani screen se chhupa nahi hai, to true hoga.
        
        rect.bottom >= 0
        rect.bottom >= 0
        rect.bottom → progress bar ka bottom part screen ke top se kitna neeche hai.0 → screen ka bilkul top edge.
        Iska matlab::  Agar:Top part screen ke andar hai,Bottom part screen ke upar chhupa nahi hai...Toh iska matlab progress bar visible hai screen par, aur hum usko animate kar sakte hain.       
        */
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    //Ye condition check karti hai: isVisible: Kya progress bar screen par dikh rahi hai? and !bar.classList.contains('animated'): Kya us progress bar par animation pehle nahi hui?
    if (isVisible && !bar.classList.contains("animated")) {
      //We get the value written in data-progress="80%" — like 80%, 75%, etc.
      const progressValue = bar.getAttribute("data-progress");
      //Ab progress bar ki width ko progressValue ke equal kar diya jaata hai, jisse bar gradually fill ho jaata hai.
      bar.style.width = progressValue;
      //Ye line animated class add karti hai taaki ye pata rahe ki is bar ka animation already ho chuka hai.
      bar.classList.add("animated");
    }
    if (!isVisible && bar.classList.contains("animated")) {
      bar.style.width = "0";
      bar.classList.remove("animated");
    }
  });
}
window.addEventListener("load", animatedProgressBars);
window.addEventListener("scroll", animatedProgressBars);

// this is for circle of professional skills

function createDots(elem) {
  const dots = elem.getAttribute("data-dots");
  const marked = elem.getAttribute("data-percent");
  const percent = Math.floor((dots * marked) / 100);
  const rotate = 360 / dots;

  let points = "";
  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }

  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll(".points");

  // Animate with delay
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add("marked");
  }
}

// Intersection Observer
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const circles = entry.target.querySelectorAll(".circle");

        circles.forEach((circle) => {
          // Only animate if not already animated
          if (!circle.classList.contains("animated")) {
            createDots(circle);
            circle.classList.add("animated"); // Avoid repeating on scroll up/down
          }
        });

        obs.unobserve(entry.target); // Remove if you only want it to animate once
      }
    });
  },
  {
    threshold: 0.4, // Trigger when 40% of the section is visible
  }
);

// Observe the skill section
const skillSection = document.querySelector(".skill-right");
if (skillSection) {
  observer.observe(skillSection);
}

// for sidebar
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const navLinks = document.getElementById('nav-links');
menuIcon.addEventListener('click', () => {
   navLinks.classList.add('active');
   menuIcon.style.display = 'none';
   closeIcon.style.display = 'block';
});
closeIcon.addEventListener('click', () => {
   navLinks.classList.remove('active');
   menuIcon.style.display = 'block';
   closeIcon.style.display = 'none';
});
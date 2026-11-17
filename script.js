let currentSlide = 0;
const slides = document.querySelectorAll('.slider-container .slide');
const totalSlides = slides.length;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 3000);

const weddingDate = new Date("December 21, 2026 00:00:00").getTime();

const countdownFunction = setInterval(function() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("mins").innerHTML = minutes;
  document.getElementById("secs").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "Today is the Big Day!";
  }
}, 1000);

function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('play-btn');
    
    if (audio.paused) {
        audio.play().then(() => {
            btn.innerText = "⏸ Pause Music";
        }).catch(error => {
            console.log("Playback error:", error);
        });
    } else {
        audio.pause();
        btn.innerText = "▶ Play Music";
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const book = document.getElementById("weddingBook");
  const pages = Array.from(book.querySelectorAll(".page"));
  let currentPage = 0;

  pages.forEach((page, index) => {
    const front = page.querySelector(".front");
    const back = page.querySelector(".back");

    front.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentPage === index) {
        page.classList.add("flipped");
        page.style.zIndex = index + 1;

        const currVid = page.querySelector("video");
        if (currVid) currVid.pause();

        currentPage++;

        if (currentPage < pages.length) {
          const nextVid = pages[currentPage].querySelector("video");
          if (nextVid) {
            nextVid.currentTime = 0;
            nextVid.play();
          }
        } else {
          resetBook();
        }
      }
    });

    back.addEventListener("click", (e) => {
      e.stopPropagation();

      if (currentPage === index + 1) {
        if (currentPage < pages.length) {
          const currVid = pages[currentPage].querySelector("video");
          if (currVid) currVid.pause();
        }

        currentPage--;
        const targetPage = pages[currentPage];
        targetPage.classList.remove("flipped");
        targetPage.style.zIndex = pages.length - currentPage + 1;

        const targetVid = targetPage.querySelector("video");
        if (targetVid) {
          targetVid.currentTime = 0;
          targetVid.play();
        }
      }
    });
  });

  function resetBook() {
    pages.forEach((p, i) => {
      p.classList.remove("flipped");
      p.style.zIndex = pages.length - i + 1;
      const vid = p.querySelector("video");
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });
    currentPage = 0;
    const coverVid = pages[0].querySelector("video");
    if (coverVid) {
      coverVid.currentTime = 0;
      coverVid.play();
    }
  }
});

// RSVP Form Submission Handler
document.addEventListener("DOMContentLoaded", () => {
  const rsvpForm = document.getElementById("rsvpForm"); 
  
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById("name").value,  
        attendance: document.getElementById("attending").value,
        guests: document.getElementById("guests").value
      };
      
      const scriptURL = "https://script.google.com/macros/s/AKfycbzwGxc-FRFlE_FhD0FY7TEdfXnJOsyzmGhQ8UzKfyxsb3sPpt3CdqmblxdqN0AqqsHP9A/exec";
      
      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        alert("ကျေးဇူးတင်ပါတယ်! သင့်စာရင်းကို လက်ခံရရှိပါပြီ။");
        rsvpForm.reset();
      })
      .catch(error => {
        console.error("Error!", error.message);
        alert("အမှားအယွင်းရှိသွားပါသည်။ ကျေးဇူးပြု၍ ထပ်ကြိုးစားပါ။");
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
   /* INTRODUCTION SECTION */
   const introSection = document.querySelector(".introduction");
   const htmlElement = document.documentElement;
   const music = document.getElementById("music");
   const soundToggle = document.getElementById("sound-toggle");

   function removeSection(sectionName) {

      const introBtn = document.getElementById("open");

      introBtn.addEventListener("click", () => {
         sectionName.classList.remove("active");
         htmlElement.classList.remove("active");
         // Play music when the intro section is removed
         music.play().catch((error) => {
            console.warn("Autoplay failed:", error);
         });
      });
   }

   removeSection(introSection);

   function toggleSound() {
      const soundOnIcon = soundToggle.children[0];
      const soundOffIcon = soundToggle.children[1];

      soundToggle.addEventListener("click", (e) => {
         e.preventDefault();
         if (music.paused) {
            music.play().catch((error) => {
               console.warn("Autoplay failed:", error);
            });
            soundOnIcon.style.display = "none";
            soundOffIcon.style.display = "block";
         } else {
            music.pause();
            soundOnIcon.style.display = "block";
            soundOffIcon.style.display = "none";
         }
      });
   }

   function stopMusicWhileTabSwitch() {
      // Pause when user leaves the tab
      document.addEventListener("visibilitychange", () => {
         if (document.hidden) {
            music.pause();
            const soundOnIcon = soundToggle.children[0];
            const soundOffIcon = soundToggle.children[1];

            soundOnIcon.style.display = "block";
            soundOffIcon.style.display = "none";
         }
      });
   };

   stopMusicWhileTabSwitch();
   toggleSound();

   /*** WEDDING DATE SECTION ***/
   // SET YOUR WEDDING DATE HERE (YYYY-MM-DDTHH:MM:SS)
   const weddingDateDefault = new Date("2026-04-10T18:00:00").getTime();
   const weddingDateAz = new Date("2026-03-22T18:00:00").getTime();

   // Check if az page exists
   const azPage = document.getElementById("az");

   // Pick the correct wedding date
   const weddingDate = azPage ? weddingDateAz : weddingDateDefault;

   const daysEl = document.getElementById("days");
   const hoursEl = document.getElementById("hours");
   const minutesEl = document.getElementById("minutes");
   const secondsEl = document.getElementById("seconds");

   function updateCountdown() {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance <= 0) {
         daysEl.textContent = "00";
         hoursEl.textContent = "00";
         minutesEl.textContent = "00";
         secondsEl.textContent = "00";
         clearInterval(timer);
         return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
         (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
         (distance % (1000 * 60)) / 1000
      );

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
   }

   updateCountdown();
   const timer = setInterval(updateCountdown, 1000);

   /* MOTION SECTION */
   if (!window.Motion) {
      console.error("Motion is not loaded");
      return;
   }

   Motion.inView(
      ".fade",
      ({ target }) => {
         Motion.animate(
            target,
            { opacity: [0, 1], y: [40, 0] },
            {
               duration: 1,
               easing: "ease-out"
            }
         );
      },
      {
         amount: 0.3,
         once: true
      }
   );

   Motion.inView(
      ".motion-up",
      ({ target }) => {
         Motion.animate(
            target,
            { opacity: [0, 1], y: [40, 0] },
            {
               duration: 1,
               easing: "ease-out"
            }
         );
      },
      {
         amount: 0.3,
         once: true
      }
   );


   /* COUNTDOWN ANIMATION */
   Motion.inView(
      ".countdown-timer",
      () => {
         Motion.animate(
            ".time-block",
            { opacity: [0, 1], y: [20, 0] },
            {
               delay: Motion.stagger(0.15),
               duration: 0.6,
               easing: "ease-out"
            }
         );
      },
      { once: true }
   );


   /* SCALE + FADE */
   Motion.inView(
      ".gathering, .scale-fade",
      ({ target }) => {
         Motion.animate(
            target,
            { opacity: [0, 1], scale: [0.95, 1] },
            { duration: 0.8, easing: "ease-out" }
         );
      },
      { once: true }
   );

   /* BLUR ON SCROLL */
   Motion.inView(
      ".blur-on-scroll",
      ({ target }) => {
         Motion.animate(
            target,
            { opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"] },
            { duration: 0.9, easing: "ease-out" }
         );
      },
      { once: true }
   );


   /* DRESS CODE ANIMATION */
   Motion.inView(
      ".dress-code, .left-fade",
      ({ target }) => {
         Motion.animate(
            target,
            { opacity: [0, 1], x: [-40, 0] },
            { duration: 0.8 }
         );
      },
      { once: true }
   );


   /* SUBMIT FORM */
   const form = document.getElementById("guest-form");

   form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);

      if (azPage) {
         fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSdcFWvWGdsrKae_uDqJFNw3oJzeTtS-xfAuV31WWdodlSH2PA/formResponse", {
            method: "POST",
            body: data,
            mode: "no-cors",
         });
      } else {
         fetch("https://docs.google.com/forms/d/e/1FAIpQLSeOdvsMuTkubgBteVV_fT9BJI4hfabuWHsV8Rf_Ap10Kgrn8g/formResponse", {
            method: "POST",
            body: data,
            mode: "no-cors",
         });
      }

      // With no-cors we can't read the response, so we show success immediately:
      form.reset();
      alert("Спасибо! Ваш ответ отправлен.");
   });


   const iframe = document.querySelector(".map iframe");
   const fallback = document.querySelector(".map-fallback");
   if (!iframe || !fallback) return;

   fallback.style.display = "none";

   let loaded = false;
   iframe.addEventListener("load", () => {
      loaded = true;
   });

   setTimeout(() => {
      if (!loaded) fallback.style.display = "block";
   }, 2500);

});




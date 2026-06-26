
document.addEventListener("DOMContentLoaded", () => {
   /* LOADER */
   const percentEl = document.getElementById("load-percent");
   let progress = 0;
   let isLoaded = false;

   function hideLoader() {
      const loader = document.getElementById("loader");
      if (!loader) return;

      loader.style.opacity = "0";
      loader.style.visibility = "hidden";

      setTimeout(() => {
         loader.remove();
      }, 600);
   }

   function updateProgress() {
      if (progress < 90 && !isLoaded) {
         progress += Math.random() * 5; // smooth random growth
         progress = Math.min(progress, 90);
      } else if (isLoaded) {
         progress += 2; // fast finish to 100
      }

      percentEl.textContent = Math.floor(progress);

      if (progress < 100) {
         requestAnimationFrame(updateProgress);
      } else {
         percentEl.textContent = 100;
         hideLoader();
      }
   }

   window.addEventListener("load", () => {
      isLoaded = true;
   });

   updateProgress();

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
   const weddingDateDefault = new Date("2026-08-21T18:00:00").getTime();
   const weddingDateAz = new Date("2026-03-22T18:00:00").getTime();

   // Check if az page exists
   const azPage = document.getElementById("az");

   // Pick the correct wedding date
   const weddingDate = azPage ? weddingDateAz : weddingDateDefault;

   const daysEl = document.getElementById("days");
   const hoursEl = document.getElementById("hours");
   const minutesEl = document.getElementById("minutes");
   const secondsEl = document.getElementById("seconds");

   let timer = null;

   function setCountdownZeros() {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
   }

   function updateCountdown() {
      // If countdown HTML does not exist, stop safely
      if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
         if (timer) clearInterval(timer);
         return;
      }

      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance <= 0) {
         setCountdownZeros();

         if (timer) {
            clearInterval(timer);
         }

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
   timer = setInterval(updateCountdown, 1000);

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

   form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const body = new URLSearchParams(formData);

      try {
         await fetch(
            "https://docs.google.com/forms/d/1lvhwzP8fEC5D6O2y_Roa0s9ZJa5e5IfAKkdYpshe8PA/formResponse",
            {
               method: "POST",
               mode: "no-cors",
               headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
               },
               body: body.toString(),
            }
         );

         form.reset();
         alert("Спасибо! Ваш ответ отправлен.");
      } catch (err) {
         console.error("Ошибка отправки:", err);
         alert("Не удалось отправить форму.");
      }
   });
});





document.addEventListener("DOMContentLoaded", () => {
   // SET YOUR WEDDING DATE HERE (YYYY-MM-DDTHH:MM:SS)
   const weddingDate = new Date("2026-04-10T18:00:00").getTime();

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




   if (!window.Motion) {
      console.error("Motion is not loaded");
      return;
   }

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
      ".gathering",
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
      ".dress-code",
      ({ target }) => {
         Motion.animate(
            target,
            { opacity: [0, 1], x: [-40, 0] },
            { duration: 0.8 }
         );
      },
      { once: true }
   );


   /* BUTTON HOVER EFFECT */
   document.querySelector("button").addEventListener("mouseenter", () => {
      Motion.animate("button", { scale: 1.05 }, { duration: 0.2 });
   });

   document.querySelector("button").addEventListener("mouseleave", () => {
      Motion.animate("button", { scale: 1 }, { duration: 0.2 });
   });
});


/* SUBMIT FORM */
const form = document.getElementById("guest-form");

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const data = new FormData(form);

   fetch("https://docs.google.com/forms/d/e/1FAIpQLSeOdvsMuTkubgBteVV_fT9BJI4hfabuWHsV8Rf_Ap10Kgrn8g/formResponse", {
      method: "POST",
      body: data,
      mode: "no-cors",
   });

   // With no-cors we can't read the response, so we show success immediately:
   form.reset();
   alert("Спасибо! Ваш ответ отправлен.");
});

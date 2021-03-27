const navbar = document.querySelector("nav");
const showcase = document.querySelector(".showcase");
const navbarMenu = document.querySelector(".navbar-menu");

window.addEventListener("scroll", () => {
  // console.log(window.scrollY > navbar.offsetHeight);
  if (window.scrollY > navbar.offsetHeight) {
    navbar.classList.add("sticky");
    // showcase.style.top = "0";
  } else navbar.classList.remove("sticky");
});

// BURGER MENU
document.querySelector(".burger-menu").addEventListener("click", function () {
  this.classList.toggle("change");
  navbarMenu.classList.toggle("display");
  document.body.classList.toggle("overflow");
});

// visible element on scroll
const learningProcess = document.querySelector(".learning-process--row");
const facilitiesImages = document.querySelectorAll(
  ".facilities--images-box img"
);
const prices = document.querySelector(".prices--container");
const instructors = document.querySelector(".instructors");
const testimonials = document.querySelectorAll(".testimonial");
console.log(instructors);

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      console.log(entry.target);
      if (entry.isIntersecting) {
        if (entry.target === learningProcess || entry.target === prices)
          entry.target.classList.add("visible");
        if (entry.target.classList.contains("scale-down"))
          entry.target.classList.add("scale");
        if (entry.target === instructors);
        {
          document
            .querySelectorAll(".instructor--inner")
            .forEach((instructor) => {
              instructor.classList.remove("rotate");
            });
        }
      }
    });
  },
  {
    root: null,
    threshold: [0.7],
  }
);
if (window.location.pathname === "/index.html") {
  // observer on learning process
  observer.observe(learningProcess);

  // observer on images on facilities section
  facilitiesImages.forEach((image) => {
    observer.observe(image);
  });

  // observer on prices
  observer.observe(prices);
}

if (window.location.pathname === "/about.html") {
  //observer on instructors flipping cards
  observer.observe(instructors);

  //observer on testimonials
  const testimonialObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          entry.target.classList.remove("slide-left", "slide-right");
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  testimonials.forEach((testimonial) => {
    testimonialObserver.observe(testimonial);
  });
}

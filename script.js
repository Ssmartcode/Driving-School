const navbar = document.querySelector("nav");
const mainShowcase = document.querySelector(".showcase");
const smallShowcase = document.querySelector(".showcase-small");
const navbarMenu = document.querySelector(".navbar-menu");
const contactForm = document.querySelector("form");

const navbarHeight = navbar.getBoundingClientRect().height;

// scroll event to detect when nav bar is hidden completely
window.addEventListener("scroll", () => {
  let sticky = false;
  const showcase = mainShowcase || smallShowcase;
  // navbar becomes sticky
  if (window.scrollY > navbarHeight) {
    sticky = true;
  } else sticky = false;
  // navbar is not sticky
  if (sticky) {
    if (navbar.classList.contains("sticky")) return;
    navbar.classList.add("sticky");
    // add padding equal to the height of the nav bar
    showcase.style.paddingTop = navbarHeight + "px";
  } else {
    if (!navbar.classList.contains("sticky")) return;
    navbar.classList.remove("sticky");
    showcase.style.paddingTop = 0 + "px";
  }
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
const instructors = document.querySelector(".instructors--gallery");
console.log(instructors);
const testimonials = document.querySelectorAll(".testimonial");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
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
    root: document.body,
    threshold: [0.7],
  }
);
if (
  window.location.pathname.includes("/index.html") ||
  window.location.pathname === "/"
) {
  // observer on learning process
  observer.observe(learningProcess);

  // observer on images on facilities section
  facilitiesImages.forEach((image) => {
    observer.observe(image);
  });

  // observer on prices
  observer.observe(prices);
}

if (window.location.pathname.includes("/about.html")) {
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
      threshold: 0,
    }
  );

  testimonials.forEach((testimonial) => {
    testimonialObserver.observe(testimonial);
  });
}

// api calls on weather page
if (window.location.pathname.includes("/weather.html")) {
  const weatherList = document.querySelector(".weather-list");
  console.log(weatherList);
  const getWeather = async () => {
    const data = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=52.6369&lon=1.1398&exclude=minutely,hourly&units=metric&appid=0e6a3615ad151e529e9f3d7402e2767d"
    );
    const weather = await data.json();

    const { daily } = weather;

    const sevenDaysForecast = daily.map((currentDay) => {
      // Date dd-mm-yyyy
      date = new Date(currentDay.dt * 1000);
      day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      month =
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      const formatedDate = `${day}.${month}.${date.getFullYear()}`;

      // create object for each day
      const { temp, weather } = currentDay;
      return {
        date: formatedDate,
        minTemp: temp.min,
        maxTemp: temp.max,
        description: weather[0].description,
      };
    });

    sevenDaysForecast.forEach((day) =>
      weatherList.insertAdjacentHTML(
        "beforeend",
        `<div class="card">
          <div class="date">${day.date}</div>
          <div class="temperature">
            <span><strong>Min:</strong> ${day.minTemp} &#176;</span>
            <span><strong>Max:</strong> ${day.maxTemp} &#176;</span>
          </div>
          <div class="description">${day.description}</div>
        </div>`
      )
    );
  };
  getWeather();
}

// render modal
const renderModal = (header, content, footer) => {
  const modal = document.createElement("div");
  modal.classList.add("modal", "form-modal");

  // modal Inner
  const modalInner = document.createElement("div");
  modalInner.classList.add("modal-inner");
  modal.append(modalInner);

  // modal Header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  modalHeader.innerText = header;
  modalInner.append(modalHeader);

  // modal Content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.append(content);
  modalInner.append(modalContent);

  // modal Footer
  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");
  modalFooter.append(footer);
  modalInner.append(modalFooter);

  return modal;
};

// Validate the form with the following functions
const isRequired = (input, inputName) => {
  if (!input) {
    return `Your ${inputName} field shouldn't be empty`;
  }
  return false;
};

const isMinLength = (length, input, inputName) => {
  if (!(input.length >= length)) {
    return `Your ${inputName} field should be at least ${length} characters long`;
  }
  return false;
};

// Submit form handler on contact me page
if (contactForm)
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // get all the inputs from the form
    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactSubject = document.getElementById("contactSubject");
    const contactPhone = document.getElementById("contactPhone");
    const contactMessage = document.getElementById("contactMessage");

    // check if form inputs are valid
    const validation = [
      isRequired(contactName.value, "Name"),
      isRequired(contactEmail.value, "E-mail"),
      isRequired(contactPhone.value, "Phone number"),
      isRequired(contactSubject.value, "Subject"),
      isMinLength(5, contactMessage.value, "Message"),
    ];
    // if any of the functions in the validation array returned true then error has been found
    const errors = validation.filter((error) => error);
    let modal;
    // create footer for modal -- button
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerText = "Okay";
    if (errors.length) {
      // create content for modal -- show errors
      const content = document.createElement("ul");
      errors.forEach((error) => {
        const errorElement = document.createElement("li");
        errorElement.innerText = error;
        content.append(errorElement);
      });

      // render modal on screen
      modal = renderModal("Please check your inputs!", content, button);
      document.body.append(modal);
    } else {
      // create content for modal -- success message
      const content = document.createElement("h3");
      content.innerText =
        "Thank you for contacting us. We will contact you back soon!";

      // render modal on screen
      modal = renderModal("Successfuly sent!", content, button);
      document.body.append(modal);
    }

    // add event listener to modal button to close the modal
    button.addEventListener(
      "click",
      () => {
        document.body.removeChild(modal);
      },
      { once: true }
    );
  });

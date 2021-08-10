const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (
          entry.target.classList.contains("learning-process--row") ||
          entry.target.classList.contains("prices--container")
        )
          entry.target.classList.add("visible");
        if (entry.target.classList.contains("scale-down"))
          entry.target.classList.add("scale");
        if (entry.target.classList.contains("instructors--gallery"));
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

export default { observer, testimonialObserver };

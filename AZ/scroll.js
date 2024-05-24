gsap.registerPlugin(ScrollTrigger);
const sections = gsap.utils.toArray(".section");

const stInstances = [];

sections.forEach((section, index) => {
  let panel = Array.from(section.querySelectorAll(".panel"));

  let tl = gsap.timeline({
    scrollTrigger: {
      pin: true,
      scrub: 1,
      trigger: section,
      invalidateOnRefresh: true,
      end: () =>
        "+=" + (section.scrollWidth - document.documentElement.clientWidth)
    }
  });
  tl.to(
    panel,
    {
      x: () =>
        -(section.scrollWidth - document.documentElement.clientWidth) + "px",
      duration: 1,
      ease: "none"
    },
    0.05
  );
  tl.to({}, { duration: 0.1 }); // some padding at the end
  stInstances.push(tl.scrollTrigger);
});

document.querySelectorAll("[data-trigger]").forEach((item, index) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const st = stInstances[index];
    gsap.set(window, { scrollTo: { y: st.start } });
    st.animation.progress(0);
  });
});
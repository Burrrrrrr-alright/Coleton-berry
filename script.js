// Locomotive Scroll + GSAP integration
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smartphone: { smooth: true },
  tablet: { smooth: true },
});

// Sync ScrollTrigger with Locomotive
scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// Animations
gsap.from(".hero-text", {
  opacity: 0,
  y: 50,
  duration: 1.2,
  ease: "power3.out"
});

gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      scroller: "[data-scroll-container]",
      start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: i * 0.2,
    ease: "power2.out"
  });
});

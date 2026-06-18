document.addEventListener("DOMContentLoaded", () => {

  // Hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const header = document.querySelector("header");
  if (hamburger && header) {
    hamburger.addEventListener("click", () => {
      header.classList.toggle("menu-open");
    });
    header.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("menu-open");
      });
    });
  }

  const imageWrapper = document.querySelector(".image-wrapper");
  const gifVid = imageWrapper ? imageWrapper.querySelector("video") : null;
  const gifRows = document.querySelectorAll("[data-gif]");
  if (imageWrapper && gifVid && gifRows.length > 0) {
    let hideTimer;
    function showGif(src) {
      clearTimeout(hideTimer);
      gifVid.src = src;
      gifVid.load();
      gifVid.play();
      imageWrapper.classList.add("visible");
    }
    function hideGif() {
      hideTimer = setTimeout(() => imageWrapper.classList.remove("visible"), 100);
    }
    gifRows.forEach(row => {
      row.addEventListener("mouseenter", () => showGif(row.dataset.gif));
      row.addEventListener("mouseleave", hideGif);
    });
    imageWrapper.addEventListener("mouseenter", () => {
      clearTimeout(hideTimer);
      imageWrapper.classList.add("visible");
    });
    imageWrapper.addEventListener("mouseleave", hideGif);
  }

  // Lightbox
  const projectImages = document.querySelectorAll(".project-img img");
  if (projectImages.length > 0) {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    const content = lightbox.querySelector(".lightbox-content");

    projectImages.forEach((img) => {
      const wrapper = document.createElement("div");
      wrapper.className = "project-img-wrapper";
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });

    const wrappedImages = document.querySelectorAll(".project-img-wrapper img");

    function openLightbox(clickedImg) {
      content.innerHTML = "";
      const isMobile = window.innerWidth <= 800;
      const images = isMobile ? [clickedImg] : wrappedImages;
      images.forEach((img) => {
        const clone = document.createElement("img");
        clone.src = img.src;
        clone.alt = img.alt || "";
        content.appendChild(clone);
      });
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    wrappedImages.forEach((img) => {
      img.addEventListener("click", () => openLightbox(img));
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
    });
  }
});
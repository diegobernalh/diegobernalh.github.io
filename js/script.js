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

    // iframes: wrap before building the all-items list
    document.querySelectorAll(".project-img iframe").forEach(iframe => {
      const wrapper = document.createElement("div");
      wrapper.className = "project-iframe-wrapper";
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);

      const overlay = document.createElement("div");
      overlay.className = "iframe-click-overlay";
      wrapper.appendChild(overlay);
    });

    // videos: add click overlay so controls don't intercept lightbox open
    document.querySelectorAll(".project-img video").forEach(video => {
      const wrapper = document.createElement("div");
      wrapper.className = "project-video-wrapper";
      video.parentNode.insertBefore(wrapper, video);
      wrapper.appendChild(video);

      const overlay = document.createElement("div");
      overlay.className = "video-click-overlay";
      wrapper.appendChild(overlay);
    });

    function getAllItems() {
      return [...document.querySelectorAll(".project-img-wrapper img, .project-iframe-wrapper iframe, .project-video-wrapper video")];
    }

    function openLightbox(clickedEl) {
      content.innerHTML = "";
      const isMobile = window.innerWidth <= 800;
      const allItems = getAllItems();
      const clickedIndex = allItems.indexOf(clickedEl);
      const items = isMobile ? [clickedEl] : allItems;
      items.forEach(el => {
        if (el.tagName === "IFRAME") {
          const clone = document.createElement("iframe");
          clone.src = el.src;
          clone.frameBorder = "0";
          clone.scrolling = "no";
          clone.className = "lightbox-iframe";
          const rect = el.getBoundingClientRect();
          if (rect.height > 0) clone.style.aspectRatio = `${rect.width / rect.height}`;
          content.appendChild(clone);
        } else if (el.tagName === "VIDEO") {
          const screenWrap = el.closest('.screen-wrap');
          if (screenWrap) {
            const clone = screenWrap.cloneNode(true);
            const clonedVideo = clone.querySelector("video");
            if (clonedVideo) { clonedVideo.controls = true; clonedVideo.autoplay = false; }
            content.appendChild(clone);
          } else {
            const clone = document.createElement("video");
            clone.src = el.src;
            clone.controls = true;
            clone.style.width = "100%";
            content.appendChild(clone);
          }
        } else {
          const screenWrap = el.closest('.screen-wrap');
          if (screenWrap) {
            const clone = screenWrap.cloneNode(true);
            content.appendChild(clone);
          } else {
            const clone = document.createElement("img");
            clone.src = el.src;
            clone.alt = el.alt || "";
            content.appendChild(clone);
          }
        }
      });
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
      const targetIndex = isMobile ? 0 : clickedIndex;
      if (targetIndex > 0 && content.children[targetIndex]) {
        const target = content.children[targetIndex];
        requestAnimationFrame(() => requestAnimationFrame(() => {
          lightbox.scrollTop = target.offsetTop;
        }));
      }
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    wrappedImages.forEach(img => {
      img.addEventListener("click", () => openLightbox(img));
    });

    document.querySelectorAll(".iframe-click-overlay").forEach(overlay => {
      const iframe = overlay.parentElement.querySelector("iframe");
      overlay.addEventListener("click", () => openLightbox(iframe));
    });

    document.querySelectorAll(".video-click-overlay").forEach(overlay => {
      const video = overlay.parentElement.querySelector("video");
      overlay.addEventListener("click", () => openLightbox(video));
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
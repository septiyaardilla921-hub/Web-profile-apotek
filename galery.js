
/* ========================================
   GALLERY LIGHTBOX
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const galleryItems = document.querySelectorAll(".gallery-item");

    const lightbox = document.getElementById("galleryLightbox");

    const lightboxImage = document.getElementById("lightboxImage");

    const lightboxTitle = document.getElementById("lightboxTitle");

    const lightboxCounter = document.getElementById("lightboxCounter");

    const closeButton = document.getElementById("lightboxClose");

    const prevButton = document.getElementById("lightboxPrev");

    const nextButton = document.getElementById("lightboxNext");


    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage ||
        !closeButton ||
        !prevButton ||
        !nextButton
    ) return;


    const galleryData = Array.from(galleryItems).map((item) => {

        const image = item.querySelector("img");

        const title = item.querySelector(".gallery-overlay strong");

        return {
            src: image.src,
            alt: image.alt,
            title: title ? title.textContent.trim() : image.alt
        };

    });


    let currentIndex = 0;


    // OPEN LIGHTBOX
    function openLightbox(index) {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();

    }


    // UPDATE IMAGE
    function updateLightbox() {

        const item = galleryData[currentIndex];

        lightboxImage.src = item.src;

        lightboxImage.alt = item.alt;

        lightboxTitle.textContent = item.title;

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${galleryData.length}`;

    }


    // CLOSE LIGHTBOX
    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    // NEXT IMAGE
    function nextImage() {

        currentIndex =
            (currentIndex + 1) % galleryData.length;

        updateLightbox();

    }


    // PREVIOUS IMAGE
    function previousImage() {

        currentIndex =
            (currentIndex - 1 + galleryData.length) %
            galleryData.length;

        updateLightbox();

    }


    // CLICK GALLERY
    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    // BUTTON EVENTS
    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", nextImage);

    prevButton.addEventListener("click", previousImage);


    // CLICK BACKGROUND TO CLOSE
    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // KEYBOARD NAVIGATION
    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            nextImage();

        }

        if (event.key === "ArrowLeft") {

            previousImage();

        }

    });

});

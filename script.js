document.addEventListener("DOMContentLoaded", () => {
    let currentPageIndex = 0;
    const pages = document.querySelectorAll(".page");
    const totalPages = pages.length;
    
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const currentPageDisplay = document.getElementById("current-page");
    const totalPagesDisplay = document.getElementById("total-pages");
    const pageMessageDisplay = document.getElementById("page-message");
    const replayBtn = document.getElementById("replay-btn");

    const pageMessages = [
        "Aşk bahçemdeki en özel çiçek 🌻",
        "Seni sevmek için binlerce nedenim var ✨",
        "Gönlümün en zarif, en narin bahçesi 🌸",
        "Kalbimden sana en samimi satırlar 💌",
        "Seninle yazılan en güzel hikayemiz 📷",
        "Sonsuza dek seninle, iyi ki varsın Nilsu ❤️"
    ];

    totalPagesDisplay.textContent = totalPages;

    function updatePage(newIndex) {
        if (newIndex < 0 || newIndex >= totalPages) return;

        pages.forEach((page, index) => {
            page.classList.remove("active", "prev-page");
            if (index === newIndex) {
                page.classList.add("active");
            } else if (index < newIndex) {
                page.classList.add("prev-page");
            }
        });

        currentPageIndex = newIndex;
        currentPageDisplay.textContent = currentPageIndex + 1;

        pageMessageDisplay.style.opacity = 0;
        setTimeout(() => {
            pageMessageDisplay.textContent = pageMessages[currentPageIndex] || "Seni Çok Seviyorum";
            pageMessageDisplay.style.opacity = 1;
        }, 200);

        prevBtn.style.opacity = currentPageIndex === 0 ? "0.4" : "1";
        prevBtn.style.pointerEvents = currentPageIndex === 0 ? "none" : "auto";
        
        nextBtn.style.opacity = currentPageIndex === totalPages - 1 ? "0.4" : "1";
        nextBtn.style.pointerEvents = currentPageIndex === totalPages - 1 ? "none" : "auto";
    }

    prevBtn.addEventListener("click", () => updatePage(currentPageIndex - 1));
    nextBtn.addEventListener("click", () => updatePage(currentPageIndex + 1));
    if (replayBtn) {
        replayBtn.addEventListener("click", () => updatePage(0));
    }

    document.addEventListener("keydown", (e) => {
        if (photoModal && photoModal.classList.contains("active")) return;
        if (e.key === "ArrowRight") updatePage(currentPageIndex + 1);
        if (e.key === "ArrowLeft") updatePage(currentPageIndex - 1);
    });

    let touchStartX = 0;
    let touchEndX = 0;
    const pagesWrapper = document.getElementById("pages-wrapper");

    pagesWrapper.addEventListener("touchstart", (e) => {
        if (photoModal && photoModal.classList.contains("active")) return;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    pagesWrapper.addEventListener("touchend", (e) => {
        if (photoModal && photoModal.classList.contains("active")) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (swipeDistance < -50) {
            updatePage(currentPageIndex + 1);
        } else if (swipeDistance > 50) {
            updatePage(currentPageIndex - 1);
        }
    }

    updatePage(0);

    const reasonCards = document.querySelectorAll(".reason-card");
    reasonCards.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });

    const envelope = document.getElementById("love-envelope");
    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.classList.toggle("open");
        });
    }

    const garden = document.getElementById("interactive-garden");
    const flowerEmojis = ["🌻", "🌸", "🌺", "🌷", "🌹", "🌼", "💐", "🪷", "💮"];

    if (garden) {
        garden.addEventListener("click", (e) => {
            const hint = garden.querySelector(".garden-hint-flower");
            if (hint) {
                hint.remove();
            }

            const rect = garden.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const flower = document.createElement("div");
            flower.className = "spawned-flower";
            
            const randomEmoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            const randomSize = Math.floor(Math.random() * 25) + 30;
            const randomRotate = Math.floor(Math.random() * 60) - 30;

            flower.style.left = `${x}px`;
            flower.style.top = `${y}px`;
            flower.style.fontSize = `${randomSize}px`;
            flower.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
            flower.innerHTML = randomEmoji;

            garden.appendChild(flower);

            const spawnedFlowers = garden.querySelectorAll(".spawned-flower");
            if (spawnedFlowers.length > 60) {
                spawnedFlowers[0].remove();
            }
        });
    }

    const albumsData = [
        {
            title: "Unutulmaz Anlarımız ✨",
            photos: [
                { src: "images/foto1.jpeg", caption: "1 / 3: Seninle zaman durur, sadece kalbimin ritmi duyulur... 🌻" },
                { src: "images/foto2.jpeg", caption: "2 / 3: Gözlerindeki o sıcak ışıltı dünyamı aydınlatmaya yeter ✨" },
                { src: "images/foto3.jpeg", caption: "3 / 3: Yanında olmak evimde olmak gibi... Dünyanın en huzurlu yeri ❤️" }
            ]
        },
        {
            title: "Sonsuz Sevdamız ❤️",
            photos: [
                { src: "images/foto4.jpeg", caption: "1 / 3: Birlikte attığımız her adım geleceğe umut veriyor 💕" },
                { src: "images/foto5.jpeg", caption: "2 / 3: Hayatıma kattığın her kahkaha ve tebessüm paha biçilemez 🌟" },
                { src: "images/foto6.jpeg", caption: "3 / 3: Ömrümün sonuna dek elini hiç bırakmayacağım çiçeğim 🌸" }
            ]
        }
    ];

    albumsData.forEach((album) => {
        album.photos.forEach((photo) => {
            const img = new Image();
            img.src = photo.src;
        });
    });

    let activeAlbumIndex = 0;
    let activePhotoIndex = 0;

    const photoModal = document.getElementById("photo-modal");
    const modalTitle = document.getElementById("modal-album-title");
    const modalImg = document.getElementById("modal-photo-img");
    const modalCaption = document.getElementById("modal-photo-caption");
    const modalClose = document.getElementById("modal-close");
    const slidePrev = document.getElementById("slide-prev");
    const slideNext = document.getElementById("slide-next");
    const modalDotsContainer = document.getElementById("modal-dots");

    const polaroidCards = document.querySelectorAll(".polaroid-card");

    polaroidCards.forEach((card) => {
        card.addEventListener("click", () => {
            const albumIdx = parseInt(card.getAttribute("data-album")) || 0;
            openPhotoModal(albumIdx);
        });
    });

    function openPhotoModal(albumIdx) {
        activeAlbumIndex = albumIdx;
        activePhotoIndex = 0;
        const album = albumsData[activeAlbumIndex];
        if (!album) return;

        const currentPhoto = album.photos[activePhotoIndex];
        modalImg.src = currentPhoto.src;
        modalCaption.textContent = currentPhoto.caption;
        modalTitle.textContent = album.title;
        modalImg.style.opacity = 1;

        renderModalDots(album);
        photoModal.classList.add("active");
    }

    function closePhotoModal() {
        photoModal.classList.remove("active");
    }

    function renderModalDots(album) {
        if (!modalDotsContainer) return;
        modalDotsContainer.innerHTML = "";
        album.photos.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.className = `dot ${i === activePhotoIndex ? "active" : ""}`;
            dot.addEventListener("click", () => {
                if (activePhotoIndex !== i) {
                    activePhotoIndex = i;
                    changeModalPhoto();
                }
            });
            modalDotsContainer.appendChild(dot);
        });
    }

    function changeModalPhoto() {
        const album = albumsData[activeAlbumIndex];
        if (!album) return;

        const currentPhoto = album.photos[activePhotoIndex];
        
        renderModalDots(album);

        modalImg.classList.add("changing");
        setTimeout(() => {
            modalImg.src = currentPhoto.src;
            modalCaption.textContent = currentPhoto.caption;
            modalImg.classList.remove("changing");
        }, 110);
    }

    if (slidePrev) {
        slidePrev.addEventListener("click", (e) => {
            e.stopPropagation();
            const album = albumsData[activeAlbumIndex];
            if (!album) return;
            activePhotoIndex = (activePhotoIndex - 1 + album.photos.length) % album.photos.length;
            changeModalPhoto();
        });
    }

    if (slideNext) {
        slideNext.addEventListener("click", (e) => {
            e.stopPropagation();
            const album = albumsData[activeAlbumIndex];
            if (!album) return;
            activePhotoIndex = (activePhotoIndex + 1) % album.photos.length;
            changeModalPhoto();
        });
    }

    if (modalClose) {
        modalClose.addEventListener("click", closePhotoModal);
    }

    if (photoModal) {
        photoModal.addEventListener("click", (e) => {
            if (e.target === photoModal) closePhotoModal();
        });
    }

    const carouselBox = document.getElementById("modal-carousel");
    let modalTouchStart = 0;
    let modalTouchEnd = 0;

    if (carouselBox) {
        carouselBox.addEventListener("touchstart", (e) => {
            modalTouchStart = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselBox.addEventListener("touchend", (e) => {
            modalTouchEnd = e.changedTouches[0].screenX;
            const dist = modalTouchEnd - modalTouchStart;
            const album = albumsData[activeAlbumIndex];
            if (!album) return;

            if (dist < -40) {
                activePhotoIndex = (activePhotoIndex + 1) % album.photos.length;
                changeModalPhoto();
            } else if (dist > 40) {
                activePhotoIndex = (activePhotoIndex - 1 + album.photos.length) % album.photos.length;
                changeModalPhoto();
            }
        }, { passive: true });
    }

    const canvas = document.getElementById("petals-canvas");
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let petalsActive = true;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const petals = [];
    const numPetals = 28;

    class Petal {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = Math.random() * 12 + 8;
            this.speedY = Math.random() * 1.2 + 0.8;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.color = Math.random() > 0.4 ? "#FFB7C5" : "#FF6584";
        }
        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * 0.01) + this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < numPetals; i++) {
        petals.push(new Petal());
    }

    function animatePetals() {
        if (!petalsActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach((petal) => {
            petal.update();
            petal.draw();
        });
        animationFrameId = requestAnimationFrame(animatePetals);
    }
    animatePetals();

    const musicToggle = document.getElementById("music-toggle");
    const bgMusic = document.getElementById("bg-music") || new Audio("audio/music.mp3");
    bgMusic.loop = true;

    function updateMusicUI(isPlaying) {
        if (!musicToggle) return;
        const musicText = musicToggle.querySelector(".music-text");
        if (isPlaying) {
            musicToggle.classList.add("active");
            if (musicText) musicText.textContent = "Müzik Açık";
        } else {
            musicToggle.classList.remove("active");
            if (musicText) musicText.textContent = "Müzik";
        }
    }

    function playAudio() {
        bgMusic.play().then(() => {
            updateMusicUI(true);
        }).catch(() => {
            updateMusicUI(false);
        });
    }

    function pauseAudio() {
        bgMusic.pause();
        updateMusicUI(false);
    }

    function toggleMusic() {
        if (bgMusic.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }

    playAudio();

    const enableAutoplayOnInteraction = () => {
        if (bgMusic.paused) {
            playAudio();
        }
        document.removeEventListener("click", enableAutoplayOnInteraction);
        document.removeEventListener("touchstart", enableAutoplayOnInteraction);
    };

    document.addEventListener("click", enableAutoplayOnInteraction, { once: true });
    document.addEventListener("touchstart", enableAutoplayOnInteraction, { once: true });

    if (musicToggle) {
        musicToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }
});

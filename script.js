document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('languageSwitcher');
    const translatableElements = document.querySelectorAll('[data-en]');

    languageSwitcher.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;

        translatableElements.forEach(element => {
            const newValue = element.getAttribute(`data-${selectedLanguage}`);
            if (selectedLanguage === 'en') {
                // Insert the superscript for English
                element.innerHTML = newValue;
            } else {
                element.textContent = newValue;
            }
        });
    });

    // Set the default language to English
    languageSwitcher.value = 'cro';
    languageSwitcher.dispatchEvent(new Event('change'));

    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Automatically switch slides every 7 seconds
    setInterval(nextSlide, 7000);

    // Initialize the first slide
    showSlide(currentSlide);

    // Horizontal scroll for cards on mouse wheel
    const cards = document.querySelector('.cards');
    cards.addEventListener('wheel', (event) => {
        event.preventDefault();
        cards.scrollLeft += event.deltaY;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const altTexts = [
        "Soba 1", "Soba 1", "Soba 2", "Soba 2", "Dnevni boravak", 
        "Dnevni boravak", "Blagovaonica", "Blagovaonica", "Kuhinja", 
        "Kuhinja", "Kuhinja", "Kupaonica", "Kupaonica"
    ];
    const gallery = document.querySelector('.gallery');
    const showMoreButton = document.getElementById('show-more-btn');
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close')[0];
    let numImagesPerPage = window.innerWidth > 700 ? 6 : 2; // Responsive number of images per page
    let currentStartIndex = 1; // Initial start index for images
    const numTotalImages = 13; // Total number of images in your gallery

    // Function to load images
    function loadImages(startIndex, count) {
        const endIndex = Math.min(startIndex + count - 1, numTotalImages);
        for (let i = startIndex; i <= endIndex; i++) {
            const img = document.createElement('img');
            img.src = `./gallery/${i}.jpg`; // Adjust path to your images
            img.alt = altTexts[i - 1] || `Image ${i}`;
            img.addEventListener('click', function() {
                openModal(img.src, img.alt);
            });
            gallery.appendChild(img);
        }
    }

    // Function to open modal
    function openModal(src, alt) {
        modal.style.display = 'block';
        modalImg.src = src;
        captionText.innerHTML = alt;
    }

    // Close the modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Load initial set of images
    loadImages(currentStartIndex, numImagesPerPage);

    // Function to load more images
    function loadMoreImages() {
        currentStartIndex += numImagesPerPage;
        loadImages(currentStartIndex, numImagesPerPage);
        if (currentStartIndex >= numTotalImages) {
            showMoreButton.style.display = 'none'; // Hide button when all images are loaded
        }
    }

    // Event listener for "Show More" button
    showMoreButton.addEventListener('click', loadMoreImages);
});



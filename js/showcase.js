(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initLightbox();
    });

    function initLightbox() {
        var lightbox = document.getElementById('lightbox');
        var lightboxContent = document.getElementById('lightboxContent');
        var lightboxCaption = document.getElementById('lightboxCaption');
        var lightboxClose = document.getElementById('lightboxClose');
        var lightboxPrev = document.getElementById('lightboxPrev');
        var lightboxNext = document.getElementById('lightboxNext');

        if (!lightbox) return;

        var items = Array.prototype.slice.call(
            document.querySelectorAll('.cover-item, .gallery-item')
        );
        var currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            renderLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            renderLightbox();
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % items.length;
            renderLightbox();
        }

        function renderLightbox() {
            var item = items[currentIndex];
            var caption = item.getAttribute('data-caption') || '';

            var imgEl = item.querySelector('img');
            var placeholderEl = item.querySelector('.gallery-placeholder');

            lightboxContent.innerHTML = '';

            if (imgEl) {
                var imgClone = document.createElement('img');
                imgClone.src = imgEl.src;
                imgClone.alt = imgEl.alt || '';
                lightboxContent.appendChild(imgClone);
            } else if (placeholderEl) {
                var bg = window.getComputedStyle(placeholderEl).background;
                var icon = placeholderEl.querySelector('.placeholder-icon');
                var placeholderClone = document.createElement('div');
                placeholderClone.className = 'lightbox-placeholder';
                placeholderClone.style.background = bg;
                placeholderClone.textContent = icon ? icon.textContent : '';
                lightboxContent.appendChild(placeholderClone);
            }

            lightboxCaption.textContent = caption;
        }

        items.forEach(function (item, index) {
            item.addEventListener('click', function () {
                openLightbox(index);
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', showPrev);
        lightboxNext.addEventListener('click', showNext);

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrev();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        });
    }
})();

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initDropdownMenu();
        initPhotoClicks();
    });

    function initDropdownMenu() {
        var navItems = document.querySelectorAll('.nav-item.has-dropdown');

        navItems.forEach(function (item) {
            var navLink = item.querySelector('.nav-link');

            navLink.addEventListener('click', function (e) {
                if (window.innerWidth <= 600) {
                    e.preventDefault();

                    navItems.forEach(function (other) {
                        if (other !== item) {
                            other.classList.remove('open');
                        }
                    });

                    item.classList.toggle('open');
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.has-dropdown')) {
                navItems.forEach(function (item) {
                    item.classList.remove('open');
                });
            }
        });

        navItems.forEach(function (item) {
            item.addEventListener('mouseenter', function () {
                if (window.innerWidth > 600) {
                    item.classList.add('open');
                }
            });

            item.addEventListener('mouseleave', function () {
                if (window.innerWidth > 600) {
                    item.classList.remove('open');
                }
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 600) {
                navItems.forEach(function (item) {
                    item.classList.remove('open');
                });
            }
        });
    }

    function initPhotoClicks() {
        var photos = document.querySelectorAll('.member-photo');

        photos.forEach(function (photo) {
            photo.addEventListener('click', function (e) {
                var href = photo.getAttribute('href');
                if (href && href !== '#' && href !== '') {
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            });

            photo.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    photo.click();
                }
            });
        });
    }
})();

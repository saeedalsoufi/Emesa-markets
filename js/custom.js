(function($) {
    "use strict";

    // Loader
    $(window).on('load', function() {
        $('.preloader').fadeOut();
        $('#preloader').delay(550).fadeOut('slow');
        $('body').delay(450).css({
            'overflow': 'visible'
        });
    });

    // Fixed Menu
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.main-header').addClass('fixed-menu');
        } else {
            $('.main-header').removeClass('fixed-menu');
        }
    });

    // Gallery
    $('#slides-shop').superslides({
        inherit_width_from: '.cover-slides',
        inherit_height_from: '.cover-slides',
        play: 5000,
        animation: 'fade',
    });
    $(".cover-slides ul li").append("<div class='overlay-background'></div>");

    // Map Full
    $(document).ready(function() {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        $('#back-to-top').click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    });

    // Special Menu
    var Container = $('.container');
    Container.imagesLoaded(function() {
        var portfolio = $('.special-menu');
        portfolio.on('click', 'button', function() {
            $(this).addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
        var $grid = $('.special-list').isotope({
            itemSelector: '.special-grid'
        });
    });

    // BaguetteBox
    baguetteBox.run('.tz-gallery', {
        animation: 'fadeIn',
        noScrollbars: true
    });

    // Offer Box
    $('.offer-box').inewsticker({
        speed: 3000,
        effect: 'fade',
        dir: 'ltr',
        font_size: 13,
        color: '#ffffff',
        font_family: 'Montserrat, sans-serif',
        delay_after: 1000
    });

    // Tooltip
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    // Owl Carousel Instagram Feed
    $('.main-instagram').owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 2,
                nav: true
            },
            600: {
                items: 3,
                nav: true
            },
            1000: {
                items: 5,
                nav: true,
                loop: true
            }
        }
    });

    // Featured Products
    $('.featured-products-box').owlCarousel({
        loop: true,
        margin: 15,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: true
            },
            1000: {
                items: 4,
                nav: true,
                loop: true
            }
        }
    });

    // Slider Range
    $(function() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 4000,
            values: [1000, 3000],
            slide: function(event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    });

    // NiceScroll
    $(".brand-box").niceScroll({
        cursorcolor: "#9b9b9c",
    });


    // Category navigation based on URL hash
    $(document).ready(function() {
        let hash = window.location.hash;
        if (hash) {
            // Deactivate the default "All" tab
            $('#nav-all-tab').removeClass('active');
            $('#nav-all').removeClass('show active');

            // Activate the tab based on the URL hash
            $('.nav-link[href="' + hash + '"]').addClass('active');
            $(hash).addClass('show active');
        }
    });
    
function populateAllCategory() {
    console.log("Populating All Category...");

    // Clear the "All" category first
    $('#nav-all .row').empty();

    // Check if the "All" category and its row exist
    if ($('#nav-all .row').length === 0) {
        console.error("The 'All' category or its row doesn't exist.");
        return;
    }

    // Loop through each category except "All"
    $('.nav-tabs > .tab-pane:not(#nav-all)').each(function(index) {
        console.log("Checking category:", index + 1);

        // Loop through each product and clone and append one by one
        $(this).find('.products-single').each(function(productIndex) {
            console.log("Found product:", productIndex + 1, "in category:", index + 1);
            let clonedProduct = $(this).clone();
            $('#nav-all .row').append(clonedProduct);
        });
    });

    console.log("Total products in All category:", $('#nav-all .row .products-single').length);
}



    // Shop Page JS
    $(document).ready(function() {
        // Add to Cart button animation
        $('.cart').on('click', function() {
            $(this).addClass('animate');
            setTimeout(function() {
                $('.cart').removeClass('animate');
            }, 1000);
        });

        // Category navigation
        $('.nav-item').on('click', function() {
            $('.nav-item').removeClass('active');
            $(this).addClass('active');
        });
    });
    
    $(document).ready(function() {
        populateAllCategory();
    });

//Search
    document.addEventListener("DOMContentLoaded", function() {
        const searchInput = document.querySelector('.search-product2 input[type="text"]');
        const suggestionsBox = document.querySelector('.suggestions');
        const products = document.querySelectorAll('.products-single');

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            suggestionsBox.innerHTML = ''; // Clear previous suggestions

            if (searchTerm) {
                products.forEach(product => {
                    const productName = product.getAttribute('data-product-name').toLowerCase();
                    if (productName.startsWith(searchTerm)) {
                        // Create a suggestion item
                        const suggestionItem = document.createElement('div');
                        suggestionItem.classList.add('suggestion-item');
                        suggestionItem.textContent = productName;
                        suggestionsBox.appendChild(suggestionItem);

                        // Add click event to suggestion item
                        suggestionItem.addEventListener('click', function() {
                            searchInput.value = this.textContent;
                            filterProducts(searchInput.value);
                            suggestionsBox.innerHTML = ''; // Clear suggestions
                        });
                    }
                });
            }
            filterProducts(searchTerm);
        });

        function filterProducts(term) {
            products.forEach(product => {
                const productName = product.getAttribute('data-product-name').toLowerCase();
                if (!productName.startsWith(term)) {
                    product.style.display = 'none';
                } else {
                    product.style.display = 'block';
                }
            });
        }
    });


    // Quantity functionality
    function increaseQuantity(element) {
        var span = element.previousElementSibling;
        span.textContent = parseInt(span.textContent) + 1;
    }

    function decreaseQuantity(element) {
        var span = element.nextElementSibling;
        if (parseInt(span.textContent) > 1) {
            span.textContent = parseInt(span.textContent) - 1;
        }
    }

    // Call the function after a delay to ensure the page has fully loaded
    setTimeout(populateAllCategory, 2000);    

}(jQuery));

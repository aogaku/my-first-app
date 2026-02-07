// portfolio-script.js

// Smooth Scroll Animation
// Reference: https://css-tricks.com/snippet/jquery/smooth-scroll/
$(document).ready(function() {
    $('a.smooth-scroll').on('click', function(event) {
        event.preventDefault();
        var target = this.hash;
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 800);
    });
});

// Card Entrance Effects
// Reference: https://animista.net/
$(document).ready(function() {
    $('.card').each(function(index) {
        $(this).css({
            'opacity': 0,
            'transform': 'translateY(20px)'
        }).delay(300 * index).animate({
            'opacity': 1,
            'transform': 'translateY(0)'
        }, 1000);
    });
});

// Interactive Hover Behaviors
$('.card').hover(function() {
    $(this).css('transform', 'scale(1.05)');
}, function() {
    $(this).css('transform', 'scale(1)');
});

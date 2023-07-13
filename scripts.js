$(document).ready(function() {
  // Append 'Back to Top' button to body
  $('body').append('<button id="back-to-top" title="Back to Top">Top</button>');
  
  var back_to_top_button = $('#back-to-top');
  var sections = $('section');
  var nav_links = $('nav a');
  var events = $('.event');
  // Start with first event active
  events.first().addClass('active');

  $(window).scroll(function() {
    events.each(function() {
      if ($(this).offset().top <= $(window).scrollTop() + 200) {
        // Add 'active' class instead of replacing it
        $(this).addClass('active');
      }
    });
  });
  // Function to run when the event enters the viewport
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    // If the event is in the viewport, add the 'active' class
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}

// Create a new Intersection Observer instance
let observer = new IntersectionObserver(handleIntersection, {
  // Trigger when the event is 50% in the viewport
  threshold: 0.5
});

// Observe each event
document.querySelectorAll('.event').forEach(event => {
  observer.observe(event);
});

  function updateActiveLink() {
    var scrollPos = $(document).scrollTop();
    sections.each(function() {
      var top = $(this).offset().top - 100,
          bottom = top + $(this).outerHeight();
      if (scrollPos >= top && scrollPos <= bottom) {
        nav_links.removeClass('active');
        $('nav a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  }
    function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle scroll events
  function handleScrollAnimations() {
    $('.fade-in').each(function() {
      if (isElementInViewport(this)) {
        $(this).addClass('fade-in-visible');
      }
    });
  }

  // Call handleScrollAnimations() on page load
  handleScrollAnimations();

  // Call handleScrollAnimations() on scroll
  $(window).scroll(function() {
    handleScrollAnimations();
  });
  // Handle scroll events
  $(window).on('scroll', function() {
    $('.fade-in').each(function() {
      var top_of_element = $(this).offset().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window > top_of_element) {
        $(this).addClass('loaded');
      }
    });

    updateActiveLink();

    // Show 'Back to Top' button after scrolling 100px
    if ($(this).scrollTop() > 100) {
      back_to_top_button.fadeIn();
    } else {
      back_to_top_button.fadeOut();
    }
  });

  // Scroll page to top on 'Back to Top' button click
  back_to_top_button.click(function() {
    $('html, body').animate({scrollTop: 0}, 800);
    return false;
  });

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $('html, body').animate({
      'scrollTop': $target.offset().top
    }, 1000, 'swing');
  });

  // Initialize
  updateActiveLink();

  // Animate the progress bars
  function animateProgressBar() {
    $('.progress-bar').each(function() {
      var percent = $(this).data('percent');
      $(this).animate({
        'width': percent + '%'
      }, {
        duration: 3000,
        easing: 'swing' // This will make the animation start faster
      });
    });
  }
 // On mouse hover, profile picture rotates 360 degrees
 $('.profile-picture').on('mouseenter', function() {
  $(this).css({
    'transition': 'transform 2s',
    'transform': 'rotate(360deg)'
  });
});

// On mouse out, profile picture rotates back to original position
$('.profile-picture').on('mouseleave', function() {
  $(this).css({
    'transition': 'transform 2s', // Transition back at twice the speed
    'transform': 'rotate(0deg)'
  });
});
  

  // Start the animation
  animateProgressBar();
});
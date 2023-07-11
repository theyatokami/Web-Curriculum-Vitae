$(document).ready(function() {
  // Append 'Back to Top' button to body
  $('body').append('<button id="back-to-top" title="Back to Top">Top</button>');
  
  var back_to_top_button = $('#back-to-top');
  var sections = $('section');
  var nav_links = $('nav a');

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

  // Handle navigation link clicks
  $('nav a').click(function(event) {
    event.preventDefault();
    var target = $($.attr(this, 'href'));
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 800);
    return false;
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
    // Call animateProgressBar function when 'Skills' section comes into view
    $(window).scroll(function() {
      var skillsTopOffset = $('#skills').offset().top;
      var skillsTop = skillsTopOffset - $(window).height();
      if ($(window).scrollTop() > skillsTop) {
        animateProgressBar();
      }
    });
  

  // Start the animation
  animateProgressBar();
});

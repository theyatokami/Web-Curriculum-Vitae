$(document).ready(function() {
  var back_to_top_button = $('#back-to-top');
  var sections = $('section');
  var nav_links = $('nav a');

  // Dark mode toggle
  $('#dark-mode-toggle').click(function() {
    $('body').toggleClass('dark-mode');
    $('header').toggleClass('dark-mode');
    $('nav a').toggleClass('dark-mode');
    $('.intro').toggleClass('dark-mode');
    $('.timeline-content').toggleClass('dark-mode');
    $('.skill-category').toggleClass('dark-mode');
    $('.education-card').toggleClass('dark-mode');
    $('.project-card').toggleClass('dark-mode');
    $('.contact').toggleClass('dark-mode');
    $('#back-to-top').toggleClass('dark-mode');
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

  function handleScrollAnimations() {
    $('.fade-in').each(function() {
      if (isElementInViewport(this)) {
        $(this).addClass('fade-in-visible');
      }
    });

  }

  handleScrollAnimations();

  $(window).scroll(function() {
    handleScrollAnimations();
    updateActiveLink();

    if ($(this).scrollTop() > 100) {
      back_to_top_button.fadeIn();
    } else {
      back_to_top_button.fadeOut();
    }
  });

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

  updateActiveLink();

  $('.profile-picture').on('mouseenter', function() {
    $(this).css({
      'transition': 'transform 2s',
      'transform': 'rotate(360deg)'
    });
  });

  $('.profile-picture').on('mouseleave', function() {
    $(this).css({
      'transition': 'transform 2s',
      'transform': 'rotate(0deg)'
    });
  });

  $('.project-card').on('mouseenter', function() {
    $(this).css({
      'transition': 'transform 0.3s',
      'transform': 'scale(1.05)'
    });
  });

  $('.project-card').on('mouseleave', function() {
    $(this).css({
      'transition': 'transform 0.3s',
      'transform': 'scale(1.0)'
    });
  });

});

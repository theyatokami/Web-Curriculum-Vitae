$(document).ready(function() {
  var back_to_top_button = $('#back-to-top');
  var sections = $('section');
  var nav_links = $('nav a');


  var typedPhrases = ['Engineering Student', 'Robotics Enthusiast', 'Problem Solver'];
  var typedIndex = 0;
  var charIndex = 0;

  function typeText() {
    if (typedIndex >= typedPhrases.length) typedIndex = 0;
    var current = typedPhrases[typedIndex];
    var displayed = current.substring(0, charIndex++);
    $('#typed-text').text(displayed);
    if (displayed === current) {
      charIndex = 0;
      typedIndex++;
      setTimeout(typeText, 1500);
    } else {
      setTimeout(typeText, 100);
    }
  }
  typeText();


  function applyTheme(dark) {
    $('body').toggleClass('dark-mode', dark);
    $('header').toggleClass('dark-mode', dark);
    $('nav a').toggleClass('dark-mode', dark);
    $('.intro').toggleClass('dark-mode', dark);
    $('.timeline-content').toggleClass('dark-mode', dark);
    $('.skill-category').toggleClass('dark-mode', dark);
    $('.education-card').toggleClass('dark-mode', dark);
    $('.project-card').toggleClass('dark-mode', dark);
    $('.contact').toggleClass('dark-mode', dark);
    $('#back-to-top').toggleClass('dark-mode', dark);
  }

  var isDark = localStorage.getItem('theme') === 'dark';
  applyTheme(isDark);

  $('#dark-mode-toggle').click(function() {
    isDark = !isDark;
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
    var docHeight = $(document).height() - $(window).height();
    var scrolled = $(window).scrollTop();
    var width = (scrolled / docHeight) * 100;
    $('#progress-bar').css('width', width + '%');

    if ($(this).scrollTop() > 50) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }

    if ($(this).scrollTop() > 100) {
      back_to_top_button.fadeIn();
    } else {
      back_to_top_button.fadeOut();
    }
  });

  back_to_top_button.click(function() {
    $('html, body').animate({scrollTop: 0}, 400);
    return false;
  });

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $('html, body').animate({
      'scrollTop': $target.offset().top
    }, 400, 'swing');
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


  $('#load-more').on('click', function() {
    $('.extra-project.hidden').slice(0, 2).removeClass('hidden').hide().fadeIn();
    if ($('.extra-project.hidden').length === 0) {
      $(this).hide();
    }
  });

  $('.project-card').on('click', function() {
    var title = $(this).find('h3').text();
    var desc = $(this).find('p').first().text();
    var link = $(this).find('a').attr('href');
    $('#modal-title').text(title);
    $('#modal-desc').text(desc);
    $('#modal-link').attr('href', link);
    $('#project-modal').fadeIn();
  });

  $('.modal .close').on('click', function() {
    $('#project-modal').fadeOut();
  });

  $(window).on('click', function(e) {
    if ($(e.target).is('#project-modal')) {
      $('#project-modal').fadeOut();
    }
  });


  var skillsAnimated = false;
  function animateSkillBars() {
    if (skillsAnimated) return;
    if ($('#skills').offset().top <= $(window).scrollTop() + $(window).height() - 100) {
      $('.skill-level').addClass('animate');
      skillsAnimated = true;
    }
  }

  animateSkillBars();
  $(window).on('scroll', animateSkillBars);

  $('.filter-btn').on('click', function() {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    if (filter === 'all') {
      $('.project-card').show();
    } else {
      $('.project-card').hide();
      $('.project-card[data-category="' + filter + '"]').show();
    }
  });

  // Testimonials slider
  var testimonials = $('.testimonial');
  var testimonialIndex = 0;

  function showTestimonial(i) {
    testimonials.removeClass('active');
    testimonials.eq(i).addClass('active');
  }

  $('.testimonial-controls .next').on('click', function() {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  });

  $('.testimonial-controls .prev').on('click', function() {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
  });

  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    $('#form-status').text('Message sent! (demo)');
    this.reset();
  });

});

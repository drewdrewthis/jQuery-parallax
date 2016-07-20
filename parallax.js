jQuery.fn.extend({
  addParallax: function(options) {
    return $(this).each(function() {

      var $elem = $(this);
      var dir = options.direction || 'up';
      var speed = options.speed || '0.5';
      var direction = dir === 'down' ? 1 : -1;
      var topOffset = parseInt($elem.data('topOffset'));

      if ($elem.offset().top < $(window).scrollTop() + window.innerHeight ) {

        // Find how far the user has scrolled
        var scrolled = $(window).scrollTop() + window.innerHeight - $elem.offset().top;

        // Change the top of the element based on window scroll and speed. 
        // Add 1/3 window height to get top at approximately mid-screen
        return $elem.css('top', direction * scrolled * speed + topOffset + ( window.innerHeight / 3 ) + 'px');
      }

    });
  }
});

// Parallax
// ==================================== */

function activateParallaxElements() {
  
  // Set each parallax element a data attr with it's top position
  // so the parallax function knows where it started
  $('.parallax').each(function() {

    var parallax_obj = $(this);

    var options = {
      'direction': $(this).data('direction') || 'up',
      'speed': $(this).data('speed') || '0.3'
    };

    parallax_obj.css({
      'top': parallax_obj.data('top') || parallax_obj.css('top'),
      'bottom': parallax_obj.data('bottom') || parallax_obj.css('bottom'),
      'left': parallax_obj.data('left'),
      'right': parallax_obj.data('right'),
      'z-index': parallax_obj.data('z') || parallax_obj.css('z-index')
    });

    // Special Case for Lines
    if (parallax_obj.hasClass('slanted-line')) {
      parallax_obj.css('height', parallax_obj.data('height'));
    }

    if (isNaN(parseInt($(this).css('top')))) {
      parallax_obj.css('top', 0);
    }

    parallax_obj.data('topOffset', $(this).css('top'));

    // Do once before user starts to scroll
    parallax_obj.addParallax({
      'direction': options.direction,
      'speed': options.speed
    });

    $(window).scroll(function() {
      parallax_obj.addParallax({
        'direction': options.direction,
        'speed': options.speed
      });
    });
  });
}

activateParallaxElements();

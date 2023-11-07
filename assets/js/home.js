$(document).ready(function () {
  // Check scroll position and decide the visibility of buttons
  function checkScrollPosition() {
    const scrollTopPosition = $(window).scrollTop();

    if (scrollTopPosition > 20) {
      $("#toTopButton").fadeIn();
    } else {
      $("#toTopButton").fadeOut();
    }

    const lastSectionPosition =
      $("section:last").offset().top + $("section:last").outerHeight();

    if (scrollTopPosition + $(window).height() >= lastSectionPosition) {
      $("#toDownButton").fadeOut();
    } else {
      $("#toDownButton").fadeIn();
    }
  }

  // Reusable function for smooth scrolling
  function smoothScroll(targetTop) {
    $("html, body").animate({ scrollTop: targetTop }, 600);
  }

  // Smooth scrolling for anchor links
  $(document).on("click", 'a[href^="#"]', function (event) {
    event.preventDefault();
    smoothScroll($(this.hash).offset().top);
  });

  // Scroll to top functionality
  $("#toTopButton").click(() => smoothScroll(0));

  // Scroll to the next section functionality
  $("#toDownButton").click(function () {
    let currentSection, nextSection;
    $("section").each(function () {
      if ($(this).offset().top > $(window).scrollTop()) {
        currentSection = $(this);
        return false;
      }
    });

    if (currentSection && currentSection.length) {
      nextSection = currentSection.next("section");
      if (nextSection && nextSection.length) {
        smoothScroll(nextSection.offset().top);
      }
    }
  });

  // Initial check
  checkScrollPosition();

  // Event binding for scroll
  $(window).scroll(checkScrollPosition);
});

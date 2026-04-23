jQuery(function ($) {
  $(window).on("load", function () {
    $("div.loadScreen").fadeOut();
  });

  $(function () {
    // ===============================
    // Setup Menu (Mobile / Desktop)
    // ===============================
    function setupMenu() {
      const isMobile = $(window).width() <= 992;

      // reset
      $(".headerNav li i.fa-chevron-down").remove();
      $(".headerNav li > a").off("click").removeClass("current");
      $(".headerNav ul").removeAttr("style");

      $(".headerNav li").each(function () {
        const $li = $(this);
        const $link = $li.children("a");
        const $submenu = $li.children("ul");

        if (!$submenu.length) return;

        // add arrow
        $link.append('<i class="fa fa-chevron-down"></i>');

        if (isMobile) {
          $submenu.hide();

          $link.on("click", function (e) {
            e.preventDefault();

            // close siblings
            $li.siblings().removeClass("open").children("ul").slideUp(300);

            $li.siblings().children("a").removeClass("current");

            // toggle current
            $submenu.slideToggle(300);
            $li.toggleClass("open");
            $link.toggleClass("current");
          });
        } else {
          $submenu.show();
        }
      });
    }

    // ===============================
    // Set Current Menu (ACTIVE)
    // ===============================
    function setCurrentMenu() {
      let currentPage =
        window.location.pathname.split("/").pop() || "index.html";

      $(".headerNav a").each(function () {
        let href = $(this).attr("href");
        if (!href) return;

        href = href.split("/").pop().split("?")[0].split("#")[0];

        if (href === currentPage) {
          // current link
          $(this).addClass("current");

          // ALL parent menu links
          $(this)
            .parents("li")
            .addClass("current open")
            .children("a")
            .addClass("current");

          // keep parent submenus open
          $(this).parents("ul").show();
        }
      });
    }

    // ===============================
    // Mobile Menu Buttons
    // ===============================
    $("header").prepend(
      `<a href="#" class="mobileButton"><i class="fa fa-bars"></i></a>`,
    );

    $(".headerNav").prepend(
      `<a href="#" class="closeButton"><i class="fa fa-times"></i></a>`,
    );

    $(".mobileButton").on("click", function (e) {
      e.preventDefault();
      $(".headerNav").addClass("change");
    });

    $(".closeButton").on("click", function (e) {
      e.preventDefault();
      $(".headerNav").removeClass("change");
    });

    // ===============================
    // Swipe Left to Close
    // ===============================
    let startX = 0;

    $(".headerNav")
      .on("touchstart", (e) => (startX = e.originalEvent.touches[0].clientX))
      .on("touchend", (e) => {
        const endX = e.originalEvent.changedTouches[0].clientX;
        if (startX - endX > 80) {
          $(".headerNav").removeClass("change");
        }
      });

    // ===============================
    // Init
    // ===============================
    setupMenu();
    setCurrentMenu();

    $(window).on("resize", function () {
      setupMenu();
      setCurrentMenu();
    });
  });

  // =============== MENU END =================

  $(".heroBannerSlider").slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $(".reviewSlider").slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });

  // Accordion
  $(".acc_trigger:first").addClass("current").next().slideDown("fast");
  $(".acc_trigger").click(function () {
    if ($(this).next().is(":hidden")) {
      $(".acc_trigger").removeClass("current").next().slideUp("fast");

      $(this).toggleClass("current").next().slideDown("fast");
    } else {
      $(this).removeClass("current");
      $(this).next().slideUp("fast");
    }
    return false;
  });

  $(".blogPageCont li h3 a").each(function () {
    let fullText = $(this).text().trim();
    let maxLength = 35; // Text limit up to 100

    if (fullText.length > maxLength) {
      let shortText = fullText.substring(0, maxLength);
      $(this).html(shortText + "...");
    }
  });

  $(".blogPageCont li p").each(function () {
    let fullText = $(this).text().trim();
    let maxLength = 50; // Text limit up to 100

    if (fullText.length > maxLength) {
      let shortText = fullText.substring(0, maxLength);
      $(this).html(shortText + "...");
    }
  });
}); //End jQuery

// $(document).ready(function() {
//     // Replace with your actual keys from EmailJS dashboard
//     emailjs.init("IUrpbMYH7COmGGXe1");

//     $('#contactForm').on('submit', function(e) {
//         e.preventDefault();

//         var formData = {
//             name: $('input[name="name"]').val(),
//             email: $('input[name="email"]').val(),
//             message: $('textarea[name="message"]').val()
//         };

//         emailjs.send('service_qc4uzt9', 'template_t0i94vl', formData)
//             .then(function() {
//                 alert('Message sent successfully!');
//                 $('#contactForm')[0].reset();
//             }, function(error) {
//                 alert('Failed to send message.');
//             });
//     });

//     emailjs.init("IUrpbMYH7COmGGXe1");

//     $('#contactForm').on('submit', function(e) {
//         e.preventDefault();

//         var formData = {
//             name: $('input[name="name"]').val(),
//             phone: $('input[name="phone"]').val(),
//             email: $('input[name="email"]').val(),
//             message: $('textarea[name="message"]').val()
//         };

//         emailjs.send('service_qc4uzt9', 'template_2cugnip', formData)
//             .then(function() {
//                 alert('Message sent successfully!');
//                 $('#contactForm')[0].reset();
//             }, function(error) {
//                 alert('Failed to send message.');
//             });
//     });

//     // Mobile show hide social icon
//     $(function() {

//         let lastScroll = 0;
//         const $bar = $('.floatIcon, .header');

//         $(window).on('scroll', function() {

//             if ($(window).width() > 690) return; // mobile only

//             let currentScroll = $(this).scrollTop();

//             // Scroll DOWN → hide
//             if (currentScroll > lastScroll + 10) {
//                 $bar.addClass('hideBar');
//             }

//             // Scroll UP → show
//             else if (currentScroll < lastScroll) {
//                 $bar.removeClass('hideBar');
//             }

//             lastScroll = currentScroll;
//         });

//     });
// });

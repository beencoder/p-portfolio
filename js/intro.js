function imagesProgress() {
  let container = $("#progress"),
    progressText = container.find(".progress-text"),
    imgLoad = imagesLoaded("body"),
    imgTotal = imgLoad.images.length,
    imgLoaded = 0,
    imgCurrent = 0,
    progressTimer = setInterval(updateProgress, 3000 / 60);

  imgLoad.on("progress", function () {
    imgLoaded++;
  });

  function updateProgress() {
    let target = (imgLoaded / imgTotal) * 100;

    imgCurrent += (target - imgCurrent) * 0.1;
    progressText.text(Math.floor(imgCurrent) + "%");

    if (imgCurrent >= 100) {
      clearInterval(progressTimer);
      container
        .animate({ opacity: "0" }, 1500, "easeInOutQuint")
        .animate({ top: "-100%" }, 1500);

      gsap.to(".main-left h2 span", {
        opacity: 1,
        y: 0,
        duration: 3.5,
        delay: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to("#moon", { opacity: 1, y: 0, duration: 1.5, delay: 3.5 });
      gsap.to("#header", { opacity: 1, y: 0, duration: 0.8, delay: 4.5 });
    }

    if (imgCurrent > 99.9) {
      imgCurrent = 100;
    }
  }
}
imagesProgress();

//Cursor
let cursor = $(".cursor");
let curBasic = $(".cur");
let curPointer = $(".pointer");

$(".cursor img").hide();

$("body").hover(
  function () {
    curBasic.show();
  },
  function () {
    curBasic.hide();
  }
);

$("a, button, .sec2 input, .mImg, .tabBar > ul").hover(
  function () {
    curPointer.show();
    curBasic.hide();
  },
  function () {
    curPointer.hide();
    curBasic.show();
  }
);

$(document).mousemove(function (e) {
  cursor.css({ left: e.pageX + 3, top: e.pageY });
});

$(".splice").each(function () {
  let txt = $(this).text();
  let split = txt.split("").join("</span><span aria-hidden='true'>");
  split = "<span aria-hidden='true'>" + split + "</span>";
  $(this).html(split).attr("aria-label", txt);
});

//counter
function counter() {
  if ($(".skill_wrap .count").size()) {
    $c = $(".skill_wrap .count");

    $c.each(function () {
      const $this = $(this);
      $this.data("target", parseInt($this.html()));
      $this.data("counted", false);
      $this.html("0");
    });

    $(window)
      .on("scroll", function () {
        const speed = 5000;

        $c.each(function (i) {
          const $t = $(this);
          if (
            !$t.data("counted") &&
            $(window).scrollTop() + $(window).height() >= $t.offset().top
          ) {
            $t.data("counted", true);

            $t.animate(
              {
                dummy: 1,
              },
              {
                duration: speed,
                step: function (now) {
                  const $this = $(this);
                  const val = Math.round($this.data("target") * now);
                  $this.html(val);
                },
                easing: "easeInOutQuart",
              }
            );

            // easy pie
            $(".pie").easyPieChart({
              barColor: "#fff",
              trackColor: "#999",
              scaleColor: "#999",
              scaleLength: 4,
              lineWidth: 4,
              size: 180,
              lineCap: "round",
              animate: {
                duration: speed,
                enabled: true,
              },
            });
          }
        });
      })
      .triggerHandler("scroll");
  }
}
counter();

$("#section4")
  .find(".pgdn")
  .each(function () {
    $(this).mouseover(function () {
      $(this)
        .parents(".works")
        .find(".mac")
        .find(".imgBx")
        .css("background-position", "bottom");
    });
    $(this).mouseout(function () {
      $(this)
        .parents(".works")
        .find(".mac")
        .find(".imgBx")
        .css("background-position", "top");
    });
  });

// //탭 바
let tabBar = $(".tabBar > ul > li");
let contBox = $(".contBox");

contBox.hide().eq(0).show();

tabBar.click(function (e) {
  e.preventDefault();
  let target = $(this);
  let index = target.index();

  tabBar.removeClass("show");
  target.addClass("show");
  contBox.css("display", "none");
  contBox.eq(index).css({ display: "block", display: "grid" });
});

const $section7 = $("#section7");
const $section8 = $("#section8");

$(window).scroll(function () {
  const wScroll = $(this).scrollTop();

  if (wScroll > $section7.offset().top) {
    $section8.addClass("visible");
  } else {
    $section8.removeClass("visible");
  }

  const offsetLeft = wScroll - $section8.offset().top;
  if (wScroll > $section8.offset().top + 1000) {
    gsap.to($section8.find(".sec8"), { left: -offsetLeft + 1000 + "px" });
  } else {
    $section8.find(".sec8").css("left", +0 + "px");
  }
});

//each section scroll
$(window).scroll(function () {
  const scrollTop = $(window).scrollTop() + $(window).height() / 3;

  $("section").each(function () {
    if (scrollTop > $(this).offset().top) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });
  $(".arrow1").each(function () {
    if (scrollTop > $("#section8").offset().top) {
      $(this).parents("#section7").removeClass("active");
    }
  });
  $(".arrow2").each(function () {
    if (scrollTop > $("#section10").offset().top) {
      $(this).parents("#section9").removeClass("active");
    }
  });
}); //--x--each section scroll

//modal
$(".ani1 .aniBtn").click(function () {
  $("#modal").fadeIn();
  $("#modal .modal").css("display", "none");
  $("#modal .modal1").fadeIn();
});
$(".ani2 .aniBtn").click(function () {
  $("#modal").fadeIn();
  $("#modal .modal").css("display", "none");
  $("#modal .modal2").fadeIn();
});
$(".ani3 .aniBtn").click(function () {
  $("#modal").fadeIn();
  $("#modal .modal").css("display", "none");
  $("#modal .modal3").fadeIn();
});
$(".ani4 .aniBtn").click(function () {
  $("#modal").fadeIn();
  $("#modal .modal").css("display", "none");
  $("#modal .modal4").fadeIn();
});

$(".close").click(function (e) {
  e.preventDefault();
  $("#modal, .modal").fadeOut();
});

const surface = $(".surface");
const car = $(".car");
const carImg = $(".carImg");
const driveBtn = $(".driveBtn");
const lightBtn = $(".lightBtn");
let light = false;
let drive = false;

$(document).on("keypress", function (e) {
  console.log(e.which);
  if (e.which == 13 || e.which == 32) {
    surface.toggleClass("btMove");
    car.toggleClass("carMove");
  }
});

driveBtn.click(function () {
  if (!drive) {
    $(this).text("Stop");
    surface.css("animation-play-state", "paused");
    car.css("animation-play-state", "paused");
    drive = true;
  } else {
    $(this).text("Drive");
    surface.css("animation-play-state", "running");
    car.css("animation-play-state", "running");
    drive = false;
  }
});

lightBtn.click(function () {
  if (!light) {
    $(this).text("Headlight Off");
    carImg.attr("src", "images/caravan.png").css("width", "221");
    light = true;
  } else {
    $(this).text("Headlight On");
    carImg.attr("src", "images/caravan_light.png").css("width", "340");
    light = false;
  }
});

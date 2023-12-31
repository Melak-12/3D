$(document).ready(function() {
  var speed = parseInt($("#control input").val());
  var zpos,
    xpos,
    windowHeight,
    scale = 0;

  function calcPos() {
    windowHeight = $(window).height();
    zpos = -2000;
    xpos = 800;
    scale = 1;
  }

  function draw() {
    $("#wrap").css(
      "transform",
      "rotateX(50deg) translateY(" +
        zpos +
        "px) translateZ(" +
        xpos +
        "px) scale(" +
        scale +
        ")"
    );
  }

  calcPos();
  draw();

  $(window).resize(function () {
    calcPos();
    draw();
  });

  $("#control input").change(function () {
    speed = parseInt($("#control input").val());
  });

  $("#container").on("mousewheel", function (e) {
    if (e.originalEvent.wheelDelta / 120 > 0) {
      if (zpos < 10000) zpos += speed;
    } else {
      if (zpos > -5000) zpos -= speed;
    }

    draw();
    $("#counter").html(zpos);

    $("section").each(function () {
      var top = $(this).position();
      $(this).find("h2").html(top.top);
      if (top.top > (windowHeight * 4) / 10) {
        $(this).addClass("active");
      }
      if (top.top < (windowHeight * 3) / 10) {
        $(this).removeClass("active");
      }
    });

    if (zpos > 1000) {
      if ($("#header").hasClass("ready")) return;
      $("#header").addClass("hide");
      setTimeout(function () {
        $("#header").addClass("ready");
      }, 1000);
    }
  });

  $(window).on("mousewheel", function (e) {
    if ($("#header").hasClass("ready")) {
      if ($("body").scrollTop() < 10) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
          zpos = 900;
          $("#wrap").css(
            "transform",
            "rotateX(50deg) translateY(" + zpos + "px) translateZ(" + xpos + "px)"
          );
          $("#header").removeClass("hide");
          setTimeout(function () {
            $("#header").removeClass("ready");
          }, 1000);
        }
      }
    }
  });
});

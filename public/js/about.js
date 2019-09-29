
// Change the navbar color while scrolling .. 
$(document).ready(function () {
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 100)
        {
            $(".navbar").css("opacity","0.7")
        }
        else{
            $(".navbar").css("opacity","1")
        }
    })
  })
  
  $(".arr").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href")
    $("html, body").animate({
        scrollTop : ($(target).offset().top)
    },800)
  });
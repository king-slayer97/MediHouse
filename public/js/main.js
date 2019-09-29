
$(".loading-screen").fadeOut(3000);

var home = $("#page-home").offset().top;
var about = $("#about-us").offset().top;
var services = $("#services").offset().top;
var appoint = $("#why-us").offset().top;
var docs = $("#our-doctors").offset().top;
var dep = $("#department").offset().top;
var blog = $("#blog").offset().top;
var cont = $("#contact").offset().top;


navBar();

function navBar(){
    $("nav").find("a").click(function (e) { 
        console.log("here");
        e.preventDefault();
        var target = $(this).attr("href");
        console.log("here");
        if(target == "/login")
        {
            location.href = "/login"
        }
        $("html, body").animate({
            scrollTop : ($(target).offset().top)+40
        },800)
        
    });
}
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

$(window).scroll(function () {
    var arr = $(window).scrollTop();
    if( arr > home )
    {
        $(".arr-top").css("opacity","1");
    }
    else
    {
        $(".arr-top").css("opacity","0");

    }
  })


  
  $(".arrtp").click(function(){
    $("html, body").animate({
        scrollTop : ($("#page-home").offset().top)
    },800)
  });

  $(".appoint").click(function(){
      $("html, body").animate({
          scrollTop: ($("#why-us").offset().top)
      },800)
  });
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >= home && scroll < about )
        {  
            $(".sc1").css("border","1px solid #d8d8d8")    
            $(".sc2").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= about && scroll < services)
        {
            $(".sc2").css("border","1px solid #d8d8d8")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= services && scroll < appoint)
        {   
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","1px solid #d8d8d8")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= appoint && scroll < docs)
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","1px solid #d8d8d8")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= docs && scroll < dep)
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","1px solid #d8d8d8")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= dep && scroll < blog)
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","1px solid #d8d8d8")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= blog && scroll < blog+200)
        {  
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","1px solid #d8d8d8")
            $(".sc8").css("border","none")
        }
        else if (scroll >= (blog+20) )
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","1px solid #d8d8d8")
        }

    })
  







 
  $(".arr").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href")
    $("html, body").animate({
        scrollTop : ($(target).offset().top)
    },800)
  });
  

  

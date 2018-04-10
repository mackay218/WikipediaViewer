

  var startUpTl = new TimelineLite({paused: true});

  if(window.innerWidth > window.innerHeight){
    startUpTl.add(TweenLite.to("#searchInput", 0.5, {width: "50vw"}));
  }
  else if(window.innerHeight > window.innerWidth){
    startUpTl.add(TweenLite.to("#searchInput", 0.5, {width: "80vw"}));
  }

  startUpTl.add(TweenLite.from("#searchBtn", 0.5, {opacity: 0}));
  startUpTl.add(TweenLite.from(".button", 0.5, {opacity: 0}));

  window.onload = function(){ startUpTl.play();}

  var searchTl = new TimelineLite({paused: true});

  if(window.innerWidth > window.innerHeight){
    searchTl.add(TweenLite.to(".container", 0.01, {opacity: 1}));
    searchTl.add(TweenLite.to(".container", 0.1, {borderTop: "2px solid black"}));
    searchTl.add(TweenLite.to(".container", 3, {width: "90vw"}));
    searchTl.add(TweenLite.from(".container", 0.1, {border: "0"}));
    searchTl.add(TweenLite.to(".container", 0.5, {height: "45vh"}));
  }

  if(window.innerHeight > window.innerWidth){
    searchTl.add(TweenLite.to(".container", 0.01, {opacity: 1}));
    searchTl.add(TweenLite.to(".container", 0.1, {borderTop: "2px solid black"}));
    searchTl.add(TweenLite.to(".container", 3, {width: "90vw"}));
    searchTl.add(TweenLite.from(".container", 0.1, {border: "0"}));
    searchTl.add(TweenLite.to(".container", 0.5, {height: "55vh"}));
  }


  var logoTl = new TimelineLite({paused: true});

  logoTl.add(TweenLite.to("#signature", 1.6, {css:{"transform": "rotateX(180deg)"}}));
  logoTl.add(TweenLite.to("#signature", 1.6, {css:{"transform": "rotateX(360deg)"}}));


  $("#searchBtn").click(function(){
    searchTl.restart();
    logoTl.restart();
  });

  $("#searchInput").keypress(function(event){
    if(event.which == 13){
      searchTl.restart();
      logoTl.restart();
    }
  });


var linkCount = document.getElementsByClassName("pageLink");

var containerTl = new TimelineLite({paused: true});

$(window).on("orientationchange", function(){
  if(linkCount.length > 0){
    setTimeout(function(){
      if(window.innerWidth > window.innerHeight){
        containerTl.add(TweenLite.to(".container", 0.1,{height: "55vh"}));
        containerTl.add(TweenLite.to(".container", 0.1, {width: "90vw"}));

        containerTl.restart();
      }
      if(window.innerHeight > window.innerWidth){
        containerTl.add(TweenLite.to(".container", 0.1,{height: "45vh"}));
        containerTl.add(TweenLite.to(".container", 0.1, {width: "90vw"}));

        containerTl.restart();
      }
    }, 0.5);

  }
});

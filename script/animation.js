

  var startUpTl = new TimelineLite({paused: true});


  startUpTl.add(TweenLite.from("#searchInput", 2, {width: "2vw"}));
  startUpTl.add(TweenLite.from("#searchBtn", 0.5, {opacity: 0}));
  startUpTl.add(TweenLite.from(".button", 0.5, {opacity: 0}));

  window.onload = function(){ startUpTl.play();}

  var searchTl = new TimelineLite({paused: true});

  searchTl.add(TweenLite.to("#resultsContainer", 0.1, {borderTop: "2px solid black"}));
  searchTl.add(TweenLite.from("#resultsContainer", 3, {width: 0}));
  searchTl.add(TweenLite.from("#resultsContainer", 0.1, {border: "0"}));
  searchTl.add(TweenLite.from("#resultsContainer", 0.5, {height: 0}));

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

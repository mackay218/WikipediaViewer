$(document).ready(function(){

  var input = "";
  var searchString = "";
  var articles = "";

  $("#searchBtn").click(function(){

    input = document.getElementById("searchInput").value;

    input = input.replace(" ", "%20");

    searchString = "https://en.wikipedia.org/w/api.php?action=query&titles=" +
                    input + "&prop=info&format=json";

    console.log(searchString);

    articles = $.getJSON(searchString);



  });


});

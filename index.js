$(document).ready(function(){

  var input = "";
  var searchString = "";
  var articles = [];
  var responseArray = [];
  var pageTitleAppended = "";
  var i = 0;


  $("#searchBtn").click(function(){

    //get text from input form
    input = document.getElementById("searchInput").value;

    //append text to api url
    searchString = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
                    input + "&prop=info&format=json&callback=?";

    $.getJSON(searchString, function(response){

      responseArray = response.query.search;
      console.log(responseArray);
      //iterate over each response to get page title
      for(i = 0; i < responseArray.length; i++){
        //get title of page
        pageTitleAppended = (responseArray[i].title).replace(" ", "%20");

        //append title to api query of first section of page
        pageString = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
                      + pageTitleAppended + "&limit=1&format=json&callback=?";

        $.getJSON(pageString, function(result){

          var title = result[0].replace(" ", "%20");

          //get thumbnail url
          var imgUrlString = "https://en.wikipedia.org/w/api.php?action=query&titles="
                              + title + "&prop=pageimages&format=json&pithumbsize=100&callback=?"

          $.getJSON(imgUrlString, function(imageJSON){

            var image = (JSON.stringify(imageJSON.query)).split('"');
            console.log(image);
            if(image.length > 14){
              image = image[17];

              articles.push({
                       title: result[0],
                       summary: result[2][0],
                       pageURL: result[3][0],
                       imgURL: image
              });
            }
            else if(image.length <=14){
              articles.push({
                       title: result[0],
                       summary: result[2][0],
                       pageURL: result[3][0],
                       imgURL: "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg"
              });
            }

          });

        });
      }
      console.log(articles);
    });
  });
});

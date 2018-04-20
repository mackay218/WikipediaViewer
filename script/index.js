$(document).ready(function(){

  var input = "";
  var searchString = "";
  var articles = [];
  var responseArray = [];
  var pageTitleAppended = "";
  var i = 0;

  var priorArray = [];
  var priorIDs = [];

  //search if enter hit
  $("#searchInput").keypress(function(event){
    if(event.which == 13){
      $("#searchBtn").trigger("click");

    }
  });

  //search if button clicked
  $("#searchBtn").click(function(){

    $("#resultsWrapper").empty();
    $("#resultsContainer").focus();

    //get text from input form
    input = document.getElementById("searchInput").value;

    search();
    priorSearches();
  });

  function search(){

    //append text to api url
    searchString = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
                    input + "&prop=info&format=json&callback=?";

    $.getJSON(searchString, function(response){

      responseArray = response.query.search;
      //iterate over each response to get page title
      for(i = 0; i < responseArray.length; i++){
        //get title of page
        pageTitleAppended = (responseArray[i].title).replace(" ", "%20");

        //append title to api query of first section of page
        pageString = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
                      + pageTitleAppended + "&limit=1&format=json&callback=?";

        $.getJSON(pageString, function(result){
          var title = result[0];

          //check for disambiguation page
          var titleArray = title.split(" ");
          var titleEndNum = titleArray.length - 1;
          var titleEnd = titleArray[titleEndNum];

          title = title.replace(" ", "%20");

          //get thumbnail url
          var imgUrlString = "https://en.wikipedia.org/w/api.php?action=query&titles="
                              + title + "&prop=pageimages&format=json&pithumbsize=100&callback=?"

          $.getJSON(imgUrlString, function(imageJSON){

            var image = (JSON.stringify(imageJSON.query)).split('"');

            if(image.length > 14){
              image = "url("+ image[17] + ")";

              articles.push({
                       title: result[0],
                       summary: result[2][0],
                       pageURL: result[3][0],
                       imgURL: image
              });

              //create link/div of each article
              var pageLink = document.createElement("a");
              pageLink.setAttribute("href", result[3][0]);
              pageLink.setAttribute("class", "pageLink");

              $(".pageLink").attr("target", "_blank");

              var page = document.createElement("div");
              page.setAttribute("class", "page");

              var imageStyle = "background-image: " + image;

              var pic = document.createElement("div");
              pic.setAttribute("style", imageStyle);

              pic.setAttribute("class", "picImage");

              //fix title for text
              title = title.replace("%20", " ");

              var pageName = document.createElement("h3");
              pageName.textContent = title;

              var summary = document.createElement("p");
              summary.textContent = result[2][0];
              summary.setAttribute("class", "summary");

              var contentList = document.createElement("ul");
              contentList.setAttribute("class", "content")
              var listItem = document.createElement("li");
              listItem.setAttribute("class", "listItem");

              listItem.appendChild(pageName);
              listItem.appendChild(summary);
              contentList.appendChild(listItem);

              page.appendChild(pic);
              page.appendChild(contentList);
              pageLink.appendChild(page);
              var wrapper = document.getElementById("resultsWrapper");

              wrapper.appendChild(pageLink);
            }
            else if(image.length <=14){
              articles.push({
                       title: result[0],
                       summary: result[2][0],
                       pageURL: result[3][0],
                       imgURL: "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg"
              });

              image = "url( "+ "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg"
                      + ")";
              //create link/div of each article
              var pageLink = document.createElement("a");
              pageLink.setAttribute("href", result[3][0]);
              pageLink.setAttribute("class", "pageLink");

              $(".pageLink").attr("target", "_blank");

              var page = document.createElement("div");
              page.setAttribute("class", "page");

              var imageStyle = "background-image: " + image;
              page.setAttribute("style", imageStyle);

              //fix title for text
              title = title.replace("%20", " ");

              var sumText = result[2][0].split(" ");
              var sumTextEndNum = sumText.length - 1;
              var sumTextEnd = "";
              sumTextEnd = sumText[sumTextEndNum - 2] + " " +
                           sumText[sumTextEndNum - 1] + " " +
                           sumText[sumTextEndNum];

              //disambiguation pages - larger title no summary
              if(titleEnd == "(disambiguation)" || sumTextEnd == "may refer to:"){
                var summary = document.createElement("p");
                summary.textContent = title;
                summary.setAttribute("class", "disambiguation");


                var contentList = document.createElement("ul");
                contentList.setAttribute("class", "content2")
                var listItem = document.createElement("li");
                listItem.setAttribute("class", "listItem");

                listItem.appendChild(summary);
                contentList.appendChild(listItem);

                page.appendChild(contentList);
              }

              //normal pages
              else{
                var pageName = document.createElement("h3");
                pageName.textContent = title;

                var summary = document.createElement("p");
                summary.setAttribute("class", "summary");
                sumTextEnd = sumText[sumTextEndNum];
                if(sumTextEnd == "include:"){
                  sumText = result[2][0].split(". ");
                  summary.textContent = sumText[0];
                }
                else{
                  summary.textContent = result[2][0];
                }

                var contentList = document.createElement("ul");
                contentList.setAttribute("class", "content2")
                var listItem = document.createElement("li");
                listItem.setAttribute("class", "listItem");

                listItem.appendChild(pageName);
                listItem.appendChild(summary);
                contentList.appendChild(listItem);

                page.appendChild(contentList);
              }

              pageLink.appendChild(page);
              var wrapper = document.getElementById("resultsWrapper");

              wrapper.appendChild(pageLink);
            }

          });

        });
      }

    });

  }

  function priorSearches(){
    //create array of prior searches
    //check if array already contains search
    if(priorArray.includes(input) == false){
      priorArray.push(input);
    }

    var priorSearches = document.getElementById("priorSearches");
    var priorList = document.getElementsByClassName("prior");
    for(i = 0; i < priorList.length; i++){
      if(priorIDs.includes(priorList[i].id) == false){
        priorIDs.push(priorList[i].id);
      }
    }

    if(priorIDs.length < 3){
      for(i = 0; i < priorArray.length - 1; i++){
        if(priorIDs.includes(priorArray[i]) == false){

          var prior = document.createElement("div");
          var name = priorArray[i];

          prior.setAttribute("class", "prior");
          prior.setAttribute("id", name);

          var priorName = document.createElement("div");
          priorName.setAttribute("class", "priorName");
          priorName.textContent = name;

          var removeBtn = document.createElement("div");
          removeBtn.setAttribute("class", "removeBtn");

          var x = document.createElement("span");
          x.setAttribute("class", "fas fa-plus x");
          removeBtn.appendChild(x);

          prior.appendChild(priorName);
          prior.appendChild(removeBtn);

          priorSearches.appendChild(prior);
        }
      }
      console.log(priorArray,1, priorIDs, 2);
    }

    else if(priorIDs.length == 3 && priorIDs.includes(input) == false){

      //remove oldest search item
      var name = priorIDs[0];
      var toRemove = document.getElementById(name)
      toRemove.remove();

      for(i = 0; i < priorArray.length; i++){
        if(priorArray[i] == name){
          var num = i;
          priorArray.splice(num, 1);
        }
      }
      for(i = 0; i < priorIDs.length; i++){
        if(priorIDs[i] == name){
          var num = i;
          priorIDs.splice(num, 1);
        }
      }

      for(i = 0; i < priorArray.length - 1; i++){
        if(priorIDs.includes(priorArray[i]) == false){

          var prior = document.createElement("div");
          var name = priorArray[i];

          prior.setAttribute("class", "prior");
          prior.setAttribute("id", name);

          var priorName = document.createElement("div");
          priorName.setAttribute("class", "priorName");
          priorName.textContent = name;

          var removeBtn = document.createElement("div");
          removeBtn.setAttribute("class", "removeBtn");

          var x = document.createElement("span");
          x.setAttribute("class", "fas fa-plus x");
          removeBtn.appendChild(x);

          prior.appendChild(priorName);
          prior.appendChild(removeBtn);

          priorSearches.appendChild(prior);
        }
      }
      console.log(priorArray,1, priorIDs, 2);
    }

  }

  $(window).on("orientationchange", function(event){
    if(window.innerWidth > window.innerHeight){
      setTimeout($("#searchInput").attr("style", "width: 50vw"), 200);

    }
    else if(window.innerHeight > window.innerWidth){
      setTimeout($("#searchInput").attr("style", "width: 80vw"), 200);
    }
  });

  /******remove from previous searches function*****/
  $(document).on("click", "div.removeBtn", function(){
    var name = this.parentNode.id;

    var toRemove = document.getElementById(name);
    toRemove.remove();

    for(i = 0; i < priorArray.length; i++){
      if(priorArray[i] == name){
        var num = i;
        priorArray.splice(num, 1);
      }
    }
    for(i = 0; i < priorIDs.length; i++){
      if(priorIDs[i] == name){
        var num = i;
        priorIDs.splice(num, 1);
      }
    }
    console.log(priorArray,3, priorIDs, 4);
  });

  /********search for previous search term function*****/
  $(document).on("click", "div.priorName", function(){
    input = this.textContent;

    document.getElementById("searchInput").value = input;

    $("#searchBtn").trigger("click");

    var priorSearches = document.getElementById("priorSearches");
    var priorList = document.getElementsByClassName("prior");
    for(i = 0; i < priorList.length; i++){
      if(priorIDs.includes(priorList[i].id) == false){
        priorIDs.push(priorList[i].id);
      }
    }

    if(priorIDs.length < 3){
      for(i = 0; i < priorArray.length; i++){
        if(priorIDs.includes(priorArray[i]) == false){

          var prior = document.createElement("div");
          var name = priorArray[i];

          prior.setAttribute("class", "prior");
          prior.setAttribute("id", name);

          var priorName = document.createElement("div");
          priorName.setAttribute("class", "priorName");
          priorName.textContent = name;

          var removeBtn = document.createElement("div");
          removeBtn.setAttribute("class", "removeBtn");

          var x = document.createElement("span");
          x.setAttribute("class", "fas fa-plus x");
          removeBtn.appendChild(x);

          prior.appendChild(priorName);
          prior.appendChild(removeBtn);

          priorSearches.appendChild(prior);
        }
      }
      console.log(priorArray,1, priorIDs, 2);
    }

    else if(priorIDs.length == 3 && priorIDs.includes(input) == false){

      //remove oldest search item
      var name = priorIDs[0];
      var toRemove = document.getElementById(name)
      toRemove.remove();

      for(i = 0; i < priorArray.length; i++){
        if(priorArray[i] == name){
          var num = i;
          priorArray.splice(num, 1);
        }
      }
      for(i = 0; i < priorIDs.length; i++){
        if(priorIDs[i] == name){
          var num = i;
          priorIDs.splice(num, 1);
        }
      }

      for(i = 0; i < priorArray.length; i++){
        if(priorIDs.includes(priorArray[i]) == false){

          var prior = document.createElement("div");
          var name = priorArray[i];

          prior.setAttribute("class", "prior");
          prior.setAttribute("id", name);

          var priorName = document.createElement("div");
          priorName.setAttribute("class", "priorName");
          priorName.textContent = name;

          var removeBtn = document.createElement("div");
          removeBtn.setAttribute("class", "removeBtn");

          var x = document.createElement("span");
          x.setAttribute("class", "fas fa-plus x");
          removeBtn.appendChild(x);

          prior.appendChild(priorName);
          prior.appendChild(removeBtn);

          priorSearches.appendChild(prior);
        }
      }
      console.log(priorArray,1, priorIDs, 2);
    }

  });


});

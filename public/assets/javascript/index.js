// Grab the articles as a json
$.getJSON("/headlines", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#scrapedarticles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  $.getJSON("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#scrapedarticles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });

  // Whenever someone clicks the leave-note button
  $(document).on("click", ".leave-note", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/headlines/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
         console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  //When you click the save button
  $(document).on("click", ".save", function() {
    console.log('Client-side code running');
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to save the value of saved from false to true.
    $.ajax({
      method: "POST",
      url: "/saveheadlines/" + thisId
      // data: {
      //   // change value of saved to true
      //   saved: true,
      // }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log("Client-side code finished running");
        // res.redirect("/headlines");
        // $("#results-modal").modal("toggle");
      });

  // });
    }); 

    //When you click the remove-fav button
  $(document).on("click", ".remove-fav", function() {
    console.log('Client-side code running');
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to save the value of saved from false to true.
    $.ajax({
      method: "POST",
      url: "/unsaveheadlines/" + thisId
      // data: {
      //   // change value of saved to true
      //   saved: true,
      // }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log("Client-side code finished running");
        // res.redirect("/headlines");
        // $("#results-modal").modal("toggle");
      });

  // });
    }); 
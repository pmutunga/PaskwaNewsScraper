// Grab the articles as a json
$.getJSON("/headlines", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#scrapedarticles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

$.getJSON("/saved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#scrapedarticles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

//When you click the save button
$(document).on("click", ".save", function() {
  console.log("Client-side code running");
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
      $(".save").addClass(".hide");
    });

  // });
});

//When you click the remove-fav button
$(document).on("click", ".remove-fav", function() {
  console.log("Client-side code running");
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
      $(".save").removeClass(".hide");
    });

  // });
});

// // Whenever someone clicks the add comments button
$(document).on("click", ".addcomment", function() {
  console.log("saving comments front end initiated");
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  var commentdiv = "#" + thisId;
  console.log(commentdiv);

  $(commentdiv).removeClass("hide");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/headlines/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);

      var saveNote = "#savenote" + thisId;
      console.log(saveNote);

      // When you click the savenote button
      $(document).on("click", saveNote, function() {
        console.log("submit comment front end initiated");
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        var bodyInput = "#comment" + thisId;
        console.log(bodyInput);

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
          method: "POST",
          url: "/headlines/" + thisId,
          data: {
            // Value taken from note textarea
            comment: $(bodyInput).val()
          }
        })
          // With that done
          .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $(bodyInput).empty();
          });

        // Also, remove the values entered in the input and textarea for note entry
        // $("#titleinput").val("");
        $("#bodyinput").val("");
      });
    });
});


//delete note

// // Whenever someone clicks the add comments button
      // When you click the savenote button
      $(document).on("click", ".delete-note", function() {
        console.log("delete comment front end initiated");
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to delete the note, using what's entered in the inputs
        $.ajax({
          method: "POST",
          url: "/headlines/" + thisId,
          data: {
            // data-id
            comment: thisId
          }
        })
          // With that done
          .then(function(data) {
            // Log the response
            console.log(data);
          });

});
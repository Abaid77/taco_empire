$(() => {
  // Inside Owner page duration AJAX request section
  $("form.duration").on("submit", function (event) {
    event.preventDefault();
    console.log("form duration!");
  });
});

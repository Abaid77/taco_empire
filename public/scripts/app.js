$(() => {
  let beefTacoCount = 0;
  let chickenTacoCount = 0;
  let shrimpTacoCount = 0;

  $("#beef-taco").on("submit", function (event) {
    event.preventDefault();

    const $qty = $(this).closest("form").find("input");
    beefTacoCount += Number($qty.val());

    if (beefTacoCount > 0) {
      const $table = $("#table-summary");
      if ($table.find("#beef").length > 0) {
        $table.find("#beef").remove();
        const $row = `
        <tr id='beef'>
          <td>${beefTacoCount}</td>
          <td>Beef Taco</td>
          <td>$${(beefTacoCount * 5).toFixed(2)}</td>
          <td class='btn btn-outline-danger'  id='remove-beef'>X</td>
        </tr>
      `;
        $("#tbody").append($row);
      }
    }
    // Event handler to remove order item
    $("#remove-beef").on("click", function () {
      beefTacoCount = 0;
      $("#table-summary").find("#beef").empty();
    });
  });

  // Chicken Order Summary
  $("#chicken-taco").on("submit", function (event) {
    event.preventDefault();

    const $qty = $(this).closest("form").find("input");
    chickenTacoCount += Number($qty.val());

    if (chickenTacoCount > 0) {
      const $table = $("#table-summary");
      if ($table.find("#chicken").length > 0) {
        $table.find("#chicken").remove();
        const $row = `
        <tr id='chicken'>
          <td>${chickenTacoCount}</td>
          <td>Chicken Taco</td>
          <td>$${(chickenTacoCount * 6).toFixed(2)}</td>
          <td class='btn btn-outline-danger' id='remove-chicken'>X</td>
        </tr>
      `;
        $("#tbody").append($row);
      }
    }

    // Event handler to remove order item
    $("#remove-chicken").on("click", function () {
      chickenTacoCount = 0;
      $("#table-summary").find("#chicken").empty();
    });
  });

  // Shrimp Order Summary
  $("#shrimp-taco").on("submit", function (event) {
    event.preventDefault();

    const $qty = $(this).closest("form").find("input");
    shrimpTacoCount += Number($qty.val());

    if (shrimpTacoCount > 0) {
      const $table = $("#table-summary");
      if ($table.find("#shrimp").length > 0) {
        $table.find("#shrimp").remove();
        const $row = `
        <tr id='shrimp'>
          <td>${shrimpTacoCount}</td>
          <td>Shrimp Taco</td>
          <td>$${(shrimpTacoCount * 8).toFixed(2)}</td>
          <td class='btn btn-outline-danger' id='remove-shrimp'>X</td>
        </tr>
      `;
        $("#tbody").append($row);
      }
    }

    // Event handler to remove order item
    $("#remove-shrimp").on("click", function () {
      shrimpTacoCount = 0;
      $("#table-summary").find("#shrimp").empty();
    });
  });
});

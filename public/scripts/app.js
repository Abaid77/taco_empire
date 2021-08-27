// For demo purposes we hard coded 3 items in. However this page serves as the base to allow for items to be pulled from the database.

$(() => {
  let beefTacoCount = 0;
  let chickenTacoCount = 0;
  let shrimpTacoCount = 0;

  // Beef Taco Order Summary
  $("#beef-taco").on("submit", function(event) {
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
        refresh();
      }
    }
    // Event handler to remove order item
    $("#remove-beef").on("click", function() {
      beefTacoCount = 0;
      refresh();
      $("#table-summary").find("#beef").empty();
    });
  });

  // Chicken Taco Order Summary
  $("#chicken-taco").on("submit", function(event) {
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
        refresh();
      }
    }

    // Event handler to remove order item
    $("#remove-chicken").on("click", function() {
      chickenTacoCount = 0;
      refresh();
      $("#table-summary").find("#chicken").empty();
    });
  });

  // Shrimp Order Summary
  $("#shrimp-taco").on("submit", function(event) {
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
        refresh();
      }
    }

    // Event handler to remove order item
    $("#remove-shrimp").on("click", function() {
      shrimpTacoCount = 0;
      refresh();
      $("#table-summary").find("#shrimp").empty();
    });
  });

  $("#place-order").on("click", function() {
    const dishList = [];
    // Create dishlist array to add to DB
    for (let x = 0; x < beefTacoCount; x++) {
      dishList.push(1);
    }
    for (let x = 0; x < chickenTacoCount; x++) {
      dishList.push(2);
    }
    for (let x = 0; x < shrimpTacoCount; x++) {
      dishList.push(3);
    }
    $.get("/users/").then((res) => {
      const user_id = res.users[0].id;
      $.post("/orders/", { user_id: user_id, dish_list: dishList }).then(
        (res) => {
          if (res.success) {
            $.post("/send-sms/owner");
            window.location = `/orders/${user_id}`;
          }
        }
      );
    });
  });

  // To refresh the total prices & tax inside order summary page
  function refresh() {
    $("#subtotal").empty();
    let subtotal = Number(
      (beefTacoCount * 5 + chickenTacoCount * 6 + shrimpTacoCount * 8).toFixed(
        2
      )
    );
    let tax = Number((subtotal * 0.05).toFixed(2));
    let total = tax + subtotal;
    $("#subtotal").append(subtotal);
    $("#tax").empty();
    $("#tax").append(tax);
    $("#total").empty();
    $("#total").append(total);
  }
});

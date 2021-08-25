$(() => {
  $.get("owner/new-orders").then((orders) => {
    // Store dish_list as object and use dish name as a key
    const dishList = orders.map((order) => {
      const dish = {};
      for (let item of order.dish_list) {
        switch (item) {
          case 1:
            dish.beef === undefined ? (dish.beef = 1) : (dish.beef += 1);
            break;
          case 2:
            dish.chicken === undefined
              ? (dish.chicken = 1)
              : (dish.chicken += 1);
            break;
          case 3:
            dish.shrimp === undefined ? (dish.shrimp = 1) : (dish.shrimp += 1);
            break;
        }
      }
      return dish;
    });

    // Display list of new orders
    orders.forEach((order, index) => {
      const $new_order = `
    <tr>
      <td class="order-id">${order.id}</td>
      <td>${order.name}</td>
      <td id="dishList">
      ${
        dishList[index].beef === undefined
          ? ""
          : `Beef(${dishList[index].beef})`
      }
      ${
        dishList[index].chicken === undefined
          ? ""
          : `Chicken(${dishList[index].chicken})`
      }
      ${
        dishList[index].shrimp === undefined
          ? ""
          : `Shrimp(${dishList[index].shrimp})`
      }
      </td>
      <td>${order.start_time}</td>
      <td>
        <form class="duration">
          <div class="input-group mb-3">
            <input type="number" value="0" min="0" class="form-control duration-qty" aria-label="Amount (to the nearest dollar)">
            <div class="input-group-append">
              <span class="input-group-text">min</span>
            </div>
            <button class="btn btn-info">Submit</button></td>
          </div>
        </form>
    </tr>
    `;
      $("#new-orders").prepend($new_order);
    });
  });

  // Inside Owner page duration AJAX request section
  $(this).on("submit", function (event) {
    event.preventDefault();
    const $orderId = $(event.target).parent().siblings(".order-id").text();
    const $duration = $(event.target).find(".duration-qty").val();

    $.ajax({
      type: "PUT",
      url: "/owner/",
      data: {
        orderId: $orderId,
        duration: $duration,
      },
    }).then((res) => {
      console.log(res);
    });
  });
});

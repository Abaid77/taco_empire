$(() => {
  $.get("owner/new-orders").then((orders) => {
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
    orders.forEach((order, index) => {
      const $new_order = `
    <tr>
      <td>${order.id}</td>
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
            <input type="number" value="0" min="0" class="form-control" aria-label="Amount (to the nearest dollar)">
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
  $("form.duration").on("submit", function (event) {
    event.preventDefault();
    console.log("form duration!");
  });
});

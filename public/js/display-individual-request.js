document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("approvedBtn");
  const id = document.getElementById("urlId");
  
  submitBtn.addEventListener("click", function () {
    const updatedItems = [];
    document.querySelectorAll("table tbody tr").forEach(function (row) {
      let itemNameElement = row.querySelector("td:first-child");
      let unitElement = row.querySelector("td:nth-child(2)");
      let quantityInput = row.querySelector('input[name="quantity"]');
      let deliveryDateInput = row.querySelector('input[name="delievery_date"]');
      let rateInput = row.querySelector('input[name="rate"]');
      let vendorInput = row.querySelector('input[name="vendor"]');

      // Check if elements exist before accessing properties
      if (itemNameElement && unitElement) {
        let itemName = itemNameElement.innerText;
        let unit = unitElement.innerText;
        let quantity = quantityInput ? quantityInput.value : "";
        let deliveryDate = deliveryDateInput ? deliveryDateInput.value : "";
        let rate = rateInput ? rateInput.value : "";
        let vendor = vendorInput ? vendorInput.value : "";
        
        // Add the item details to the updatedItems array
        updatedItems.push({
          unit,
          itemName,
          quantity,
          deliveryDate,
          rate,
          vendor,
        });
      }
    });

    console.log(updatedItems);
    // Perform a POST request to update the request
    fetch("/procurement-view-individual-request-list/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id.value,
        items: updatedItems,
      }),
    })
      .then((response) => {
        // Handle the response as needed
        if (response.ok) {
          window.location.href = "/procurement-store-manager-request";
          // Success, do something
        } else {
          // Error, handle accordingly
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle the error appropriately
      });
  });
});

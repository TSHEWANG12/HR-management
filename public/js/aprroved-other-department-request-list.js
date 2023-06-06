// Get the submit button element
const submitBtn = document.getElementById("approvedBtn");
const id = document.getElementById("urlId");

// Add an event listener to the button element
submitBtn.addEventListener("click", function () {
  let expiryObj = {};

  // Loop through each row in the table
  document.querySelectorAll("table tbody tr").forEach(function (row) {
    // Get the item name from the first column in the row
    let itemName = row.querySelector("td:first-child").innerText;
    let remarksArr = [];

    // Loop through each textarea in the row to get the remarks value
    row.querySelectorAll('textarea[name="remarks"]').forEach(function (textarea) {
      remarksArr.push(textarea.value);
    });

    // Join all remarks values into a single string separated by commas
    let remarks = remarksArr.join(", ");

    let totalQuantity = 0; // initialize total quantity to 0
    let quantityEmpty = true; // flag to track if quantity is empty

    // Loop through each checkbox in the row
    row.querySelectorAll('input[name="expiryDate"]').forEach(function (checkbox) {
      if (checkbox.checked) {
        // Get the value of the checkbox (expiry date)
        let expiryDate = checkbox.value;
        // Get the quantity input field for the checkbox
        let quantityInput = checkbox.parentNode.nextElementSibling.nextElementSibling.querySelector('input[name="quantity"]');
        let quantity = parseInt(quantityInput.value); // Parse the quantity value as an integer

        // Check if the quantity is empty or not
        if (quantityInput.value.trim() === "") {
          // Quantity input field is empty
          alert("Quantity is empty for item: " + itemName);
          quantityEmpty = false; // Set the flag to false
          return; // Exit the loop for this checkbox
        }

        // Check if the quantity is available
        let availableQuantity = parseInt(checkbox.parentNode.nextElementSibling.innerText); // Get the available quantity
        if (quantity > availableQuantity) {
          // Quantity exceeds available quantity
          alert("Quantity exceeds available quantity for item: " + itemName);
          quantityEmpty = false; // Set the flag to false
          return; // Exit the loop for this checkbox
        }

        // Add the quantity to the total quantity
        totalQuantity += quantity;

        // Initialize the expiryObj[itemName] object if it doesn't exist yet
        if (!expiryObj[itemName]) {
          expiryObj[itemName] = {};
        }

        // Set the properties of expiryObj[itemName]
        expiryObj[itemName]["item_name"] = itemName;
        expiryObj[itemName]["_id"] = id.value;
        expiryObj[itemName]["remarks"] = remarks;
        expiryObj[itemName]["total_quantity"] = totalQuantity;
      } else {
        // Checkbox is unchecked
        let quantityInput = checkbox.parentNode.nextElementSibling.nextElementSibling.querySelector('input[name="quantity"]');
        let quantity = parseInt(quantityInput.value); // Parse the quantity value as an integer

        // Check if the quantity is not empty
        if (quantityInput.value.trim() !== "") {
          // Quantity input field is not empty when checkbox is unchecked
          alert("Quantity should be empty for item: " + itemName);
          quantityEmpty = false; // Set the flag to false
          return; // Exit the loop for this checkbox
        }
      }
    });
  });

  // Check if any quantity was empty
  if (!Object.keys(expiryObj).length) {
    alert("Please enter the quantity for at least one item.");
    return;
  }

  // Send the data to the backend
  fetch("/approved-other-department-request-list/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expiryObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      window.location.href = "/other-department-request-lists";
      // Do further manipulation on the data if needed
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

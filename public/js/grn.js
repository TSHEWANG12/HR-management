document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("grnBtn");
    const id = document.getElementById("urlId");
    const po_no = document.getElementById("header_date");
    const poNo = po_no.innerText;
    console.log(poNo);
    
    submitBtn.addEventListener("click", function () {
      const updatedItems = [];
      document.querySelectorAll("table tbody tr").forEach(function (row) {
        let itemNameElement = row.querySelector("td:first-child");
        let unitElement = row.querySelector("td:nth-child(2)");
        let quantityInput = row.querySelector('input[name="quantity"]');
        let billDateInput = row.querySelector('input[name="bill_date"]');
        let billNoInput = row.querySelector('input[name="bill_no"]');
        let rateInput = row.querySelector('input[name="rate"]');
        let vendorInput = row.querySelector('input[name="vendor"]');
  
        // Check if elements exist before accessing properties
        if (itemNameElement && unitElement) {
          let itemName = itemNameElement.innerText;
          let unit = unitElement.innerText;
          let quantity = quantityInput ? quantityInput.value : "";
          let billDate = billDateInput ? billDateInput.value : "";
          let billNo = billNoInput ? billNoInput.value : "";
          let rate = rateInput ? rateInput.value : "";
          let vendor = vendorInput ? vendorInput.value : "";
          
          // Add the item details to the updatedItems array
          updatedItems.push({
            poNo,
            unit,
            itemName,
            quantity,
            billDate,
            billNo,
            rate,
            vendor,
          });
        }
      });
  
      console.log(updatedItems);
      // Perform a POST request to update the request
      fetch("/genrate-grn/" + id, {
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
            window.location.href = "/procurement-display-po";
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
  
document.getElementById("downloadButton").addEventListener("click", function () {
    const url = new URL(window.location.href);
  
    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);
  
    // Retrieve the values from the query parameters
    const matching_objects = JSON.parse(searchParams.get("matching_objects"));
  
    // Construct the Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");
  
    // Add headers to the worksheet
    worksheet.addRow([
      "Item Name",
      "Total Quantity",
      "Expiry Date",
      "Price",
      "Quantity",
      "Entry Date",
    ]);
  
    // Add data rows to the worksheet
    matching_objects.forEach((obj) => {
      if (parseInt(obj.quantity) === 0) {
        worksheet.addRow([
          obj.item_name,
          obj.quantity,
          "Out of Stock",
          "",
          "",
          "",
        ]);
      } else {
        let rowspan = Object.keys(obj.date).length;
        Object.keys(obj.date).forEach((date, index) => {
          if (index > 0) {
            rowspan = 1;
          }
          const formattedEntryDate = new Date(obj.entry_date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          worksheet.addRow([
            obj.item_name,
            obj.quantity,
            obj.date[date].expiry_date,
            obj.date[date].price,
            obj.date[date].quantity,
            formattedEntryDate,
          ]);
        });
      }
    });
  
    // Save the workbook as a file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
  
      // Initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "stock-in-report.xlsx";
      document.body.appendChild(link); // Append the link to the document body
      link.click();
      document.body.removeChild(link); // Clean up the link element
    });
  });
  
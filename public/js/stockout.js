const searchInput = document.getElementById("search-input");
const dropdownContent = document.querySelector(".dropdown-content");

// Show the dropdown content when the user clicks on the search input
searchInput.addEventListener("click", function () {
  dropdownContent.style.display = "block";
});

// Filter the dropdown items based on the search input
document.getElementById("search-input").addEventListener("input", function () {
  var value = this.value.toLowerCase();
  var dropdownItems = document.getElementsByClassName("dropdown-item");
  Array.prototype.forEach.call(dropdownItems, function (item) {
    var text = item.textContent.toLowerCase();
    if (text.indexOf(value) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// Select a dropdown item when the user clicks on it
const dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    searchInput.value = this.textContent;
    dropdownContent.style.display = "none";
  });
});

// Hide the dropdown content when the user clicks outside of it
document.addEventListener("click", function (event) {
  if (!dropdownContent.contains(event.target) && event.target !== searchInput) {
    dropdownContent.style.display = "none";
  }
});

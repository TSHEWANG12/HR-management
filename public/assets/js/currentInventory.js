const wrapper = document.querySelector(".wrapper"),
  selectBtn = wrapper.querySelector(".select-btn"),
  searchInp = wrapper.querySelector("input"),
  options = wrapper.querySelector(".options");
var item = JSON.parse(
  document.getElementById("items-data").getAttribute("data-items")
);

const items = item.map((obj) => obj.item_name);
function addItem(selectedItem) {
  options.innerHTML = "";
  items.forEach((item) => {
    let isSelected = item == selectedItem ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}">${item}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}
addItem();

function updateName(selectedLi) {
  searchInp.value = "";
  addItem(selectedLi.innerText);
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;

  const itemNameInput = document.getElementById("item_name");
  const unitInput = document.getElementById("unit");
  const categoryInput = document.getElementById("category");
  const itemBrandInput = document.getElementById("itemBrand");
  // const vendorInput = document.getElementById("vendor");
  if (selectBtn.firstElementChild.innerText) {
    fetch("/add-current-item1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName: selectedLi.innerText }),
    })
      .then((response) => response.json())
      .then((data) => {
        itemNameInput.value = data.itemName;
        unitInput.value = data.unit;
        categoryInput.value = data.category;
        itemBrandInput.value = data.itemBrand;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

searchInp.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = items
    .filter((data) => {
      return data.toLowerCase().startsWith(searchWord);
    })
    .map((data) => {
      let isSelected =
        data == selectBtn.firstElementChild.innerText ? "selected" : "";
      return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    })
    .join("");
  options.innerHTML = arr
    ? arr
    : `<p style="margin-top: 10px;">Oops! Item not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
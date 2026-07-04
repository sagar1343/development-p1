const searchInput = document.getElementById("search");
const rows = document.querySelectorAll("tbody tr");
const sortBtn = document.getElementById("campaigns-sort");
const tBody = document.querySelector("tbody");
const deleteButtons = document.querySelectorAll(".delete-btn");

let isAscending = false;

function handleSearch() {
  const searchValue = searchInput.value.trim().toLowerCase();

  rows.forEach((row) => {
    const name = row.children[0].textContent.trim().toLowerCase();
    const companyName = row.children[1].textContent.trim().toLowerCase();

    if (name.includes(searchValue) || companyName.includes(searchValue)) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}

function handleSorting() {
  const rowsArr = [...rows];

  rowsArr.sort((a, b) => {
    const c1 = Number(a.children[2].textContent);
    const c2 = Number(b.children[2].textContent);

    if (isAscending) {
      return c2 - c1;
    }
    return c1 - c2;
  });

  tBody.innerHTML = "";

  rowsArr.forEach((row) => {
    tBody.appendChild(row);
  });

  isAscending = !isAscending;
}

searchInput.addEventListener("input", handleSearch);
sortBtn.addEventListener("click", handleSorting);

deleteButtons.forEach((del) => {
  del.addEventListener("click", () => {
    del.parentElement.parentElement.remove();
  });
});

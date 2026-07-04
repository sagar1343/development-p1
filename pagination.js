const searchInput = document.getElementById("search");
const sortBtn = document.getElementById("campaigns-sort");
const tBody = document.querySelector("tbody");
const deleteButtons = document.querySelectorAll(".delete-btn");
const pagination = document.querySelector("#pagination");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");
const rows = [...document.querySelectorAll("tbody tr")];
let filteredRows = [...rows]; // copy

const rowsPerPage = 3;

let isAscending = false;

function handleSearch() {
  const searchValue = searchInput.value.trim().toLowerCase();

  filteredRows = rows.filter((row) => {
    name = row.children[0].textContent.trim().toLowerCase();
    return name.includes(searchValue);
  });

  showRows();
}

function handleSorting() {
  filteredRows.sort((a, b) => {
    const c1 = Number(a.children[2].textContent);
    const c2 = Number(b.children[2].textContent);

    if (isAscending) {
      return c2 - c1;
    }
    return c1 - c2;
  });

  isAscending = !isAscending;
  showRows();
}

let currentPage = Number(pageNumber.textContent);

function showRows() {
  let start = (currentPage - 1) * rowsPerPage;
  let end = start + rowsPerPage;

  tBody.innerHTML = "";
  filteredRows.slice(start, end).forEach((row) => {
    tBody.appendChild(row);
  });

  // edge case -> if search result <= 3 -> no pagination
  if (filteredRows.length <= rowsPerPage) {
    console.log(filteredRows.length);
    pagination.style.display = "none";
  } else {
    pagination.style.display = "flex";
  }
}

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  if (currentPage < totalPages) {
    pageNumber.textContent = ++currentPage;
    showRows();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    pageNumber.textContent = --currentPage;
    showRows();
  }
});

searchInput.addEventListener("input", handleSearch);
sortBtn.addEventListener("click", handleSorting);

deleteButtons.forEach((del) => {
  del.addEventListener("click", () => {
    del.parentElement.parentElement.remove();
  });
});

showRows();

// searching -> sorting -> pagination

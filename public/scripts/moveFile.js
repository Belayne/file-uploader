const cancelMoveBtn = document.getElementById("cancelMoveBtn");
const moveFileDiv = document.getElementById("moveFormDiv");

function showMoveForm(fileId) {
  document.getElementById("moveFormfileId").setAttribute("value", fileId);
  moveFileDiv.classList.remove("hidden");
  moveFileDiv.classList.add("flex");
}

cancelMoveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveFileDiv.classList.remove("flex");
  moveFileDiv.classList.add("hidden");
});

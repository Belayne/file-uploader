const newFolderBtn = document.getElementById("createFolderBtn");
const newFolderDiv = document.getElementById("formDiv");
const cancelFormBtn = document.getElementById("cancelFormBtn");

newFolderBtn.addEventListener("click", () => {
  newFolderDiv.classList.remove("hidden");
  newFolderDiv.classList.add("flex");
});

newFolderDiv.addEventListener("click", (e) => {
  if (e.target == newFolderDiv) {
    newFolderDiv.classList.remove("flex");
    newFolderDiv.classList.add("hidden");
  }
});

cancelFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newFolderDiv.classList.remove("flex");
  newFolderDiv.classList.add("hidden");
});

async function deleteFolder(folderId) {
  const form = document.createElement("form");
  const folderIdInput = document.createElement("input");

  form.setAttribute("action", "/folder/delete");
  form.setAttribute("method", "POST");
  folderIdInput.setAttribute("name", "folderId");
  folderIdInput.setAttribute("value", folderId);
  form.append(folderIdInput);

  document.querySelector("body").append(form);
  form.submit();
  form.remove();
}

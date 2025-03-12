const newFolderBtn = document.getElementById("createFolderBtn");
const newFolderDiv = document.getElementById("formDiv");
const cancelFormBtn = document.getElementById("cancelFormBtn");
const cancelMoveBtn = document.getElementById("cancelMoveBtn");
const moveFileDiv = document.getElementById("moveFormDiv");

newFolderBtn.addEventListener("click", () => {
  newFolderDiv.classList.remove("hidden");
  newFolderDiv.classList.add("flex");
});

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

function deleteFolder(folderId) {
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

function renameFolder(folderId, name) {
  if (name) {
    const form = document.createElement("form");
    const folderIdInput = document.createElement("input");
    const folderNameInpute = document.createElement("input");
    form.setAttribute("action", "/folder/rename");
    form.setAttribute("method", "POST");
    folderIdInput.setAttribute("name", "folderId");
    folderIdInput.setAttribute("value", folderId);
    folderNameInpute.setAttribute("name", "folderName");
    folderNameInpute.setAttribute("value", name);
    form.append(folderIdInput);
    form.append(folderNameInpute);

    document.querySelector("body").append(form);
    form.submit();
    form.remove();
  }
}

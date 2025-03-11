function deleteFile(fileId) {
  const form = document.createElement("form");
  const fileIdInput = document.createElement("input");

  form.setAttribute("action", "/file/delete");
  form.setAttribute("method", "POST");
  fileIdInput.setAttribute("name", "fileId");
  fileIdInput.setAttribute("value", fileId);
  form.append(fileIdInput);

  document.querySelector("body").append(form);
  form.submit();
  form.remove();
}

function renameFile(fileId, name) {
  if (name) {
    const form = document.createElement("form");
    const fileIdInput = document.createElement("input");
    const fileNameInpute = document.createElement("input");
    form.setAttribute("action", "/file/rename");
    form.setAttribute("method", "POST");
    fileIdInput.setAttribute("name", "fileId");
    fileIdInput.setAttribute("value", fileId);
    fileNameInpute.setAttribute("name", "fileName");
    fileNameInpute.setAttribute("value", name);
    form.append(fileIdInput);
    form.append(fileNameInpute);

    document.querySelector("body").append(form);
    form.submit();
    form.remove();
  }
}

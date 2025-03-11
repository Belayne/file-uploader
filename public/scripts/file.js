async function deleteFile(fileId) {
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

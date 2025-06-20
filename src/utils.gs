/*************************
 * UTILITÁRIOS
 *************************/
function getFileIdFromLink(link) {
  const regex = /[-\w]{25,}/;
  const match = link.match(regex);
  return match ? match[0] : null;
}


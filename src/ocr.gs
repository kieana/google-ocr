/*************************
 * FUNÇÃO OCR
 *************************/
function executarOCR(arquivo) {
  const pastaTemp = DriveApp.getFolderById(FOLDER_ID_TEMPORARIA);
  const nome = `OCR_${new Date().toISOString()}_${arquivo.getName()}`;

  const doc = Drive.Files.create(
    {
      name: nome,
      mimeType: MimeType.GOOGLE_DOCS,
      parents: [pastaTemp.getId()],
    },
    arquivo.getBlob(),
    {
      ocr: true,
      ocrLanguage: 'pt',
      fields: 'id,webViewLink',
    }
  );

  const texto = DocumentApp.openById(doc.id).getBody().getText();

  return {
    texto: texto.trim(),
    docLink: `https://docs.google.com/document/d/${doc.id}/edit`,
  };
}

function moverArquivos(imagem, linkDoc) {
  const pastaOrigem = DriveApp.getFolderById(FOLDER_ID_UPLOADS_FORMS);
  const pastaDestino = DriveApp.getFolderById(FOLDER_ID_DESTINO_PROCESSADOS);

  pastaOrigem.removeFile(imagem);
  pastaDestino.addFile(imagem);

  if (linkDoc) {
    const docId = getFileIdFromLink(linkDoc);
    const doc = DriveApp.getFileById(docId);
    DriveApp.getFolderById(FOLDER_ID_TEMPORARIA).removeFile(doc);
    pastaDestino.addFile(doc);
  }
}


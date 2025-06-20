/*************************
 * TESTE LOCAL DO PARSER
 *************************/
function testarOCRSimulado() {
  const docId = 'ID_DO_SEU_DOC_DE_TESTE';
  const texto = DocumentApp.openById(docId).getBody().getText();
  const dados = parseOCRText(texto);
  Logger.log(dados);
}


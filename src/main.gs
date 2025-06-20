/*************************
 * FUNÇÃO PRINCIPAL
 *************************/
function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const linha = e.range.getRow();

  const linkImagem = e.values[1];
  if (!linkImagem) throw new Error('Link da imagem vazio.');

  const fileId = getFileIdFromLink(linkImagem);
  const imagem = DriveApp.getFileById(fileId);

  const resultadoOCR = executarOCR(imagem);
  const texto = resultadoOCR.texto || "Nenhum texto encontrado";
  const linkDoc = resultadoOCR.docLink || "";

  const dados = parseOCRText(texto);

  sheet.getRange(linha, 14).setValue(linkDoc);
  sheet.getRange(linha, 15).setValue(texto);

  sheet.getRange(linha, 5).setValue(dados.inscricao || "");
  sheet.getRange(linha, 6).setValue(dados.beneficiario || "");

  if (dados.codigosProcedimentos.length > 0) {
    const primeiro = dados.codigosProcedimentos[0];
    sheet.getRange(linha, 9).setValue(primeiro.codigo);
    sheet.getRange(linha, 10).setValue(primeiro.procedimento);

    for (let i = 1; i < dados.codigosProcedimentos.length; i++) {
      const item = dados.codigosProcedimentos[i];
      const novaLinha = Array(sheet.getLastColumn()).fill("");

      novaLinha[0] = e.values[0];
      novaLinha[12] = linkImagem;
      novaLinha[8] = item.codigo;
      novaLinha[9] = item.procedimento;

      sheet.appendRow(novaLinha);
    }
  }

  moverArquivos(imagem, linkDoc);
}


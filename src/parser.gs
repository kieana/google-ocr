/*************************
 * PARSE DO TEXTO OCR
 *************************/
function parseOCRText(texto) {
  let inscricao = "";
  let beneficiario = "";
  const codigosProcedimentos = [];

  const dados = texto.match(/Beneficiário:\s*\n\s*(\d+)\s*-\s*(.+)/i);
  if (dados) {
    inscricao = dados[1].trim();
    beneficiario = dados[2].trim();
  }

  const matchProcedures = texto.match(/Qtd\.[\s\S]+/i);
  if (matchProcedures) {
    const bloco = matchProcedures[0];

    const regex = /(\d{9}-\d)\s*(\d{3})\s*([\s\S]+?)(?=\s*\d{9}-\d|\s*Beneficiário:|\s*$)/g;
    let m;
    while ((m = regex.exec(bloco)) !== null) {
      codigosProcedimentos.push({
        codigo: m[1].trim(),
        procedimento: `${m[2].trim()} ${m[3].trim().replace(/\s*\d+\s*$/, "")}`,
      });
    }
  }

  if (codigosProcedimentos.length === 0) {
    codigosProcedimentos.push({ codigo: "NÃO ENCONTRADO", procedimento: "NÃO ENCONTRADO" });
  }

  return { inscricao, beneficiario, codigosProcedimentos };
}


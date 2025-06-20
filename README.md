# 📄 Google OCR Automation

Automatização completa de processamento de imagens via Google Forms, com OCR, extração de dados e preenchimento automático de planilhas Google Sheets.

---

## 🚀 Funcionalidades

✅ Upload de imagens via Google Forms  
✅ Extração de texto (OCR) com Google Drive API  
✅ Parsing inteligente (Regex) dos campos importantes:  
   - Inscrição  
   - Beneficiário  
   - Códigos e Procedimentos (múltiplos ou únicos)  
✅ Preenchimento automático no Google Sheets  
✅ Organização dos arquivos no Google Drive (entrada/processados)  

---

## 🗺️ Fluxo do Projeto

1️⃣ Usuário preenche o **Google Forms** e faz o upload da imagem.  
2️⃣ A imagem é salva no **Google Drive (Uploads)**.  
3️⃣ O **Apps Script (GAS)** faz OCR na imagem.  
4️⃣ O texto é processado, os dados são extraídos e organizados.  
5️⃣ O **Google Sheets** é atualizado automaticamente.  
6️⃣ O arquivo original e o documento OCR são movidos para a pasta de **processados**.  

---

## 🏗️ Estrutura de Pastas



@echo [+] Baixando dados para o envio.
@node src\download_powerbi.js

@timeout 10

@echo [+] Excutando upload dos dados.
@node src\upload_data.js

@echo [+] Processo finalizado.
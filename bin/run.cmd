@echo [+] Iniciando processo de Download e upload.

@echo [+] Realizando download de arquivos.
node src\download_powerbi.js

@echo [+] Realizando upload de arquivos.
node src\upload_data.js

@echo [+] Processos finalizados.

@echo [+] Iniciando processo de Download e upload.

@echo [+] Realizando download de arquivos.
node src\sessions\init_session_whatsapp.js

@echo [+] Realizando upload de arquivos.
node src\sessions\init_session_powerbi.js

@echo [+] Processos finalizados.

@echo [+] Ramo atual da app:
@git rev-parse --abbrev-ref HEAD

@echo [+] Buscando e baixando dados do repositorio.
@git pull origin main

@echo [+] Processo finalizado.
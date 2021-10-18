run:
	.\bin\run.cmd

session_whatsapp:
	node .\src\index.js --session whatsapp

session_powerbi:
	node .\src\index.js --session powerbi

download_data:
	node .\src\index.js --data download

upload_data:
	node .\src\index.js --data upload
install:
	.\bin\install.cmd

update:
	.\bin\update.cmd

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

session_whatsapp_old:
	node src\sessions\init_session_whatsapp.js

session_powerbi_old:
	node src\sessions\init_session_powerbi.js

download_data_old:
	node src\download_powerbi.js

upload_data_old:
	node src\upload_data.js
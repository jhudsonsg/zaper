run:
	.\bin\run.cmd

session_whatsapp:
	node src\sessions\init_session_whatsapp.js

session_powerbi:
	node src\sessions\init_session_powerbi.js

download_data:
	node src\download_powerbi.js

upload_data:
	node src\upload_data.js
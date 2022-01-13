@echo [+] Instalando Chocolatey e suas dependencias.
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command " [System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

choco install make -y
choco install nodejs -y
choco install git -y

git clone https://github.com/jhudsonsg/Zaper.git Zaper
cd Zaper

@echo [+] Copiando variaveis de ambiente.
copy .env-example .env

@echo [+] Instalando dependencias do projeto.
npm install

@echo [+] Processo finalizado.
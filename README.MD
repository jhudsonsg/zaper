# Zaper

# Windows

## Dependências
A baixo está a lista de dependências necessarias para o projeto, caso queira instalar cada por conta propria, caso não vá direto para parte de instalação e configuração.

|          #       |  Link                          | Observações |
| ---------------- | ------------------------------ | ----------- |
|  Chocolatey      |  https://chocolatey.org/       | Use o PowerShell aberto com permissões de administrador do sistema para instalação. |
|  Git             |  https://git-scm.com/downloads | -           |
|  Nodejs          |  https://nodejs.org/en/        | Use a versão 14.18 ou superior. |
|  Make            |  -                             | -           |

## Instalação e configurações

Após instalar todas as dependências siga os passos para instalação o projeto. **(Recomendo fortemente que use o PowerShell em tudo com as permissões de admin no sistema)**:

- [X] Navegue em seus diretórios até o local desejado para instalar o projeto usando.
- [X] Execute os seguinte comando no PowerShell do seu ambiente para iniciar a instalação do projeto e suas dependências.

```bash
# Dentro do diretório a ser instalado o projeto execute:
.\install.cmd
```

- [X] Configure o seu usuário no git.
- [X] Depois de rodar os camando acima vá para o arquivo [.env](./.env) na raiz do projeto e preencha as informações necessarias para o sistema funcionar. (Caso o arquivo .env não exista você pode copiar o arquivo .env-example e mudar o nome para .env ou rodar o comando .\install.cmd novamente) <br />
- [X] Depois no arquivo [config/index.js](./config/index.js) insira os valores na variável ***GROUPS_PEOPLES*** seguindo o exemplo para enviar seus arquivos.

## Como usar
Execute os seguintes comandos dentro do diretório do projeto para roda-lo.<br />

Recomendo que seja criada uma Cron ou agende uma tarefa ou qualquer coisa do gênero para executar o comando ***make run*** de tempos em tempos para que a rotina possa ser automatizada. <br />

Caso esteja usando Windows você pode agendar uma tarefa para que rode o arquivo [./bin/run.cmd](./bin/run.cmd), para mais informações de como agendar uma tarefa segue o link: https://pt.stackoverflow.com/questions/265600/como-rodar-o-cron-do-schedulerun-no-windows

```bash
# Iniciar as sessões nas plataformas (Presisa ser feito manualmente).
make session_whatsapp
make session_powerbi

# Executa os passos de download e upload dos arquivos (Pode ser executado manualmente).
make run
```
# Zaper

# Windows

## Dependências
|          #       |  Link                          | Observações |
| ---------------- | ------------------------------ | ----------- |
|  Git / GitBash   |  https://git-scm.com/downloads | -           |
|  Nodejs          |  https://nodejs.org/en/        | Use a versão 14.18 ou superior. |
|  Chocolatey      |  https://chocolatey.org/       | Use o PowerShell aberto com permissões de administrador do sistema para instalação. |
|  Make            |  #Como instalar                | -           |

### Como instalar 

#### Make
Para fazer a instalação do Make e executar os comandos dos makefiles será necessario instalar o chocolatey, após isso utilize o seu PowerShell com permissões de admin do sistemas para executar os proximos comandos. (Após instalar o chocolatey caso não seja encontrado o binario choco reinicie o PowerShell para carregar as variáveis de ambiente do seus sistema).

```bash
# Para qualquer solicitação de instação digite "Y" para permitir acessos ao instalador.

choco install make
```

Novamente após instalação do Make reinicie o seu PowerShell para carregar as variáveis de ambiente do seus sistema.

## Instalação e configurações

Após instalar todas as dependências siga os passos para instalação o projeto. **(Recomendo fortemente que use o PowerShell em tudo com as permissões de admin no sistema)**:

- [X] Configure o seu usuário no git.
- [X] Navegue em seus diretórios até o local desejado para instalar o projeto usando.
- [X] Execute os seguintes comandos no PowerShell do seu ambiente para iniciar a instalação do projeto e suas libs.

```bash
# Dentro do diretório a ser instalado o projeto execute:

git clone https://github.com/jhudsonsg/Zaper.git
cd Zaper 
make install
```

- [X] Depois de rodar os camando acima vá para o arquivo [.env](./.env) na raiz do projeto e preencha as informações necessarias para o sistema funcionar. (Caso o arquivo .env não exista você pode copiar o arquivo .env-example e mudar o nome para .env ou rodar o comando make install novamente) <br />
- [X] Para achar o caminho do chrome que é requirido na [.env](./.env) abra o navegador e na barra de pesquisa digite "chrome://version/" depois copie o valor do "Caminho do executável" e cole no campo da [.env](./.env), coloque uma ***"/\"*** a mais **EM TODAS A BARRAS** do valor copiado para ficar ***"/\/\"*** (Barra dupla).
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
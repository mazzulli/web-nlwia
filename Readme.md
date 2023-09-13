# PROJETO NLW 13 - IA


## CONCURSO DA CAMISETA


Palavra chave 1: INTELIGÊNCIA


Palavra chave 2: OPORTUNIDADE


Palavra chave 3: ?



## CONFIGURAÇÃO DO PROJETO WEB

Criar a pasta do projeto: www/nlw

Entrar no diretório do projeto

Usar **`npm create vite@latest`** para criar o projeto web

Nomear como **nlwia**

Escolher **Vanilla**

Entrar na pasta do projeto criado

Fazer a limpeza dos arquivos desnecessários

Configurar a o atributo "script" do **package.json** 

Instalar o node **´npm i´**

Criar as pastas para organizar os arquivos do projeto

`web`

`styles`



## CONFIGURAÇÃO DO SERVER

Criar a pasta server na raiz do Projeto NLWIA

Instar os recursos para o servidor

`npm i express axios cors ytdl-core@4.10.0`

A biblioteca `ytdl-core` é utilizada para fazer o dowload do video do youtube

Após a instalação editar o arquivo package.json e retirar o "^" da versão da biblioteca `ytdl-core`, isso fará com que a versão utilizada não mude ou seja atualizada.

```
  "dependencies": {
    "axios": "^1.5.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "ytdl-core": "4.10.0"
  }
```
No arquivo index.js fazer a importação do `cors` e do `express` e configurar a execução do servidor.

Para executar o servidor usar `node server/index.js` onde server é a pasta que contém o arquivo index com o codigo de execução do servidor.


##CRIAR AS ROTAS

Usar o ´express´ para criar as rotas do servidor.

```
app.get('/summary', (request, response) => {
  response.send("Hello world")
})
```

Para fazer o reload automatico é possível usar a biblioteca do `nodemon`, mas no nosso projeto vamos usar o `node --watch` que já é nativo do node a partir da versão 18.11.

No nosso package.json vamos editar e configurar o script para execução:

```
"scripts": {
    "web": "vite",
    "server": "node --watch server/index.js"
  }
```

Agora para executar o servidor é só digitar `node run server`.


## DOWNLOAD DO VIDEO

Para efetuar o download do video usar a biblioteca do `ytdl`.

Para isso criamos um novo arquivo chamado download.js o qual recebe todo o codigo necessário consumindo a biblioteca do `ytdl`.

Abaixo o trecho de código que fará o download:

```
ytdl(videoURL, {
    quality: "lowestaudio",
    filter: "audioonly",
  })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new error("A duração do video é maior que 60 segundos.")
      }
    })
    .on("end", () => {
      console.log("Download do video finalizado!")
    })
    .on("error", (error) => {
      console.log(
        "Não foi possível fazer o download do video...Error: " + error
      )
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
```

Note que o recurso/método `.pipe` usa a biblioteca nativa do node `fs` para salvar o arquivo no local informado.


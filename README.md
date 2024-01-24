# Screen Recorder

Aplicação para gravação de tela em tempo real utilizando Streams e WebSocket, além da api nativa do browser para a captura de tela (MediaRecorder). 

Usando a api nativa de captura de tela do browser é possível transmitir pedaços do vídeo gravado (chunks) para outra fonte, que nesse caso foi um servidor com conexão WebSocket, através das Streams do NodeJS.

O servidor recebe os pedaços em Buffer e grava sequencialmente na Stream leitura existente de forma local no servidor.  

Vale ressaltar que esse projeto é apenas uma demo. Algo mais elaborado pode ser desenvolvido futuramente.

## Executando o projeto

Rode o seguinte comando no diretório client e server:

```console
npm i
```

Depois execute o seguinte comando em ambos os diretórios para iniciar a aplicação:

```console
npm start
```

## Observações

- O server está na porta 3000
- O cliente está na porta 5500

* Você só precisa abrir no navegador no http://localhost:3000 (server) e http://localhost:5500 (client)

* Para ver o vídeo que foi gravado navege até http://localhost:3000/video

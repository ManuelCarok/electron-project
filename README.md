Tener instalado: nodejs lts

Crear carpeta con el nombre del proyecto como ejemplo `electron-project`

Ejecutar en el directorio creado por cmd `npm init` 

crear gitignore con: 

```
.DS_Store
Trumbs.db
node_modules
npm-debug.log
debug.log
```

Instalar electron: `npm i electron --save` (no se recomienda instalar de forma global)

se crea script en package.json:

```json
"scripts": {
    "start": "electron index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```


Herramientas:

Instalar electron compile: 

`npm i electron-prebuilt-compile --save-dev`

`npm r electron --save && npm i --save electron-compile`

variables de entorno:

`npm i cross-env --save`
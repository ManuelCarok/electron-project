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


Herramientas de desarrollo:

Instalar electron compile: 

`npm i electron-prebuilt-compile --save-dev`

`npm r electron --save && npm i --save electron-compile`

variables de entorno:

`npm i cross-env --save`

formateador de codigo y verificador de codigo

`npm install standard --save-dev`

electron-debug:

`npm install electron-debug`

herramienta oficial de electron:

`npm install --save-dev devtron`

Framework Frontend para electron:

Photon kit: http://photonkit.com/

Xel: https://xel-toolkit.org/
# SistemaPetshop

Esse projeto foi desenvolvido com [Angular CLI 17.3.0](https://github.com/angular/angular-cli).

## Servidor de Desenvolvimento

Para rodar o servidor de desenvolvimento, utiliza-se `ng serve --serve-path /sistema-petshop/`. Após, para acessar o sistema, é necessário acessar `http://localhost:4200/sistema-petshop/` e navegar conforme convém.

## Build

Para construir o projeto a partir do código fonte, é necessário utilizar `ng build --output-path docs --base-href /sistema-petshop/` e modificar os arquivos compilados conforme o local de deploy, no caso do github pages:

```bash
$ cd docs/
$ mv browser/* ./ && rmdir browser
$ cp index.html 404.html
$ touch .nojekyll
# Agora, é necessário configurar o subdiretório /docs como deploy no github e dar push nos arquivos.
```

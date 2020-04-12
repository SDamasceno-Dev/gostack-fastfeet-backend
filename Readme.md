<p align="center" target="_blank">
  <img src="https://i.imgur.com/b9HrmqJ.png" target="_blank">
</p>

> Reconhecidamente a melhor solução para serviços de entrega, com foco exclusivamente no cliente e totalmente comprometida em superar expectativas.

<p align="center" target="_blank">
  <img src="https://img.shields.io/badge/Version-0.1-blueviolet?style=plastic" target="_blank">
  <img src="https://img.shields.io/badge/NodeJS-%3E%3D12.14.0-blueviolet?style=plastic&logo=node.js" target="_blank">
</p>

<p align="center" target="_blank">
:link:| &nbsp;<a href="#page_with_curl-Descrição" target="_blank">Descrição </a> &nbsp;  | &nbsp; <a href="#books-Bibliotecas" target="_blank">Bibliotecas </a> &nbsp; | &nbsp; <a href="#file_folder-Módulos" target="_blank">Como instalar </a> &nbsp; | &nbsp; <a href="#file_folder-Módulos" target="_blank">Como usar </a> &nbsp; | &nbsp; <a href="#file_folder-Módulos" target="_blank">Licença </a> &nbsp; |</p>

## :page_with_curl: Descrição

O módulo Back-end do sistema FastFeet é o responsável por executar, por meio de uma **API** (**Application Programming Interface** ou traduzindo para o português **Interface de Programação de Aplicativos**) toda a pesquisa de coleta e envio de informações com os bancos de dados necessários para o sistema. Na seção **Bibliotecas** estarão listadas todas as dependências utilizada no desenvolvimento deste módulo.

## :books: Bibliotecas
Abaixo estão listadas, dentro do respectivo agrupamento, as dependências, com a sua respectiva versão, utilizadas para o desenvolvimento desse módulo Back-end do sistema Fastfeet:

<details><summary>Dependências</summary>
  <p>
    <ul>
    <li><a href="https://www.npmjs.com/package/bcryptjs" target="_blank">bcryptjs</a> [^2.4.3]</li>
    <li><a href="https://github.com/bee-queue/bee-queue" target="_blank">bee-queue</a> [^1.2.3]</li>
    <li><a href="https://www.npmjs.com/package/cors" target="_blank">cors]</a> [^2.8.5</li>
    <li><a href="https://github.com/date-fns/date-fns" target="_blank">date-fns</a> [^2.0.0-beta.5]</li>
    <li><a href="https://www.npmjs.com/package/express" target="_blank">express</a> [^4.17.1]</li>
    <li><a href="https://www.npmjs.com/package/express-handlebars" target="_blank">express-handlebars</a> [^3.1.0]</li>
    <li><a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank">jsonwebtoken</a> [^8.5.1]</li>
    <li><a href="https://www.npmjs.com/package/multer" target="_blank">multer</a> [^1.4.2]</li>
    <li><a href="https://nodemailer.com/about/" target="_blank">nodemailer</a> [^6.4.2]</li>
    <li><a href="https://www.npmjs.com/package/nodemailer-express-handlebars" target="_blank">nodemailer-express-handlebars</a> [^3.1.0]</li>
    <li><a href="https://www.npmjs.com/package/pg" target="_blank">pg</a> [^7.18.1]</li>
    <li><a href="https://www.npmjs.com/package/pg-hstore" target="_blank">pg-hstore</a> [^2.3.3]</li>
    <li><a href="https://www.npmjs.com/package/sequelize" target="_blank">sequelize</a> [^5.21.3]</li>
    <li><a href="https://www.npmjs.com/package/yup" target="_blank">yup</a> [^0.28.1]</li>
    </ul>
  </p>
</details>
<details><summary>Dependências de desenvolvimento</summary>
  <p>
    <ul>
    <li><a href="https://www.npmjs.com/package/eslint" target="_blank">eslint</a> [^6.8.0]</li>
    <li><a href="https://www.npmjs.com/package/eslint-config-airbnb-base" target="_blank">eslint-config-airbnb-base</a> [^14.0.0]</li>
    <li><a href="https://www.npmjs.com/package/eslint-config-prettier" target="_blank">eslint-config-prettier</a> [^6.10.0]</li>
    <li><a href="https://www.npmjs.com/package/eslint-plugin-import" target="_blank">eslint-plugin-import</a> [^2.20.0]</li>
    <li><a href="https://www.npmjs.com/package/eslint-plugin-prettier" target="_blank">eslint-plugin-prettier</a> [^3.1.2]</li>
    <li><a href="https://www.npmjs.com/package/nodemon" target="_blank">nodemon</a> [^2.0.2]</li>
    <li><a href="https://www.npmjs.com/package/prettier" target="_blank">prettier</a> [^1.19.1]</li>
    <li><a href="https://www.npmjs.com/package/sequelize-cli" target="_blank">sequelize-cli</a> [^5.5.1]</li>
    <li><a href="https://www.npmjs.com/package/sucrase" target="_blank">sucrase</a> [^3.12.1]</li>
    </ul>
  </p>
</details>

## :floppy_disk: Como Instalar
Para que após a clonagem este módulo funcione de forma correta, serão necessárias algumas ações para que toda a estrutura fique adequada para o seu bom funcionamento. Antes de listar os passos necessários para o preparo do ambiente, é necessário que o computador onde irá rodar este módulo, já tenha instalado o [Git](https://git-scm.com/), [Node.JS >=v12.14.0 LTS](https://nodejs.org/en/) e o [Yarn >=v1.22.4](https://yarnpkg.com/).
Com essa estrutura pronta, pode-se iniciar o preparo do ambiente para se rodar este módulo Back-end do sistema FastFeet.

1º Clonar este respoitório
Para se efetuar a clonagem desse repositório, crie uma pasta onde for o local adequado no seu computador, abra uma sessão do terminal de dentro dessa pasta e execute o seguinte comando
```
# Clona a pasta back-end do sistema FastFeet
$ git clone https://github.com/SDamasceno-Dev/gostack-fastfeet-back_end
```

Em seguida acessa a pasta clonada
```
# Acessa a pasta clonada
$ cd gostack-fastfeet-back_end
```

Agora execute o Yarn para que todas as dependências sejam corretamente instaladas
```
# Instala todas as dependências necessárias
$ yarn
```


<details><summary>Instalação dos Banco de Dados</summary>
	<p>
  Uma vez que todas as dependências estejam instaladas, chegou o momento de preparar o ambiente de banco de dados. Vamos ver o que é necessário para isso:
  <ul>
    <li>
      É necessário que sejam instalados 2 bancos de dados o <a href="https://www.postgresql.org/" target="_blank">Postgres</a> e o <a href="https://redis.io/" target="_blank">Redis</a>.  Nas páginas desses bancos possuem toda a orientação de como proceder a instalação deles;
    </li>
    <li>
      Com a instalação desses bancos feita, serão necessários fazer alguns ajustes nos arquivos de configuração conforme a sua realidade. No arquivo localizado em <span style="font-weight: bold; text-decoration:underline; color: #B14913">src/config/database.js</span> você poderá configurar a sua conexão com o postgres. O sistema todo foi configurado para utilizar a porta 5432;
    </li>
    <li>
      Após a instalação e configuração da conexão com o Postgres, pode-se efetuar a migração das tabelas desse banco. Para isso iremos utilizar o <span style="font-weight: bold; text-decoration:italic; color: #607541">sequelize-cli</span>, executando o seguinte comando:

  ```
  # Executa a migração criando as tabelas no banco de dados Postgres
  $ yarn sequelize db:migrate
  ```
  <li>
      Após a criação de todas as tabelas necessárias para o sistema executar de maneira correta, você tem a opção de criar um usuário administrador padrão. Para isso, iremos utilizar novamente o <span style="font-weight: bold; text-decoration:italic; color: #607541">sequelize-cli</span> executando o seguinte comando:

  ```
  # Cria o usuário padrão com perfil de administrador no sistema FastFeet
  $ yarn sequelize db:seed:all
  ```

  Este usuário possui os seguintes dados:

  ```
  name: 'Distribuidora FastFeet'
  email: 'admin@fastfeet.com'
  password: '123456'
  ```
  </li>
  <li>
    Com todas as tabela criadas e o usuário padrão com perfil administrador configurado, já é possível seguir iniciar os serviços do Back-end. Para isso, basta executar os seguintes comandos, sendo que é necessário que cada comando seja executado em uma instância diferente do terminal:

  ```
  # Comando para rodar os serviços do Postgres no Back-end do Sistema FastFeet
  $ yarn dev
  ```

  Com uma outra instância do terminal aberta, execute agora o seguinte comando:

  ```
  # Comando para rodar os serviços do Redis no Back-end do Sistema FastFeet
  $ yarn queue
  ```
  </li>
    <li>Com essa etapa realizada com sucesso, já é possível seguir para o próximo passo.</li>
</li>
  </ul>
	</p>
</details>

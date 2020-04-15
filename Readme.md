<p align="center" target="_blank">
  <img src="https://i.imgur.com/b9HrmqJ.png" target="_blank">
</p>

# Módulo Backend

> Reconhecidamente a melhor solução para serviços de entrega, com foco exclusivamente no cliente e totalmente comprometida em superar expectativas.

<p align="center" target="_blank">
  <img src="https://img.shields.io/badge/Version-0.1-blueviolet?style=plastic" target="_blank">
  <img src="https://img.shields.io/badge/NodeJS-%3E%3D12.14.0-blueviolet?style=plastic&logo=node.js" target="_blank">
</p>

<p align="center" target="_blank">
:link:| &nbsp;<a href="#page_with_curl-Descrição" target="_blank">Descrição</a> &nbsp;  | &nbsp; <a href="#books-Bibliotecas">Bibliotecas</a> &nbsp; | &nbsp; <a href="#floppy_disk-Como-Instalar">Como instalar</a> &nbsp; | &nbsp; <a href="#office-Estrutura-do-Backend">Estrutura do Backend</a> &nbsp; | &nbsp; <a href="https://github.com/SDamasceno-Dev/gostack-fastfeet-back_end/blob/master/LICENSE.MD">Licença </a> &nbsp; |</p>

## :page_with_curl: Descrição

O módulo Backend do Sistema FastFeet é o responsável por executar, por meio de uma **API** (**Application Programming Interface** ou traduzindo para o português **Interface de Programação de Aplicativos**) toda a pesquisa de coleta e envio de informações com os bancos de dados necessários para o sistema. Na seção **Bibliotecas** estarão listadas todas as dependências utilizada no desenvolvimento deste módulo.

## :books: Bibliotecas

Abaixo estão listadas, dentro do respectivo agrupamento conforme usabilidade, as dependências, com a sua respectiva versão, utilizadas para o desenvolvimento desse módulo Backend do Sistema Fastfeet:

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

Para que este módulo funcione de forma correta após a clonagem, serão necessárias alguns recursos para que toda a estrutura fique adequada para o seu bom funcionamento. Antes de listar os passos necessários para o preparo do ambiente, é necessário que o computador onde irá rodar este módulo, já tenha instalado o [Git](https://git-scm.com/), [Node.JS >=v12.14.0 LTS](https://nodejs.org/en/) e o [Yarn >=v1.22.4](https://yarnpkg.com/). Todos esses pacotes podem ser instalados utilizando um **Gerenciador de pacotes** compatível com o seu sistema operacional ([Homebrew](https://brew.sh/) para macOS, [Chocolatey](https://chocolatey.org/) para Windows).
Com essa estrutura pronta, pode-se iniciar o preparo do ambiente para se rodar este módulo Backend do Sistema FastFeet.

**1º Clonar este respoitório**

Para se efetuar a clonagem desse repositório, crie uma pasta onde ficará toda a estrutura do sistema no computador onde irá executar, abra uma sessão do terminal de dentro dessa pasta e execute o seguinte comando

```bash
# Clonar a pasta Backend do Sistema FastFeet
$ git clone https://github.com/SDamasceno-Dev/gostack-fastfeet-backend
```

Em seguida acessa a pasta clonada

```bash
# Acessar a pasta clonada
$ cd gostack-fastfeet-backend
```

Agora execute o Yarn para que todas as dependências sejam corretamente instaladas

```bash
# Instala todas as dependências necessárias
$ yarn
```

**2º Banco de Dados**

Uma vez que todas as dependências estejam instaladas, chegou o momento de preparar o ambiente de banco de dados. Vamos ver o que é necessário para isso:

* É necessário que sejam instalados 2 bancos de dados o [Postgres](https://www.postgresql.org/) e o [Redis](https://redis.io/).  Nas páginas desses bancos possuem toda a orientação de como proceder a instalação deles;
* Com a instalação desses bancos feita, serão necessários fazer alguns ajustes nos arquivos de configuração conforme a sua realidade. No arquivo localizado em **src/config/database.js** você poderá configurar a sua conexão com o Postgres;
* Após a instalação e configuração da conexão com o Postgres, pode-se efetuar a migração das tabelas nesse banco. Para isso iremos utilizar o **sequelize-cli**, executando o seguinte comando:

  ```bash
  # Executa a migração criando as tabelas no banco de dados Postgres
  $ yarn sequelize db:migrate
  ```

* Após a criação de todas as tabelas necessárias para o sistema executar de maneira correta, você tem a opção de criar um usuário administrador padrão. Para isso, iremos utilizar novamente o **sequelize-cli** executando o seguinte comando:

  ```bash
  # Cria o usuário padrão com perfil de administrador no Sistema FastFeet
  $ yarn sequelize db:seed:all
  ```

  Este usuário possui os seguintes dados:

  ```bash
  name: 'Distribuidora FastFeet'
  email: 'admin@fastfeet.com'
  password: '123456'
  ```
* Com todas as tabela criadas e o usuário padrão com perfil administrador configurado, já é possível seguir iniciar os serviços do Backend. Para isso, basta executar os seguintes comandos, sendo que é necessário que cada comando seja executado em uma instância diferente do terminal:

  ```bash
  # Comando para rodar os serviços do Postgres no Backend do Sistema FastFeet
  $ yarn dev
  ```

  Com uma outra instância do terminal aberta, execute agora o seguinte comando:

  ```bash
  # Comando para rodar os serviços do Redis no Backend do Sistema FastFeet
  $ yarn queue
  ```

Após todas as etapas realizadas com sucesso, já pode realizar a instalação do módulo [Front-end (WEB)](https://github.com/SDamasceno-Dev/gostasck-fastfeet-frontend) do Sistema FastFeet.

## :office: Estrutura do Backend

Com o intuito de tornar esse módulo mais didático, serão aqui citadas algumas das estruturas mais importantes desse módulo e a sua principal função. Caso seja necessário, você pode verificar diretamente nos arquivos em cada uma das estruturas para poder compreender de forma mais aprofundada.

* **Controllers**  (/src/app/controllers)
 Nessa pasta estão localizados todos os controllers do Sistema FastFeet. Esses controllers definem as regras de negócio para cada uma das entidades que fazem parte do sistema (Administrador, Entregador, Encomenda, Cliente). Estas regras de negócio englobam desde a definição e horários para que as entregas possam ser retiradas para serem entregues até a necessidade de se coletar a assinatura da entrega para se finalizar a mesma.
* **Models** (/src/app/models)
Aqui estão armazenados todos os arquivos modelos das entidades do Sistema FastFeet que são utilizados junto com o sequelize no momento de iteração dessas entidades com o sistema.
* **Config** (/src/config)
Aqui estão armazenados todos os arquivos de configuração do Sistema FastFeet. É necessário uma atenção maior na hora de manipular esses arquivos, pois uma má configuração pode comprometer por completo a boa experiência no uso do sistema.

---
Criado e editado por **Sandro de Oliveira Damasceno** :space_invader:   [github!](https://github.com/SDamasceno-Dev) :octocat:

# App

Gympass style app

## RFs (Requisitos funcionais)
  - [x] Deve ser Possivel se cadastrar
  - [x] Deve ser Possivel se authenticar
  - [x] Deve ser Possivel obter perfil de um usuario logado
  - [x] Deve ser Possivel obter o numero de check-ins realizados pelo usuario logado
  - [x] Deve ser Possivel o usuario obter seu historico / numero de check-ins
  - [x] Deve ser possivel o usuario buscar academias proximas
  - [x] Deve ser possivel o usuario buscar academias por nome
  - [x] Deve ser possivel o usuario realizar check-in em uma academia
  - [x!] Deve ser possivel o usuario cancelar um check-in
  - [x] Deve ser possivel validar o check-in de um usuario
  - [x] Deve ser possivil cadastrar uma academia

## RNs (Regras de negocio) - Deve sempre estar atrelado aos requisitos funcionais
  - [x] Usuario não deve poder se cadastrar com um e-mail duplicado
  - [x] Usuario não deve poder fazer 2 check-ins no mesmo dia
  - [x] Usuario não deve fazer check-in se não estiver 100m da academia
  - [x] O check-in so pode ser validado até 20 min após criado
  - [x] O check-in so pode ser validado por Adms
  - [x] A academia so pode ser cadastrada por Adms

## RNFs (Requisitos não funcionais) - Requisitos no qual complementam a logica e o correto uso do app, evitar brechas
  - [x] A senha do usuario precisa estar Cryptografada
  - [x] Os dados da aplicação precisão estar persistidos em um banco PgSql
  - [x] Todas as listas de dados devem estar paginadas com 20 items por pagina
  - [x] Usuario deve ser identificado por um JWT (Jason web token)
  - [x] Usuario deve ser identificado por um JWT (Jason web token)

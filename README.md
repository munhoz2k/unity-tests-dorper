# Integração de  Teste Unitário

Este é um teste de integração de testes unitários para a Dorper.app com configuração básica pra inicio de projetos Node.js que peguei do IglanCardeal.

Algum dos pacotes inclusos:

- typescript
- ts-node-dev
- husky
- jest
- lint-staged
- prettier
- ts-jest
- eslint

Scripts padrão do projeto:

```json
"scripts": {
  "lint": "eslint --ignore-path .gitignore --ext .ts src/",
  "lint:fix": "yarn lint --fix",
  "test": "jest --passWithNoTests --silent",
  "test:coverage": "yarn test:unit --coverage",
  "test:ci": "yarn test:unit --coverage --ci --updateSnapshot",
  "test:unit": "yarn test",
  "test:unit:watch": "yarn test --watch",
  "test:u": "yarn test:unit",
  "test:u:w": "yarn test:unit:watch",
  "test:staged": "yarn test",
  "test:verbose": "jest --passWithNoTests --verbose",
  "test:verbose:watch": "jest --passWithNoTests --verbose --watch",
  "test:v": "yarn test:verbose",
  "test:v:w": "yarn test:verbose:watch",
  "prepare": "husky install"
}
```

Espero que goste Cardeal, grande abraço :D

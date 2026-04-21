# Buscador de CEP em React

Este componente foi desenvolvido para realizar buscas de endereços de forma simplificada utilizando a API ViaCEP. O sistema trata a entrada de dados, valida o formato do CEP e apresenta os resultados de maneira organizada.

## Funcionalidades

* Busca de endereços via API ViaCEP.
* Máscara de entrada automática no padrão 00000-000.
* Bloqueio de caracteres não numéricos através de Expressões Regulares.
* Validação de extensão do campo (limite de 8 dígitos).
* Tratamento de estados: carregamento (loading), erro e sucesso.
* Execução de busca ao pressionar a tecla Enter.

## Tecnologias

* React.js
* JavaScript (ES6+)
* Hooks (useState)
* Fetch API
* CSS3
* Ollama + Claude Code (Auxílio no desenvolvimento da lógica e estilização)

## Como utilizar

1. Clone o repositório:
   git clone https://github.com/Vivian-Queiroz/Buscar-Cep.git

2. Instale as dependências:
   npm install

3. Execute o projeto:
   npm run dev


## Lógica de Implementação
- Limpeza de dados: O componente utiliza o padrão /\D/g para garantir que apenas números sejam processados pelo estado interno.

- Formatação visual: A função de máscara separa a exibição visual do valor real armazenado, melhorando a experiência do utilizador sem comprometer a lógica da API.

- Requisição Assíncrona: Utiliza o bloco try-catch-finally para gerenciar a comunicação com o servidor, garantindo que o indicador de carregamento seja encerrado após a conclusão da operação.

import { useState } from "react";
import "./BuscarCep.css";

function BuscarCep(){
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const formatarCep = (valor) => {
    const numeros = valor.replace(/\D/g, ""); //Remove tudo que não for número (\D) em todo o texto (g) e substitui por nada (""), "limpando" a variável.
    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0, 5)}-${numeros.slice(5, 8)}`; //Pega os primeiros 5 números, insere o traço, e pega o restante dos números (do sexto ao oitavo).
  };

  const handleCepChange = (e) => { //Limpa o vlr do input, deixando apenas os nº, e atualiza o estado do cep. Se o valor tiver + de 8 dígitos, não atualiza o estado.
    const valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 8) {
      setCep(valor);
      setErro("");
    }
  };

  const buscarCep = async () => {//Verifica se o cep tem exatamente 8 dígitos. Se não tiver, exibe uma mensagem de erro e retorna.
    if (cep.length !== 8) { 
      setErro("Digite um CEP com 8 dígitos.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const consulta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const resposta = await consulta.json();

      if (resposta.erro) {
        setErro(`O CEP ${formatarCep(cep)} não foi encontrado.`);
        setCep("");
        setEndereco(null);
      } else {
        setEndereco(resposta); 
      }
    } catch {
      setErro("Erro ao buscar o CEP. Tente novamente.");
      setEndereco(null); 
    } finally { //Independente do resultado da consulta, o loading é desativado.
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { //Permite que o usuário pressione "Enter" para buscar o CEP, além de clicar no botão.
    if (e.key === "Enter") {
      buscarCep();
    }
  };

  const cepDisplay = formatarCep(cep);

  return (
    <div className="cep-container">
      <h2 className="cep-title">Buscar endereço pelo CEP</h2>

      <div className="cep-form">
        <input
          type="text"
          placeholder="00000-000"
          value={cepDisplay}
          onChange={handleCepChange}
          onKeyDown={handleKeyDown}
          className="cep-input"
        />

        <button onClick={buscarCep} className="cep-button" disabled={loading}>
          {loading ? "..." : "Buscar"} {/* Exibe "..." no botão enquanto a consulta está em andamento, e desativa o botão para evitar múltiplas consultas simultâneas. */}
        </button>
      </div>

      {/* Exibe uma dica para o usuário quando ele começar a digitar o CEP, mas ainda não tiver digitado os 8 dígitos necessários, e não houver erros. */}
      {cep.length > 0 && cep.length < 8 && !erro && ( 
        <p className="cep-hint">Digite os 8 dígitos do CEP</p>
      )}

      {/* Exibe a mensagem de erro caso haja algum problema com a consulta ou com o formato do CEP. */}
      {erro && <p className="cep-error">{erro}</p>} 

      {/* Exibe os detalhes do endereço retornado pela consulta. Cada detalhe é exibido em um parágrafo separado, com o nome do campo em negrito e o valor em destaque. */}
      {endereco && (
        <div className="cep-result">
          <p><strong>Rua:</strong> <span>{endereco.logradouro}</span></p>
          <p><strong>Bairro:</strong> <span>{endereco.bairro}</span></p>
          <p><strong>Cidade:</strong> <span>{endereco.localidade}</span></p>
          <p><strong>Estado:</strong> <span>{endereco.uf}</span></p>
        </div>
      )}
    </div>
  );
}

export default BuscarCep;

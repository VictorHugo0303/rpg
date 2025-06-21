import { locais } from './locais';
import { desafios } from './desafios';

export type Aventura = {
  titulo: string;
  local: string;
  desafio: string;
  resumo: string;
};

function escolhaAleatorio<T>(lista: T[]): T {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

export function gerarAventura(): Aventura {
  const local = escolhaAleatorio(locais);
  const desafio = escolhaAleatorio(desafios);

  return {
    titulo: `Aventura em ${local}`,
    local,
    desafio,
    resumo: `Você está em ${local.toLowerCase()} e precisa enfrentar ${desafio.toLowerCase()}`
  };
}

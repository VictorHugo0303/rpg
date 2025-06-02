import { locais } from './locais';
import { desafios } from './desafios';

export type Aventura = {
  titulo: string;
  local: string;
  desafio: string;
  resumo: string;
};

export function gerarAventura(): Aventura {
  return {
    titulo: 'Aventura no Castelo',
    local: 'Castelo Abandonado',
    desafio: 'Enfrentar um dragão',
    resumo: 'Você explora um castelo e encontra um dragão feroz.'
  };
}

import { Aventura } from "./generator";

export type Escolha = {
  texto: string;
  proximoId: string;
  dificuldade?: number;
  proximoIdFalha?: string;
};

export type Historia = {
  id: string;
  texto: string;
  opcoes: Escolha[];
};

export function gerarHistoria(aventura: Aventura): Historia[] {
  const local = aventura.local.toLowerCase();
  const desafio = aventura.desafio.toLowerCase();

  //caso 1
  if (local.includes('castelo') && desafio.includes('dragão')) {
    return [
      {
        id: 'inicio',
        texto: `Você chegou no Castelo Abandonado e se depara com um dragão enfurecido. O que faz?`,
        opcoes: [
          { texto: 'Tentar se esconder', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
          { texto: 'Atacar', proximoId: 'fim_ruim' },
          { texto: 'Olhar em volta', proximoId: 'olhar' }
        ]
      },
      //inicio > esconder
      {
        id: 'esconder',
        texto: `Você se escondeu`,
        opcoes: [
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
          { texto: 'Atacar furtivamente', proximoId: 'fim_heroi' },
          { texto: 'Olhar em volta', proximoId: 'olhar_escondido' }
        ]
      },
      //falha ao esconder/fugir
       {
        id: 'flagrado',
        texto: `O dragão te avistou e vai em sua direção, o que você faz?`,
        opcoes: [
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' },
          { texto: 'Tentar se esconder', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'fim_flagrado' }
        ]
      },
      //inicio > esconder > olhar escondido
      {
        id: 'olhar_escondido',
        texto: `Você avista uma besta montada no alto de uma torre a esquerda, e a direita você vê um quarto. O que você fará?`,
        opcoes: [
          { texto: 'Atacar furtivamente', proximoId: 'fim_heroi' },
          { texto: 'Ir para a besta', dificuldade: 12, proximoId: 'besta', proximoIdFalha: 'flagrado' },
          { texto: 'Ir para o quarto', dificuldade: 12, proximoId: 'quarto', proximoIdFalha: 'flagrado' }
        ]
      },
      //inicio > olhar
      {
        id: 'olhar',
        texto: `Você avista uma besta montada no alto de uma torre a esquerda, e a direita você vê um quarto. O que você fará?`,
        opcoes: [
          { texto: 'Tentar se esconder', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'fim_flagrado' },
          { texto: 'Atacar', proximoId: 'fim_ruim' },
          { texto: 'Ir para a besta', dificuldade: 12, proximoId: 'besta', proximoIdFalha: 'flagrado' },
          { texto: 'Ir para o quarto', dificuldade: 12, proximoId: 'quarto', proximoIdFalha: 'flagrado' }
        ]
      },
      //besta Montada
      {
        id: 'besta',
        texto: `Você chega no topo da torre e avista a besta-montada e uma flecha`,
        opcoes: [
          { texto: 'Atirar', proximoId: 'fim_besta-montada' },
          { texto: 'Voltar', dificuldade: 12, proximoId: 'inicio', proximoIdFalha: 'flagrado' },
        ]
      },
      //quarto
      {
        id: 'quarto',
        texto: `Você entra no quarto e decide...`,
        opcoes: [
          { texto: 'Explorar quarto', dificuldade: 12, proximoId: 'explorar_quarto', proximoIdFalha: 'falha_explorar' },
          { texto: 'Voltar', dificuldade: 12, proximoId: 'inicio', proximoIdFalha: 'flagrado' },
        ]
      },
      //quarto > explorar  quarto
      {
        id: 'explorar_quarto',
        texto: `Você explora o quarto e encontra um arco com 5 flechas de ferro. O que você faz?`,
        opcoes: [
          { texto: 'Atirar flechas no dragão', proximoId: 'fim_arco' },
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' },
        ]
      },

      //falha ao explorar
      {
        id: 'falha_explorar',
        texto: `Você explora o quarto e não encontra nada interessante.`,
        opcoes: [
          { texto: 'Voltar', dificuldade: 12, proximoId: 'inicio', proximoIdFalha: 'flagrado' },
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' },
        ]
      },
      //finais
        { id: 'fim_fuga', texto: 'Você fogi sorrateiramente. Melhor viver para lutar outro dia', opcoes: [] },
        { id: 'fim_heroi', texto: 'Você ataca o dragão desprevinido e o derrota.', opcoes: [] },
        { id: 'fim_ruim', texto: 'O dragão que dispara contra você uma bola de fogo, você foi derrotado', opcoes: [] },
        { id: 'fim_besta-montada', texto: 'Você coloca a flecha na besta e atira no dragão e o derrota.', opcoes: [] },
        { id: 'fim_arco', texto: 'Você dispara as flechas rapidamente contra o dragão e o derrota.', opcoes: [] },
        { id: 'fim_flagrado', texto: 'Você tenta se esconder antes do dragão te ver, porém quando você menos espera, ele te devora', opcoes: [] }
    ];
  }

   return [
    {
      id: 'inicio',
      texto: `Você inicia sua aventura em ${aventura.local}, onde enfrentará ${aventura.desafio}.`,
      opcoes: [
        { texto: 'Seguir em frente', proximoId: 'fim' }
      ]
    },
    {
      id: 'fim',
      texto: 'Sua jornada termina... por enquanto.',
      opcoes: []
    }
  ];


}

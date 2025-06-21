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
  imagemFundo?: any;
};

export function gerarHistoria(aventura: Aventura): Historia[] {
  const local = aventura.local.toLowerCase();
  const desafio = aventura.desafio.toLowerCase();

  // CASO 1: Castelo + Dragão
  if (local.includes('castelo') && desafio.includes('dragão')) {
    return [
      {
        id: 'inicio',
        texto: `Você chegou no Castelo Abandonado e se depara com um dragão enfurecido. O que faz?`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Tentar se esconder', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
          { texto: 'Atacar', proximoId: 'fim_ruim' },
          { texto: 'Olhar em volta', proximoId: 'olhar' }
        ]
      },
      {
        id: 'esconder',
        texto: `Você se escondeu`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
          { texto: 'Atacar furtivamente', proximoId: 'fim_heroi' },
          { texto: 'Olhar em volta', proximoId: 'olhar_escondido' }
        ]
      },
      {
        id: 'flagrado',
        texto: `O dragão te avistou e vai em sua direção, o que você faz?`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' },
          { texto: 'Tentar se esconder', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'fim_flagrado' }
        ]
      },
      {
        id: 'olhar_escondido',
        texto: `Você avista uma besta montada no alto de uma torre à esquerda, e à direita você vê um quarto. O que você fará?`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Atacar furtivamente', proximoId: 'fim_heroi' },
          { texto: 'Ir para a besta', dificuldade: 12, proximoId: 'besta', proximoIdFalha: 'flagrado' },
          { texto: 'Ir para o quarto', dificuldade: 12, proximoId: 'quarto', proximoIdFalha: 'flagrado' }
        ]
      },
      {
        id: 'olhar',
        texto: `Você avista uma besta montada no alto de uma torre à esquerda, e à direita você vê um quarto. O que você fará?`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Tentar se esconder', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'fim_flagrado' },
          { texto: 'Atacar', proximoId: 'fim_ruim' },
          { texto: 'Ir para a besta', dificuldade: 12, proximoId: 'besta', proximoIdFalha: 'flagrado' },
          { texto: 'Ir para o quarto', dificuldade: 12, proximoId: 'quarto', proximoIdFalha: 'flagrado' }
        ]
      },
      {
        id: 'besta',
        texto: `Você chega no topo da torre e avista a besta-montada e uma flecha.`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Atirar', proximoId: 'fim_besta-montada' },
          { texto: 'Voltar', dificuldade: 12, proximoId: 'inicio', proximoIdFalha: 'flagrado' }
        ]
      },
      {
        id: 'quarto',
        texto: `Você entra no quarto e decide...`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Explorar quarto', dificuldade: 12, proximoId: 'explorar_quarto', proximoIdFalha: 'falha_explorar' },
          { texto: 'Voltar', dificuldade: 12, proximoId: 'inicio', proximoIdFalha: 'flagrado' }
        ]
      },
      {
        id: 'explorar_quarto',
        texto: `Você explora o quarto e encontra um arco com 5 flechas de ferro. O que você faz?`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Atirar flechas no dragão', proximoId: 'fim_arco' },
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
        ]
      },
      {
        id: 'falha_explorar',
        texto: `Você explora o quarto e não encontra nada interessante.`,
        imagemFundo: require('../assets/backgrounds/castelo.jpg'),
        opcoes: [
          { texto: 'Voltar', dificuldade: 12, proximoId: 'inicio', proximoIdFalha: 'flagrado' },
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
        ]
      },
      { id: 'fim_fuga', texto: 'Você foge sorrateiramente. Melhor viver para lutar outro dia.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] },
      { id: 'fim_heroi', texto: 'Você ataca o dragão desprevenido e o derrota.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] },
      { id: 'fim_ruim', texto: 'O dragão dispara contra você uma bola de fogo. Você foi derrotado.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] },
      { id: 'fim_besta-montada', texto: 'Você coloca a flecha na besta e atira no dragão, derrotando-o.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] },
      { id: 'fim_arco', texto: 'Você dispara as flechas rapidamente contra o dragão e o derrota.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] },
      { id: 'fim_flagrado', texto: 'Você tenta se esconder, mas o dragão te devora.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] }
    ];
  }

  // CASO 2: Floresta + Dragão
  if (local.includes('floresta') && desafio.includes('dragão')) {
    return [
      {
        id: 'inicio',
        texto: `Você adentra a densa Floresta das Sombras e ouve um rugido ensurdecedor. Um dragão enfurecido voa entre as copas, lançando fogo. O que você faz?`,
        imagemFundo: require('../assets/backgrounds/floresta.jpg'),
        opcoes: [
          { texto: 'Tentar se esconder sob raízes gigantes', dificuldade: 11, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
          { texto: 'Subir em uma árvore e observar', proximoId: 'observar' },
          { texto: 'Enfrentar o dragão de frente', proximoId: 'fim_ruim' }
        ]
      },
      {
        id: 'esconder',
        texto: `Você se esconde sob raízes antigas. O dragão passa por cima, mas parece farejar você.`,
        imagemFundo: require('../assets/backgrounds/floresta.jpg'),
        opcoes: [
          { texto: 'Fugir em silêncio', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
          { texto: 'Permanecer em silêncio', proximoId: 'observar' }
        ]
      },
      {
        id: 'flagrado',
        texto: `O dragão sente sua presença e lança uma lufada de fogo em sua direção!`,
        imagemFundo: require('../assets/backgrounds/floresta.jpg'),
        opcoes: [
          { texto: 'Rolar para o lado e correr', dificuldade: 11, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
        ]
      },
      {
        id: 'observar',
        texto: `Do alto da árvore, você vê uma clareira com uma espada antiga cravada numa pedra e uma caverna coberta de trepadeiras.`,
        imagemFundo: require('../assets/backgrounds/floresta.jpg'),
        opcoes: [
          { texto: 'Ir até a espada', proximoId: 'espada' },
          { texto: 'Explorar a caverna', proximoId: 'caverna' }
        ]
      },
      {
        id: 'espada',
        texto: `Você empunha a espada encantada. Ela brilha ao se aproximar do dragão.`,
        imagemFundo: require('../assets/backgrounds/floresta.jpg'),
        opcoes: [
          { texto: 'Enfrentar o dragão com a espada', proximoId: 'fim_heroi' }
        ]
      },
      {
        id: 'caverna',
        texto: `Dentro da caverna, você encontra um velho mago que oferece um feitiço de proteção.`,
        imagemFundo: require('../assets/backgrounds/floresta.jpg'),
        opcoes: [
          { texto: 'Aceitar o feitiço e enfrentar o dragão', proximoId: 'fim_heroi' },
          { texto: 'Fugir com o feitiço ativo', proximoId: 'fim_fuga' }
        ]
      },
      { id: 'fim_fuga', texto: `Você escapa da floresta com vida. Talvez ainda haja um outro dia para enfrentar a criatura.`, imagemFundo: require('../assets/backgrounds/floresta.jpg'), opcoes: [] },
      { id: 'fim_heroi', texto: `Com coragem e aliados inesperados, você derrota o dragão. A floresta respira aliviada.`, imagemFundo: require('../assets/backgrounds/floresta.jpg'), opcoes: [] },
      { id: 'fim_ruim', texto: `O dragão não perdoa sua imprudência. Seu destino vira cinzas.`, imagemFundo: require('../assets/backgrounds/floresta.jpg'), opcoes: [] }
    ];
  }

  //caso 3 caverna + dragão
  if (local.includes('caverna') && desafio.includes('dragão')) {
    return [
      {
        id: 'inicio',
        texto: `Você adentra a misteriosa Caverna de Cristal, onde cada passo ecoa entre estalactites cintilantes. As paredes irradiam luz em mil cores. Mas logo, um rugido reverbera entre as pedras: um colossal dragão prismático desperta de seu sono milenar.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: [
          { texto: 'Esconder-se entre as formações cristalinas', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
          { texto: 'Tentar dialogar com a criatura', proximoId: 'dialogo' },
          { texto: 'Atacar com sua espada reluzente', proximoId: 'atacar' }
        ]
      },
      {
        id: 'esconder',
        texto: `Você se esconde entre os cristais, mas a luz refratada torna tudo visível. O dragão parece hesitar.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: [
          { texto: 'Correr em silêncio para uma passagem lateral', dificuldade: 11, proximoId: 'passagem', proximoIdFalha: 'flagrado' },
          { texto: 'Atacar agora que ele hesitou', proximoId: 'fim_heroi' }
        ]
      },
      {
        id: 'dialogo',
        texto: `Você tenta se comunicar com o dragão. Ele não ataca, mas exige que você prove que é digno de entrar na câmara do Coração de Cristal.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: [
          { texto: 'Aceitar o desafio do dragão', dificuldade: 13, proximoId: 'desafio_dragon', proximoIdFalha: 'fim_ruim' },
          { texto: 'Atacar de surpresa', proximoId: 'fim_ruim' }
        ]
      },
      {
        id: 'atacar',
        texto: `Você ataca, mas o dragão dispara uma rajada de luz prismática.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: [
          { texto: 'Tentar desviar e continuar atacando', dificuldade: 14, proximoId: 'fim_heroi', proximoIdFalha: 'fim_ruim' }
        ]
      },
      {
        id: 'passagem',
        texto: `Você encontra uma passagem secreta e observa que um cristal no teto canaliza energia para o dragão.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: [
          { texto: 'Atirar no cristal com sua besta', proximoId: 'fim_heroi' },
          { texto: 'Voltar e enfrentar o dragão com essa informação', proximoId: 'atacar' }
        ]
      },
      {
        id: 'desafio_dragon',
        texto: `Você resolve um enigma de luz e sombra entre os cristais e prova sua sabedoria ao dragão.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: [
          { texto: 'Pedir que ele permita sua passagem', proximoId: 'fim_neutro' },
          { texto: 'Aliar-se a ele', proximoId: 'fim_aliado' }
        ]
      },
      {
        id: 'fim_heroi',
        texto: `Você derrota o dragão prismático, canalizando sua própria energia contra ele. A caverna se silencia, em paz.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: []
      },
      {
        id: 'fim_ruim',
        texto: `A luz do dragão é mais forte que você imaginava. Em instantes, tudo vira escuridão.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: []
      },
      {
        id: 'fim_neutro',
        texto: `O dragão reconhece sua coragem e permite que você atravesse a caverna.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: []
      },
      {
        id: 'fim_aliado',
        texto: `O dragão aceita sua aliança. Juntos, vocês protegem o Coração de Cristal de intrusos futuros.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: []
      },
      {
        id: 'flagrado',
        texto: `O dragão o vê com clareza entre os cristais e dispara sua luz.`,
        imagemFundo: require('../assets/backgrounds/caverna.jpg'),
        opcoes: [
          { texto: 'Tentar fugir', dificuldade: 12, proximoId: 'fim_ruim', proximoIdFalha: 'fim_ruim' }
        ]
      }
    ];
  }

  // caso 4 +  templo + dragão
   if (local.includes('templo') && desafio.includes('dragão')) {
    return [
      {
        id: 'inicio',
        texto: `Você entra no Templo Perdido, colunas antigas cobertas de musgo. Um dragão guardião se ergue entre estátuas quebradas.`,
        imagemFundo: require('../assets/backgrounds/templo.jpg'),
        opcoes: [
          { texto: 'Tentar acender tochas e distraí-lo', dificuldade: 12, proximoId: 'tochas', proximoIdFalha: 'flagrado' },
          { texto: 'Falar uma prece ao dragão', proximoId: 'prece' },
          { texto: 'Avançar para golpeá-lo', proximoId: 'fim_ruim' }
        ]
      },
      {
        id: 'tochas',
        texto: `Você acende tochas, chamuscando poeira — o dragão hesita, surpreendido pela luz súbita.`,
        imagemFundo: require('../assets/backgrounds/templo.jpg'),
        opcoes: [
          { texto: 'Avançar enquanto ele hesita', proximoId: 'fim_heroi' },
          { texto: 'Recuar para se esconder', dificuldade: 11, proximoId: 'esconder', proximoIdFalha: 'flagrado' }
        ]
      },
      {
        id: 'prece',
        texto: `Você ergue as mãos e murmura uma prece ancestral. O dragão se acalma, curioso.`,
        imagemFundo: require('../assets/backgrounds/templo.jpg'),
        opcoes: [
          { texto: 'Continuar em silêncio e avançar', proximoId: 'fim_neutro' },
          { texto: 'Atacar aproveitando seu momento de distração', proximoId: 'fim_ruim' }
        ]
      },
      {
        id: 'esconder',
        texto: `Você recua entre pilares — mas um estalido ecoa e o dragão percebe sua presença.`,
        imagemFundo: require('../assets/backgrounds/templo.jpg'),
        opcoes: [
          { texto: 'Tentar fugir correndo', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
        ]
      },
      { id: 'fim_heroi', texto: 'Você vence o guardião com agilidade e conquista seu respeito.', imagemFundo: require('../assets/backgrounds/templo.jpg'), opcoes: [] },
      { id: 'fim_neutro', texto: 'O dragão abre caminho para você — paz selada.', imagemFundo: require('../assets/backgrounds/templo.jpg'), opcoes: [] },
      { id: 'fim_fuga', texto: 'Você escapa ileso do templo, mas sem resposta do guardião.', imagemFundo: require('../assets/backgrounds/templo.jpg'), opcoes: [] },
      { id: 'fim_ruim', texto: 'O dragão irrompe em fúria e destrói seu caminho.', imagemFundo: require('../assets/backgrounds/templo.jpg'), opcoes: [] },
      { id: 'flagrado', texto: 'O dragão o vê e avança, pronto para atacar.', imagemFundo: require('../assets/backgrounds/templo.jpg'), opcoes: [] },
    ];
  }

  // caso 5 Cidade Submersa + dragão
  if (local.includes('cidade submersa') && desafio.includes('dragão')) {
    return [
      {
        id: 'inicio',
        texto: `Você mergulha na Cidade Submersa, ruínas cobertas por corais. Um dragão aquático surge por entre mosaicos antigos.`,
        imagemFundo: require('../assets/backgrounds/cidade.jpg'),
        opcoes: [
          { texto: 'Nadar em círculos para confundir suas correntes', dificuldade: 12, proximoId: 'circulos', proximoIdFalha: 'flagrado' },
          { texto: 'Tocar em um pedestal para invocar uma bolha protetora', proximoId: 'bolha' },
          { texto: 'Atacar com sua lança submarina', proximoId: 'fim_ruim' }
        ]
      },
      {
        id: 'circulos',
        texto: `Você nada em espiral — as correntes criadas confundem parcialmente o dragão.`,
        imagemFundo: require('../assets/backgrounds/cidade.jpg'),
        opcoes: [
          { texto: 'Aproveitar e nadar para a superfície', dificuldade: 11, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
          { texto: 'Atacar com lança enquanto ele está desorientado', proximoId: 'fim_heroi' }
        ]
      },
      {
        id: 'bolha',
        texto: `A bolha mágica te protege da corrente do dragão. Ele para, curioso.`,
        imagemFundo: require('../assets/backgrounds/cidade.jpg'),
        opcoes: [
          { texto: 'Nadar calmamente para cima, passando por ele', proximoId: 'fim_neutro' },
          { texto: 'Aproveitar para atacar com a lança', proximoId: 'fim_ruim' }
        ]
      },
      {
        id: 'flagrado',
        texto: `O dragão se aproxima e circunda você rapidamente — sua presa está identificada.`,
        imagemFundo: require('../assets/backgrounds/cidade.jpg'),
        opcoes: [
          { texto: 'Escapar entre corredores submersos', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
        ]
      },
      { id: 'fim_heroi', texto: 'Você perfura a guela do dragão e triunfa com coragem.', imagemFundo: require('../assets/backgrounds/cidade.jpg'), opcoes: [] },
      { id: 'fim_neutro', texto: 'O dragão deixa você partir — respeito conquistado.', imagemFundo: require('../assets/backgrounds/cidade.jpg'), opcoes: [] },
      { id: 'fim_fuga', texto: 'Você emerge com vida — custou seu equipamento submarino.', imagemFundo: require('../assets/backgrounds/cidade.jpg'), opcoes: [] },
      { id: 'fim_ruim', texto: 'O dragão te agarra com sua cauda e te afunda.', imagemFundo: require('../assets/backgrounds/cidade.jpg'), opcoes: [] },
    ];
  }

  //caso 6 floresta + sentinelas
  if (local.includes('floresta') && desafio.includes('sentinelas')) {
    return [
      {
      id: 'inicio',
      texto: `Na Floresta das Sombras, cinco sentinelas robôs patrulham entre as árvores, escaneando tudo com seus sensores vermelhos. O que você faz?`,
      imagemFundo: require('../assets/backgrounds/floresta.jpg'),
      opcoes: [
        { texto: 'Tentar se esconder nas sombras', dificuldade: 11, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
        { texto: 'Subir numa árvore e observar', proximoId: 'observar' },
        { texto: 'Atacar diretamente', proximoId: 'fim_ruim' }
      ]
    },
    {
      id: 'esconder',
      texto: `Você se esconde entre as folhagens escuras, torcendo para que os sensores não detectem seu calor corporal.`,
      imagemFundo: require('../assets/backgrounds/floresta.jpg'),
      opcoes: [
        { texto: 'Tentar fugir em silêncio', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
        { texto: 'Observar os robôs de longe', proximoId: 'observar' }
      ]
    },
    {
      id: 'observar',
      texto: `Você percebe que os sentinelas estão protegendo uma torre camuflada no meio da floresta e também uma clareira com uma antena.`,
      imagemFundo: require('../assets/backgrounds/floresta.jpg'),
      opcoes: [
        { texto: 'Ir até a torre', proximoId: 'torre' },
        { texto: 'Investigar a antena', proximoId: 'antena' }
      ]
    },
    {
      id: 'torre',
      texto: `Na torre, você encontra um EMP portátil que pode desativar os robôs.`,
      imagemFundo: require('../assets/backgrounds/floresta.jpg'),
      opcoes: [
        { texto: 'Usar o EMP e escapar', proximoId: 'fim_heroi' }
      ]
    },
    {
      id: 'antena',
      texto: `Você hackeia a antena e consegue confundir os sensores das sentinelas temporariamente.`,
      imagemFundo: require('../assets/backgrounds/floresta.jpg'),
      opcoes: [
        { texto: 'Escapar enquanto estão desorientadas', proximoId: 'fim_fuga' },
        { texto: 'Atacar agora', proximoId: 'fim_heroi' }
      ]
    },
    {
      id: 'flagrado',
      texto: `Um dos sentinelas detecta você e emite um alarme. Os outros correm em sua direção.`,
      imagemFundo: require('../assets/backgrounds/floresta.jpg'),
      opcoes: [
        { texto: 'Correr desesperadamente', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
      ]
    },
    {
      id: 'fim_fuga', texto: 'Você escapa por pouco, escondendo-se até a patrulha passar.', imagemFundo: require('../assets/backgrounds/floresta.jpg'), opcoes: [] },
    {
      id: 'fim_heroi', texto: 'Você neutraliza os sentinelas e deixa a floresta em paz.', imagemFundo: require('../assets/backgrounds/floresta.jpg'), opcoes: [] },
    {
      id: 'fim_ruim', texto: 'Os sentinelas te cercam e você é imobilizado rapidamente.', imagemFundo: require('../assets/backgrounds/floresta.jpg'), opcoes: [] }
    ];
  }

  // caso 7: castelo + sentinelas
  if (local.includes('floresta') && desafio.includes('sentinelas')) {
    return [
      {
      id: 'inicio',
      texto: `No interior do Castelo Abandonado, cinco sentinelas robôs de segurança ainda funcionam e patrulham os corredores antigos.`,
      imagemFundo: require('../assets/backgrounds/castelo.jpg'),
      opcoes: [
        { texto: 'Tentar se esconder entre os escombros', dificuldade: 12, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
        { texto: 'Explorar os andares superiores', proximoId: 'observar' },
        { texto: 'Atacar um dos robôs', proximoId: 'fim_ruim' }
      ]
    },
    {
      id: 'esconder',
      texto: `Você se esconde entre pedras caídas e tapeçarias antigas, observando os robôs.`,
      imagemFundo: require('../assets/backgrounds/castelo.jpg'),
      opcoes: [
        { texto: 'Esperar uma brecha para fugir', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
        { texto: 'Explorar os andares superiores', proximoId: 'observar' }
      ]
    },
    {
      id: 'observar',
      texto: `Nos andares superiores, você encontra uma sala de controle esquecida com um painel enferrujado.`,
      imagemFundo: require('../assets/backgrounds/castelo.jpg'),
      opcoes: [
        { texto: 'Hackear o painel', dificuldade: 11, proximoId: 'fim_heroi', proximoIdFalha: 'flagrado' },
        { texto: 'Voltar para o térreo', proximoId: 'inicio' }
      ]
    },
    {
      id: 'flagrado',
      texto: `Os robôs detectam sua presença e iniciam protocolo de contenção.`,
      imagemFundo: require('../assets/backgrounds/castelo.jpg'),
      opcoes: [
        { texto: 'Tentar fugir pela entrada', dificuldade: 11, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
      ]
    },
    {
      id: 'fim_fuga', texto: 'Você escapa do castelo antes que os sentinelas te alcancem.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] },
    {
      id: 'fim_heroi', texto: 'Você desativa o sistema central dos robôs e torna o castelo seguro novamente.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] },
    {
      id: 'fim_ruim', texto: 'Os robôs te imobilizam e ativam o protocolo de aprisionamento.', imagemFundo: require('../assets/backgrounds/castelo.jpg'), opcoes: [] }
    ]
  }

  // caso 8: caverna + sentinelas
  if (local.includes('caverna') && desafio.includes('sentinelas')) {
  return [
    {
      id: 'inicio',
      texto: `Você adentra a reluzente Caverna de Cristal, onde cinco sentinelas robôs patrulham corredores espelhados de cristal. Seus movimentos ecoam. O que você faz?`,
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: [
        { texto: 'Tentar se camuflar entre os cristais', dificuldade: 11, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
        { texto: 'Observar o padrão de patrulha', proximoId: 'observar' },
        { texto: 'Atacar diretamente', proximoId: 'fim_ruim' }
      ]
    },
    {
     id: 'esconder',
     texto: `Você se esconde entre cristais luminosos, tentando evitar o reflexo dos sensores.`,
     imagemFundo: require('../assets/backgrounds/caverna.jpg'),
     opcoes: [
      { texto: 'Fugir em silêncio', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
      { texto: 'Permanecer imóvel e analisar', proximoId: 'observar' }
      ]
    },
    {
      id: 'flagrado',
      texto: `Um dos sentinelas detecta sua presença! Uma luz vermelha acende.`,
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: [
        { texto: 'Tentar correr', dificuldade: 11, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
      ]
    },
    {
      id: 'observar',
      texto: `Você nota uma câmara de controle no centro da caverna e um painel de energia protegido por lasers.`,
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: [
        { texto: 'Tentar hackear o painel', proximoId: 'painel' },
        { texto: 'Invadir a câmara de controle', proximoId: 'controle' }
      ]
    },
    {
      id: 'painel',
      texto: `Você acessa o painel de energia. Um teste de lógica é exigido.`,
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: [
        { texto: 'Hackear o sistema', dificuldade: 13, proximoId: 'fim_heroi', proximoIdFalha: 'flagrado' }
      ]
    },
    {
      id: 'controle',
      texto: `Você chega à câmara e encontra um dispositivo que desativa os robôs.`,
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: [
        { texto: 'Ativar o dispositivo', proximoId: 'fim_heroi' }
      ]
    },
    {
      id: 'fim_fuga',
      texto: 'Você escapa silenciosamente da Caverna de Cristal, evitando confrontos.',
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: []
    },
    {
      id: 'fim_heroi',
      texto: 'Com habilidade e precisão, você desativa os sentinelas e conquista a caverna!',
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: []
    },
    {
      id: 'fim_ruim',
      texto: 'Você foi capturado pelos sentinelas. Missão encerrada.',
      imagemFundo: require('../assets/backgrounds/caverna.jpg'),
      opcoes: [] }
    ]
  }

  // caso 9: templo + sentinelas
   if (local.includes('templo') && desafio.includes('sentinelas')) {
    return [
      {
  id: 'inicio',
  texto: `Você entra no Templo Perdido, surpreendentemente preservado e agora guardado por cinco sentinelas robôs com inscrições antigas gravadas em seus corpos. O que você faz?`,
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: [
    { texto: 'Tentar se esconder entre colunas quebradas', dificuldade: 11, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
    { texto: 'Observar os padrões de patrulha', proximoId: 'observar' },
    { texto: 'Atacar diretamente', proximoId: 'fim_ruim' }
  ]
},
{
  id: 'esconder',
  texto: `Você se esconde nas sombras das colunas antigas.`,
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: [
    { texto: 'Tentar fugir silenciosamente', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
    { texto: 'Esperar por uma brecha', proximoId: 'observar' }
  ]
},
{
  id: 'flagrado',
  texto: `Um sentinela avança com braços de lâminas. Você foi visto!`,
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: [
    { texto: 'Correr pelas escadarias', dificuldade: 11, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
  ]
},
{
  id: 'observar',
  texto: `Você avista um painel antigo conectado à energia dos robôs e uma sala com artefatos.`,
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: [
    { texto: 'Acessar o painel', proximoId: 'painel' },
    { texto: 'Explorar a sala dos artefatos', proximoId: 'artefatos' }
  ]
},
{
  id: 'painel',
  texto: `O painel exige decifrar uma runa digital.`,
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: [
    { texto: 'Decifrar o enigma', dificuldade: 13, proximoId: 'fim_heroi', proximoIdFalha: 'flagrado' }
  ]
},
{
  id: 'artefatos',
  texto: `Você encontra um amuleto que emite um pulso eletromagnético.`,
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: [
    { texto: 'Usar o amuleto contra os robôs', proximoId: 'fim_heroi' }
  ]
},
{
  id: 'fim_fuga',
  texto: 'Você escapa do templo sem alertar os guardiões metálicos.',
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: []
},
{
  id: 'fim_heroi',
  texto: 'Você desativa os sentinelas e explora os segredos do templo!',
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: []
},
{
  id: 'fim_ruim',
  texto: 'Os sentinelas te capturam. Sua missão fracassou.',
  imagemFundo: require('../assets/backgrounds/templo.jpg'),
  opcoes: []
}
    ]
   }

  // caso 10: cidade submersa + sentinelas
   if (local.includes('cidade submersa') && desafio.includes('sentinelas')) {
    return [
      {
  id: 'inicio',
  texto: `Nas ruínas da Cidade Submersa, você se depara com cinco sentinelas aquáticos patrulhando os túneis alagados com luzes piscantes. O que você faz?`,
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: [
    { texto: 'Tentar nadar pelos escombros', dificuldade: 11, proximoId: 'esconder', proximoIdFalha: 'flagrado' },
    { texto: 'Observar através de uma escotilha', proximoId: 'observar' },
    { texto: 'Atacar os sentinelas com um arpão', proximoId: 'fim_ruim' }
  ]
},
{
  id: 'esconder',
  texto: `Você se move entre destroços, evitando os feixes de luz.`,
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: [
    { texto: 'Tentar fugir por uma saída de emergência', dificuldade: 12, proximoId: 'fim_fuga', proximoIdFalha: 'flagrado' },
    { texto: 'Esperar por uma chance de ação', proximoId: 'observar' }
  ]
},
{
  id: 'flagrado',
  texto: `Os sentinelas detectam movimento e ativam torpedos-sonda!`,
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: [
    { texto: 'Nadar rapidamente para fora', dificuldade: 11, proximoId: 'fim_fuga', proximoIdFalha: 'fim_ruim' }
  ]
},
{
  id: 'observar',
  texto: `Você vê um laboratório de controle inundado parcialmente e um compartimento com baterias antigas.`,
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: [
    { texto: 'Ir até o laboratório e tentar reprogramar os robôs', proximoId: 'laboratorio' },
    { texto: 'Usar as baterias para causar uma sobrecarga', proximoId: 'baterias' }
  ]
},
{
  id: 'laboratorio',
  texto: `Os consoles ainda funcionam. Você tenta acesso ao controle dos sentinelas.`,
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: [
    { texto: 'Reprogramar os sentinelas', dificuldade: 13, proximoId: 'fim_heroi', proximoIdFalha: 'flagrado' }
  ]
},
{
  id: 'baterias',
  texto: `Você conecta as baterias a um canal de energia. Uma sobrecarga se inicia.`,
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: [
    { texto: 'Ativar a sobrecarga', proximoId: 'fim_heroi' }
  ]
},
{
  id: 'fim_fuga',
  texto: 'Você nada até a superfície e escapa ileso.',
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: []
},
{
  id: 'fim_heroi',
  texto: 'Você elimina os sentinelas e conquista os segredos da cidade!',
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: []
},
{
  id: 'fim_ruim',
  texto: 'Os robôs submarinos te alcançam. Fim da linha.',
  imagemFundo: require('../assets/backgrounds/cidade.jpg'),
  opcoes: []
}
    ]
   }

  // CASO PADRÃO: Sem narrativa específica
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

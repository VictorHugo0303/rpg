import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { gerarAventura, Aventura as AventuraTipo } from '../components/generator';
import { gerarHistoria, Historia, Escolha } from '../components/historia';
import { rolarDado } from '../components/dado';

export default function Aventura() {
  const [aventura, setAventura] = useState<AventuraTipo | null>(null);
  const [historia, setHistoria] = useState<Historia[] | null>(null);
  const [blocoAtual, setBlocoAtual] = useState<Historia | null>(null);
  const [resultadoDado, setResultadoDado] = useState<number | null>(null);
  const [mensagemDado, setMensagemDado] = useState<string>('');
  const [escolhaPendente, setEscolhaPendente] = useState<Escolha | null>(null);

  const iniciarAventura = () => {
    const novaAventura = gerarAventura();
    const narrativa = gerarHistoria(novaAventura);
    setAventura(novaAventura);
    setHistoria(narrativa);
    setBlocoAtual(narrativa[0]);
    setResultadoDado(null);
    setMensagemDado('');
    setEscolhaPendente(null);
  };

  const avancar = (proximoId: string) => {
    if (!historia) return;
    const proximo = historia.find(h => h.id === proximoId);
    setBlocoAtual(proximo || null);
    setResultadoDado(null);
    setMensagemDado('');
  };

  const escolherOpcao = (opcao: Escolha) => {
    if (opcao.dificuldade !== undefined) {
      setEscolhaPendente(opcao);
      setMensagemDado('Role o dado.');
    } else {
      avancar(opcao.proximoId);
    }
  };

  const resolverRolagem = () => {
    if (!escolhaPendente) return;

    const resultado = rolarDado();
    setResultadoDado(resultado);

    const sucesso = resultado >= (escolhaPendente.dificuldade ?? 0);
    const proximoId = sucesso ? escolhaPendente.proximoId : escolhaPendente.proximoIdFalha;

    if (proximoId) {
      const mensagem = sucesso
        ? `Sucesso! Você rolou ${resultado}.`
        : `Falha! Você rolou ${resultado}.`;

      setMensagemDado(mensagem);
      setTimeout(() => avancar(proximoId), 1500);
    } else {
      setMensagemDado('Caminho não definido para falha!');
    }

    setEscolhaPendente(null);
  };

  const renderConteudo = () => (
    <ScrollView contentContainerStyle={styles.overlay}>
      <Text style={styles.subtitle}>{aventura?.titulo}</Text>
      <Text style={styles.text}>{blocoAtual?.texto}</Text>

      {blocoAtual?.opcoes.map((opcao, index) => (
        <TouchableOpacity
          key={index}
          style={styles.customButton}
          onPress={() => escolherOpcao(opcao)}
        >
          <Text style={styles.buttonText}>
            {opcao.dificuldade !== undefined
              ? `${opcao.texto} (🎯 precisa ${opcao.dificuldade})`
              : opcao.texto}
          </Text>
        </TouchableOpacity>
      ))}

      {escolhaPendente && (
        <TouchableOpacity style={styles.customButton} onPress={resolverRolagem}>
          <Text style={styles.buttonText}>Rolar dado</Text>
        </TouchableOpacity>
      )}

      {mensagemDado !== '' && (
        <Text style={styles.text}>{mensagemDado}</Text>
      )}

      {blocoAtual?.opcoes.length === 0 && (
        <TouchableOpacity style={styles.customButton} onPress={iniciarAventura}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  if (!blocoAtual) {
    iniciarAventura();
    return null;
  }

  return blocoAtual?.imagemFundo ? (
    <ImageBackground
      source={blocoAtual.imagemFundo}
      style={styles.background}
      resizeMode="cover"
    >
      {renderConteudo()}
    </ImageBackground>
  ) : (
    <View style={styles.container}>
      {renderConteudo()}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.50)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  customButton: {
    backgroundColor: '#090040',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

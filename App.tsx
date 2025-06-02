import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { gerarAventura, Aventura } from './components/generator';
import { gerarHistoria, Historia, Escolha } from './components/historia';
import { rolarDado } from './components/dado';

export default function App() {
  const [aventura, setAventura] = useState<Aventura | null>(null);
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
      setMensagemDado('Role o dado.')
    } else {
      avancar(opcao.proximoId);
    }
  };

  const resolverRolagem = () => {
    if(!escolhaPendente) return;

    const resultado = rolarDado();
    setResultadoDado(resultado);
    
    const sucesso = resultado >= (escolhaPendente.dificuldade ?? 0);

    const proximoId = sucesso
    ? escolhaPendente.proximoId
    : escolhaPendente.proximoIdFalha;

    if (proximoId) {
      const mensagem = sucesso

      ? `Sucesso! Você rolou ${resultado}.`
      : `Falha! Você rolou ${resultado}.`;

      setMensagemDado(mensagem);
      setTimeout(() => avancar(proximoId), 1500);
    } else {
      setMensagemDado('Caminho não definido para falha!')
    }

    setEscolhaPendente(null);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎲 Aventura Interativa</Text>
      <Button title="Gerar Nova Aventura" onPress={iniciarAventura} />

      {aventura && blocoAtual && (
        <View style={styles.card}>
          <Text style={styles.subtitle}>{aventura.titulo}</Text>
          <Text style={styles.text}>{blocoAtual.texto}</Text>

          {blocoAtual.opcoes.map((opcao, index) => (
            <View key={index} style={styles.buttonContainer}>
              <Button
                title={
                  opcao.dificuldade !== undefined
                    ? `${opcao.texto} (🎯 precisa ${opcao.dificuldade})`
                    : opcao.texto
                }
                onPress={() => escolherOpcao(opcao)}
              />
            </View>
          ))}

          {escolhaPendente && (
            <View style={styles.buttonContainer}>
              <Button title='Rolar dado' onPress={resolverRolagem}/>
            </View>
          )}

          {mensagemDado !== '' && (
            <Text style={styles.text}>{mensagemDado}</Text>
          )}

          {blocoAtual.opcoes.length === 0 && (
            <View style={styles.buttonContainer}>
              <Button title="Reiniciar" onPress={iniciarAventura} />
            </View>
          )}  
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 10,
    width: '100%',
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
  buttonContainer: {
    marginVertical: 5,
  },
});

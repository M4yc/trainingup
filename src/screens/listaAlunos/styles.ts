import { StyleSheet } from 'react-native';

const Colors = {
  fundo: '#211d28',
  primary: '#44BF86',
  auxiliar: '#00908E',
  white: '#FFFFFF',
  bordas: '#333333',
  auxiliar2: '#2A2634',
  error: '#FF6B6B',
  warning: '#FFA500'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.white
  },
  filtrosContainer: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  filtroGrupo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24
  },
  filtroLabel: {
    color: Colors.white,
    fontSize: 16,
    marginRight: 12
  },
  filtroButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.auxiliar2,
    marginRight: 8
  },
  filtroButtonAtivo: {
    backgroundColor: Colors.primary
  },
  filtroButtonText: {
    color: Colors.white,
    fontSize: 14
  },
  filtroButtonTextoAtivo: {
    fontWeight: 'bold'
  },
  ordenacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16
  },
  ordenacaoLabel: {
    color: Colors.white,
    fontSize: 16,
    marginRight: 12
  },
  ordenacaoButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.auxiliar2,
    marginRight: 8
  },
  ordenacaoButtonAtivo: {
    backgroundColor: Colors.auxiliar
  },
  ordenacaoButtonText: {
    color: Colors.white,
    fontSize: 14
  },
  ordenacaoButtonTextoAtivo: {
    fontWeight: 'bold'
  },
  listaContainer: {
    padding: 16
  },
  alunoCard: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  alunoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4
  },
  alunoIdade: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold'
  },
  alunoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8
  },
  avaliacaoContainer: {
    backgroundColor: Colors.fundo,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  avaliacaoTitle: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 8
  },
  avaliacaoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avaliacaoItem: {
    alignItems: 'center'
  },
  avaliacaoLabel: {
    color: Colors.white,
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4
  },
  avaliacaoValor: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  treinosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  treinoInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  treinoTexto: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8
  },
  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  acaoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4
  },
  acaoText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8
  }
});

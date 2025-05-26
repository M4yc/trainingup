import { StyleSheet } from 'react-native';

const Colors = {
  fundo: '#211d28',
  primary: '#44BF86',
  auxiliar: '#00908E',
  white: '#FFFFFF',
  bordas: '#333333',
  auxiliar2: '#2A2634',
  error: '#FF6B6B',
  warning: '#FFA500',
  success: '#44BF86'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo
  },
  header: {
    padding: 16,
    backgroundColor: Colors.auxiliar2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordas
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8
  },
  content: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  card: {
    flex: 1,
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  cardIcon: {
    marginRight: 8
  },
  cardTitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  cardFooterText: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.6,
    marginLeft: 4
  },
  chartContainer: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8
  },
  legendText: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.8
  },
  table: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    overflow: 'hidden'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.bordas,
    padding: 12
  },
  tableHeaderCell: {
    flex: 1,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordas,
    padding: 12
  },
  tableCell: {
    flex: 1,
    color: Colors.white,
    fontSize: 14
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '500'
  }
});

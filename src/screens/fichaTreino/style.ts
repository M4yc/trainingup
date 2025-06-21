import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10
  },
  title: {
    paddingLeft: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#44bf86',
    marginBottom: 8
  },
  subtitle: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#aaa',
    marginTop: 3
  },
  content: {
    flex: 1,
    padding: 16
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#44BF86',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  card: {
    backgroundColor: '#211d28',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#44BF86'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4
  },
  cardContent: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#44BF86',
    paddingTop: 12
  },
  group: {
    marginBottom: 12,
    borderRadius: 10,
    padding: 10
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#fff'
  },
  exerciseItem: {
    fontSize: 14,
    color: '#fff',
    paddingLeft: 12,
    paddingVertical: 4,
    fontWeight: 500
  },
  exerciseBlock: {
    backgroundColor: '#3a344a',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  exerciseInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%'
  },
  exerciseInfo: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '400'
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  expandIconContainer: {
    alignItems: 'center',
    marginTop: 12
  }
});

export default styles;

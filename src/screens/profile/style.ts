import { StyleSheet } from 'react-native';

const Colors = {
  fundo: '#211d28',
  primary: '#44BF86',
  auxiliar: '#00908E',
  white: '#FFFFFF',
  bordas: '#333333',
  auxiliar2: '#2A2634',
  error: '#FF6B6B'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Colors.auxiliar2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordas
  },
  avatarContainer: {
    marginBottom: 16
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.primary
  },
  editAvatarButton: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 20
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4
  },
  userEmail: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 16
  },
  statusBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20
  },
  statusText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500'
  },
  content: {
    flex: 1,
    padding: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16
  },
  menuSection: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    marginBottom: 24
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordas
  },
  menuItemLast: {
    borderBottomWidth: 0
  },
  menuItemDanger: {
    borderBottomWidth: 0
  },
  menuIcon: {
    marginRight: 16,
    width: 32,
    alignItems: 'center'
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: Colors.white
  },
  menuTextDanger: {
    color: Colors.error
  },
  chevronIcon: {
    opacity: 0.5
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.auxiliar2,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4
  },
  statLabel: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8
  }
});

export default styles;

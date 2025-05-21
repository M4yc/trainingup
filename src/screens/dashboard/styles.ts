import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    paddingHorizontal: 16
  },
  mainTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 16
  },
  contentContainer: {
    padding: 16
  },
  workoutCard: {
    marginBottom: 20
  },
  workoutBackground: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden'
  },
  workoutContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between'
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  workoutSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4
  },
  workoutInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  workoutInfoText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16
  }
});

export default styles;

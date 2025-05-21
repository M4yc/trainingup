import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginHorizontal: 16
  },
  containerDay: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 70,
    borderRadius: 8
  },
  dayCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 4
  },
  dayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500'
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500'
  },
  currentDay: {
    borderColor: '#4be381',
    borderWidth: 2,
    backgroundColor: 'transparent'
  },
  trainedDay: {
    backgroundColor: '#4be381',
    borderColor: '#4be381'
  },
  missedDay: {
    borderColor: '#ff4d4d',
    backgroundColor: 'rgba(255, 77, 77, 0.1)'
  },
  futureDay: {
    borderColor: '#666',
    backgroundColor: 'transparent'
  },
  statusContainer: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 2
  }
});

export default styles;

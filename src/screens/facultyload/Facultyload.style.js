import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  teacherName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1d1d1f',
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1d1d1f',
  },
  tableBorderStyle: {
    borderWidth: 2,
    borderColor: '#000',
  },
  tableHeader: {
    height: 30, 
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1d1d1f',
    
  },
  dayHeading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#0398fc',
  },
  tableRow: {
    flexDirection: 'row',
  },
  dayRow: {
    backgroundColor: '#e6f2ff',
  },
  defaultRow: {
    backgroundColor: '#ffffff',
  },
  dayText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'blue',
  },
  cellText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  subjectText: {
    color: '#fc0703', 
  },
  classText: {
    color: '#013220', 
  },
  timingText: {
    color: '#b603fc', 
  },
});
export default styles;



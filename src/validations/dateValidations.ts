export const isValidDate = (dateStr: string): boolean => {
  const [day, month, year] = dateStr.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  return !isNaN(date.getTime());
};

export const isAfter = (dateStr1: string, dateStr2: string): boolean => {
  const [day1, month1, year1] = dateStr1.split('/');
  const [day2, month2, year2] = dateStr2.split('/');
  
  const date1 = new Date(`${year1}-${month1}-${day1}`);
  const date2 = new Date(`${year2}-${month2}-${day2}`);
  
  return date2 > date1;
};
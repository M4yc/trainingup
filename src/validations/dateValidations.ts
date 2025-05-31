export const isValidDate = (dateStr: string): boolean => {
  const [day, month, year] = dateStr.split('/').map(Number);
  
  // Verifica se os valores são números válidos
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }
  
  // Verifica limites básicos
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    return false;
  }
  
  // Verifica meses com 30 dias
  if ([4, 6, 9, 11].includes(month) && day > 30) {
    return false;
  }
  
  // Verifica fevereiro
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (isLeapYear && day > 29) {
      return false;
    }
    if (!isLeapYear && day > 28) {
      return false;
    }
  }
  
  return true;
};

export const isAfter = (dateStr1: string, dateStr2: string): boolean => {
  const [day1, month1, year1] = dateStr1.split('/').map(Number);
  const [day2, month2, year2] = dateStr2.split('/').map(Number);
  
  const date1 = new Date(year1, month1 - 1, day1);
  const date2 = new Date(year2, month2 - 1, day2);
  
  // Zera as horas para comparar apenas as datas
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  
  return date2 > date1;
};
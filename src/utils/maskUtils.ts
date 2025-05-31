// src/utils/maskUtils.ts

export const mascaraData = (valor: string) => {
  // Remove tudo que não for número
  const apenasNumeros = valor.replace(/\D/g, '');
  
  // Aplica a máscara DD/MM/AAAA
  let dataFormatada = apenasNumeros;
  
  // Adiciona a primeira barra após o dia
  if (apenasNumeros.length > 2) {
    const dia = parseInt(apenasNumeros.substring(0, 2));
    if (dia > 31) {
      dataFormatada = `31/${apenasNumeros.substring(2)}`;
    } else {
      dataFormatada = `${apenasNumeros.substring(0, 2)}/${apenasNumeros.substring(2)}`;
    }
  }
  
  // Adiciona a segunda barra após o mês
  if (apenasNumeros.length > 4) {
    const mes = parseInt(apenasNumeros.substring(2, 4));
    if (mes > 12) {
      dataFormatada = `${dataFormatada.substring(0, 3)}12/${apenasNumeros.substring(4, 8)}`;
    } else {
      dataFormatada = `${dataFormatada.substring(0, 5)}/${apenasNumeros.substring(4, 8)}`;
    }
  }
  
  // Limita o ano a 4 dígitos
  if (dataFormatada.length > 10) {
    dataFormatada = dataFormatada.substring(0, 10);
  }
  
  return dataFormatada;
};
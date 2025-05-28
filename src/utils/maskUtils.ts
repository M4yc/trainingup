// src/utils/maskUtils.ts

export const mascaraData = (valor: string) => {
  // Remove tudo que não for número
  const apenasNumeros = valor.replace(/\D/g, '');
  
  // Aplica a máscara DD/MM/AAAA
  let dataFormatada = apenasNumeros;
  if (apenasNumeros.length > 0) {
    // Adiciona a primeira barra após o dia
    if (apenasNumeros.length > 2) {
      dataFormatada = `${apenasNumeros.substring(0, 2)}/${apenasNumeros.substring(2)}`;
    }
    // Adiciona a segunda barra após o mês
    if (apenasNumeros.length > 4) {
      dataFormatada = `${dataFormatada.substring(0, 5)}/${apenasNumeros.substring(4, 8)}`;
    }
  }
  
  return dataFormatada;
};
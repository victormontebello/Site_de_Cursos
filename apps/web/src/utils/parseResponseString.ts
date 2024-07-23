

const parseResponseString = (responseString) => {
  // Remove a parte inicial "[Document{" e final "}]" da string
  const cleanedString = responseString.replace(/\[Document\{\{|\}\}\]/g, '');
  
  // Separa os campos pelo delimitador ", "
  const fields = cleanedString.split(', ');

  // Cria um objeto para armazenar os dados
  const jsonObject = {};

  // Itera sobre os campos e separa chave e valor
  fields.forEach(field => {
    const [key, value] = field

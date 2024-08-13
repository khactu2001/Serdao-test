var IBAN = require('iban');

const validateIban = (ibanText: string) => {
  return IBAN.isValid(ibanText);
};

export { validateIban }
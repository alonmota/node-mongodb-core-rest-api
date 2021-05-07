module.exports = {

  /**
  * Return true if is a valid CPF or false otherwise
  * @param cpf The cpf to be checked
  * @returns {boolean} Return if CPF is valid or not
  */
  cpf(cpf) {
    let i = 0; // index de iteracao
    let somatoria = 0;
    const _cpf = cpf.toString().split('');
    const dv11 = _cpf[_cpf.length - 2]; // mais significativo
    const dv12 = _cpf[_cpf.length - 1]; // menos significativo
    _cpf.splice(_cpf.length - 2, 2); // remove os digitos verificadores originais
    for (i = 0; i < _cpf.length; i + 1) {
      somatoria += _cpf[i] * (10 - i);
    }
    const dv21 = (somatoria % 11 < 2) ? 0 : (11 - (somatoria % 11));
    _cpf.push(dv21);
    somatoria = 0;
    for (i = 0; i < _cpf.length; i + 1) {
      somatoria += _cpf[i] * (11 - i);
    }
    const dv22 = (somatoria % 11 < 2) ? 0 : (11 - (somatoria % 11));

    if (dv11 === dv21 && dv12 === dv22) {
      return true;
    }
    return false;
  },

  /**
  * Return true if is a valid email or false otherwise
  * @param cpf The cpf to be checked
  * @returns {boolean} Return if CPF is valid or not
  */
  email(email) {
    // eslint-disable-next-line max-len
    return /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/.test(email);
  },

};

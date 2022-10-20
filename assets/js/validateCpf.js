export class ValidateCpf {
  constructor(cpfSent) {
    Object.defineProperty(this, 'cleanCpf', {
      enumerable: true,
      get: function() {
        return cpfSent.replace(/\D+/g, '');
      }
    });
  }

  validate() {
    if(typeof this.cleanCpf === 'undefined') return false;
    if(this.cleanCpf.length !== 11) return false;
    if(this.isSequency()) return false;
    
    const partialCpf = this.cleanCpf.slice(0, -2);
    const digit1 = this.criaDigito(partialCpf);
    const digit2 = this.criaDigito(partialCpf + digit1);
  
    const newCpf = partialCpf + digit1 + digit2;
    return newCpf === this.cleanCpf;
  }

  criaDigito(partialCpf) {
    const cpfArray = Array.from(partialCpf);

    let regressive = cpfArray.length + 1;
    const total = cpfArray.reduce((amount, value) => {
      amount += (Number(value) * regressive);
      regressive--;
      return amount;
    }, 0);
  
    const digit = 11 - (total % 11);
    return digit > 9 ? '0' : String(digit);
  }

  isSequency() {
    const sequency = this.cleanCpf[0].repeat(this.cleanCpf.length);
    return sequency === this.cleanCpf;
  }
}
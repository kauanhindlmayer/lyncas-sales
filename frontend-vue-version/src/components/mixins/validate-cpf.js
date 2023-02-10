const validateCPF = {
  data() {
    return {
      cleanCpf: "",
    };
  },
  methods: {
    validCPF(cpfSent) {
      this.cleanCpf = cpfSent.toString().replace(/\D+/g, "");
      if (typeof this.cleanCpf === "undefined") return false;
      if (this.cleanCpf.length !== 11) return false;
      if (this.isSequency()) return false;

      const partialCpf = this.cleanCpf.slice(0, -2);
      const firstDigit = this.createDigit(partialCpf);
      const secondDigit = this.createDigit(partialCpf + firstDigit);

      const newCpf = partialCpf + firstDigit + secondDigit;
      console.log(newCpf);
      return newCpf === this.cleanCpf;
    },

    createDigit(partialCpf) {
      const cpfArray = Array.from(partialCpf);

      let regressive = cpfArray.length + 1;
      const total = cpfArray.reduce((amount, value) => {
        amount += Number(value) * regressive;
        regressive--;
        return amount;
      }, 0);

      const digit = 11 - (total % 11);
      return digit > 9 ? "0" : String(digit);
    },

    isSequency() {
      const sequency = this.cleanCpf[0].repeat(this.cleanCpf.length);
      return sequency === this.cleanCpf;
    },
  },
};

export default validateCPF;

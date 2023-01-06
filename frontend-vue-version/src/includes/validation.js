import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minVal);
    defineRule("max_value", maxVal);
    defineRule("passwords_mismatch", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `Campo ${ctx.field} é obrigatório.`,
          min: `Campo ${ctx.field} é muito curto.`,
          max: `Campo ${ctx.field} é muito longo.`,
          alpha_spaces: `Campo ${ctx.field} só pode conter caracteres alfabéticos e espaços.`,
          email: `Campo ${ctx.field} precisa ser um e-mail válido.`,
          min_value: `Campo ${ctx.field} é muito baixo.`,
          max_value: `Campo ${ctx.field} é muito alto.`,
          passwords_mismatch: `As senhas não conferem.`,
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `Campo ${ctx.field} inválido.`;

        return message;
      },

      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};

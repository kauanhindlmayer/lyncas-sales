<template>
  <div>
    <label v-if="!hideLabel">
      {{ label }}
      <!-- <span class="error-message" v-if="required">*</span> -->
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      class="input"
      v-model="content"
      @input="input"
    />
    <div class="error-message">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
// import ValidateCPF from "@/components/mixins/validate-cpf.js";

export default {
  name: "InputText",
  // mixins: [ValidateCPF],
  props: {
    type: { type: String, default: "text" },
    placeholder: { type: String },
    value: { Type: [String, Number], default: null },
    label: { Type: String },
    hideLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    minlength: { Type: Number },
    maxlength: { Type: Number },
    min: { type: [Number, String], required: false },
    max: { type: [Number, String], required: false },
    email: { type: Boolean, default: false },
    cpf: { type: Boolean, default: false },
  },
  data() {
    return {
      content: this.value,
      state: null,
      error_message: null,
    };
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
  },
  computed: {
    validEmail() {
      var regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExp.test(this.content);
    },
  },
  methods: {
    validation() {
      if (this.required && !this.content) {
        this.state = false;
        this.error_message = `Campo ${this.label} é obrigatório`;
        return false;
      }

      if (this.minlength && this.content.length < this.minlength) {
        this.state = false;
        this.error_message = `Campo ${this.label} precisa ter no mínimo ${this.minlength} caracteres`;
        return false;
      }

      if (this.maxlength && this.content.length > this.maxlength) {
        this.state = false;
        this.error_message = `Campo ${this.label} pode ter no máximo ${this.maxlength} caracteres`;
        return false;
      }

      if (this.min && Number(this.content) < this.min) {
        this.state = false;
        this.error_message = `Valor mínimo do ${this.label} de é ${this.min}`;
        return false;
      }

      if (this.max && Number(this.content) > this.max) {
        this.state = false;
        this.error_message = `Valor máximo do ${this.label} de é ${this.max}`;
        return false;
      }

      if (this.email && !this.validEmail) {
        this.state = false;
        this.error_message = `Campo ${this.label} inválido`;
        return false;
      }

      this.state = true;
      return true;
    },
    input() {
      this.$emit("update:modelValue", this.content);
    },
  },
};
</script>

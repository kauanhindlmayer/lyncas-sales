<template>
  <div>
    <label for="name-input">
      {{ label }}
      <span class="error-message" v-if="required">*</span>
    </label>
    <input v-model="content" @input="input" class="input" />
    <div class="error-message">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    value: { Type: [String, Number], default: null },
    label: { Type: String },
    required: { type: Boolean, default: false },
    minlength: { Type: Number },
    maxlength: { Type: Number },
    min: { type: [Number, String], required: false },
    max: { type: [Number, String], required: false },
    email: { type: Boolean, default: false },
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

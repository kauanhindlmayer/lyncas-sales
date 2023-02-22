<template>
  <div>
    <label :for="inputId" v-if="!hideLabel">
      {{ label }}
      <!-- <span class="text-danger" v-if="required">*</span> -->
    </label>
    <the-input-text
      :type="type"
      :placeholder="placeholder"
      :id="inputId"
      class="input"
      v-model="content"
      @input="input"
    />
    <div class="text-danger">
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
    value: { type: [String, Number], default: null },
    label: { type: String, required: true },
    hideLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    minlength: { type: [String, Number] },
    maxlength: { type: [String, Number] },
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
    inputId() {
      return `input-${this.label.toLowerCase()}`;
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
        this.error_message = `Valor mínimo do campo ${this.label} é ${this.min}`;
        return false;
      }

      if (this.max && Number(this.content) > this.max) {
        this.state = false;
        this.error_message = `Valor máximo do campo ${this.label} é ${this.max}`;
        return false;
      }

      if (this.email && !this.validEmail) {
        this.state = false;
        this.error_message = `Campo ${this.label} inválido`;
        return false;
      }

      this.error_message = null;
      this.state = true;
      return true;
    },
    input() {
      this.$emit("update:modelValue", this.content);
    },
  },
};
</script>

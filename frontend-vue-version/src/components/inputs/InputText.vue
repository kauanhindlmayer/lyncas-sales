<template>
  <div>
    <label for="name-input"> {{ label }} </label>
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
  },
  data() {
    return {
      content: this.value,
      state: null,
      error_message: null,
    };
  },
  methods: {
    validation() {
      if (this.required && !this.content) {
        this.state = false;
        this.error_message = `O campo ${this.label} é obrigatório.`;
        return false;
      }
      this.state = true;
      return true;
    },
    input() {
      this.$emit("update:modelValue", this.conteudo);
    },
  },
};
</script>

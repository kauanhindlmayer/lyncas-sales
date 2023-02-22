<template>
  <div>
    <label :for="inputId" v-if="!hideLabel">
      {{ label }}
      <!-- <span class="text-danger" v-if="required">*</span> -->
    </label>
    <p-input-mask
      :placeholder="placeholder"
      :mask="mask"
      :slotChar="slotChar"
      :autoClear="false"
      :id="inputId"
      class="input"
      v-model="content"
    />
    <div class="text-danger">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
import InputMask from "primevue/inputmask";

export default {
  name: "InputDate",
  components: {
    "p-input-mask": InputMask,
  },
  props: {
    placeholder: { type: String },
    mask: { type: String, default: "99/99/9999" },
    slotChar: { type: String, default: "dd/mm/aaaa" },
    value: { Type: [String, Number], default: null },
    label: { Type: String, required: true },
    hideLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    minlength: { Type: Number },
    maxlength: { Type: Number },
  },
  data() {
    return {
      content: this.value,
      state: null,
      error_message: null,
    };
  },
  computed: {
    inputId() {
      return `input-${this.label.toLowerCase()}`;
    },
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content() {
      this.$emit("update:modelValue", this.content);
    },
  },
  methods: {
    validation() {
      if (this.required && !this.content) {
        this.state = false;
        this.error_message = `Campo ${this.label} é obrigatório`;
        return false;
      }

      this.error_message = null;
      this.state = true;
      return true;
    },
  },
};
</script>

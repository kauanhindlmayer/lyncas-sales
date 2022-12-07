<template>
  <tr>
    <td class="table--left-corner">{{ props.name }}</td>
    <td>{{ props.email }}</td>
    <td>{{ props.phone }}</td>
    <td>{{ props.cpf }}</td>
    <td class="table--right-corner">
      <DeleteButton />
      <EditButton />
    </td>
  </tr>
</template>

<script setup>
import DeleteButton from "../../common/components/DeleteButton.vue";
import EditButton from "../../common/components/EditButton.vue";
const props = defineProps(["name", "email", "phone", "cpf"]);
</script>

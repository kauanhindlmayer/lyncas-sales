<template>
  <tr>
    <td class="table--left-corner">{{ props.name }}</td>
    <td>{{ props.quantity }}</td>
    <td>{{ props.saleDate }}</td>
    <td>{{ props.billingDate }}</td>
    <td>{{ props.totalValue }}</td>
    <td class="table--right-corner">
      <DeleteButton />
      <EditButton />
    </td>
  </tr>
</template>

<script setup>
import DeleteButton from "../../common/components/DeleteButton.vue";
import EditButton from "../../common/components/EditButton.vue";
const props = defineProps([
  "name",
  "quantity",
  "saleDate",
  "billingDate",
  "totalValue",
]);
</script>

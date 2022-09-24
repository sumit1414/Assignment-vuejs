<template>
  <div>
    <img alt="Logo" src="./assets/sportsbanner.png" class="rounded-md" />
    <Countries />
  </div>
</template>
<script>
import Countries from "./components/Countries.vue";

export default {
  components: {
    Countries,
  },
};
</script>

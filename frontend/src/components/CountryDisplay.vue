<template>
  <div>
    <b-card
      :title="country.name"
      :img-src="'http://localhost:8080/' + country.flag"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2 p-2"
      v-if="hasData"
    >
      <b-card-text> Rank: {{ country.rank }} </b-card-text>
    </b-card>
    <b-card v-else>
      <b-card-text> Please select a country from the dropdown </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    hasData() {
      return this.country && Object.keys(this.country).length;
    },
  },
};
</script>

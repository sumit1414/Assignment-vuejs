<template>
  <div class="container">
    <div class="row p-4">
      <div class="col-md-6">
        <div>
          <b-form-select
            v-model="selected"
            :options="options"
            class="countryselect"
          ></b-form-select>
        </div>
        <div class="mt-4">
          <country-display :country="country" />
        </div>
      </div>

      <div class="col-md-6">
        <div class="d-flex justify-content-center">
          <new-country-form @inserted="handleInserted" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../axios/index";
import CountryDisplay from "./CountryDisplay.vue";
import NewCountryForm from "./NewCountryForm.vue";

export default {
  components: { CountryDisplay, NewCountryForm },
  data() {
    return {
      selected: null,
      countries: [],
      country: {},
    };
  },
  watch: {
    selected(val) {
      if (!val) return;
      this.getCountry(val);
    },
  },
  computed: {
    countryNames() {
      return this.countries.map((x) => ({ text: x.name, value: x.id }));
    },
    options() {
      return [
        { value: null, text: "Please select a country", disabled: true },
        ...this.countryNames,
      ];
    },
  },
  methods: {
    async getCountries() {
      try {
        const { data } = await api.get("/countries");

        this.countries = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCountry(id) {
      try {
        const { data } = await api.get(`/country/${id}`);

        this.country = data;
      } catch (error) {
        console.log(error);
      }
    },
    handleInserted(data) {
      this.countries = [...this.countries, data];
    },
  },
  mounted() {
    this.getCountries();
  },
};
</script>

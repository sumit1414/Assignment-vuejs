<template>
  <b-card class="border-0 p-0 w-full px-4" no-body>
    <h4 class="text-left font-semibold">Add New Country</h4>
    <div class="mt-4">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-2"
          label-for="input-2"
          class="image-upload relative"
        >
          <div class="flex justify-center w-full items-center h-250px">
            <div class="">
              <img
                src="@/assets/cloud-computing.png"
                alt="cloud"
                class="cloud-img-w m-auto"
              />
              <p class="font-medium">Upload Country Image:</p>
            </div>
          </div>

          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept="image/png, image/jpeg"
            @change="handleFileChange"
            required
            class="choosefile-up"
          ></b-form-file>

          <b-form-invalid-feedback :state="fileValidation">
            <p>{{ error }}</p>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-1" label-for="input-1" class="mt-12 ">
          <label class="flex mb-2 font-medium">Country Name</label>
          <b-form-input
            id="input-1"
            v-model="name"
            type="text"
            placeholder="Enter Country Name"
            min="3"
            max="20"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="nameValidation">
            {{ error }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-3" label-for="input-3" class="mt-4">
          <label class="flex mb-2 font-medium">Continent</label>
          <b-form-select
            id="input-3"
            v-model="continent"
            :options="continents"
            required
            class="countryselect"
          ></b-form-select>
          <b-form-invalid-feedback :state="continentValidation">
            {{ error }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-4" label-for="input-4" class="mt-4">
          <label class="flex mb-2 font-medium">Enter Rank</label>
          <b-form-input
            id="input-2"
            v-model="rank"
            type="number"
            placeholder="Enter Rank"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="rankValidation">
            {{ error }}
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="mt-6">
          <b-button
            type="submit"
            variant="primary"
            class="btn-widthsize font-semibold"
            >Submit</b-button
          >
        </div>
      </b-form>
    </div>
  </b-card>
</template>

<script>
import api from "../axios/index";

export default {
  data() {
    return {
      continents: [],
      name: "",
      rank: "",
      continent: "",
      file: null,
      show: true,
      nameValidation: true,
      rankValidation: true,
      fileValidation: true,
      continentValidation: true,
      error: "",
    };
  },
  created() {
    this.getContinents();
  },
  methods: {
    async getContinents() {
      try {
        const { data } = await api.get("/continents");

        this.continents = data;
      } catch (error) {
        console.log(error);
      }
    },
    onSubmit(event) {
      event.preventDefault();
      this.handleSubmit();
    },
    onReset(event) {
      event.preventDefault();
      this.handleReset();
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    handleReset() {
      // Reset our form values
      this.name = "";
      this.rank = "";
      this.continent = "";
      this.file = null;

      this.nameValidation = true;
      this.rankValidation = true;
      this.fileValidation = true;
      this.continentValidation = true;
      this.error = "";
    },
    async handleSubmit() {
      if (!this.name) {
        this.nameValidation = false;
        this.error = "Name is required";
        return;
      }

      if (!this.continent) {
        this.continentValidation = false;
        this.error = "Continent is required";
        return;
      }

      if (!this.rank) {
        this.rankValidation = false;
        this.error = "Rank is required";
        return;
      }

      if (!this.file) {
        this.fileValidation = false;
        this.error = "Country Image is required";
        return;
      }

      const payload = new FormData();
      payload.append("name", this.name);
      payload.append("continent", this.continent);
      payload.append("rank", this.rank);
      payload.append("flag", this.file);

      try {
        const { data } = await api.post("/country", payload);

        this.$emit("inserted", data);
        this.handleSuccess();
      } catch (error) {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message === "Country name already exists"
        ) {
          this.nameValidation = false;
          this.error = error.response.data.message;
        }

        if (
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message === "Rank already exists"
        ) {
          this.rankValidation = false;
          this.error = error.response.data.message;
        }
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      const file = files[0];
      const max = 4 * 1000000;

      if (file.size > max) {
        this.fileValidation = false;
        this.error = "File size too big";
        e.target.value = null;
      } else if (!file.name.match(/\.(png|jpg)$/)) {
        this.fileValidation = false;
        this.error = "Invalid file type";
        e.target.value = null;
      }
    },
    handleSuccess() {
      this.handleReset();
    },
  },
};
</script>
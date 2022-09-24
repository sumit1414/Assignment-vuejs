const fs = require("fs");
const database = "./data/data.json";

const validations = require("../validations/country");

function getData() {
  return new Promise((resolve, reject) => {
    fs.readFile(database, "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
        reject(err);
      } else {
        // parse JSON string to JSON object
        const file = JSON.parse(data);
        resolve(file);
      }
    });
  });
}

function getCountries() {
  return new Promise(async (resolve, reject) => {
    try {
      const { countries } = await getData();

      resolve(formatCountries(countries));
    } catch (error) {
      reject(error);
    }
  });
}

function getCountry(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject("missing id field");
    }
    try {
      const { countries } = await getData();

      if (id < 1 || id > countries.length) {
        reject("invalid id");
      }
      resolve(countries[id - 1]);
    } catch (error) {
      reject(error);
    }
  });
}

function addCountry(country) {
  return new Promise(async (resolve, reject) => {
    try {
      const file = await getData();
      file.countries.push(country);

      fs.writeFile(database, JSON.stringify(file, null, 2), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
          reject(err);
        }
        resolve(formatCountries(file.countries).pop());
      });
    } catch (error) {
      reject(error);
    }
  });
}

function formatCountries(countries) {
  return countries.map((country, index) => ({
    name: country.name,
    id: index + 1,
  }));
}

function isPostDataValid(country) {
  return new Promise(async (resolve, reject) => {
    try {
      const { countries } = await getData();

      if (!country.name || !country.rank || !country.continent) {
        reject("required field(s) missing");
      }

      if (!validations.isCountryNameUnique(countries, country.name)) {
        reject("Country name already exists");
      }

      if (!validations.isRankUnique(countries, country.rank)) {
        reject("Rank already exists");
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

function getContinents() {
  return new Promise(async (resolve, reject) => {
    try {
      const { countries } = await getData();
      const continents = [...new Set(countries.map((x) => x.continent))];

      resolve(continents);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getCountries,
  getCountry,
  addCountry,
  isPostDataValid,
  getContinents,
};

const chai = require("chai");
const assert = chai.assert;

const countryController = require("../controllers/country");
describe("Unit Test", () => {
  it(`getCountries returns an array of countries`, async () => {
    const data = await countryController.getCountries();
    assert.isArray(data);

    assert.property(data[0], "id");
    assert.property(data[0], "name");
  });

  it(`getCountry returns an object of country`, async () => {
    const country = await countryController.getCountry(1);
    assert.isObject(country);

    assert.property(country, "name");
    assert.property(country, "continent");
    assert.property(country, "flag");
    assert.property(country, "rank");
  });

  it(`getCountry handles missing id`, async () => {
    try {
      await countryController.getCountry();
    } catch (error) {
      assert.equal(error, "missing id field");
    }
  });

  it(`getCountry handles invalid id`, async () => {
    try {
      await countryController.getCountry(20);
    } catch (error) {
      assert.equal(error, "invalid id");
    }
  });

  it(`getContinents returns an array of continents`, async () => {
    const continents = await countryController.getContinents();
    assert.isArray(continents);
  });

  it(`isPostDataValid handles missing fields`, async () => {
    const country = {
      name: "USA",
    };
    try {
      await countryController.isPostDataValid(country);
    } catch (error) {
      assert.equal(error, "required field(s) missing");
    }
  });

  it(`isPostDataValid handles unique country name`, async () => {
    const country = {
      name: "India",
      rank: 15,
      continent: "Europe",
      flag: "",
    };

    try {
      await countryController.isPostDataValid(country);
    } catch (error) {
      assert.equal(error, "Country name already exists");
    }
  });

  it(`isPostDataValid handles unique rank`, async () => {
    const country = {
      name: "Scotland",
      rank: 1,
      continent: "Europe",
      flag: "",
    };

    try {
      await countryController.isPostDataValid(country);
    } catch (error) {
      assert.equal(error, "Rank already exists");
    }
  });

  it(`isPostDataValid handles valid data`, async () => {
    const country = {
      name: "Ireland",
      rank: 15,
      continent: "Europe",
      flag: "",
    };

    const data = await countryController.isPostDataValid(country);
    assert.equal(data, true);
  });
});

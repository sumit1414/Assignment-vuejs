function isCountryNameUnique(data, name) {
  const index = data.findIndex((x) => x.name === name);
  // Country is unique if no index is found i.e -1
  return index === -1;
}

function isRankUnique(data, rank) {
  const index = data.findIndex((x) => x.rank == rank);
  // Rank is unique if no index is found i.e -1
  return index === -1;
}

module.exports = {
  isCountryNameUnique,
  isRankUnique,
};

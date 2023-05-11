class FeatureAPI {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  flitter() {
    this.queryString = this.queryString.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );
    const queryObj = JSON.parse(this.queryString);
    const options = ['page', 'sort', 'limit', 'fields'];
    options.forEach((ele) => delete queryObj[ele]);
    this.query.find(queryObj);
    return this;
  }

  sort() {
    const queryObj = JSON.parse(this.queryString);
    if (queryObj.sort) this.query.sort(queryObj.sort);
    return this;
  }
}

module.exports = FeatureAPI;

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
    const sortBy = queryObj.sort?.split(',').join(' ');
    if (sortBy) this.query.sort(sortBy);
    return this;
  }

  select() {
    const queryObj = JSON.parse(this.queryString);
    const fields = queryObj.fields?.split(',').join(' ');
    if (fields) this.query.select(fields);
    return this;
  }

  pagination() {
    const queryObj = JSON.parse(this.queryString);
    const page = +queryObj.page || 1;
    const limit = +queryObj.limit || 10;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = FeatureAPI;

class FeatureAPI {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  flitter() {
    const queryObj = { ...this.queryString };
    const options = ['page', 'sort', 'limit', 'fields'];

    Object.keys(queryObj).forEach((key) => {
      if (key === 'price' || key === 'ratingsAverage')
        queryObj[key] = Number(queryObj[key]);
      if (options.includes(key)) delete queryObj[key];
    });
    this.query.find(queryObj);
    console.log(queryObj);
    return this.query;
  }
}

module.exports = FeatureAPI;

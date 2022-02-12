class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    //   Remove some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price range
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;

      const skip = resultPerPage * (currentPage - 1); 
      /* ====================== 
      This skip functionality works like suppose resultperpage = 5, currentpage = visible page (which we view on website)
      we have 50 products total in our data base and we see 5 products in each page so 
      at 1st page (5 * (1 - 1)) means (5 * 0 = 0) means at first page there is 0 products to skip 
      now at second page (5 * (2 - 1)) = (5 * 1 = 5) means at second page this system shows the product from number 6
      and the same method works for each page.
      ========================= */

      this.query = this.query.limit(resultPerPage).skip(skip);
      return this;
  }
}

module.exports = ApiFeatures;

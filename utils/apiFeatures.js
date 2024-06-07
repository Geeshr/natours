class APIFeatures {
  constructor(query, queryString) {
    // Initialize APIFeatures with query and query string
    this.query = query;
    this.queryString = queryString;
  }

  // Method to filter documents based on query parameters
  filter() {
    // 1A) Filtering
    // Create a shallow copy of query string object
    const queryObj = { ...this.queryString };
    // Exclude fields from query parameters that are not meant for filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering with MongoDB operators
    // Convert query object to string and replace comparison operators with MongoDB operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Execute filtered query
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Method to sort documents based on query parameters
  sort() {
    // If sort parameter exists, sort documents accordingly, else sort by createdAt in descending order
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // Method to limit fields returned in documents based on query parameters
  limitFields() {
    // If fields parameter exists, select only specified fields, else exclude __v field
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // Method to paginate documents based on query parameters
  paginate() {
    // Extract page and limit parameters from query string, default to page 1 and limit 100 if not provided
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // Skip and limit documents based on pagination parameters
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

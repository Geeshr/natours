const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// Handler function to delete one document
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    // Find document by ID and delete
    const doc = await Model.findByIdAndDelete(req.params.id);

    // If no document found, send error
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // Send success response
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

// Handler function to update one document
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    // Find document by ID and update
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // If no document found, send error
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // Send success response with updated document
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Handler function to create one document
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    // Create document
    const doc = await Model.create(req.body);

    // Send success response with created document
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Handler function to get one document
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    // Populate referenced fields if specified
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    // If no document found, send error
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // Send success response with retrieved document
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Handler function to get all documents
exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    // If tour ID is provided in params, filter documents by tour ID
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // Apply API features such as filtering, sorting, pagination
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    
    // Execute query with applied features
    const doc = await features.query;
    
    // Send success response with retrieved documents
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

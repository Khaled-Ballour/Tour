const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppErrors');
const FeatureAPI = require('../utils/FeatureAPI');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return next(new AppError(`No data found with that ID`, 404));
    res.json({ status: 'success', data: null });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return next(new AppError(`No data found with that ID`, 404));
    res.json({ status: 'success', data });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    res.json({ status: 'success', data });
  });

exports.getOne = (Model, populateOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOption) query = query.populate(populateOption);
    const data = await query;
    if (!data) return next(new AppError(`No data found with that ID`, 404));
    res.json({ status: 'success', data });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const featureAPI = new FeatureAPI(
      Model.find(filter),
      JSON.stringify(req.query)
    );
    featureAPI.flitter().sort().select().pagination();
    const data = await featureAPI.query;
    res.json({ status: 'success', size: data.length, data });
  });

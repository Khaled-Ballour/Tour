const Tour = require('../Models/tourModel');
const FeatureAPI = require('../utils/FeatureAPI');
const catchAsync = require('../utils/catchAsync');

exports.getAllTours = catchAsync(async (req, res, next) => {
  const featureAPI = new FeatureAPI(Tour.find(), JSON.stringify(req.query));
  featureAPI.flitter().sort().select().pagination();
  const tours = await featureAPI.query;
  res.json({ status: 'success', size: tours.length, tours });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.json({ status: 'success', newTour });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json({ status: 'success', updatedTour });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  res.json({ status: 'success', data: null });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.json({ status: 'success', tour });
});

exports.getTourStats = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.json({ status: 'success', stats });
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getMonthlyPlan = async (req, res, next) => {
  try {
    const year = +req.params.year;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTourStarts: -1,
        },
      },
    ]);
    res.json({ status: 'success', plan });
  } catch (err) {
    res.status(404).send(err);
  }
};

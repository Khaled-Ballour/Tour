const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppErrors');

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const tour = await Model.findByIdAndDelete(req.params.id);
    if (!tour) return next(new AppError(`No tour found with that ID`, 404));
    res.json({ status: 'success', data: null });
  });
};

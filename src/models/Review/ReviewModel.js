import reviewCollection from "./ReviewSchema.js";

export const addNewReview = async (obj) => {
  return await reviewCollection(obj).save();
};

export const fetchReviews = async () => {
  return await reviewCollection.find();
};

export const getReviewsByBookId = async (bookId) => {
  return await reviewCollection.find({ bookId });
};

export const getReviewsByUserId = async (userId) => {
  return await reviewCollection.find({ userId });
};

export const getSingleReview = async (filter) => {
  return await reviewCollection.findOne(filter);
};

export const getReviewById = async (id) => {
  return await reviewCollection.findById(id);
};

export const updateReviewData = async (filter, update) => {
  return await reviewCollection.findOneAndUpdate(filter, update, { new: true });
};

export const deleteOneReview = async (_id) => {
  return await reviewCollection.findOneAndDelete({ _id }, { new: true });
};

export const deleteReviews = async () => {
  return await reviewCollection.deleteMany();
};

export const insertManyReviews = async (reviews) => {
  return await reviewCollection.insertMany(reviews);
};

export const updateBulkData = async (bulkoperation) => {
  return await reviewCollection.bulkWrite(bulkoperation);
};

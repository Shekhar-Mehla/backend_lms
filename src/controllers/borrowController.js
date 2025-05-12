import responseClient from "../middleware/responseClient.js";
import { createBoorrow } from "../models/BorrowHistory/BorrowHistoryModel.js";

export const createNewBorrowController = async (req, res, next) => {
  try {
    // const newBook = await createBoorrow(req.body);
    // if (newBook?._id) {
    //   return responseClient({
    //     req,
    //     res,
    //     message: "Book has added successfully",
    //   });
    // }
    res.send(<h2>fghhh</h2>);
  } catch (error) {
    next(error);
  }
};

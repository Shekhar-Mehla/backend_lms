// add new book 
export const createNewBook = async (req, res, next) => {
  try {
    // get book in req.body and files in req.files(setup multer first to get files smoothley)

    



  } catch (error) {
    if (
      error.message.includes(
        "E11000 duplicate key error collection: LMS.users index: email_1 dup key"
      )
    ) {
      error.message =
        "Email address you have provied is already associated with other user.Reset your password or use another email address";
      error.statusCode = 400;
    }
    next(error);
  }
};
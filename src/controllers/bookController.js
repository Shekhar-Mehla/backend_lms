import responseClient from "../middleware/responseClient.js";
import {
  addNewBook,
  deleteOneBook,
  fetchBooks,
  getAllPublicBook,
  getSingleBook,
  updateBookData,
} from "../models/Book/BookModel.js";
import deleteFile, { deleteOneFile } from "../utils/deleteFile.js";

// add new book
export const createNewBook = async (req, res, next) => {
  //   {
  //   title: 'SDFH',
  //   author: 'DHDDHHH',
  //   isbn: '1234567890',
  //   genre: 'ZXCFGHJ',
  //   status: 'inActive',
  //   publishedDate: '202202202',
  //   smallDescription: 'asdfghjkjhgfdsa',
  //   description: 'sdfghjkjhtretyuiytryuiuytreuiuytrtyuytredertyuiuytr',
  //   stockQuantity: '10',
  //   imageUrl: 'public\\img\\1752019094360-267123385-Screenshot 2024-06-06 160121.png',
  //   slug: '/SDFH',
  //   createdBy: {
  //     name: 'Shekhau mehla',
  //     adminId: new ObjectId('67dca167a2965a9197deafe4')
  //   },
  //   imageList: [
  //     'public\\img\\1752019094360-267123385-Screenshot 2024-06-06 160121.png'
  //   ]
  // }
  try {
    // get book in req.body and files in req.files(setup multer first to get files smoothley)

    const imagePaht = req.files.map((file) => file.path);
    for (const element of imagePaht) {
      
      
    }
    const newBook = await addNewBook(req.body);
    if (newBook?._id) {
      return responseClient({
        req,
        res,
        message: "Book has added successfully",
      });
    }
  } catch (error) {
    deleteFile(req.files);

    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = `duplcate is not allowed for ${JSON.stringify(
        error.keyValue
      )}`;
      error.statusCode = 400;
    }
    next(error);
  }
};
export const fetchPublicBooks = async (req, res, next) => {
  try {
    // fetch all active books
    const publicBook = await getAllPublicBook();
    if (publicBook?.length) {
      return responseClient({
        req,
        res,
        payload: publicBook,
        message: "here is the book ",
      });
    }
    return responseClient({
      req,
      res,
      payload: [],
      message: "no active book availble please try again later",
    });
  } catch (error) {
    next(error);
  }
};
export const fetchSingleBook = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // fetch active singe book books
    const singlepublicBook = await getSingleBook({ slug, status: "active" });

    if (singlepublicBook?._id) {
      return responseClient({
        req,
        res,
        payload: singlepublicBook,
        message: "here is the book ",
      });
    }

    return responseClient({
      req,
      res,

      message: "Book not found",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllBook = async (req, res, next) => {
  try {
    const books = await fetchBooks();

    responseClient({ req, res, payload: books });
  } catch (error) {
    next(error);
  }
};
export const updateBook = async (req, res, next) => {
  try {
    console.log(req.files, "45 req.files");
    if (req.files.length && Array.isArray(req.files)) {
      const newImagesList = req.files?.map((file) => file.path);
      req.body.imageList = [...req.body.imageList, ...newImagesList];
    }
    console.log(req.body.imageList, "49");
    if (req.body?.imageToDelete?.length) {
      req.body.imageList = req.body.imageList?.filter(
        (url) => !req.body?.imageToDelete.includes(url)
      );
    }

    const { _id, imageToDelete, ...rest } = req.body;
    //update db

    const filter = { _id };
    const update = { $set: { ...rest } };
    const book = await updateBookData(filter, update);
    if (book?._id) {
      imageToDelete?.forEach((path) => {
        deleteOneFile(path);
      });
      return responseClient({
        req,
        res,
        message: "book has been updated suceessfully",
      });
    }

    return responseClient({
      req,
      res,
      statusCode: 400,
      message: "could not update the book please try again later",
    });
  } catch (error) {
    deleteFile(req.files);
    next(error);
  }
};
export const deleteBook = async (req, res, next) => {
  try {
    console.log(req.body, "delete controller");
    const deletedBook = await deleteOneBook(req.body);
    if (deletedBook?._id) {
      // delete all files relted to this book from sever
      deletedBook.imageList?.map((path) => {
        deleteOneFile(path);
      });

      return responseClient({
        req,
        res,
        message: "book has been deletd successfully",
      });
    }
    return responseClient({
      req,
      res,
      message: "Opration could not be completed",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};

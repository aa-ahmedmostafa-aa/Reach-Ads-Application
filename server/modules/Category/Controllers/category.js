import Category from "../Models/category.js";
import ErrorResponse from '../../../common/utils/errorResponse.js';

//Get All Categories ...........
export const getCategories = async (req, res) => {
  try {
    const AllCategories = await Category.find();

    res.status(200).json(AllCategories);
  } catch (error) {
    return next(new ErrorResponse('Phone number not found', NO_CONTENT, error.stack));
  }
};

//Create New  Category ...........
export const createCategory = async (req, res) => {
  const category = req.body;
  const newCategory = new Category(category);
  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//Delete category ...........................

export const deleteCategory = async (req, res) => {
  var id = req.params.id;
  try {
    await Category.deleteOne({ _id: id });
    res.status(200).json({ message: "Category delted Succssefully" });
  } catch (error) {
    res.status(404).json({ message: "Category delted Succssefully" });
  }
};

//Get category With Specific ID...........

export const getSingleCategory = async (req, res) => {
  try {
    var id = req.params.id;
    var obj = await Category.find({ _id: id });
    res.status(200).json({ message: "succssed", Category: obj });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update category With Specific ID...........

export const updateCategory = async (req, res) => {
  try {
    var id = req.params.id;
    const category = req.body;
    var result = await Category.findOneAndUpdate({ _id: id }, category);
    res.status(200).json({ message: "updated successfully", Category: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

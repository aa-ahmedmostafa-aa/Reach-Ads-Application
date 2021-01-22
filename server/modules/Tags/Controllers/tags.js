import Tags from "../Models/tags.js";

//Get All Tags ...........
export const getTags = async (req, res) => {
  try {
    const AllTags = await Tags.find();

    res.status(200).json(AllTags);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Create New  Tags ...........
export const createTags = async (req, res) => {
  const tags = req.body;
  const newTags = new Tags(tags);
  try {
    await newTags.save();
    res.status(201).json(newTags);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//Delete Tags ...........................

export const deleteTags = async (req, res) => {
  var id = req.params.id;
  try {
    await Tags.deleteOne({ _id: id });
    res.status(200).json({ message: "Tags delted Succssefully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Tag With Specific ID...........

export const getSingleTag = async (req, res) => {
  var id = req.params.id;
  try {
    var obj = await Tags.find({ _id: id });
    res.status(200).json({ message: "succssed", Tag: obj });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Get Tag With Specific Ads ID ...........

export const getTagAds = async (req, res) => {
  var id = req.params.id;
  try {
    var obj = await Tags.find({ adsId: id });
    res.status(200).json({ message: "succssed", Tags: obj });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update Tag With Specific ID...........

export const updateSingleTag = async (req, res) => {
  var id = req.params.id;
  try {
  console.log(id);
    const tag = req.body;
    var result = await Tags.findOneAndUpdate({ _id: id }, tag);
    res.status(200).json({ message: "updated successfully", Tag: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

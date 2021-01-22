import Ads from "../Models/ads.js";

//Get All Ads ...........
export const getAds = async (req, res) => {
  try {
    const AllAds = await Ads.find();

    res.status(200).json(AllAds);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Create New  Ads ...........
export const createAds = async (req, res) => {
  const ad = req.body;
  const newAd = new Ads(ad);
  try {
    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//Delete New  Ads ...........................

export const deleteAds = async (req, res) => {
  var id = req.params.id;
  console.log(id);
  try {
    await Ads.deleteOne({ _id: id });
    res.status(200).json({ message: "Ads delted Succssefully" });
  } catch (error) {
    res.status(404).json({ message: "Ads delted Succssefully" });
  }
};

//Get Ads With Specific Category ID ...........

export const getAdsCategory = async (req, res) => {
  var id = req.params.id;
  try {
    var obj = await Ads.find({ categoryId: id });
    res.status(200).json({ message: "succssed", Ads: obj });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Ads With Specific ID...........

export const getSingleAds = async (req, res) => {
  var id = req.params.id;
  try {
    var obj = await Ads.find({ _id: id });
    res.status(200).json({ message: "succssed", Ads: obj });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Get Ads With Specific userId...........

export const getAdsUser = async (req, res) => {
  var id = req.params.id;
  
  try {
    var obj = await Ads.find({ advertiser: id });
    res.status(200).json({ message: "succssed", Ads: obj });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update Ads With Specific ID...........

export const UpdateAds = async (req, res) => {
  var id = req.params.id;
  try {
    const ad = req.body;
    var result = await Ads.findOneAndUpdate({ _id: id }, ad);
    res.status(200).json({ message: "updated successfully", Ads: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

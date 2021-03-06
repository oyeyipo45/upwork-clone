const Bid = require("../models/bidModel.js");
const Post = require("../models/postModel.js");
const asyncHandler = require("express-async-handler");

// @desc 	Create bid
// @route	Post /api/v1/bids
// @access  Private
exports.createBid = asyncHandler(async (req, res) => {
  try {
    const post = req.params.id;
    const { bidPrice, proposalDetails, jobLocation, jobTitle } = req.body;
    if (!bidPrice) {
      return res.status(400).json({
        status: 400,
        message: "Please Fill All Fields",
      });
    } else {
      const bid = new Bid({
        user: req.user._id,
        bidPrice,
        post,
        proposalDetails,
        jobLocation,
        jobTitle,
      });
      const placedBid = await bid.save();
      res.status(201).json({
        message: "Success",
        placedBid,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc 	Get user Bids
// @route 	GET /api/v1/bids/applied
// @access 	Private
exports.appliedJobs = asyncHandler(async (req, res) => {
  try {
    const user = req.params.id;
    const bids = await Bid.find({ user });
    if (!bids || bids.length === 0) {
      res.status(404).json({ message: "No Jobs found" });
    } else {
      res.status(200).json(bids);
    }
  } catch (error) {
    throw new Error("cannot get applied jobs");
  }
});

// @desc 	Get All Bids
// @route 	GET /api/v1/bids/
// @access 	Public
exports.getAllBids = asyncHandler(async (req, res) => {
  try {
    const bids = await Bid.find();
    if (!bids || bids.length === 0) {
      res.status(404).json({ message: "No Bids Available" });
    } else {
      res.status(200).json(bids);
    }
  } catch (error) {
    throw new Error("Error getting Bids");
  }
});

// @desc 	Get Bid Id
// @route 	GET /api/v1/bids/:id
// @access 	Public
exports.getBidById = asyncHandler(async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (bid) {
      res.status(200).json(bid);
    }
  } catch (error) {
    res.status(404).json({ message: "Bid Not Found" });
  }
});

// @desc 	Accept Bid
// @route 	PUT /api/v1/bids/accept/:id
// @access 	Public
exports.acceptBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);
  const post = await Post.findById(bid.post._id);
  const postOwner = post.user._id;
  try {
    if (req.user.id !== postOwner.toString() && req.user.role !== "admin") {
      res.status(401);
      throw new Error(`User is not authorized to accept this Bid`);
    }
    if (bid) {
      bid.response = "accept";

      const acceptedBid = await bid.save();

      res.status(200).json({ message: "Bid accepted", acceptedBid });
    }
  } catch (error) {
    res.status(404).json({ message: "Bid response not changed" });
  }
});

// @desc 	Decline Bid
// @route 	PUT /api/v1/bids/decline/:id
// @access 	Public
exports.declineBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);
  const post = await Post.findById(bid.post._id);
  const postOwner = post.user._id;
  try {
    if (req.user.id !== postOwner.toString() && req.user.role !== "admin") {
      res.status(401);
      throw new Error(`User is not authorized to  decline this Bid`);
    }
    if (bid) {
      bid.response = "decline";

      const declinedBid = await bid.save();

      res.status(200).json({ message: "Bid declined", declinedBid });
    }
  } catch (error) {
    res.status(404).json({ message: "Bid response not changed" });
  }
});

// @desc 	Mark Job as Completed
// @route 	PUT /api/v1/bids/completed/:id
// @access 	Public
exports.completeJob = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);
  const post = await Post.findById(bid.post._id);
  const postOwner = post.user._id;
  try {
    if (req.user.id !== postOwner.toString() && req.user.role !== "admin") {
      res.status(401);
      throw new Error(
        `User ${req.params.id} is not authorized to accept or decline this Bid`
      );
    }

    if (bid && post) {
      bid.completed = "true";
      post.jobAvailability = "accepted";
      bid.response = "accept";

      const updatedPost = await post.save();
      const acceptedBid = await bid.save();

      res.status(200).json({ acceptedBid, updatedPost });
    }
  } catch (error) {
    res.status(404).json(erroe.message);
  }
});

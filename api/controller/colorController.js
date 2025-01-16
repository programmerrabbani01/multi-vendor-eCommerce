import asyncHandler from "express-async-handler";
import Color from "../models/Color.js";
import { createSlug } from "../helpers/slug.js";
/**
 * @description get all colors
 * @route /api/v1/color
 * @method GET
 * @access public
 */

export const getAllColors = asyncHandler(async (req, res) => {
  // find all brands

  const colors = await Color.find();

  // validation for get all colors

  if (colors.length > 0) {
    return res.status(200).json({ colors });
  }

  return res.status(200).json({ colors: [], message: "No Color found" });
});

/**
 * @description create a Color
 * @route /api/v1/color
 * @method POST
 * @access public
 */

export const createColor = asyncHandler(async (req, res) => {
  // get data from body

  const { name, colorCode } = req.body;

  // name fields required validation

  if (!name || !colorCode)
    return res.status(400).json(" All fields are required");

  // name check

  const nameCheck = await Color.findOne({ name });

  //  name existing check

  if (nameCheck) return res.status(400).json("This name already exists");

  // create new Color

  const color = await Color.create({
    name,
    slug: createSlug(name),
    colorCode,
  });

  //   create new Color response

  res.status(201).json({ color, message: "Color create successful" });
});

/**
 * @description get a single color
 * @route /api/v1/color/:id
 * @method GET
 * @access public
 */

export const getSingleColor = asyncHandler(async (req, res) => {
  // get color id from params

  const { id } = req.params;

  try {
    // find single color by id

    const color = await Color.findById(id);

    //  get single color response

    return res.status(200).json(color);
  } catch (error) {
    res.status(400).json("Color not found");
  }
});

/**
 * @description delete a Color
 * @route /api/v1/Color/:id
 * @method DELETE
 * @access public
 */

export const deleteColor = asyncHandler(async (req, res) => {
  // get Color id from params

  const { id } = req.params;

  // find Color by id and delete

  const color = await Color.findByIdAndDelete(id);

  // not found validation

  if (!color) throw new Error("This Color Is Already Delete");

  //  get single Color response

  res.status(200).json({ color, message: "Color Delete Successful" });
});

/**
 * @description update a color
 * @route /api/v1/color/:id
 * @method PATCH
 * @access public
 */

export const updateColor = asyncHandler(async (req, res) => {
  // get color id from params

  const { id } = req.params;

  // get data from body

  const { name, colorCode } = req.body;

  // name require validation

  if (!name || !colorCode)
    return res.status(400).json(" All fields are required");

  // color find by id

  const color = await Color.findById(id);

  //  color find by id not found validation

  if (!color) throw new Error(" color Is Not Found");

  // update color

  color.name = name;
  color.colorCode = colorCode;
  color.slug = createSlug(name);
  color.save();

  // color update response

  res.status(200).json({ message: "Color update successful", color: color });
});

/**
 * @description update a Color status
 * @route /api/v1/color/status/:id
 * @method put
 * @access public
 */

export const updateColorStatus = asyncHandler(async (req, res) => {
  // get id from params

  const { id } = req.params;

  // get data from body

  const { status } = req.body;

  // update status

  const updateColorStatus = await Color.findByIdAndUpdate(
    id,
    {
      status: status,
    },
    {
      new: true,
    }
  );

  // update the status response

  res.status(200).json({
    message: "Color StatusUpdate Successful",
    color: updateColorStatus,
  });
});

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Cart = require("../Models/Cart");

const router = require("express").Router();

//CREATE CART
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json("Can't create the cart :: " + error);
  }
});

//UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (res, req) => {
  try {
    const updatedCart = Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json("Can't update cart :: " + error);
  }
});

//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted");
  } catch (error) {
    res.status(500).json("can't delete the cart ::" + error);
  }
});

//GET USER CART
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = Cart.findById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json("can't get cart items ::" + error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json("can't get all cart  ::" + error);
  }
});
module.exports = router;

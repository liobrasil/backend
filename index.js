require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const app = express();
app.use(formidableMiddleware());
const cors = require("cors");
app.use(cors());
const { ethers } = require("ethers");
const beGreenABI = require("./BeGreen.json");

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.gateway.tenderly.co")

app.post("/mintNFT", async (req, res) => {
  let {
    address
  } = req.fields;

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const beGreen = new ethers.Contract(process.env.BEGREEN_CONTRACT_ADDRESS, beGreenABI, wallet);
  const txReceipt = await beGreen.safeMint(address,"https://silver-sound-gamefowl-947.mypinata.cloud/ipfs/QmS1xfi6s5c5xLM2PqX7xqScmtT41QKfEXty6ygR9kLhNj");

  if (response) {
    res.status(200).json({ txId: txReceipt });
  } else {
    res.status(400).json({ message: "Data not found" });
  }
});

app.all("*", function (req, res) {
  res.json({ message: "Not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});

module.exports = app;

const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();

app.use(express.json());

const rawData = fs.readFileSync("db.json");
let data = JSON.parse(rawData);

app.get("/api/purchase/:itemNumber", async (req, res) => {
  const itemNumber = req.params.itemNumber;
  const itemExistResponse = await axios.get(
    `http://192.168.42.1:3333/api/info/${itemNumber}`
  );
  if (!itemExistResponse.data[0].numberInStock) {
    res.send("item is out of stock");
  } else {
    const updateData = {
      itemNumber: itemNumber,
    };

    try {
      const response = await axios.put(
        "http://192.168.42.1:3333/api/updateNumberInStock",
        updateData
      );
      const newRecord = {
        orderNumber: generateRandom4DigitNumber(),
        itemNumber: itemNumber,
      };

      data.push(newRecord);

      fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
      res.send("the purchase was succesfully done");
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).send(false);
    }
  }
});

const port = 4444;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

function generateRandom4DigitNumber() {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

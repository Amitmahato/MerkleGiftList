const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "f38b1bbe9b84eac10b519b0700061fbb716136fad75ba1f03e7597079d0752d5";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  //  prove that a name is in the list
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

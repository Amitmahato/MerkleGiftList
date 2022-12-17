const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  const randomIndex = Math.floor(Math.random() * niceList.length);
  const randomPerson = niceList[randomIndex];

  const merkleTree = new MerkleTree(niceList);
  // how do we prove to the server we're on the nice list?
  // by generating a proof based on the merkle tree
  const proof = merkleTree.getProof(randomIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name: randomPerson,
  });

  console.log(
    `Hey, ${randomPerson} at index ${randomIndex}. Let us find if you can get a gift.`
  );
  console.log({ gift });
}

main();

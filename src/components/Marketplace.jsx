import Navbar from "./Navbar";
import NFTCards from "./NFTCards";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

import { ethers } from "ethers";

export default function Marketplace() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );
    console.log("getting itmes", items);
    updateFetched(true);
    updateData(items);
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div className="h-screen">
      <Navbar></Navbar>
      <div className="flex flex-col place-items-center mt-16">
        <div className="md:text-xl font-bold text-white">Top NFTs</div>
        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {data.map((value, index) => {
            return <NFTCards data={value} key={index}></NFTCards>;
          })}
        </div>
      </div>
    </div>
  );
}

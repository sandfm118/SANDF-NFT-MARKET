import sandfLogo from "../sandf_logo.png";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ethers } from "ethers";
import "../App.css";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    if (window.ethereum == undefined) return;
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("val", val);
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div className="">
      <nav className="w-screen">
        <div className="flex items-center justify-between  bg-transparent text-white ">
          <div className="flex items-end ml-5 ">
            <Link to="/">
              <img
                src={sandfLogo}
                alt=""
                width={120}
                height={120}
                className="inline-block -mt-2"
              />
            </Link>
          </div>
          <div className="">
            <div className="flex justify-between relative font-bold mr-10 text-sm links gap-[3vw]   ">
              <div className="px-5 ">
                <Link
                  className="link link--metis relative cursor-pointer whitespace-nowrap "
                  to="/"
                >
                  Marketplace
                </Link>
              </div>

              <div className="px-5">
                <Link
                  className="link link--metis relative cursor-pointer whitespace-nowrap "
                  to="/sellNFT"
                >
                  List NFT
                </Link>
              </div>

              <div className="px-5">
                <Link
                  className="link link--metis relative cursor-pointer whitespace-nowrap "
                  to="/profile"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-2">
            <button
              className="enableEthereumButton bg-blue-500 w-24 h-15 hover:bg-[#8400ff] text-white font-bold py-2 px-4 rounded text-sm"
              onClick={connectWebsite}
            >
              {connected ? "Connected" : "Connect Wallet"}
            </button>
            <div className="text-white text-bold text-right mr-5 text-base">
              {currAddress !== "0x"
                ? "to"
                : "Not Connected. Please login to view NFTs"}{" "}
              {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

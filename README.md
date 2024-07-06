# NFT MARKET 

NFT Marketplace - A Decentralized Platform for Digital Collectibles
This is a robust NFT marketplace contract built on the Ethereum blockchain. It empowers users to:

Mint NFTs: Create unique digital tokens representing ownership of digital assets like artwork, music, collectibles, and more.
List and Sell NFTs: Set a listing price and offer your NFTs for sale on the marketplace.
Buy NFTs: Browse the marketplace for listed NFTs and purchase them using cryptocurrency (default: 0.01 Ether).
Manage Ownership: Securely store and track ownership of NFTs on the blockchain.
Key Features:

ERC-721 Standard Compliance: Built on the widely adopted ERC-721 standard, ensuring interoperability with other NFT marketplaces and wallets.
Secure Transactions: Leverages the security and immutability of the Ethereum blockchain for tamper-proof ownership records and transaction settlements.
Transparent Pricing: The contract defines a clear listing price for NFTs, streamlining the buying process.
Efficient Listing Management: Users can easily list their NFTs and track their sale status.
Customizable Ownership: The contract records both the current owner and the seller who initially listed the NFT.

<br>

1. License and Imports:
 
```
solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

import "hardhat/console.sol"; // For debugging (optional)
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
```

License: This line specifies that the contract uses the Unlicense, which grants permission to use, modify, and distribute the code freely without restrictions.
Pragma: This line sets the Solidity compiler version requirement (at least 0.8.24).
Imports: These lines import necessary libraries:
Counters (from OpenZeppelin) for keeping track of minted tokens and sold items.
ERC721URIStorage (from OpenZeppelin) for creating NFTs with associated URIs (links to metadata).
ERC721 (from OpenZeppelin) for the core ERC-721 NFT functionality.

2. Contract Definition:

```
solidity
contract NFTMarketplace is ERC721URIStorage {
```
This line defines a new smart contract named NFTMarketplace that inherits from ERC721URIStorage. This means it inherits all the functionalities of ERC-721 NFTs, including the ability to mint, transfer, and manage ownership, along with the ability to store URIs for each token.

3. Variables:

```
solidity
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    address payable owner;
    uint256 listPrice = 0.01 ether;
```

Counters: These two counters are used to keep track of the total number of minted tokens (_tokenIds) and the number of items sold (_itemsSold).
owner: This variable stores the address of the contract owner (the person who deployed the contract).
listPrice: This variable sets the initial listing price for NFTs in the marketplace (0.01 ether by default).

4. ListedToken Struct:

```
solidity
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }
```

This structure defines a custom data type called ListedToken to store information about each listed NFT:
tokenId: The unique identifier of the NFT.
owner: The address of the current owner of the NFT.
seller: The address of the seller who listed the NFT for sale.
price: The current asking price for the NFT.
currentlyListed: A boolean flag indicating whether the NFT is currently listed for sale.

5. TokenListedSuccess Event:

```
solidity
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );
```

This line defines an event called TokenListedSuccess that emits data whenever an NFT is successfully listed:
tokenId: The ID of the listed NFT.
owner: The address of the NFT's owner.
seller: The address of the seller who listed it.
price: The listing price.
currentlyListed: Confirmation that the NFT is listed.

6. Mapping:

```
solidity
    mapping(uint256 => ListedToken) private idToListedToken;
```

This line declares a mapping named idToListedToken. It associates each NFT's ID (a uint256) with a ListedToken struct, essentially creating a database to store information about each listed NFT.

7. Constructor:

```
solidity
    constructor() ERC721("NFTMarketplace", "NFTM") {
        owner = payable(msg.sender);
    }
```
This function is called automatically when the contract is deployed. It performs the following actions:
Initializes the inherited ERC-721 contract with the name "NFTMarketplace" and symbol "




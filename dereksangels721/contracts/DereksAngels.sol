// TODO: ASCII Art
// TODO: cut to governance wallet

// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DereksAngels is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // The internal token ID tracker
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;

    constructor() ERC721("Derek's Angels", "DANGLZ") {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function mint(address recipient, string memory hash, string memory metadatauri) public onlyOwner returns (uint256)
    {
        require(hashes[hash] != 1);
        hashes[hash] = 1;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadatauri);
        return newItemId;
    }

    function drop(address recipient, string[] memory intentions, string[] memory metadatauris) public onlyOwner returns (uint256)
    {
        // todo return list
        uint256 lastMint;
        for (uint i = 0; i < intentions.length; i++) {
            string memory hash = intentions[i];
            string memory metadatauri = metadatauris[i];
            lastMint = mint(recipient, hash, metadatauri);
        }

        return lastMint;
    }
}

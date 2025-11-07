// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ImpactVault
/// @notice A yield-donating ERC4626 vault that donates a portion of yield to public goods.
contract ImpactVault is ERC4626, Ownable {
    address public donationWallet;
    uint256 public donationPercent = 10; // 10% of yield donated

    event DonationSent(address indexed to, uint256 amount);
    event DonationWalletChanged(address indexed newWallet);
    event DonationPercentChanged(uint256 newPercent);

    constructor(IERC20 asset, address _donationWallet)
        ERC4626(asset)
        ERC20("ImpactVault Token", "iVAULT")
        Ownable(msg.sender)
    {
        donationWallet = _donationWallet;
    }

    /// @notice Set donation wallet (owner only)
    function setDonationWallet(address _newWallet) external onlyOwner {
        donationWallet = _newWallet;
        emit DonationWalletChanged(_newWallet);
    }

    /// @notice Change donation percentage (owner only)
    function setDonationPercent(uint256 _newPercent) external onlyOwner {
        require(_newPercent <= 50, "Too high");
        donationPercent = _newPercent;
        emit DonationPercentChanged(_newPercent);
    }

    /// @notice Simulate yield (for demo purposes)
    function simulateYield(uint256 amount) external {
        IERC20(asset()).transferFrom(msg.sender, address(this), amount);
    }

    /// @notice Harvest yield and donate part to the donation wallet
    function harvest() external {
        uint256 totalAssetsBefore = totalAssets();
        uint256 totalVaultBalance = IERC20(asset()).balanceOf(address(this));

        if (totalVaultBalance > totalAssetsBefore) {
            uint256 profit = totalVaultBalance - totalAssetsBefore;
            uint256 donationAmount = (profit * donationPercent) / 100;
            if (donationAmount > 0) {
                IERC20(asset()).transfer(donationWallet, donationAmount);
                emit DonationSent(donationWallet, donationAmount);
            }
        }
    }
}

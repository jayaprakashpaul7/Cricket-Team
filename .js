import { useEffect } from "react";
import "./App.css";
import contract from "./contracts/NFTCollectible.json";

const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = contract.abi;

function App() {
  const checkWalletIsConnected = () => {};

  const connectWalletHandler = () => {};

  const mintNftHandler = () => {};

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="main-app">
      <h1>Scrappy Squirrels Tutorial</h1>
      <div>{connectWalletButton()}</div>
    </div>
  );
}

export default App;

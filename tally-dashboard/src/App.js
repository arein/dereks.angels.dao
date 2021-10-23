import './App.css';

const endpoint = 'https://rzod2384ab.execute-api.us-east-1.amazonaws.com';

function App() {
  
  const onPress = (event) => {
    if (event.key === 'Enter') {
      const text = event.target.value;
      console.log(text);

      const url = `https://hackathon.withtally.com/voter/${text}/governance/eip155:4:0x533899fF4a9225e970349dE776656C4D9D5F02e1`;
      window.open(url, "_blank");
    }
  };
  const metamaskUrl = 'https://metamask.app.link/dapp/' + window.location.href.replace('https://', '');
  return (
    <div className="App">
      <img width="400" src="https://arweave.net/p5Fu6gXNiS-utxgWQ4vhuXJTART3KEIdtmEsT-FPvvg" alt="Derek's Angels" />
      <div>
        <h1>Enter your wallet Address to see your Tally votes</h1>
        <input type="text" onKeyPress={onPress} />
      </div>
    </div>
  );
}

export default App;


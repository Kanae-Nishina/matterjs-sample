import Headers from "./components/Headers";
import Router from "./components/Router";

function App() {
  return (
    <div className="App" style={{ maxWidth: 900, margin: "auto" }}>
      <Headers />
      <main>
        <Router />
      </main>
      <footer>©2024</footer>
    </div>
  );
}

export default App;

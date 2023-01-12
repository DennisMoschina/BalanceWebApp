import './App.css';
import {
    HashRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import {HomeView} from './view/HomeView.tsx';
import GameView from "./view/GameView.tsx";
import LevelSelectorView from "./view/LevelSelectorView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
            <Routes>
                <Route exact path="/" element={<HomeView />} />
                <Route path="/play" element={<GameView />} />
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

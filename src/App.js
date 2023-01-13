import './App.css';
import {
    HashRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import {HomeView} from './view/HomeView.tsx';
import GameView from "./view/GameView.tsx";
import LevelSelectorView from "./view/LevelSelectorView.tsx";
import HomeButton from "./view/HomeButton.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div>
            <Router>
                <HomeButton />
                <Routes>
                    <Route exact path="/" element={<HomeView />} />
                    <Route path="/play" element={<GameView />} />
                    <Route path="/levels" element={<LevelSelectorView />}/>
                </Routes>
            </Router>
          </div>
      </header>
    </div>
  );
}

export default App;

import "./App.css";
import TopLeft from './components/TopLeft';
import BottomLeft from './components/BottomLeft';
import RightSideBar from './components/CardDisplaySideBar';

function App() {
  return (
    <div className="container">
        <TopLeft /> {/* Grid autoplacement ruling applies here (cell 1 (row 1, col 1), cell 2... etc.*/}
        <RightSideBar />
        <BottomLeft />

    </div>
  );
}

export default App;
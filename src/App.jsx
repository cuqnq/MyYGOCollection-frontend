import "./App.css";
import TopLeft from './components/TopLeft';
import BottomLeft from './components/BottomLeft';
import RightSideBar from './components/CardDisplaySideBar';
import { useState, useEffect } from "react";   // NEW: added useEffect

function App() {

  const [cards, setCards] = useState([]);       // holds card data once fetched
  const [loading, setLoading] = useState(true); // true until fetch finishes
  const [error, setError] = useState(null);     // holds error message, if any

  // NEW: moved from BottomLeft.jsx.
  // Runs once when the app first loads ([] dependency array) to fetch the collection.
  useEffect(() => {
    fetch("http://localhost:5000/api/collection")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const [filters, setFilters] = useState({
    MonsterLevelorRank: [],
    MonsterType: [],
    MonsterAttribute: [],
    SPELLorTRAP: []
  });

  function onToggleOption(category, value) {
    setFilters (function (previousFilters) {
      const currentList = previousFilters[category];
      const isAlreadySelected = currentList.includes(value);

      let updatedList;

      if (isAlreadySelected) {
        updatedList = currentList.filter((item) => item !== value); 
      }
      else {
        updatedList = [...currentList, value];
      }

      return {
        ...previousFilters,
        [category]: updatedList,
      };
    });
  }

  return (
    <div className="container">
        <TopLeft /> {/* Grid autoplacement ruling applies here (cell 1 (row 1, col 1), cell 2... etc.*/}
        <RightSideBar />
        <BottomLeft cards = {cards} loading = {loading} error = {error}/>
    </div>
  );
}

export default App;
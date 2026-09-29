import "./App.css";
import TopLeft from './components/TopLeft';
import BottomLeft from './components/BottomLeft';
import RightSideBar from './components/CardDisplaySideBar';
import { useState } from "react";

function App() {
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
        <BottomLeft />
    </div>
  );
}

export default App;
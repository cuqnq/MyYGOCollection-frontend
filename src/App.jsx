import "./App.css";
import TopLeft from './components/TopLeft';
import BottomLeft from './components/BottomLeft';
import RightSideBar from './components/CardDisplaySideBar';
import { useState, useEffect } from "react";

function App() {

  const [cards, setCards] = useState([]);       // holds card data once fetched
  const [loading, setLoading] = useState(true); // true until fetch finishes
  const [error, setError] = useState(null);     // holds error message, if any
  const [selectedCardId, setSelectedCardId] = useState(null);

  const selectedCard = cards.find((card) => card.id === selectedCardId)

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
    setFilters(function (previousFilters) {
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



  //Function is called when the + or - buttons are clicked.
  //         cardId = which card to modify, change = quantity modification (+1 or -1) 
  function handleChangeQuantity(cardId, change) {
    //Basically, a button click asks Flask to change this card's amount.
    //${cardId} puts the card's unique ID into the web address. EX:Kuriboh's ID is 5 --> (/api/collection/5/change)
    fetch(`http://localhost:5000/api/collection/${cardId}/change`, {
      method: "PATCH", //Update something
      headers: { "Content-Type": "application/json" }, //Tells Flask that we're sending JSON
      body: JSON.stringify({ change: change }), //packs {change: 1} into text to send
      //For anyone else reading this: Why change is 1? See where onChangeQuantity is called in CardDisplaySideBar.jsx and BottomLeft.jsx.
    })
      .then((response) => {
        if (!response.ok) {
          //If there's a problem, STOP & REPORT IT!
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Change result:", data)
        //Flask sets deleted to true when the card's quantity reached 0 and it was removed from the database.
        if (data.deleted) {
          // 1. remove the card from cards (using .filter)
          const updatedCards = cards.filter((card) => card.id !== data.id);
          setCards(updatedCards);
          
          //If the deleted card is the one open in the right sidebar, close the sidebar.
          //If a DIFFERENT card is open, leave it alone.
          if (selectedCardId === data.id) {
            setSelectedCardId(null);
          }
        } else {
          //Build a NEW list of cards (React needs an new array to be aware of the change).
          // - If it's the card Flask just changed (same id), return a copy with the new quantity
          const updatedCards = cards.map((card) => card.id === data.id ? { ...card, quantity: data.quantity } : card);
          setCards(updatedCards); //Saves the list, website displays the new amount.
        }
      });
  }

  return (
    <div className="container">
      <TopLeft /> {/* Grid autoplacement ruling applies here (cell 1 (row 1, col 1), cell 2... etc.*/}

      <BottomLeft cards={cards} loading={loading} error={error} onSelectCard={setSelectedCardId} onChangeQuantity={handleChangeQuantity} />

      <RightSideBar card={selectedCard} onChangeQuantity={handleChangeQuantity} />

    </div>
  );
}

export default App;
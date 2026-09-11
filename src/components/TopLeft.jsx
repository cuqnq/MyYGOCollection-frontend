import './TopLeft.css';
import SearchBar from './ui_tools/SearchBar';
import MenuIcon from '../assets/habakiri_placeholder.png';
import Button from './ui_tools/Button';

function TopLeft() {
  return (
    <div className="top-left">
        <img src = {MenuIcon} alt = "Habakiri was here." />


{/*Decided to group Filter, Decks, and th search bar together so they can be moved as one. */}
      <div className = "top-left-controls">
        <Button 
          label="Decks" 
          color= "var(--accent)" 
          fontSize="18px" 
          padding="8px 12px"
          /* style={{ marginLeft: 'auto' }} /*Any button after this line will be shifted towards the bottom right */
          /*Buttons before are not affected*/

          onClick={() => alert("Deck feature will be coming soon in the future!")} 
        />

        <Button 
          label="Filter" 
          color="var(--dusk-blue)" 
          fontSize="18px" 
          padding="8px 16px" 
        />

        <SearchBar />
      </div>

        <Button 
          label="Add Card" 
          color="var(--dusk-blue)" 
          fontSize="18px" 
          padding="8px 16px" 
        />
    </div>
  );
}

export default TopLeft;



import './TopLeft.css';
import SearchBar from './SearchBar';
import MenuIcon from './assets/habakiri_placeholder.png';
import Button from './Button';

function TopLeft() {
  return (
    <div className="top-left">
        <img src = {MenuIcon} alt = "Habakiri was here." />

        <Button 
          label="Decks" 
          color="blue" 
          fontSize="24px" 
          padding="6px 12px"
          style={{ marginLeft: 'auto' }} /*Any button after this line will be shifted towards the bottom right */
          /*Buttons before are not affected*/

          onClick={() => alert("Decks button clicked!")} 
        />

        <Button 
          label="Filter" 
          color="gray" 
          fontSize="24px" 
          padding="6px 12px" 
        />

        <SearchBar />

        <Button 
          label="Add Card" 
          color="green" 
          fontSize="18px" 
          padding="8px 16px" 
        />
    </div>
  );
}

export default TopLeft;



import './TopLeft.css';
import SearchBar from './SearchBar';
import FilterBtn from './FilterBtn';
import AddButton from './AddButton';

function TopLeft() {
  return (
    <div className="top-left">
      Top left.
        <FilterBtn />
        <SearchBar />
        <AddButton /> 
    </div>
  );
}

export default TopLeft;



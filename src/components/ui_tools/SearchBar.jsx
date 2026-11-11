import './SearchBar.css';

function SearchBar({searchText, onSearchTextChange}) {
  return (
    <div className="search-bar">
      <input type="text" 
      placeholder="Search collection..." 
      value = {searchText}
      
      onChange={(event) => onSearchTextChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
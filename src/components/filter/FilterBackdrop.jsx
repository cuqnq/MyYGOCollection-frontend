import './FilterBackdrop.css';

function FilterBackdrop({ onClick, children }) {
  return (
    <div className="filter-backdrop" onClick={onClick}>
      {children}
    </div>
  );
}

export default FilterBackdrop;
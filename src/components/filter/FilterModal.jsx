import FilterBackdrop from './FilterBackdrop';
import FilterPanel from './FilterPanel';

function FilterModal({ filters, onToggleOption, onClearAll, onClose }) {
  return (
    <FilterBackdrop onClick={onClose}>
      <FilterPanel
        filters={filters}
        onToggleOption={onToggleOption}
        onClearAll={onClearAll}
        onClose={onClose}
        // this stops a click inside the panel from also triggering
        // the backdrop's onClick, which would close the modal by accident
        onClick={(event) => event.stopPropagation()}
      />
    </FilterBackdrop>
  );
}

export default FilterModal;
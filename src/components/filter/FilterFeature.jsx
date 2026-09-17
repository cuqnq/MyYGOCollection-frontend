import { useState } from 'react';
import Button from './Button'; // your existing reusable button
// import FilterModal from './FilterModal'; // you'll build this next

function FilterFeature({ filters, onToggleOption, onClearAll }) {
  // isOpen starts false, the modal is closed until the user clicks the button
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        label="Filter"
        color="var(--dusk-blue)"
        fontSize="18px"
        padding="8px 16px"
        onClick={openModal}
      />

      {isOpen && (
        <div>Modal goes here, close it with closeModal</div>
        // once FilterModal exists, this becomes:
        // <FilterModal
        //   filters={filters}
        //   onToggleOption={onToggleOption}
        //   onClearAll={onClearAll}
        //   onClose={closeModal}
        // />
      )}
    </>
  );
}

export default FilterFeature;
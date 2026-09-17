function FilterPanel({filters, onToggleOption, onClearAll, onClose}) { 
    return (
    <div className="filter-panel">
        <FilterOptionGroup ... />
        <FilterOptionGroup ... />
        <button onClick = {onClearAll}>
            Clear All</button>
        <button onClick = {onClose}>
            Done</button>
    </div>
    );
}
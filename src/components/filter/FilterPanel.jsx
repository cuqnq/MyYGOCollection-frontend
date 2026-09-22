function FilterPanel({filters, onToggleOption, onClearAll, onClose}) { 
    return (
    <div className="filter-panel">
        <FilterOptionGroup
            label = "MonsterLevelorRank"
            options = {["None", "One", "Two", "Three", "Four", "Five", "Six", 
                        "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen"]} 
        />

        <FilterOptionGroup 
            label = "MonsterType" 
            options = {["Aqua", "Beast", "Beast-Warrior", "Cyberse", "Dinosaur", 
                        "Divine-Beast", "Dragon", "Fairy", "Fiend", "Fish", "Illusion",
                        "Insect", "Machine", "Plant", "Psychic", "Pyro", "Reptile", "Rock", 
                        "Sea Serpent", "Spellcaster", "Thunder", "Warrior", "Winged Beast", "Wyrm", "Zombie"]}
        />

        <FilterOptionGroup
            label = "MonsterAttribute"
            options = {["DARK", "EARTH", "FIRE", "LIGHT", "WATER", "WIND", "DIVINE"]}
        />

        <FilterOptionGroup
            label = "SPELLorTRAP"
            options = {[ "Spell", "Trap"]}
        />
        <button onClick = {onClearAll}>
            Clear All</button>
        <button onClick = {onClose}>
            Done</button>
    </div>
    );
}
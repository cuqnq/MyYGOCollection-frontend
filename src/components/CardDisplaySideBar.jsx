import './CardDisplaySideBar.css';

// Builds a monster's type line in the same order as a real card.
//EX: [Dragon / Fusion / Pendulum / Effect]
//Order: monster type / summoning type(or Pendulum) / Subtypes(or Pendulum) / Normal or Effect.
// Anything that's empty or false is skipped, so "/" only appears between real words.
function getTypeLine(card) {
  const parts = [];

  //Slot 1: monster type (Dragon, Spellcaster, Fairy...)
  if (hasValue(card.monster_type)) parts.push(card.monster_type);

  //Slot 2: how it's summoned
  if (card.is_fusion) parts.push("Fusion");
  if (card.is_synchro) parts.push("Synchro");
  if (card.is_xyz) parts.push("Xyz");
  if (card.is_link) parts.push("Link");
  if (card.is_ritual) parts.push("Ritual");

  //Pendulum is unique. It can exist in both Slot 2 and 3 but not at the same time. 
  if (card.is_pendulum) parts.push("Pendulum");

  //Slot 3: Monster Subtypes
  if (card.is_tuner) parts.push("Tuner");
  if (card.is_flip) parts.push("Flip");
  if (card.is_gemini) parts.push("Gemini");
  if (card.is_spirit) parts.push("Spirit");
  if (card.is_toon) parts.push("Toon");
  if (card.is_union) parts.push("Union");

  //SLot 4: Normal or Effect
  if (card.is_normal) parts.push("Normal");
  if (card.is_effect) parts.push("Effect");

  //Nothing to show
  if (parts.length === 0) return "";

  //join() only puts " / " BETWEEN items, so no stray spaces at the ends
  return `[${parts.join(" / ")}]`;
}

// True when a column was actually filled in.
// Unlike `value && ...`, this keeps 0 (a real ATK, DEF or scale value)
// instead of treating it as "empty".
function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

// Picks the CSS class for the description box, so its colors match the real card's text box.
// The order matters: a card can be more than one type (ex: Synchro AND Effect),
// so the first match wins. Effect is last because most special monsters are also Effect monsters.
function getTextBoxClass(card) {
  if (card.card_type === "Trap") return "text-trap";
  if (card.card_type === "Spell") return "text-spell";
  if (card.is_pendulum) return "text-pendulum";   // any Pendulum, even Synchro/Fusion Pendulums
  if (card.is_link) return "text-link";
  if (card.is_xyz) return "text-xyz";
  if (card.is_synchro) return "text-synchro";
  if (card.is_fusion) return "text-fusion";
  if (card.is_ritual) return "text-ritual";
  if (card.is_normal) return "text-normal";
  return "text-effect";   // everything else: Effect monsters (and the default if nothing matches)
}

function RightSideBar({ card, onChangeQuantity }) {
  //When no card is selected yet, this message will appear.
  if (!card) {
    return (
      <div className="sidebarRight">
        Click on a card to get started!
      </div>
    );
  }

  //Values worked out ahead of time so the JSX below stays readable
  const isMonster = card.card_type === "Monster";
  const typeLine = getTypeLine(card);
  const levelLabel = card.is_xyz ? "Rank" : "Level";   // Xyz monsters have a Rank, not a Level
  const attackText = card.unknown_atk ? "?" : card.attack;
  const defenseText = card.unknown_def ? "?" : card.defense;
  const textBoxClass = getTextBoxClass(card);  

  // When a card IS selected, its information is displayed here.
  return (
    <div className="sidebarRight">
      <div className="cardHolder">
        {card.image_url && (
          <img
            src={card.image_url}
            alt={card.card_name}
            className="sidebar-thumbnail"
          />
        )}

        {/* Details every card has */}
        <h2>{card.card_name}</h2>
        <p>Set: {card.set_code}</p>
        <p>Rarity: {card.rarity}</p>

        {/* Card effect or flavor text, in a box colored like the real card's text box.
            Long text scrolls inside the box. tabIndex={0} lets keyboard users scroll it. */}
        {hasValue(card.description) && (
          <p className={`card-description ${textBoxClass}`} tabIndex={0}>
            {card.description}
          </p>
        )}



        <div className="quantity-controls">
          <button className="sidebr-qty subtract-btn" onClick={() => onChangeQuantity(card.id, -1)}>-</button>
          <p>Quantity: {card.quantity}</p>
          <button className="sidebr-qty add-btn" onClick={() => onChangeQuantity(card.id, 1)}>+</button>
        </div>


        {/* Cosmetic extras: only shown when true */}
        {card.alternative_art && <p>Alternate Art</p>}
        {card.overframe && <p>Overframe</p>}

        {isMonster ? (
          // Monster details
          <>
            {typeLine && <p>{typeLine}</p>}
            {/*True when a column was actually filled in.
              instead of treating it as "empty".*/}
            {hasValue(card.monster_attribute) && <p>Attribute: {card.monster_attribute}</p>}
            {hasValue(card.level_rank) && <p>{levelLabel}: {card.level_rank}</p>}
            {hasValue(card.pendulum_scale) && <p>Pendulum Scale: {card.pendulum_scale}</p>}
            {hasValue(card.link_arrows) && <p>Link Arrows: {card.link_arrows}</p>}
            {hasValue(card.link_rating) && <p>LINK-{card.link_rating}</p>}
            {card.extra_deck && <p>Extra Deck</p>}
            {(hasValue(card.attack) || card.unknown_atk) && <p>ATK: {attackText}</p>}
            {/* Link monsters have no DEF */}
            {!card.is_link && (hasValue(card.defense) || card.unknown_def) && <p>DEF: {defenseText}</p>}
          </>
        ) : (
          //Spell or Trap details (Normal Spell, Quick-Play Spell, Trap Card, etc).
          <p>Card Type: {hasValue(card.spell_trap_type) && `${card.spell_trap_type} `}{card.card_type}</p>
        )}
      </div>
    </div>
  );
}

export default RightSideBar;
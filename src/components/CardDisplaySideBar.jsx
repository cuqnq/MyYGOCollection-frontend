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
// instead of treating it as "empty".
function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

function RightSideBar({ card }) {
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

  // When a card IS selected, its information is displayed here.
  return (
    <div className="sidebarRight">
      <div className="cardHolder">
        {card.image_url && (
          <img
            src={card.image_url}
            alt={card.card_name}
            className="card-thumbnail"
          />
        )}

        {/* Details every card has */}
        <h2>{card.card_name}</h2>
        <p>Set: {card.set_code}</p>
        <p>Rarity: {card.rarity}</p>
        <p>Quantity: {card.quantity}</p>

        {/* Cosmetic extras: only shown when true */}
        {card.alternative_art && <p>Alternate Art</p>}
        {card.overframe && <p>Overframe</p>}

        {isMonster ? (
          // Monster details
          <>
            {typeLine && <p>{typeLine}</p>}
            {hasValue(card.monster_attribute) && <p>Attribute: {card.monster_attribute}</p>}
            {hasValue(card.level_rank) && <p>{levelLabel}: {card.level_rank}</p>}
            {hasValue(card.pendulum_scale) && <p>Pendulum Scale: {card.pendulum_scale}</p>}
            {hasValue(card.link_arrows) && <p>Link Arrows: {card.link_arrows}</p>}
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
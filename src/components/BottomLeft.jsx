import "./BottomLeft.css";

//NOTE: These are the props from App.jsx
// cards = array of card objects from GET/api/collection
// loading = true while APp is still fetching
// error = error message string if the fetch failed, otherwise null

function BottomLeft({cards, loading, error, onSelectCard, onChangeQuantity}) {
  if (loading) {
    return <div className="bottom-left">
      Loading collection...
      </div>;
  }

  if (error) {
    return <div className="bottom-left">
      Error: {error}
      </div>;
  }

  return (
    <div className="bottom-left">
      <ul className="card-list">
        {cards.map((card) => (
          <li key={card.id} className="card-list-item" onClick = {() => onSelectCard(card.id)}>
            {card.image_url && (
              <img
                src={card.image_url}
                alt={card.card_name}
                className="card-thumbnail"
              />
            )}
            {/* {card.card_name} — {card.rarity} (x{card.quantity}) */}
            <div className="card-qty-controls">
              <button className="quantity-btn decrease-qty" onClick={(event) => {
                  event.stopPropagation();          // don't also select the card
                  onChangeQuantity(card.id, -1);
                }}
              >
                - {/*Just a FYI, this is the "-" on display */}
              </button>

              <p>{card.quantity}</p>

              <button className="quantity-btn increase-qty" onClick={(event) => {
                  event.stopPropagation();          // don't also select the card
                  onChangeQuantity(card.id, 1);
                }}
              >
                +   {/*The "+" on display */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BottomLeft;

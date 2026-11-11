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

  //When the search is matched with no cards or the collection is empty.
  //PS: cards here is the FILTERED list from App.jsx, not the full collection.
  if (cards.length === 0) {
    return (
      <div className="bottom-left">
        <p className="empty-message">No cards found.</p>
      </div>
    );
  }

  return (
    <div className="bottom-left">
      <ul className="card-list">
        {cards.map((card) => (
          <li key={card.id} className="card-list-item" onClick = {() => onSelectCard(card.id)}>
            {card.image_url && (
              // Fills the space above the buttons. It measures that space so .card-art can size itself.
              <div className="card-art-area">
                {/* Box exactly the size of the card picture, so the set code lines up with the art's corner */}
                <div className="card-art">
                  <img
                    src={card.image_url}
                    alt={card.card_name}
                    className="card-thumbnail"
                  />
                  {/* Set code on top of the art's bottom-left corner, so 2 printings of the same card can be told apart */}
                  <span className="set-code-tag">{card.set_code}</span>
                </div>
              </div>
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

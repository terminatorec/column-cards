import react, { useState } from "react";

function JustCards() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 1, text: "Карточка 1" },
    { id: 2, order: 2, text: "Карточка 2" },
    { id: 3, order: 3, text: "Карточка 3" },
    { id: 4, order: 4, text: "Карточка 4" },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, card) {
    setCurrentCard(card);
  }
  function dragEndHandler(e) {
    e.target.style.background = "none";
  }
  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = "rgba(97, 218, 251, 0.2)";
  }
  function dropHandler(e, card) {
    e.preventDefault();

    setCardList(
      cardList.map((item) => {
        if (item.id === card.id) {
          return { ...item, order: currentCard.order };
        }
        if (item.id === currentCard.id) {
          return { ...item, order: card.order };
        }
        return item;
      })
    );

    e.target.style.background = "none";
  }

  const sortCard = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="JustCards">
      {cardList.sort(sortCard).map((card) => (
        <div
            key={card.id}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable="true"
          className="card"
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}

export default JustCards;

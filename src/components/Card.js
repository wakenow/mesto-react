import React from 'react';

function Card({card, onCardClick}) {
    function handleClick(){
        onCardClick(card);
    }

    return (
      <li className="element">
        <img src={card.link} alt="" className="element__image" onClick={handleClick}/>
        <button className="element__remove-button" type="button"/>
        <div className="element__name">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button className="element__like-button" type="button"/>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    );
}
export default Card;

import React from 'react';
import api from '../utils/Api.js';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName]=React.useState('');
    const [userDescription, setUserDescription]=React.useState('');
    const [userAvatar, setUserAvatar]=React.useState('');
    const [cards, setCards]=React.useState([]);
React.useEffect(()=>{
    const userFromServer = api.getUserData();
    const cardsFromServer = api.getInitialCards();

    const dataDownload = [userFromServer, cardsFromServer];
Promise.all(dataDownload)
    .then((data) => {
        const userData = data[0];
        setCards(data[1]);
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
    });
  },[]);

    return (
        <main className="content">
            <section className="profile">
            <img src={userAvatar}  alt="фото профиля" className="profile__avatar" onClick={onEditAvatar}/>
                <div className="profile__profile-info">
                    <div className="profile__name-wrapper">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" className="profile__profile-button" aria-label="Редактировать профиль" onClick={onEditProfile}/>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}/>
            </section>
            <section>
                <ul className="elements">
                {cards.map((item)=>(
                <Card key={item._id} card={item} onCardClick={onCardClick}/>
              ))}
                </ul>
            </section>
        </main>
    );
}
export default Main;

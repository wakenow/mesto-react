import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ErrorPopup from './ErrorPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [addPlacePopupSubmitButtonText, setAddPlacePopupSubmitButtonText] = React.useState('Сохранить');
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [willBeDeletedCard, setWillBeDeletedCard] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const userFromServer = api.getUserData();
    const cardsFromServer = api.getInitialCards();
    const dataDownload = [userFromServer, cardsFromServer];
    Promise.all(dataDownload)
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        setErrorMessage('Не удалось загрузить данные');
        setTimeout(() => { setErrorMessage('') }, 2000);
      });
  }, []);
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        setErrorMessage('Ошибка связи с сервером');
        setTimeout(() => { setErrorMessage('') }, 2000);
      });
  }

  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true);
    setWillBeDeletedCard(card);
  }

  function handleDeleteCardConfirmation() {
    const isOwn = willBeDeletedCard.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(willBeDeletedCard._id)
        .then(() => {
          const newCards = cards.filter((c) => {
            return (c._id !== willBeDeletedCard._id);
          });
          setCards(newCards);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorMessage('Не удалось удалить карточку');
          setIsConfirmPopupOpen(false); 
          setIsConfirmPopupOpen(true);  
          setTimeout(() => { setErrorMessage('') }, 2000);
        });
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setWillBeDeletedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api.uploadUserProfileData(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        setErrorMessage('Не удалось обновить данные на сервере')
        setIsEditProfilePopupOpen(false);
        setIsEditProfilePopupOpen(true); 
        setTimeout(() => { setErrorMessage('') }, 2000);

      });
  }

  function handleUpdateAvatar(link) {
    api.avatarUpload({ link: link })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        setErrorMessage('Не удалось обновить фото профиля');
        setIsEditAvatarPopupOpen(false); 
        setIsEditAvatarPopupOpen(true);  
        setTimeout(() => { setErrorMessage('') }, 2000);
      })
  }

  function handleAddPlaceSubmit(title, link) {
    setAddPlacePopupSubmitButtonText('Сохранение...')
    api.addCard(title, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        setErrorMessage('Ошибка связи с сервером');
        setTimeout(() => { setErrorMessage('') }, 2000);
      })
      .finally(() => {
        setAddPlacePopupSubmitButtonText('Сохранить');
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <div className="wrapper">
      <div className="page">
      <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            submitButtonText={addPlacePopupSubmitButtonText}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleDeleteCardConfirmation}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <ErrorPopup
            message={errorMessage}
          />

        </div>
    </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

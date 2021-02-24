import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]=React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]=React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]=React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen]=React.useState(false);
  const [selectedCard, setSelectedCard]=React.useState({});

  function handleEditProfileClick  () {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick ()  {
    setIsAddPlacePopupOpen(true);
  };
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };
  function handleCardClick (card) {
    setSelectedCard(card);
  };
  function closeAllPopups (){
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }
  return (
    <div className="App">
      <div className="wrapper">
      <div className="page">
        <Header/>
        <Main
          onEditProfile= {handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar= {handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer/>
        <PopupWithForm
          title="Редактировать профиль"
          name="edit"
          submitText="Сохранить"
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
        >
          <input
            name="name"
            className="popup__form popup__form_type_name"
            type="text"
            required
            minlength="2"
            maxlength="40"
            autocomplete="off"
          />
          <span className="popup__error popup__error_type_name"></span>
          <input
            name="occupation"
            className="popup__form popup__form_type_bio"
            type="text"
            required
            minlength="2"
            maxlength="200"
            autocomplete="off"
          />
          <span className="popup__error popup__error_type_bio"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          name="new-card"
          submitText="Сохранить"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        >
          <input
          name="place"
          className="popup__form popup__form_type_place"
          type="text"
          placeholder="Название"
          required
          minlength="1"
          maxlength="30"
          autocomplete="off"
        />
          <span className="popup__error popup__error_type_place"></span>
          <input
            name="link"
            className="popup__form popup__form_type_link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            autocomplete="off"
          />
          <span className="popup__error popup__error_type_link"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          submitText="Сохранить"
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        >
          <input
          name="link"
          className="popup__form popup__form_type_link"
          type="url"
          required
          placeholder="Ссылка на картинку"
          autocomplete="off"
        />
        <span className="popup__error popup__error_type_link"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          submitText="Да"
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        </div>
    </div>
    </div>
  );
}

export default App;

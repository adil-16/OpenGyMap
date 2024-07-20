import React, { useState } from "react";
import CardPopup from "../../../components/popups/PaymentPopups/CardAdd";
import AddAnotherCardPopup from "../../../components/popups/PaymentPopups/AddAnotherCard";
import SplitAmountPopup from "../../../components/popups/PaymentPopups/SplitAmount";
import Crossicon from "../../../components/buttons/Crossicon";

const PaymentOptions = () => {
  const [popupState, setPopupState] = useState({
    isCardPopupOpen: false,
    isAddAnotherCardPopupOpen: false,
    isSplitAmountPopupOpen: false,
    cardAdded: false,
    cardDetails: null,
  });

  const handleCardPopupOpen = () => {
    setPopupState({
      ...popupState,
      isCardPopupOpen: true,
      isAddAnotherCardPopupOpen: false,
      isSplitAmountPopupOpen: false,
    });
  };

  const handleCardPopupClose = () => {
    setPopupState({
      ...popupState,
      isCardPopupOpen: false,
      isAddAnotherCardPopupOpen: false,
      isSplitAmountPopupOpen: false,
    });
  };

  const handleAddAnotherCardPopupOpen = () => {
    setPopupState({
      ...popupState,
      isCardPopupOpen: false,
      isAddAnotherCardPopupOpen: true,
      isSplitAmountPopupOpen: false,
    });
  };

  const handleAddAnotherCardPopupClose = () => {
    setPopupState({
      ...popupState,
      isCardPopupOpen: false,
      isAddAnotherCardPopupOpen: false,
      isSplitAmountPopupOpen: false,
    });
  };

  const handleSplitAmountPopupOpen = () => {
    setPopupState({
      ...popupState,
      isCardPopupOpen: false,
      isAddAnotherCardPopupOpen: false,
      isSplitAmountPopupOpen: true,
    });
  };

  const handleSplitAmountPopupClose = () => {
    setPopupState({
      ...popupState,
      isCardPopupOpen: false,
      isAddAnotherCardPopupOpen: false,
      isSplitAmountPopupOpen: false,
    });
  };

  const handleAddCard = (cardDetails) => {
    setPopupState({
      isCardPopupOpen: false,
      isAddAnotherCardPopupOpen: false,
      isSplitAmountPopupOpen: false,
      cardAdded: true,
      cardDetails: cardDetails,
    });
  };

  const handleRemoveCard = () => {
    setPopupState({ ...popupState, cardAdded: false, cardDetails: null });
  };

  const maskCardNumber = (cardNumber) => {
    if (cardNumber.length > 4) {
      return cardNumber.substring(0, 4) + " **** ****" + cardNumber.slice(-4);
    }
    return cardNumber;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-custom-black text-xl">
          Pay with
        </span>
        {!popupState.cardAdded && (
          <button
            onClick={handleCardPopupOpen}
            className="text-custom-black border border-custom-black py-1 px-8 rounded-lg"
          >
            Add
          </button>
        )}
      </div>
      {!popupState.cardAdded && (
        <div className="mt-2">
          <button
            onClick={handleSplitAmountPopupOpen}
            className="text-payment-gray underline"
          >
            Split amount?
          </button>
        </div>
      )}

      {popupState.cardAdded && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <img
              src="/Payment/mastercard.png"
              alt="Card Image"
              className="w-12 h-auto"
            />
            <p className="font-semibold pl-6 text-custom-black text-lg">
              {maskCardNumber(popupState.cardDetails.cardNumber)}
            </p>
          </div>
          <Crossicon onClick={handleRemoveCard} />
        </div>
      )}

      {popupState.isCardPopupOpen && (
        <CardPopup
          onClose={handleCardPopupClose}
          onAddAnotherCard={handleAddAnotherCardPopupOpen}
        />
      )}

      {popupState.isAddAnotherCardPopupOpen && (
        <AddAnotherCardPopup
          onClose={handleAddAnotherCardPopupClose}
          onAddCard={handleAddCard}
        />
      )}

      {popupState.isSplitAmountPopupOpen && (
        <SplitAmountPopup onClose={handleSplitAmountPopupClose} />
      )}
    </div>
  );
};

export default PaymentOptions;

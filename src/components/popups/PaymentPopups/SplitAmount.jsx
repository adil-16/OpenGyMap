import React, { useState, useEffect } from "react";
import Crossicon from "../../buttons/Crossicon";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import PaymentSummaryPopup from "./SelectPaymentMethod";

const SplitAmountPopup = ({ onClose }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
  });

  const [selectedPayments, setSelectedPayments] = useState({
    paypal: false,
    mastercard: false,
    googlePay: false,
    applePay: false,
  });

  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleCheckboxChange = (paymentType) => {
    setSelectedPayments((prevState) => ({
      ...prevState,
      [paymentType]: !prevState[paymentType],
    }));
  };

  const handleContinue = () => {
    setShowPaymentSummary(true);
  };

  const handleClosePaymentSummary = () => {
    setShowPaymentSummary(false);
    onClose();
  };

  useEffect(() => {
    setIsAnyCheckboxChecked(Object.values(selectedPayments).some(Boolean));
  }, [selectedPayments]);

  const isAddButtonDisabled = !isAnyCheckboxChecked;
  const isDiscardButtonDisabled = isAnyCheckboxChecked;

  return showPaymentSummary ? (
    <PaymentSummaryPopup
      onClose={handleClosePaymentSummary}
      cardDetails={cardDetails}
    />
  ) : (
    <div className="fixed inset-0 flex items-center justify-center bg-custom-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 max-h-full overflow-hidden">
        <div className="overflow-y-auto scrollbar-hidden max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-custom-black">
              Split Amount
            </h2>
            <Crossicon onClick={onClose} />
          </div>
          <div className="border-b border-navbar-gray mb-4"></div>
          <div className="mb-4">
            <p className="text-lg text-payment-gray font-semibold">
              Choose the payment methods for splitting amounts
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4 flex items-center">
              <label className="custom-checkbox mr-4">
                <input
                  type="checkbox"
                  id="paypal"
                  checked={selectedPayments.paypal}
                  onChange={() => handleCheckboxChange("paypal")}
                />
                <span className="checkmark"></span>
              </label>
              <img
                src="/Payment/paypal.png"
                alt="PayPal"
                className="w-6 h-6 mr-2"
              />
              <p className="text-custom-black font-semibold flex-1">PayPal</p>
              <input
                type="text"
                value="$15.00"
                className="border rounded-lg p-2 w-20 text-center"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="text-md mb-2 text-popup-gray block"
              >
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="border rounded-lg p-2 w-full pr-12"
                  placeholder="Enter card number"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="cardName"
                  className="text-md mb-2 text-popup-gray block"
                >
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter name on card"
                  value={cardDetails.nameOnCard}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="expiryDate"
                  className="text-md mb-2 text-popup-gray block"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className="border rounded-lg p-2 w-full"
                  placeholder="MM/YYYY"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="cvv"
                  className="text-md mb-2 text-popup-gray block"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter CVV"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4 flex justify-center items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isDiscardButtonDisabled}
                className={`border py-2 px-4 rounded-lg ${
                  isDiscardButtonDisabled
                    ? "border-gray-300 text-gray-500"
                    : "border-custom-black text-custom-black"
                }`}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isDiscardButtonDisabled}
                className={`border py-2 px-4 rounded-lg ${
                  isAddButtonDisabled
                    ? "border-gray-300 text-gray-500"
                    : "border-custom-black text-custom-black"
                }`}
              >
                Add
              </button>
            </div>
            <div className="mb-4 flex items-center">
              <label className="custom-checkbox mr-4">
                <input
                  type="checkbox"
                  id="mastercard"
                  checked={selectedPayments.mastercard}
                  onChange={() => handleCheckboxChange("mastercard")}
                />
                <span className="checkmark"></span>
              </label>
              <img
                src="/Payment/mastercard.png"
                alt="MasterCard"
                className="w-6 h-6 mr-2"
              />
              <p className="text-custom-black font-semibold flex-1">
                Mastercard
              </p>
              <input
                type="text"
                value="$15.00"
                className="border rounded-lg p-2 w-20 text-center"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="text-md mb-2 text-popup-gray block"
              >
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="border rounded-lg p-2 w-full pr-12"
                  placeholder="Enter card number"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="cardName"
                  className="text-md mb-2 text-popup-gray block"
                >
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter name on card"
                  value={cardDetails.nameOnCard}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="expiryDate"
                  className="text-md mb-2 text-popup-gray block"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className="border rounded-lg p-2 w-full"
                  placeholder="MM/YYYY"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="cvv"
                  className="text-md mb-2 text-popup-gray block"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter CVV"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4 flex justify-center items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isDiscardButtonDisabled}
                className={`border py-2 px-4 rounded-lg ${
                  isDiscardButtonDisabled
                    ? "border-gray-300 text-gray-500"
                    : "border-custom-black text-custom-black"
                }`}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isDiscardButtonDisabled}
                className={`border py-2 px-4 rounded-lg ${
                  isAddButtonDisabled
                    ? "border-gray-300 text-gray-500"
                    : "border-custom-black text-custom-black"
                }`}
              >
                Add
              </button>
            </div>
          </form>
          <div className="border-b border-navbar-gray my-4"></div>
          <div className="mb-4 flex items-center">
            <label className="custom-checkbox mr-4">
              <input
                type="checkbox"
                id="googlePay"
                checked={selectedPayments.googlePay}
                onChange={() => handleCheckboxChange("googlePay")}
              />
              <span className="checkmark"></span>
            </label>
            <FcGoogle className="w-6 h-6 mr-2" />
            <p className="text-custom-black font-semibold flex-1">Google Pay</p>
          </div>
          <div className="mb-4 flex items-center">
            <label className="custom-checkbox mr-4">
              <input
                type="checkbox"
                id="applyPay"
                checked={selectedPayments.applePay}
                onChange={() => handleCheckboxChange("applePay")}
              />
              <span className="checkmark"></span>
            </label>
            <BsApple className="w-6 h-6 mr-2" />
            <p className="text-custom-black font-semibold flex-1">Apple Pay</p>
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={handleContinue}
              className="bg-custom-gradient text-white py-3 px-16 rounded-xl"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitAmountPopup;

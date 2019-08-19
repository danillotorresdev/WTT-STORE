import React from 'react';

const BookModal = ({
  modalBookInfo,
  modalBookImage,
  showModal,
  modalBookTitle,
  modalBookPrice,
  hideModal,
  handleSaveBooksInCart,
}) =>
  (
    <div className={`bookModal bookModal--${showModal}`}>
      <div className="bookModal--box">
        <span role="presentation" className="bookModal--close" onClick={hideModal}>x</span>
        <div className="d-flex h-100">
          <div className="bookModal--leftColumn d-flex align-items-center">
            <img className="bookModal--img" src={modalBookImage} alt="" />
          </div>
          <div className="bookModal--rightColumn h-100 d-flex flex-column justify-content-between">
            <div className="bookModal--info h-100 d-flex flex-column justify-content-between">
              <div className="">
                <h3>{modalBookTitle}</h3>
                <p className="">{modalBookInfo}</p>
              </div>
              <div className="d-flex align-items-center justify-content-around mb-4">
                <span className="bookModal--price">
                  R$
                  {modalBookPrice}
                </span>
                <div className="bookModall--cart">
                  <button type="button" className="btn btn-primary" onClick={() => handleSaveBooksInCart()}>Adicionar ao carrinho</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default BookModal;

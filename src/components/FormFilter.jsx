import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import BookModal from './BookModal';

import ActionCreators from '../redux/actionCreators';

class FormFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: 0,
      showModal: null,
      booksInCart: [],
    };

    this.handleModal = this.handleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    const { loadBooks } = this.props;
    loadBooks();

    let livrosGuardados = localStorage.getItem('booksInCart');
    if (livrosGuardados) {
      livrosGuardados = JSON.parse(livrosGuardados);
      this.setState({
        booksInCart: livrosGuardados,
      });
    }
  }

  handleModal(index) {
    this.setState({
      modalActive: index,
      showModal: 'show',
    });
  }

  hideModal() {
    this.setState({
      modalActive: 0,
      showModal: null,
    });
  }

  handleSaveBooksInCart(
    modalBookId,
    modalBookImage,
    modalBookInfo,
    modalBookPrice,
    modalBookTitle,
  ) {
    const { booksInCart } = this.state;
    const { saveBooksInCart } = this.props;
    const book = {
      id: modalBookId,
      image: modalBookImage,
      info: modalBookInfo,
      price: modalBookPrice,
      title: modalBookTitle,
    };
    booksInCart.push(book);
    saveBooksInCart({
      booksInCart,
    }, this.setState({
      modalActive: 0,
      showModal: null,
    }));
    localStorage.setItem('booksInCart', JSON.stringify(booksInCart));
    NotificationManager.success('Item salvo no carrinho :)');
  }

  render() {
    const { books } = this.props;
    const { modalActive, showModal } = this.state;
    let modalBookTitle;
    let modalBookInfo;
    let modalBookPrice;
    let modalBookImage;
    let modalBookId;
    if (books.data) {
      if (books.data[modalActive]) {
        modalBookId = books.data[modalActive].id;
        modalBookTitle = books.data[modalActive].title;
        modalBookInfo = books.data[modalActive].info;
        modalBookPrice = books.data[modalActive].price;
        modalBookImage = books.data[modalActive].image;
      }
    }
    return (
      <>
        <div className="container pt-4">
          <div className="row">
            {books.data.map(
              (book, index) => (
                <div role="presentation" key={book.id} className="col-md-3" onClick={() => this.handleModal(index)}>
                  <div className="card border-0" style={{ width: '100%' }}>
                    <img src={book.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                    </div>
                  </div>
                </div>
              ),
            )}

          </div>
          <NotificationContainer />
        </div>
        <BookModal
          modalBookInfo={modalBookInfo}
          modalBookImage={modalBookImage}
          showModal={showModal}
          modalBookPrice={modalBookPrice}
          modalBookTitle={modalBookTitle}
          hideModal={() => this.hideModal()}
          handleSaveBooksInCart={() => this.handleSaveBooksInCart(
            modalBookId,
            modalBookImage,
            modalBookInfo,
            modalBookPrice,
            modalBookTitle,
          )}

        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = dispatch => ({
  loadBooks: () => dispatch(ActionCreators.getBooksRequest()),
  saveBooksInCart: booksInCart => dispatch(ActionCreators.saveBooksInCartSuccess(booksInCart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);

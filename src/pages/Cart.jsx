import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ActionCreators from '../redux/actionCreators';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booksInCart: [],
      name: '',
      email: '',
      purchase: false,
      hide: '',
    };

    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.backToHome = this.backToHome.bind(this);
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

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleEmail(e) {
    console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  }

  handlePurchase(e) {
    const { email, name } = this.state;
    e.preventDefault();
    if (email && name) {
      this.setState({
        purchase: true,
      });
      NotificationManager.success('Seu pedido foi concluído com sucesso. Agradeço a compra do livro');
      localStorage.removeItem('booksInCart');
    } else {
      NotificationManager.error('Voce precisa preencher as informações para realizar essa compra');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  backToHome() {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }

  render() {
    const { booksInCart, purchase, hide } = this.state;
    const login = localStorage.getItem('login');
    const senha = localStorage.getItem('senha');

    if (login === null && senha === null) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="row justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <h3>Seu Carrinho </h3>
            {booksInCart.length === 0
              ? <p className="m-0 pl-3 text-info">Você nāo tem items adicionados no carrinho</p>
              : <p className="m-0 pl-3 text-info">{`Você escolheu ${booksInCart.length} livros`}</p>
            }

          </div>
          <div>
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Finalizar Compra</button>
          </div>
        </div>
        <div className="container pt-4">
          <div className="row">
            {booksInCart.map(
              book => (
                <div role="presentation" key={book.id} className="col-md-3">
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
        </div>

        <div className={`modal fade ${hide}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Finalizar compra</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="container">
                <div className="row p-3">
                  <form className="w-100">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nome</label>
                      <input onChange={this.handleName} required type="text" className="form-control" placeholder="Nome" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Data de aniversario</label>
                      <InputMask className="form-control" mask="99/99/9999" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <input onChange={this.handleEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    {purchase
                      ? <buttom onClick={this.backToHome} className="btn btn-success" data-dismiss="modal" aria-label="Close">Voltar ao início</buttom>
                      : <button type="submit" className="btn btn-primary" onClick={this.handlePurchase}>Finalizar compra</button>
                    }
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBooks: () => dispatch(ActionCreators.getBooksRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
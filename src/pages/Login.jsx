import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import ActionCreators from '../redux/actionCreators';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        login: '',
        senha: '',
      },
      alert: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSenha = this.handleSenha.bind(this);
    this.auth = this.auth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { loadUsers } = this.props;
    loadUsers();

    const login = localStorage.getItem('login');
    const senha = localStorage.getItem('senha');

    if (login && senha) {
      this.setState({
        user: {
          login,
          senha,
        },
      });
    }
  }

  handleLogin(e) {
    const { user } = this.state;
    const { senha } = user;
    this.setState({
      user: {
        login: e.target.value,
        senha,
      },
    });
  }

  handleSenha(e) {
    const { user } = this.state;
    const { login } = user;
    this.setState({
      user: {
        login,
        senha: e.target.value,
      },
    });
  }

  auth(e) {
    const { users } = this.props;
    const { user } = this.state;
    e.preventDefault();
    const userDB = users[0];
    const userState = user;
    if (userState.login && userState.senha) {
      if (userState.login === userDB.login && userState.senha === userDB.senha) {
        // usuario logado, salva no localStorage
        NotificationManager.success('Logado com sucesso');
        localStorage.setItem('login', userState.login);
        localStorage.setItem('senha', userState.senha);

        window.location.reload();
        // redireciona para a pagina interna
      } else {
        NotificationManager.error('Seus dados estão incorretos');
      }
    } else {
      // se o usuario nao digitar nada na tela
      NotificationManager.error('Você precisa digitar suas credenciais para logar');
      this.setState({ alert: 'alert-danger' });
    }
  }


  render() {
    const { alert } = this.state;
    const login = localStorage.getItem('login');
    const senha = localStorage.getItem('senha');

    if (login !== null && senha !== null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Login</label>
              <input onChange={this.handleLogin} type="text" className={`form-control ${alert}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Senha</label>
              <input onChange={this.handleSenha} type="password" className={`form-control ${alert}`} id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button onClick={this.auth} type="submit" className="btn btn-primary">Logar</button>
          </form>

        </div>
        <NotificationContainer />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(ActionCreators.getUsersRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import '../styles.css';
import React from 'react';

import * as Constants from '../constants.tsx';
import * as Functions from '../dices.tsx';
import * as Yup from 'yup';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';
import { withNavigation } from '../functions/withRouter.tsx';
//import { useNavigate } from 'react-router-dom';
interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}

type FieldError = string[];

type LoginError = {
  [key: string]: FieldError;
};

interface IState {
  jsonData?: string[];
  dataItems?: string[];
  error: LoginError;
  registerPlayerError: LoginError;
  registerAdminError: LoginError;
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleSubmitRegisterPlayer =
      this.handleSubmitRegisterPlayer.bind(this);
    this.registerPlayer = this.registerPlayer.bind(this);

    this.handleSubmitRegisterAdmin = this.handleSubmitRegisterAdmin.bind(this);
    this.registerAdmin = this.registerAdmin.bind(this);

    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.login = this.login.bind(this);

    this.displayLoginFunction = this.displayLoginFunction.bind(this);
    this.displayRegisterPlayerFunction =
      this.displayRegisterPlayerFunction.bind(this);
    this.displayRegisterAdminFunction =
      this.displayRegisterAdminFunction.bind(this);

    this.hideLoginFunction = this.hideLoginFunction.bind(this);
    this.hideRegisterPlayerFunction =
      this.hideRegisterPlayerFunction.bind(this);
    this.hideRegisterAdminFunction = this.hideRegisterAdminFunction.bind(this);

    this.updateLogoutVisibility = this.updateLogoutVisibility.bind(this);

    this.state = {
      jsonData: [],
      dataItems: [],
      error: {},
      registerPlayerError: {},
      registerAdminError: {}
    };
  }

  submittedLogin: boolean = false;
  submittedRegisterPlayer: boolean = false;
  submittedRegisterAdmin: boolean = false;

  userSchema: Yup.AnyObject = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters long')
      .required('Password is required')
  });

  handleFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    this.submittedLogin = true;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const errorsInfo: LoginError = {};
    let arrayAux: string[] = [];

    try {
      const validForm = await this.userSchema.isValid(formObj);
      if (validForm) {
        this.handleSubmitLogin(e);
      } else {
        const validationError = await this.userSchema.validate(formObj, {
          strict: true,
          abortEarly: false
        });
        validationError.inner.forEach(
          (error: Yup.ValidationError, i: number) => {
            if (error.path !== undefined) {
              if (Array.isArray(errorsInfo[error.path]) == false) {
                arrayAux = [];
                errorsInfo[error.path] = arrayAux;
              }
              if (errorsInfo[error.path]) {
                errorsInfo[error.path].push(validationError.errors[i]);
              }
            }
          }
        );
        this.setState({
          error: errorsInfo
        });
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError, i: number) => {
          if (error.path !== undefined) {
            if (Array.isArray(errorsInfo[error.path]) == false) {
              arrayAux = [];
              errorsInfo[error.path] = arrayAux;
            }
            if (errorsInfo[error.path]) {
              errorsInfo[error.path].push(err.errors[i]);
            }
          }
        });
        this.setState({
          error: errorsInfo
        });
      }
    }
  };

  validateLogin = async () => {
    if (this.submittedLogin == false) return;
    const form: HTMLFormElement = document.getElementById(
      'login_form'
    ) as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const errorsInfo: LoginError = {};
    let arrayAux: string[] = [];

    try {
      const validForm = await this.userSchema.isValid(formObj);
      if (validForm) {
        this.setState({
          error: {}
        });
      } else {
        const validationError = await this.userSchema.validate(formObj, {
          strict: true,
          abortEarly: false
        });
        validationError.inner.forEach(
          (error: Yup.ValidationError, i: number) => {
            if (error.path !== undefined) {
              if (Array.isArray(errorsInfo[error.path]) == false) {
                arrayAux = [];
                errorsInfo[error.path] = arrayAux;
              }
              if (errorsInfo[error.path]) {
                errorsInfo[error.path].push(validationError.errors[i]);
              }
            }
          }
        );
        this.setState({
          error: errorsInfo
        });
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError, i: number) => {
          if (error.path !== undefined) {
            if (Array.isArray(errorsInfo[error.path]) == false) {
              arrayAux = [];
              errorsInfo[error.path] = arrayAux;
            }
            if (errorsInfo[error.path]) {
              errorsInfo[error.path].push(err.errors[i]);
            }
          }
        });
        this.setState({
          error: errorsInfo
        });
      }
    }
  };

  validateRegisterPlayer = async () => {
    if (this.submittedRegisterPlayer == false) return;
    const form: HTMLFormElement = document.getElementById(
      'register_player_form'
    ) as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const errorsInfo: LoginError = {};
    let arrayAux: string[] = [];

    try {
      const validForm = await this.registerSchema.isValid(formObj);
      if (validForm) {
        this.setState({
          error: {}
        });
      } else {
        const validationError = await this.registerSchema.validate(formObj, {
          strict: true,
          abortEarly: false
        });
        validationError.inner.forEach(
          (error: Yup.ValidationError, i: number) => {
            if (error.path !== undefined) {
              if (Array.isArray(errorsInfo[error.path]) == false) {
                arrayAux = [];
                errorsInfo[error.path] = arrayAux;
              }
              if (errorsInfo[error.path]) {
                errorsInfo[error.path].push(validationError.errors[i]);
              }
            }
          }
        );
        this.setState({
          registerPlayerError: errorsInfo
        });
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError, i: number) => {
          if (error.path !== undefined) {
            if (Array.isArray(errorsInfo[error.path]) == false) {
              arrayAux = [];
              errorsInfo[error.path] = arrayAux;
            }
            if (errorsInfo[error.path]) {
              errorsInfo[error.path].push(err.errors[i]);
            }
          }
        });
        this.setState({
          registerPlayerError: errorsInfo
        });
      }
    }
  };

  validateRegisterAdmin = async () => {
    if (this.submittedRegisterAdmin == false) return;
    const form: HTMLFormElement = document.getElementById(
      'register_admin_form'
    ) as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const errorsInfo: LoginError = {};
    let arrayAux: string[] = [];

    try {
      const validForm = await this.registerSchema.isValid(formObj);
      if (validForm) {
        this.setState({
          error: {}
        });
      } else {
        const validationError = await this.registerSchema.validate(formObj, {
          strict: true,
          abortEarly: false
        });
        validationError.inner.forEach(
          (error: Yup.ValidationError, i: number) => {
            if (error.path !== undefined) {
              if (Array.isArray(errorsInfo[error.path]) == false) {
                arrayAux = [];
                errorsInfo[error.path] = arrayAux;
              }
              if (errorsInfo[error.path]) {
                errorsInfo[error.path].push(validationError.errors[i]);
              }
            }
          }
        );
        this.setState({
          registerAdminError: errorsInfo
        });
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError, i: number) => {
          if (error.path !== undefined) {
            if (Array.isArray(errorsInfo[error.path]) == false) {
              arrayAux = [];
              errorsInfo[error.path] = arrayAux;
            }
            if (errorsInfo[error.path]) {
              errorsInfo[error.path].push(err.errors[i]);
            }
          }
        });
        this.setState({
          registerAdminError: errorsInfo
        });
      }
    }
  };

  registerSchema: Yup.AnyObject = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters long')
      .required('Password is required'),
    password_confirmation: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value;
      }
    )
  });

  handlePlayerRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    this.submittedRegisterPlayer = true;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const errorsInfo: LoginError = {};
    let arrayAux: string[] = [];

    try {
      const validForm = await this.registerSchema.isValid(formObj);
      if (validForm) {
        this.handleSubmitRegisterPlayer(e);
      } else {
        const validationError: Yup.ValidationError =
          await this.registerSchema.validate(formObj, {
            strict: true,
            abortEarly: false
          });
        validationError.inner.forEach(
          (error: Yup.ValidationError, i: number) => {
            if (error.path !== undefined) {
              if (Array.isArray(errorsInfo[error.path]) == false) {
                arrayAux = [];
                errorsInfo[error.path] = arrayAux;
              }
              if (errorsInfo[error.path]) {
                errorsInfo[error.path].push(validationError.errors[i]);
              }
            }
          }
        );
        this.setState({
          registerPlayerError: errorsInfo
        });
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError, i: number) => {
          if (error.path !== undefined) {
            if (Array.isArray(errorsInfo[error.path]) == false) {
              arrayAux = [];
              errorsInfo[error.path] = arrayAux;
            }
            if (errorsInfo[error.path]) {
              errorsInfo[error.path].push(err.errors[i]);
            }
          }
        });
        this.setState({
          registerPlayerError: errorsInfo
        });
      }
    }
  };

  handleAdminRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    this.submittedRegisterAdmin = true;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const errorsInfo: LoginError = {};
    let arrayAux: string[] = [];

    try {
      const validForm = await this.registerSchema.isValid(formObj);
      if (validForm) {
        this.handleSubmitRegisterAdmin(e);
      } else {
        const validationError: Yup.ValidationError =
          await this.registerSchema.validate(formObj, {
            strict: true,
            abortEarly: false
          });
        validationError.inner.forEach(
          (error: Yup.ValidationError, i: number) => {
            if (error.path !== undefined) {
              if (Array.isArray(errorsInfo[error.path]) == false) {
                arrayAux = [];
                errorsInfo[error.path] = arrayAux;
              }
              if (errorsInfo[error.path]) {
                errorsInfo[error.path].push(validationError.errors[i]);
              }
            }
          }
        );
        this.setState({
          registerAdminError: errorsInfo
        });
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError, i: number) => {
          if (error.path !== undefined) {
            if (Array.isArray(errorsInfo[error.path]) == false) {
              arrayAux = [];
              errorsInfo[error.path] = arrayAux;
            }
            if (errorsInfo[error.path]) {
              errorsInfo[error.path].push(err.errors[i]);
            }
          }
        });
        this.setState({
          registerAdminError: errorsInfo
        });
      }
    }
  };

  static contextType = MyContext;
  declare context: MyContextType;

  chengeUserType = (newType: string) => {
    this.context.updateValue(newType);
  };
  changeNavSection = (newType: string) => {
    this.context.updateValueMain(newType);
    this.props.navigate('/home');
  };
  handleSubmitRegisterPlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.registerPlayer(event);
  }

  displayLoginFunction() {
    this.context.updateLoginFormDisplayStyle('flex');
  }
  displayRegisterPlayerFunction() {
    this.context.updateRegisterPlayerFormDisplayStyle('flex');
  }
  displayRegisterAdminFunction() {
    this.context.updateRegisterAdminFormDisplayStyle('flex');
  }
  hideLoginFunction() {
    this.context.updateLoginFormDisplayStyle('none');
  }
  hideRegisterPlayerFunction() {
    this.context.updateRegisterPlayerFormDisplayStyle('none');
  }
  hideRegisterAdminFunction() {
    this.context.updateRegisterAdminFormDisplayStyle('none');
  }

  logoutVisibilitySet: string = 'flex';
  updateLogoutVisibility = (newVisibility: string) => {
    this.context.updateLogoutVisibilitySetter(newVisibility);
  };

  async registerPlayerApiCall(event: React.FormEvent<HTMLFormElement>) {
    const registerPlayerURI: string = '/api/register';
    const registerPlayerEndPoint: string =
      Constants.dices_URL + registerPlayerURI;

    const form = event.target as HTMLFormElement;

    const name: string = (form.elements.namedItem('name') as HTMLInputElement)
      .value;
    const email: string = (form.elements.namedItem('email') as HTMLInputElement)
      .value;
    const password: string = (
      form.elements.namedItem('password') as HTMLInputElement
    ).value;
    const password_confirmation: string = (
      form.elements.namedItem('password_confirmation') as HTMLInputElement
    ).value;

    const response = await fetch(registerPlayerEndPoint, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  async registerPlayer(event: React.FormEvent<HTMLFormElement>) {
    const response = await this.registerPlayerApiCall(event);
    if (response.ok) {
      const result = await response.json();
      const jsonResponseBody = result;

      Functions.setCookie('token', jsonResponseBody['jwtoken'], 90);
      Functions.setCookie('userid', jsonResponseBody['user_id'], 90);
      Functions.setCookie('userName', jsonResponseBody['name'], 90);
      Functions.setCookie('userRole', jsonResponseBody['role'], 90);

      this.updateLogoutVisibility(this.logoutVisibilitySet);
      this.setPlayer();
    } else {
      alert(
        'There was an error processing your registration. Either the name or the email are taken, or the passwords are not the same'
      );
    }
  }

  handleSubmitRegisterAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.registerAdmin(event);
  }

  async registerAdminApiCall(event: React.FormEvent<HTMLFormElement>) {
    const registerAdminURI: string = '/api/registeradmin';
    const registerAdminEndPoint: string =
      Constants.dices_URL + registerAdminURI;

    const form = event.target as HTMLFormElement;

    const name: string = (form.elements.namedItem('name') as HTMLInputElement)
      .value;
    const email: string = (form.elements.namedItem('email') as HTMLInputElement)
      .value;
    const password: string = (
      form.elements.namedItem('password') as HTMLInputElement
    ).value;
    const password_confirmation: string = (
      form.elements.namedItem('password_confirmation') as HTMLInputElement
    ).value;

    const response = await fetch(registerAdminEndPoint, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  printValidationErrorsByKey(errors: Yup.ValidationError) {
    const output = document.createDocumentFragment();
    if (Array.isArray(errors)) {
      errors.forEach((element: string) => {
        const e = document.createElement('div');
        e.innerHTML = element;
        output.appendChild(e);
      });
    }

    return output;
  }

  async registerAdmin(event: React.FormEvent<HTMLFormElement>) {
    const response = await this.registerAdminApiCall(event);

    if (response.ok) {
      const result = await response.json();
      const jsonResponseBody = result;

      Functions.setCookie('token', jsonResponseBody['jwtoken'], 90);
      Functions.setCookie('userid', jsonResponseBody['user_id'], 90);
      Functions.setCookie('userName', jsonResponseBody['name'], 90);
      Functions.setCookie('userRole', jsonResponseBody['role'], 90);

      this.setAdmin();
      this.updateLogoutVisibility(this.logoutVisibilitySet);
    } else {
      alert(
        'There was an error processing your registration. Either the name or the email are taken, or the passwords are not the same'
      );
    }
  }

  handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.login(event);
  }

  async loginApiCall(event: React.FormEvent<HTMLFormElement>) {
    const loginURI: string = '/api/login';
    const loginEndPoint: string = Constants.dices_URL + loginURI;

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value;

    const response = await fetch(loginEndPoint, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  async queryOnlyAdmin() {
    const token = Functions.getCookie('token');
    const listPlayersURI: string = '/api/players';
    const listPlayersEndPoint: string = Constants.dices_URL + listPlayersURI;

    const response = await fetch(listPlayersEndPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    });
    return response;
  }

  async queryPlayerAndAdmin() {
    const token = Functions.getCookie('token');
    const playerid = Functions.getCookie('userid');

    const playerIDCookie = playerid;
    const playerURI: string = '/api/players/' + playerIDCookie + '/games';
    const playerEndPoint: string = Constants.dices_URL + playerURI;

    const response = await fetch(playerEndPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    });
    return response;
  }

  setAdmin() {
    this.chengeUserType('Admin');
    this.changeNavSection('home');
    this.updateLogoutVisibility(this.logoutVisibilitySet);
  }

  setPlayer() {
    this.chengeUserType('Player');
    this.changeNavSection('home');
    this.updateLogoutVisibility(this.logoutVisibilitySet);
  }

  async login(event: React.FormEvent<HTMLFormElement>) {
    const response = await this.loginApiCall(event);

    if (response.ok) {
      const jsonResponseBody = await response.json();

      Functions.setCookie('token', jsonResponseBody['jwtoken'], 90);
      Functions.setCookie('userid', jsonResponseBody['user_id'], 90);
      Functions.setCookie('userName', jsonResponseBody['name'], 90);
      Functions.setCookie('userRole', jsonResponseBody['role'], 90);

      const role = jsonResponseBody['role'];

      switch (role) {
        case 'admin':
          this.setAdmin();
          break;
        case 'player':
          this.setPlayer();
          break;
        default:
          break;
      }
      this.updateLogoutVisibility(this.logoutVisibilitySet);
    } else {
      alert(
        'There was an error processing your Login. Either the name or the email are wrong.'
      );
    }
  }

  //Check if user is already Logged In (Cookies Exists) and Set page:
  async componentDidMount() {
    //Check cookie token and userid
    const userID = Functions.getCookie('userid');
    const token = Functions.getCookie('token');
    const role = Functions.getCookie('userRole');

    if (userID != '' && token != '') {
      if (role == 'admin') {
        this.setAdmin();
      } else if (role == 'player') {
        const response = await this.queryPlayerAndAdmin();
        if (response.ok) {
          this.setPlayer();
        }
      }
    }
  }

  render() {
    const contextValues = this.context;

    return (
      <div className="main_container">
        <div className="loginSelector">
          <div
            tabIndex={0}
            className="buttonLoginSelector"
            onClick={this.displayLoginFunction}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.displayLoginFunction()
              }
            }}
          >
            <span className="icon icon-log icon-login"></span>
            Login
          </div>
          <div
            tabIndex={0}
            className="buttonLoginSelector"
            onClick={this.displayRegisterPlayerFunction}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.displayRegisterPlayerFunction()
              }
            }}
          >
            <span className="icon icon-log icon-player"></span>
            Register As Player
          </div>
          <div
            tabIndex={0}
            className="buttonLoginSelector"
            onClick={this.displayRegisterAdminFunction}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.displayRegisterAdminFunction()
              }
            }}
          >
            <span className="icon icon-log icon-admin"></span>
            Register As Admin
          </div>
          <div>
            DO NOT USE REAL DATA!
          </div>
        </div>

        <div
          className="form_section"
          id="loginForm"
          style={{ display: contextValues.loginFormDisplayStyle }}
        >
          <div className="form_section-inner-login">
            <div
              className="closeRow" 
              onClick={this.hideLoginFunction}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.hideLoginFunction()
                }
              }}
            >
              <span className="icon icon-form-close icon-close"></span>
            </div>
            <h3>Login</h3>
            <form
              id="login_form"
              className="form_user"
              onSubmit={this.handleFormLogin}
              autoComplete="on"
              noValidate
              onChange={this.validateLogin}
            >
              <label htmlFor="login_form_email">Email</label>
              <input
                id="login_form_email"
                type="email"
                name="email"
                required
                autoComplete="on"
              />

              {this.state.error.email &&
                this.state.error['email'].map((errorText: string) => {
                  return (
                    <div key={errorText} className="errorMessageForm">
                      <h3>{errorText}</h3>
                    </div>
                  );
                })}
              {!this.state.error.email && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}
              <label htmlFor="login_form_password">Password</label>
              <input
                id="login_form_password"
                type="password"
                name="password"
                required
              />

              {this.state.error.password &&
                this.state.error['password'].map((errorText: string) => {
                  return (
                    <div key={errorText} className="errorMessageForm">
                      <h3>{errorText}</h3>
                    </div>
                  );
                })}
              {!this.state.error.password && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}
              {(!this.state.error.password ||
                this.state.error.password.length < 2) && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}

              <input type="submit" className="submitBttn" value="Login" />
            </form>
          </div>
          <div className="background-form"></div>
        </div>

        <div
          className="form_section"
          id="registerPlayerForm"
          style={{ display: contextValues.registerPlayerFormDisplayStyle }}
        >
          <div className="form_section-inner">
            <div className="closeRow" onClick={this.hideRegisterPlayerFunction}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.hideRegisterPlayerFunction()
                }
              }}
            >
              <span className="icon icon-form-close icon-close"></span>
            </div>
            <h3>Register as Player</h3>
            <form
              id="register_player_form"
              className="form_user"
              onSubmit={this.handlePlayerRegister}
              autoComplete="on"
              noValidate
              onChange={this.validateRegisterPlayer}
            >
              <label htmlFor="register_player_form_name">Name</label>
              <input
                id="register_player_form_name"
                type="text"
                name="name"
                autoComplete="on"
              />
              {this.state.registerPlayerError.name &&
                this.state.registerPlayerError['name'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}

              <label htmlFor="register_player_form_email">Email</label>
              <input
                id="register_player_form_email"
                type="email"
                name="email"
                required
                autoComplete="on"
              />
              {this.state.registerPlayerError.email &&
                this.state.registerPlayerError['email'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}
              {!this.state.registerPlayerError.email && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}

              <label htmlFor="register_player_form_password">Password</label>
              <input
                id="register_player_form_password"
                type="password"
                name="password"
                required
              />
              {this.state.registerPlayerError.password &&
                this.state.registerPlayerError['password'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}
              {!this.state.registerPlayerError.password && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}
              {(!this.state.registerPlayerError.password ||
                this.state.registerPlayerError.password.length < 2) && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}

              <label htmlFor="register_player_form_password_confirmation">
                Password Confirmation
              </label>
              <input
                id="register_player_form_password_confirmation"
                type="password"
                name="password_confirmation"
                required
              />
              {this.state.registerPlayerError.password_confirmation &&
                this.state.registerPlayerError['password_confirmation'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}
              {!this.state.registerPlayerError.password_confirmation && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}

              <input type="submit" className="submitBttn" value="Register" />
            </form>
          </div>
          <div className="background-form"></div>
        </div>

        <div
          className="form_section"
          id="registerAdminForm"
          style={{ display: contextValues.registerAdminFormDisplayStyle }}
        >
          <div className="form_section-inner">
            <div className="closeRow" onClick={this.hideRegisterAdminFunction}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.hideRegisterAdminFunction()
                }
              }}
            >
              <span className="icon icon-form-close icon-close"></span>
            </div>
            <h3>Register as Administator</h3>
            <form
              id="register_admin_form"
              className="form_user"
              onSubmit={this.handleAdminRegister}
              autoComplete="on"
              noValidate
              onChange={this.validateRegisterAdmin}
            >
              <label htmlFor="register_admin_form_name">Name</label>
              <input
                id="register_admin_form_name"
                type="text"
                name="name"
                autoComplete="on"
              />
              {this.state.registerAdminError.name &&
                this.state.registerAdminError['name'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}

              <label htmlFor="register_admin_form_email">Email</label>
              <input
                id="register_admin_form_email"
                type="email"
                name="email"
                required
                autoComplete="on"
              />
              {this.state.registerAdminError.email &&
                this.state.registerAdminError['email'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}
              {!this.state.registerAdminError.email && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}

              <label htmlFor="register_admin_form_password">Password</label>
              <input
                id="register_admin_form_password"
                type="password"
                name="password"
                required
              />
              {this.state.registerAdminError.password &&
                this.state.registerAdminError['password'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}
              {!this.state.registerAdminError.password && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}
              {(!this.state.registerAdminError.password ||
                this.state.registerAdminError.password.length < 2) && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}

              <label htmlFor="register_admin_form_password_confirmation">
                Password Confirmation
              </label>
              <input
                className="inputForm"
                id="register_admin_form_password_confirmation"
                type="password"
                name="password_confirmation"
                required
              />
              {this.state.registerAdminError.password_confirmation &&
                this.state.registerAdminError['password_confirmation'].map(
                  (errorText: string) => {
                    return (
                      <div key={errorText} className="errorMessageForm">
                        <h3>{errorText}</h3>
                      </div>
                    );
                  }
                )}
              {!this.state.registerAdminError.password_confirmation && (
                <div className="errorMessageFormEmpty">
                  <h3></h3>
                </div>
              )}
              <input type="submit" className="submitBttn" value="Register" />
            </form>
          </div>

          <div className="background-form"></div>
        </div>
      </div>
    );
  }
}

export default withNavigation(Login);

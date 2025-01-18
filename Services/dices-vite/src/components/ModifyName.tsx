import '../styles.css';
import React from 'react';

import * as Constants from '../constants.tsx';
import * as Functions from '../dices.tsx';

import * as Yup from 'yup';

type FieldError = string[];
type YupError = {
  [key: string]: FieldError;
};

interface IProps {
  props?: React.PropsWithChildren;
}

interface IState {
  jsonData?: string[];
  dataItems?: string[];
  error: YupError;
}
export default class ModifyName extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleSubmitModifyName = this.handleSubmitModifyName.bind(this);
    this.modifyName = this.modifyName.bind(this);

    this.state = {
      error: {}
    };
  }

  handleSubmitModifyName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.handleFormModifyName(event);
  }

  userSchema: Yup.AnyObject = Yup.object().shape({
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters long')
      .required('Password is required')
  });

  async modifyNameApiCall(event: React.FormEvent<HTMLFormElement>) {
    const token = Functions.getCookie('token');
    const user_id = Functions.getCookie('userid');
    const modifyNameURI: string = '/api/players/' + user_id;
    const modifyNameEndPoint: string = Constants.dices_URL + modifyNameURI;

    const form = event.target as HTMLFormElement;

    const name: string = (form.elements.namedItem('name') as HTMLInputElement)
      .value;
    const password: string = (
      form.elements.namedItem('password') as HTMLInputElement
    ).value;

    const response = await fetch(modifyNameEndPoint, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    });

    return response;
  }

  handleFormModifyName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const validForm = await this.userSchema.isValid(formObj);
    const errorsInfo: YupError = {};
    let arrayAux: string[] = [];

    try {
      if (validForm) {
        this.setState({
          error: {}
        });
        this.modifyName(e);
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
    } catch (err) {
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

  clearForm() {
    const form = document.getElementById('change_name_form')!;
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = ''; // Clear the value of each input
    });
  }

  async modifyName(event: React.FormEvent<HTMLFormElement>) {
    const response = await this.modifyNameApiCall(event);
    if (response.ok) {
      const form = event.target as HTMLFormElement;
      Functions.setCookie(
        'userName',
        (form.elements.namedItem('name') as HTMLInputElement).value,
        90
      );
      this.clearForm();
      alert('Your name has been correclty modified');
    } else {
      //alert("It was not possible to modify your name. The new name is either taken or the password was wrong");
    }
  }

  render() {
    return (
      <div className="main_container">
        <div className="form_section_home">
          <h3>Modify your name:</h3>
          <form
            id="change_name_form"
            className="form_user"
            onSubmit={this.handleSubmitModifyName}
            autoComplete="on"
          >
            <label htmlFor="change_name_form_name">New Name</label>
            <input
              id="change_name_form_name"
              type="text"
              name="name"
              required
              autoComplete="on"
            />
            <label htmlFor="change_name_form_password">Password</label>
            <input
              id="change_name_form_password"
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

            <input type="submit" className="submitBttn" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

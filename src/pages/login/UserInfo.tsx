import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { User, useUserDispatch, USER_LOGIN } from '../../contexts/userContext';
import { userInfo } from "os";

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($userId: ID!, $oldPassword: String!, $newPassword: String!) {
    changePassword_v1(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword) {
      refreshToken
      token
      user {
        roles{name}
        id,
        email,
        verified
      }
    }
  }
`;

export const UserInfo: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("ahoj");
  const [newPassword, setNewPassword] = useState("ahoj");
  const [newPasswordCopy, setNewPasswordCopy] = useState("");
  const [showPasswordChanged, setShowPasswordChanged] = useState(false);
  const [invalidPasswordCopy, setInvalidNewPasswordCopy] = useState(false);

  const history = useHistory()
  const dispatch = useUserDispatch()

  const [changePassword, { loading, data, error }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    errorPolicy: "none",
  });

  const [invalidOldPassword, setInvalidOldPassword] = useState(false);

  const [invalidPass, setInvalidPass] = useState(false);
  const [validPass, setValidPass] = useState(false);

  

  const userId = localStorage.getItem('user.id') || ''
  const userEmail = localStorage.getItem('user.email') || ''
  const userVerified = localStorage.getItem('user.verified') == 'true'

  const onChangePassword = async () => {
    if (newPassword != newPasswordCopy) {
      setInvalidNewPasswordCopy(true)
      return
    }

    try {
      const { data } = await changePassword({ variables: { userId, oldPassword, newPassword } })
      dispatch({
        type: USER_LOGIN,
        userToken: data.changePassword_v1
      })
      setShowPasswordChanged(true)
      
      setOldPassword('')
      setNewPassword('')
      setNewPasswordCopy('')

      // show notify
      setTimeout(()=>{
        setShowPasswordChanged(false)
      }, 5000)
    } catch (ex) {
        console.log('onError', data)
        setInvalidOldPassword(true)
      }
  
  };


  const onCurrentPasswordChange = (event: any) => {
    setOldPassword(event.target.value);
    setInvalidOldPassword(false);
  };

  const onNewPasswordChange = (event: any) => {
    const pass = event.target.value as string
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    setValidPass(regularExpression.test(pass))

    setNewPassword(pass);
    setInvalidOldPassword(false);
    setInvalidPass(false);
    
    if (pass == newPasswordCopy) {
      setInvalidNewPasswordCopy(false)
    }
  };

  const onNewPasswordCopyChange = (event: any) => {
    const c = event.target.value
    setNewPasswordCopy(c)
    setInvalidOldPassword(false)
    setInvalidPass(false)

    if (c == newPassword) {
      setInvalidNewPasswordCopy(false)
    }
  };

  return (<>


    <section className="no-top" data-bgimage="url(images/background/3.png) top">
      <div className="col-md-12 text-center">
          <h1>User Setting</h1>
          {showPasswordChanged ? (<div className="alert alert-success" role="alert">The password was changed</div>): null}
      </div>
      <div className="col-md-12 text-center">
          <h2>Email</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-2 offset-md-3">
            {userEmail}
          </div>
          <div className="col-md-7 ">
            {userVerified?<div>Verified</div>: <div>
              not verified <Button className="btn-sm" variant="warning">Resent email with link for verify</Button>
              
            </div>}
          </div>
          <div className="spacer-single"></div>
          </div>
        </div>
      <div className="col-md-12 text-center">
          <h2>Change passwod</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form name="contactForm" id='contact_form' className="form-border" method="post" action='blank.php'>


              <Form>
                {invalidOldPassword && (<Alert variant={"danger"}>Current password is incorect</Alert>)}
                {invalidPasswordCopy && (<Alert variant={"danger"}>The retyped password is not the same</Alert>)}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter email"
                    onChange={onCurrentPasswordChange}
                    value={oldPassword}
                    isInvalid={invalidOldPassword}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={onNewPasswordChange}
                    value={newPassword}
                    isInvalid={invalidPass}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Repeat New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Retype Password"
                    onChange={onNewPasswordCopyChange}
                    value={newPasswordCopy}
                    isInvalid={invalidPasswordCopy}
                  />
                </Form.Group>
              </Form>

              <div id='submit' className="pull-left">
                {!loading && <Button className="btn-round" variant="primary" onClick={() => onChangePassword()}>Change Password</Button>}
                {loading && <Button className="btn-round" variant="primary" disabled>Loading...</Button>}

                <div className="clearfix"></div>

                

              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default UserInfo;

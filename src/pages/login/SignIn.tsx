import React, { useState, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useHistory } from "react-router-dom";
import { User, useUserDispatch, USER_LOGIN } from '../../contexts/userContext';
import { Modal, Form, Button, Alert } from 'react-bootstrap'

const LOGIN_QL = gql`
  query Login($email: String!, $pass: String!) {
    login(email: $email, password:$pass) {
      id,
      token,
      email,
      roles {
        role,
        id
      }
    }
}
`;

export const SignIn: React.FC = () => {
    const [email, setEmail] = useState(localStorage.getItem('user.email') as string)
    const [pass, setPass] = useState('')

    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPass, setInvalidPass] = useState(false)

    const history = useHistory()
    const dispatch = useUserDispatch()

    const [login, { loading, data, error }] = useLazyQuery(LOGIN_QL, {
        onCompleted: (d) => {
            dispatch({
                type: USER_LOGIN,
                user: d.login as User
            })
            onHide()
            history.push('/user/projects')
        }, onError: (error) => {
            setInvalidEmail(true)
            setInvalidPass(true)
            setPass('')
        }
    });

    const onLogin = async () => {
        login({ variables: { email, pass } })
    }

    const onEmailChange = (event: any) => {
        setEmail(event.target.value)
        setInvalidEmail(false)
        setInvalidPass(false)
    }

    const onPasswordChange = (event: any) => {
        setPass(event.target.value)
        setInvalidEmail(false)
        setInvalidPass(false)
    }

    const onHide = () => {
        setPass('')
        setInvalidEmail(false)
        setInvalidPass(false)
        // doHide()
    }

    return (<>
        <section id="subheader" data-bgimage="url(images/background/5.png) bottom">
            <div className="center-y relative text-center" data-scroll-speed="4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <form action='blank.php' className="row" id='form_subscribe' method="post" name="myForm">
                                <div className="col-md-12 text-center">
                                    <h1>User Login</h1>
                                    <p>We was missed you already</p>
                                </div>
                                <div className="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="no-top" data-bgimage="url(images/background/3.png) top">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Form name="contactForm" id='contact_form' className="form-border" >
                            {!invalidPass && <h3>Login to your account</h3>}
                            {invalidPass && <Alert variant={'danger'}>Email or password is not valid</Alert>}
                            <Form.Group controlId="formBasicEmail">

                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" onChange={onEmailChange} value={email} isInvalid={invalidEmail} />
                            </Form.Group>


                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' onChange={onPasswordChange} value={pass} isInvalid={invalidPass} />
                                <Form.Text className="text-muted">
                                    We'll never share your password with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <div id='submit' className="pull-left">
                                {!loading && <Button className="btn-round" variant="primary" onClick={() => onLogin()}>Login</Button>}
                                {loading && <Button className="btn-round" variant="primary" disabled>Loading...</Button>}
                                <div className="clearfix"></div>

                                <div className="spacer-single"></div>

                                <ul className="list s3">
                                    <li>Or login with:</li>
                                    <li><a href="#">Facebook</a></li>
                                    <li><a href="#">Google</a></li>
                                    <li><a href="#">Instagram</a></li>
                                </ul>

                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </section>
    </>
    )

    // <div>
    //         <Modal show={show} onHide={onHide}>
    //             <Modal.Header closeButton>
    //                 <div>
    //                     <Modal.Title>SigIn</Modal.Title>
    //                 </div>

    //             </Modal.Header>

    //             <Modal.Body>
    //                 {loading && <div>Loading...</div>}
    //                 <div>
    //                     {invalidPass && <Alert variant={'danger'}>Email or password is not valid</Alert>}
    //                 </div>

    //                 <Form>
    //                     <Form.Group controlId="formBasicEmail">
    //                         <Form.Label>Email address</Form.Label>
    //                         <Form.Control type="email" placeholder="Enter email" onChange={onEmailChange} value={email} isInvalid={invalidEmail}/>
    //                         <Form.Text className="text-muted">
    //                             We'll never share your email with anyone else.
    //                         </Form.Text>
    //                     </Form.Group>

    //                     <Form.Group controlId="formBasicPassword">
    //                         <Form.Label>Password</Form.Label>
    //                         <Form.Control type="password" placeholder="Password" onChange={onPasswordChange} value={pass} isInvalid={invalidPass} />
    //                     </Form.Group>


    //                 </Form>
    //             </Modal.Body>

    //             <Modal.Footer>
    //                 <Button variant="primary" type="submit" onClick={() => onLogin()}>SigIn</Button>
    //                 <Button variant="secondary" onClick={onHide}>Close</Button>
    //             </Modal.Footer>
    //         </Modal>


    //     </div>
}

export default SignIn
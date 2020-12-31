import React, { useState, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useHistory } from "react-router-dom";
import { User, useUserDispatch, USER_LOGIN } from '../../contexts/userContext';
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import Recaptcha from 'react-recaptcha'

const SUBSCRIBE_MUTATION_QL = gql`
  mutation subsribe($email: String!, $message: String!) {
    createSubscribe(email: $email, message: $message) {
      id
    }
  }
`;
export const SubscribePage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [message, setPass] = useState('')

    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPass, setInvalidPass] = useState(false)
    const [verified, setVerify] = useState(false)

    const history = useHistory()
    const dispatch = useUserDispatch()

    const [subsribe, { loading, data, error }] = useMutation(SUBSCRIBE_MUTATION_QL, {
        errorPolicy: "none",
        onCompleted: (data) => {
          console.log('e,c', data)
    
        },
        onError: () => {
          console.log('onError', data)
          setInvalidEmail(true)
        }
      });

    const onSubsribe = async () => {
        subsribe({ variables: { email, message } })
    }

    const onEmailChange = (event: any) => {
        const email = event.target.value as string
        const validEmail = !(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email))

        setEmail(email)
        setInvalidEmail(validEmail)
        setInvalidPass(false)
    }

    const onTextChange = (event: any) => {
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
                                    <h1>Subscribe</h1>
                                    <p>We are almost done</p>
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
                            <h3>We working very hard on new features</h3>
                            <p className="p-lead">
                                Even we believe we are very close to bring them to a life 
                                But we want to be sure our product will met our costumers satisfaction. 
                                So we decided to push back a little bit and take time for reimlplement some features to improve them. 
                                Even we work very hard they are still not completed yet. 

                                Please let us know if You want to be
                                part of our early-adopters-program to be one of first humans to use them
                            </p>  
                            <Form.Group controlId="formBasicEmail">

                                <Form.Label>Email address</Form.Label>
                                
                                <Form.Control type="text" placeholder="Enter email" onChange={onEmailChange} value={email} isInvalid={invalidEmail} />
                                <Form.Control.Feedback type="invalid">
                                    The email is very probably incorect
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Do you want tell us more?</Form.Label>
                                <Form.Control as='textarea' rows={10} onChange={onTextChange} value={message} isInvalid={invalidPass} />
                            </Form.Group>

                            
                            {<div id='submit' className="pull-left">
                                 {/* disabled={!verified || invalidEmail} */}
                                {!loading && <Button className="btn-round" variant="primary" onClick={() => onSubsribe()} >Send to us</Button>}
                                {loading && <Button className="btn-round" variant="primary" disabled>Sending...</Button>}
                                <div className="clearfix"></div>
                            </div>}

                            {<div>
                                <Recaptcha
                                    sitekey={"6LeirhoaAAAAADIzp_mcmG0ly-DQSBB5ScfXi3jh"}
                                    verifyCallback={(v) => {
                                        console.log('verifyCallback', v)
                                        setTimeout(()=>setVerify(true), 300)}
                                    }
                                />
                            </div>}

                        </Form>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default SubscribePage
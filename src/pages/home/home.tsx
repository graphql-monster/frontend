import React from 'react'
import Typed from 'react-typed'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

export const Home = () => {

    return (
        <div className="no-bottom no-top" id="content">
            <section className="full-height vertical-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5" data-wow-delay=".5s">
                            <div className="ready-to-launch">Ready to launch
                                <div>
                                    your&nbsp;
                                    <Typed className="typed id-color"
                                        // typedRef={(typed) => { this.typed = typed; }}
                                        strings={[
                                            'backend',
                                            'service',
                                            'application']}
                                        typeSpeed={70}
                                        backSpeed={54}
                                        startDelay={2000}

                                        loop
                                    />
                                </div>
                            </div>

                            <p className="p-lead">Instant protected Graphql service, with models designed by you. You can connect with React.js, Vue.js or Angular.js app and create application right now</p>
                            <Link className="btn btn-primary btn-round" to="/register">Try it for free</Link>&nbsp;&nbsp;
                            <Link className="btn btn-round" to="/register">How it is works?</Link>
                            <div className="mb-sm-30"></div>
                        </div>

                        <div className="col-lg-6 offset-lg-1" data-wow-delay=".5s">
                            <img src="3.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
}

export default Home
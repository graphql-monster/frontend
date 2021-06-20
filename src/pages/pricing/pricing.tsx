import React from 'react'
import { Link } from 'react-router-dom'

export const PricingPage: React.FC = () => (
  <>
    <section id="subheader" data-bgimage="url(images/background/5.png) bottom">
      <div className="center-y relative text-center" data-scroll-speed="4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form action="blank.php" className="row" id="form_subscribe" method="post" name="myForm">
                <div className="col-md-12 text-center">
                  <h1>Pricing</h1>
                  <p>Ready to rock?</p>
                </div>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="no-top pricing">
      <div className="row text-center align-items-end">
        <div className="col-lg-4 mb-5 mb-lg-0">
          <div className="bg-white p-5 rounded-lg shadow">
            <h1 className="h6 text-uppercase font-weight-bold mb-4">Basic</h1>
            <h2 className="h1 font-weight-bold">
              $0<span className="text-small font-weight-normal ml-2">/ month</span>
            </h2>
            <div className="custom-separator my-4 mx-auto bg-primary"></div>
            up to 3 basic projects
            <ul className="list-unstyled my-5 text-small text-left">
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> up to 1000 request / hour
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> up to 10MB database space
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> up to 10MB disk space
              </li>
              <li className="mb-3 text-muted">
                <i className="fa fa-times mr-2"></i>
                <del>User Email verification</del>
              </li>
              <li className="mb-3 text-muted">
                <i className="fa fa-times mr-2"></i>
                <del>3th party login (facebook, google, ...)</del>
              </li>
              <li className="mb-3 text-muted">
                <i className="fa fa-times mr-2"></i>
                <del>Hooks with own code</del>
              </li>
              <li className="mb-3 text-muted">
                <i className="fa fa-times mr-2"></i>
                <del>Control of environment variables</del>
              </li>
            </ul>
            <Link to="register" className="btn btn-primary btn-block p-2 shadow rounded-pill">
              Try it now
            </Link>
          </div>
        </div>
        <div className="col-lg-4 mb-5 mb-lg-0">
          <div className="bg-white p-5 rounded-lg shadow">
            <h1 className="h6 text-uppercase font-weight-bold mb-4">Pro</h1>
            <h2 className="h1 font-weight-bold">
              $19.99<span className="text-small font-weight-normal ml-2">/ month</span>
            </h2>
            <div className="custom-separator my-4 mx-auto bg-primary"></div>plus one basic and one Pro project
            <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> up to 10000 request / hour
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> starts with 100MB database space
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> starts with 100MB disk space
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> User Email verification
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> 3th party login (facebook, google, ...)
              </li>
              <li className="mb-3 text-muted">
                <i className="fa fa-times mr-2"></i>
                <del> Hooks with own code</del>
              </li>
              <li className="mb-3 text-muted">
                <i className="fa fa-times mr-2"></i>
                <del>Control of environment variables</del>
              </li>
            </ul>
            <Link to="subscribe" className="btn btn-primary btn-block p-2 shadow rounded-pill">
              Subscribe
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bg-white p-5 rounded-lg shadow">
            <h1 className="h6 text-uppercase font-weight-bold mb-4">Dedicated</h1>
            <h2 className="h1 font-weight-bold">
              $199.99<span className="text-small font-weight-normal ml-2">/ month</span>
            </h2>
            <div className="custom-separator my-4 mx-auto bg-primary"></div>
            plus one dedicated server
            <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> not limited requests
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> own database space
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> own disk space
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> User Email verification
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> 3th party login (facebook, google, ...)
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> Hooks with own code
              </li>
              <li className="mb-3">
                <i className="fa fa-check mr-2 text-primary"></i> Control of environment variables
              </li>
            </ul>
            <Link to="subscribe" className="btn btn-primary btn-block p-2 shadow rounded-pill">
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
)

export default PricingPage

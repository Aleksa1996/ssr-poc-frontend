import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Router from './Router';
import { Helmet } from 'react-helmet';
import { isServer } from './store/store';
class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {isServer && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>Title</title>
            <link rel="stylesheet" href="/app.css" />
            <script src="/client.bundle.js"></script>
          </Helmet>
        )}

        <Router {...this.props} />
      </React.Fragment>
    );
  }
}

export default withRouter(App);

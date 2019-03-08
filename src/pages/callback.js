import React from 'react';
import auth from '../utils/auth';

class Callback extends React.Component {
  render() {
    auth.handleAuthentication();
    return (
      <div>Loading...</div>
    );
  }
}

export default Callback;
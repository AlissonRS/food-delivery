import { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

class ProtectedRoute extends Component<any> {
  render() {
    const { component: Component, allow, ...props } = this.props;
    if (!allow) {
      return <Redirect to={{ pathname: '/signin' }} />;
    }
    return <Route {...props} render={(props) => <Component {...props} />} />;
  }
}

export default ProtectedRoute;

import './App.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { amber, red } from '@material-ui/core/colors';
import SignUp from './components/SignUp/SignUp.lazy';
import SignIn from './components/SignIn/SignIn.lazy';
import RestaurantRouter from './components/common/RestaurantRouter/RestaurantRouter.lazy';
import OrdersRouter from './components/common/OrdersRouter/OrdersRouter.lazy';
import { Provider as HttpProvider } from 'use-http';
import { useAuth } from './store/auth.context';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute.lazy';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: red.A400,
      },
      secondary: {
        main: amber.A400,
      },
    },
  });

  const [loading, setLoading] = React.useState(false);
  const [snackbarMessage, setMessage] = React.useState('');
  const [snackbarOpen, setOpen] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const authContext = useAuth();

  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async ({ options }: any) => {
        setLoading(true);
        if (authContext.token) {
          options.headers.Authorization = `Bearer ${authContext.token}`;
        }
        return options;
      },
      response: async ({ response }: any) => {
        setLoading(false);
        const res = response;
        let message = '';
        if (res.status === 400) {
          message = typeof res.data === 'string' ? res.data : res.data?.message;
        }
        if (res.status === 401) {
          message =
            typeof res.data === 'string'
              ? res.data
              : res.data?.message || `You don't have permission`;
        }
        if (message) {
          setMessage(message);
          setOpen(true);
        }
        return res;
      },
    },
  };

  return (
    <HttpProvider options={options}>
      <ThemeProvider theme={theme}>
        {loading && <LinearProgress color="secondary" />}

        <Switch>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route path="/signin">
            <SignIn></SignIn>
          </Route>
          <ProtectedRoute path="/restaurants" allow={authContext.isLoggedIn}>
            <RestaurantRouter></RestaurantRouter>
          </ProtectedRoute>
          <ProtectedRoute path="/orders" allow={authContext.isLoggedIn}>
            <OrdersRouter></OrdersRouter>
          </ProtectedRoute>
          <ProtectedRoute path="*" allow={authContext.isLoggedIn}>
            <Redirect to="/restaurants"></Redirect>
          </ProtectedRoute>
          <Route path="*">asd</Route>
        </Switch>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarMessage}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </ThemeProvider>
    </HttpProvider>
  );
}

export default App;

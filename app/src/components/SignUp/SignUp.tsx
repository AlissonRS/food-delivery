import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { RoleTypes } from '../../models/RoleTypes.enum';
import { useIdentityService } from '../../services/identity.service';
import { useAuth } from '../../store/auth.context';

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(2, 'Full Name should be of minimum 2 characters length')
    .required('Full Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'center',
  },
  grouped: {
    margin: theme.spacing(3),
    border: 'none',
    borderRadius: theme.shape.borderRadius,
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    width: '130px',
  },
  label: {
    flexDirection: 'column',
  },
}))(ToggleButton);

const SignUp: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const authContext = useAuth();

  const identityService = useIdentityService();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      roleType: RoleTypes.RegularUser,
    },
    validationSchema: validationSchema,
    onSubmit: async (user) => {
      const { result, response } = await identityService.register(user);
      if (response.ok) {
        authContext.login(result.token);
        history.push('/restaurants');
      }
    },
  });

  const handleRoleChange = (event: any, role: string) => {
    formik.setFieldValue('roleType', role);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box mb={5}>
          <Typography variant="h5">
            Welcome to the Food Delivery App!
          </Typography>
        </Box>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">Sign up</Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="fullName"
                name="fullName"
                label="Full Name"
                required
                fullWidth
                autoFocus
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledToggleButtonGroup
                exclusive
                size="large"
                id="roleType"
                aria-label="Role Type"
                value={formik.values.roleType}
                onChange={handleRoleChange}
              >
                <StyledToggleButton
                  value={RoleTypes.RegularUser}
                  aria-label="centered"
                >
                  <PersonIcon />
                  <div>User</div>
                </StyledToggleButton>
                <StyledToggleButton
                  value={RoleTypes.RestaurantOwner}
                  aria-label="centered"
                >
                  <RestaurantIcon />
                  <div>Restaurant</div>
                </StyledToggleButton>
              </StyledToggleButtonGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouteLink to="/signin">
                Already have an account? Sign in
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRestaurantsService } from '../../services/restaurants.service';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import MealList from '../MealList/MealList';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TabPanel } from '../TabPanel/TabPanel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  backButton: {
    cursor: 'pointer',
  },
  titleWrapper: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid gray',
  },
  meals: {
    marginTop: theme.spacing(2),
  },
  tabs: {
    marginTop: theme.spacing(4),
  },
  tabPanel: {
    flexGrow: 1,
    width: '100%',
  },
  blockButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

interface RestaurantDetailsParams {
  restaurantId: string;
}

const RestaurantDetails: React.FC = () => {
  const { restaurantId } = useParams<RestaurantDetailsParams>();

  const [tabValue, setTab] = useState(0);

  const {
    restaurants,
    blockedUsers,
    blockUser,
    unblockUser,
    listBlockedUsers,
  } = useRestaurantsService();

  const history = useHistory();

  const classes = useStyles();

  const handleGoBackToRestaurantList = () => {
    history.push(`/restaurants`);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, index: number) => {
    setTab(index);
  };

  const handleUnblockClick = async (userEmail: string) => {
    await unblockUser(userEmail, restaurantId);
  };

  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (user) => {
      if (restaurantId) {
        await blockUser(user.email, restaurantId);
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    listBlockedUsers(restaurantId);
  }, [listBlockedUsers, restaurantId]);

  if (!restaurant) {
    return <div></div>;
  }

  const blockedUsersList = blockedUsers.map((userEmail, idx) => (
    <React.Fragment key={userEmail}>
      <ListItem>
        <ListItemText primary={userEmail} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleUnblockClick(userEmail)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider></Divider>
    </React.Fragment>
  ));

  return (
    <div data-testid="RestaurantDetails" className={classes.root}>
      <div className={classes.titleWrapper}>
        <ArrowBack
          fontSize="large"
          className={classes.backButton}
          onClick={handleGoBackToRestaurantList}
        />
        <Typography variant="h5" className={classes.title}>
          {restaurant.name}
        </Typography>
      </div>

      <Alert severity="info" className={classes.description}>
        <Typography variant="subtitle1">{restaurant.description}</Typography>
      </Alert>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className={classes.tabs}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Meals" />
        <Tab label="Blacklist" />
      </Tabs>

      <TabPanel className={classes.tabPanel} value={tabValue} index={0}>
        <div className={classes.meals}>
          <MealList restaurantId={restaurant.id} selectable={false}></MealList>
        </div>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={tabValue} index={1}>
        <form noValidate onSubmit={formik.handleSubmit}>
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
          <Button
            type="submit"
            className={classes.blockButton}
            color="secondary"
            variant="contained"
            aria-label="block user"
          >
            BLOCK USER
          </Button>
        </form>
        <List component="nav" aria-label="secondary">
          {blockedUsersList}
        </List>
      </TabPanel>
    </div>
  );
};

export default RestaurantDetails;

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { useHistory, useParams } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRestaurantsService } from '../../services/restaurants.service';
import { FoodTypes } from '../../models/FoodType.enum';
import { Link as RouterLink } from 'react-router-dom';
import { camelCaseToTitleCase } from '../../utils/string.utils';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name should be of minimum 2 characters length')
    .max(100, 'Name is too long')
    .required('Name is required'),
  description: yup
    .string()
    .min(2, 'Description should be of minimum 2 characters length')
    .max(4000, 'Description is too long')
    .required('Description is required'),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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
  actions: {
    marginTop: theme.spacing(3),
  },
}));

interface EditRestaurantParams {
  restaurantId: string;
}

const EditRestaurant: React.FC = (props) => {
  const { restaurantId } = useParams<EditRestaurantParams>();

  const classes = useStyles();

  const { add, edit, restaurants } = useRestaurantsService();

  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const history = useHistory();

  const isEditMode = restaurant && restaurant.id;

  const formik = useFormik({
    initialValues: {
      name: restaurant?.name,
      description: restaurant?.description,
      foodType: restaurant?.foodType || FoodTypes.Burgers,
    },
    validationSchema: validationSchema,
    onSubmit: async (restaurantModel) => {
      const { response } = isEditMode
        ? await edit({
            ...restaurantModel,
            id: restaurant?.id,
          })
        : await add(restaurantModel);
      if (response.ok) {
        history.replace('/restaurants');
      }
    },
  });

  const foodTypeMenuItems = Object.values(FoodTypes)
    .filter((key) => typeof key === 'string')
    .map((key: any) => {
      const value = FoodTypes[key];
      const label = camelCaseToTitleCase(key);
      return (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      );
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h6">Add your new Restaurant</Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="foodType">Food Type</InputLabel>
              <Select
                id="foodType"
                name="foodType"
                label="Food Type"
                type="foodType"
                variant="outlined"
                fullWidth
                value={formik.values.foodType}
                onChange={formik.handleChange}
                error={
                  formik.touched.foodType && Boolean(formik.errors.foodType)
                }
              >
                {foodTypeMenuItems}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Description"
                type="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>
          <Box display="flex" className={classes.actions}>
            <Box flexGrow={1}>
              <Button
                fullWidth
                type="button"
                variant="contained"
                component={RouterLink}
                to="/restaurants"
              >
                Cancel
              </Button>
            </Box>
            <Box flexGrow={1}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                {isEditMode ? 'UPDATE' : 'CREATE'}
              </Button>
            </Box>
          </Box>
        </form>
      </div>
    </Container>
  );
};

export default EditRestaurant;

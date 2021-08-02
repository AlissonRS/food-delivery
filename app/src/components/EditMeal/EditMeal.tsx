import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory, useParams } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMealsService } from '../../services/meals.service';
import { Link as RouterLink } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Price is required'),
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

interface EditMealParams {
  mealId: string;
  restaurantId: string;
}

const EditMeal: React.FC = (props) => {
  const { restaurantId, mealId } = useParams<EditMealParams>();

  const classes = useStyles();

  const { add, edit, meals } = useMealsService(restaurantId);

  const meal = meals.find((r) => r.id === mealId);

  const history = useHistory();

  const isEditMode = meal && meal.id;

  const formik = useFormik({
    initialValues: {
      name: meal?.name,
      description: meal?.description,
      price: meal?.price,
    },
    validationSchema: validationSchema,
    onSubmit: async (mealModel) => {
      const { response } = isEditMode
        ? await edit({
            ...mealModel,
            id: mealId,
            restaurantId,
          })
        : await add({
            ...mealModel,
            restaurantId,
          });
      if (response.ok) {
        history.push(`/restaurants/${restaurantId}/details`);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h6">Add a Meal to your menu</Typography>
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
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="price"
                label="Price"
                name="price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
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
                to={`/restaurants/${restaurantId}/details`}
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

export default EditMeal;

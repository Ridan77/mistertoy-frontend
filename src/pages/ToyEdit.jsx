import { useEffect, useRef, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { saveToy } from "../store/actions/toy.actions.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js";
import { Field, Form, Formik } from "formik";
import { ToyImg } from "../cmps/ToyImg.jsx";
import { onUploadImg } from "../services/cloudinary.service.js";

import * as Yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Loader } from "../cmps/Loader.jsx";

export function ToyEdit() {
  const navigate = useNavigate();
  const [toyToEdit, setToyToEdit] = useState();
  const [allLabels, setAllLabels] = useState(null);

  const { toyId } = useParams();
  const isOnline = useOnlineStatus();
  const setHasUnsavedChanges = useConfirmTabClose();

  useEffect(() => {
    try {
      getLabels();
      async function getLabels() {
        const data = await toyService.getDashboardData();
        setAllLabels(data.labels);
        if (toyId) loadToy();
        else setToyToEdit(toyService.getEmptyToy());
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId);
      setToyToEdit(toy);
    } catch (error) {
      console.log("Had issues in toy edit", err);
      navigate("/toy");
    }
  }

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    price: Yup.number()
      .required("Price is required")
      .min(1, "Price must be at least 1"),
    inStock: Yup.boolean(),
    labels: Yup.array().of(Yup.string()),
  });

  function customHandleChange(ev, handleChange) {
    handleChange(ev);
    setHasUnsavedChanges(true);
  }
  async function onFileChange(ev) {
    const file = ev.target.files[0];
    const url = await onUploadImg(ev);
    console.log(url);
    
    setToyToEdit(prevToy=>({...prevToy,imgUrl:url}))

  }
  async function onSaveToy(toyToSave, { resetForm }) {
    try {
      console.log("toyToSave", toyToSave);
      saveToy(toyToSave);
      showSuccessMsg("Toy Saved!");
      navigate("/toy");
    } catch (error) {
      console.log("Had issues in toy details", err);
      showErrorMsg("Had issues in toy details");
      console.log(error);
    } finally {
      () => resetForm();
    }
  }
console.log('toyToEdit', toyToEdit);
  if (!toyToEdit) return <Loader />;
  return (
    <>
      <div></div>
      <section className="toy-edit">
        <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>
        <Formik
          enableReinitialize
          initialValues={toyToEdit}
          validationSchema={formSchema}
          onSubmit={onSaveToy}>
          {({ errors, touched, values, handleChange, setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                label="Name"
                variant="outlined"
                name="name"
                required
                autoComplete="off"
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                onChange={(e) => customHandleChange(e, handleChange)}
                value={values.name}
              />

              <Field
                as={TextField}
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                required
                margin="normal"
                inputProps={{ min: 1 }}
                error={touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                onChange={(e) => customHandleChange(e, handleChange)}
                value={values.price}
              />

              {allLabels && (
                <FormControl
                  margin="normal"
                  style={{ minWidth: "100px" }}
                  variant="outlined">
                  <InputLabel id="labels-label">Labels</InputLabel>
                  <Select
                    labelId="labels-label"
                    id="labels"
                    multiple
                    name="labels"
                    value={values.labels}
                    onChange={(ev) => customHandleChange(ev, handleChange)}
                    renderValue={(selected) => selected.join(", ")}
                    label="Labels">
                    {allLabels.map((label) => (
                      <MenuItem key={label} value={label}>
                        <Checkbox checked={values.labels.includes(label)} />
                        <ListItemText primary={label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <label className="file-input-label" htmlFor="file">
                Upload Image
              </label>
              <input
                type="file"
                id="file"
                className="file-input"
                name="file"
                accept="image/png, image/jpeg image/jpg"
                onChange={onFileChange}
              />
              <FormControlLabel
                label="In stock"
                control={
                  <Checkbox
                    name="inStock"
                    checked={values.inStock}
                    onChange={(e) => customHandleChange(e, handleChange)}
                  />
                }
              />
              <Button variant="contained" color="primary" type="submit">
                {toyToEdit._id ? "Save" : "Add"}
              </Button>
            </Form>
          )}
        </Formik>
        {toyId &&
          (toyToEdit.imgUrl ? (
            <img className="edit-img" src={`${toyToEdit.imgUrl}`} />
          ) : (
            <ToyImg toyName={toyToEdit.name} />
          ))}

        <Button variant="contained" color="primary">
          <Link to="/toy">Back to Store</Link>
        </Button>

        <section>
          <h5>{isOnline ? "✅ Online" : "❌ Disconnected"}</h5>
        </section>
      </section>
    </>
  );
}

// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import { toyService } from "../services/toy.service.js";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "#0fbd3a",
    },
  },
};

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const [gLabels, setgLabels] = useState(null);
  const onSetFilterDebounce = useRef(
    utilService.debounce(onSetFilter, 300)
  ).current;

  useEffect(() => {
    onSetFilterDebounce(filterByToEdit);
  }, [filterByToEdit]);

  useEffect(() => {
    toyService.getDashboardData().then(({ labels }) => {
      setgLabels(labels);
    });
  }, []);

  function handleChange(event) {
    console.log(event.target.name);
    const { name, value, type, checked, multiple, selectedOptions } =
      event.target;
    let newValue = value;

    if (multiple && selectedOptions) {
      newValue = Array.from(selectedOptions, (opt) => opt.value);
    }

    if (type === "number" || type === "range") newValue = +value || "";
    if (type === "checkbox") newValue = checked;

    if (name === "labels") {
      newValue = typeof value === "string" ? value.split(",") : value;
    }

    setFilterByToEdit((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }
console.log('filterBytoEdit', filterByToEdit);
  return (
    <section className="toy-filter full main-layout">
      <form>
        <TextField
          sx={{ m: 0, width: 150 }}
          name="txt"
          onChange={handleChange}
          value={filterByToEdit.txt}
          id="outlined-basic"
          label="Filter by name"
          variant="outlined"
          autoComplete="off"
        />
        <FormControl sx={{ m: 0, width: 150 }}>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            MenuProps={MenuProps}
            value={filterByToEdit.status}
            label="Status"
            onChange={handleChange}
            name="status">
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"inStock"}>In Stock</MenuItem>
            <MenuItem value={"notInStock"}>Not in Stock</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 0, width: 150 }}>
          <InputLabel id="sort">Sort</InputLabel>
          <Select
            labelId="sort"
            id="sort"
            value={filterByToEdit.sort}
            label="sort"
            MenuProps={MenuProps}
            onChange={handleChange}
            name="sort">
            <MenuItem value={""}>--</MenuItem>
            <MenuItem value={"name"}>Name</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
            <MenuItem value={"createdAt"}>Date Created</MenuItem>
          </Select>
        </FormControl>

        {gLabels && (
          <FormControl sx={{ m: 0, width: 150 }}>
            <InputLabel id="labels">Labels</InputLabel>
            <Select
              labelId="labels"
              id="demo-multiple-checkbox"
              multiple
              name="labels"
              value={filterByToEdit.labels}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}>
              {gLabels.map((label) => (
                <MenuItem key={label} value={label}>
                  <Checkbox checked={filterByToEdit.labels.includes(label)} />
                  <ListItemText primary={label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </form>
    </section>
  );
}

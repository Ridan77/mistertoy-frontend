// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const alllabels = [
  "On wheels",
  "Box game",
  "Art",
  "Baby",
  "Doll",
  "Puzzle",
  "Outdoor",
  "Battery Powered",
];

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const onSetFilterDebounce = useRef(
    utilService.debounce(onSetFilter, 300)
  ).current;
  const [label, setLabel] = useState([]);

  useEffect(() => {
    onSetFilterDebounce(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange(event) {
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

  return (
    <section className="toy-filter full main-layout">
      <form>
        <label htmlFor="name">Filter:</label>
        <input
          type="txt"
          id="name"
          name="txt"
          placeholder="By toy's name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <select
          value={filterByToEdit.status}
          name="status"
          onChange={handleChange}>
          <option value="all">All</option>
          <option value="inStock">In Stock</option>
          <option value="notInStock">Not in Stock</option>
        </select>
        <label htmlFor="sort">Sort:</label>
        <select
          value={filterByToEdit.sort}
          name="sort"
          onChange={handleChange}
          id="sort">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Date Created</option>
        </select>
        <FormControl sx={{ m: 0, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Labels</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            name="labels"
            value={filterByToEdit.labels}
            onChange={handleChange} 
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}>
            {alllabels.map((label) => (
              <MenuItem key={label} value={label}>
                <Checkbox checked={filterByToEdit.labels.includes(label)} />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </section>
  );
}

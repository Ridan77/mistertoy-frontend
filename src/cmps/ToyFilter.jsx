// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const onSetFilterDebounce = useRef(
    utilService.debounce(onSetFilter, 300)
  ).current;

  useEffect(() => {
    onSetFilterDebounce(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    let value;
    if (target.multiple) {
      value = Array.from(target.selectedOptions, (opt) => opt.value);
    } else {
      value = target.value;
    }
    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    <section className="toy-filter full main-layout">
      {/* <h2>Toys Filter</h2> */}
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

        <select
          value={filterByToEdit.labels}
          id="labels"
          name="labels"
          className="label-selector"
          multiple
          onChange={handleChange}>
          <option value="On wheels">On Wheels</option>
          <option value="Box Game">Box Game</option>
          <option value="Art">Art</option>
          <option value="Baby">Baby</option>
          <option value="Doll">Doll</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Battery Powered">Battery Powered</option>
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
      </form>
    </section>
  );
}

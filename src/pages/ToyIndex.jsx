// const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { ToyList } from "../cmps/ToyList.jsx";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import {
  loadToys,
  removeToyOptimistic,
  saveToy,
  setFilterBy,
} from "../store/actions/toy.actions.js";
import { ADD_TOY_TO_CART } from "../store/reducers/toy.reducer.js";
import { Loader } from "../cmps/Loader.jsx";

export function ToysIndex() {
  const dispatch = useDispatch();
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy);
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading);

  useEffect(() => {
    try {
      loadToysOnUseEffect();
      async function loadToysOnUseEffect() {
        loadToys();
      }
    } catch (error) {
      console.log(error);
      showErrorMsg("Cannot load toys!");
    }
  }, [filterBy]);

  function onSetFilter(filterBy) {
    setFilterBy(filterBy);
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToyOptimistic(toyId);
      showSuccessMsg("Toy removed");
    } catch (error) {
      showErrorMsg("Cannot remove toy");
      console.log(error);
    }
  }

  async function onEditToy(toy) {
    const price = +prompt("New price?");
    const toyToSave = { ...toy, price };
    try {
      const savedToy = await saveToy(toyToSave);
      showSuccessMsg(`Toy updated to price: $${savedToy.price}`);
    } catch (error) {
      console.log(error);
      showErrorMsg("Cannot update toy");
    }
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.vendor} to Toyt`);
    dispatch({ type: ADD_TOY_TO_CART, toy });
    showSuccessMsg("Added to Cart");
  }
  return (
    <div>
      <main>
        <button>
          <Link to="/toy/edit">Add Toy</Link>
        </button>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        {isLoading && <Loader />}
        {!isLoading && (
          <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            addToCart={addToCart}
          />
        )}

        <hr />
      </main>
    </div>
  );
}

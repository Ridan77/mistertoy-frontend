import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { userService } from "../services/user.service-local.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";
import { TOGGLE_CART_IS_SHOWN } from "../store/reducers/toy.reducer.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import imgUrl from "../assets/img/logo9.png";
import { useTranslation, Trans } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { border, fontSize } from "@mui/system";
import { green } from "@mui/material/colors";

export function AppHeader() {
  const dispatch = useDispatch();
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  const { t, i18n } = useTranslation();

  const lngs = {
    en: { nativeName: "English" },
    he: { nativeName: "Hebrew" },
  };

  const ITEM_HEIGHT = 24;
  const ITEM_PADDING_TOP = 8;

  const inputProps = {
    sx: {
      fontSize: "0.8em",
      color: "#c3eddf",
      padding: "8px 12px",
      border: "none",
      outline: "none",
    },
  };

  const MenuProps = {
    inputProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
        fontSize: "30px",
        color: "green",
        // backgroundColor: "#e3e5e4ff",
      },
    },
  };

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg("logout successfully");
      })
      .catch((err) => {
        showErrorMsg("OOPs try again");
      });
  }

  function onToggleCart(ev) {
    ev.preventDefault();
    dispatch({ type: TOGGLE_CART_IS_SHOWN });
  }

  function handlelanguageChange(ev) {
    console.log("ev.target", ev.target);
    i18n.changeLanguage(ev.target.value);
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <div className="h1-container">
          <h1>{t("mister_toy")}</h1>
          <img src={imgUrl} />
        </div>

        <nav className="app-nav">
          <NavLink to="/">{t("home")}</NavLink>
          <NavLink to="/about">{t("about")}</NavLink>
          <NavLink to="/toy">{t("toys")}</NavLink>
          <NavLink to="/dashboard">{t("dashboard")}</NavLink>
          <a onClick={onToggleCart} href="#">
            {t("cart")}
          </a>

          <FormControl variant="standard">
            <Select
              labelId="language"
              id="language"
              value={i18n.resolvedLanguage}
              label="lng"
              inputProps={inputProps}
              onChange={handlelanguageChange}>
              {Object.keys(lngs).map((lng) => (
                <MenuItem
                  key={lng}
                  value={lng}
                  disabled={i18n.resolvedLanguage === lng}>
                  {lng}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </nav>
      </section>
      {user ? (
        <section>
          <span to={`/user/${user._id}`}>
            Hello {user.fullname} <span>${user.score.toLocaleString()}</span>
          </span>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup />
        </section>
      )}
      <UserMsg />
    </header>
  );
}

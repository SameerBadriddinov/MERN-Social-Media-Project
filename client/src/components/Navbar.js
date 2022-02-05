import { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../App.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import "./Navbar.css";

export default function Navbar() {
  const searchPanel = useRef(null);
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [userFinded, setUserFinded] = useState([]);
  const history = useHistory();

  useEffect(() => {
    M.Modal.init(searchPanel.current);
  }, []);

  const renderNav = () => {
    if (state) {
      return [
        <>
          <li key="1">
            <i
              data-target="modal1"
              className="material-icons  modal-trigger"
              style={{ color: "#000", cursor: "pointer", fontSize: 35 }}
            >
              search
            </i>
          </li>
          <li key="2">
            <Link to="/profile">
              <i className="material-icons">person</i>
            </Link>
          </li>
          <li key="3">
            {" "}
            <Link to="/createpost">
              <i className="material-icons">playlist_add</i>
            </Link>{" "}
          </li>
          <li key="4">
            <Link
              style={{ color: "red" }}
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/signin");
              }}
              className="material-icons"
              to="/signin"
            >
              <i className="material-icons">exit_to_app</i>
            </Link>{" "}
          </li>
        </>,
      ];
    } else {
      return [
        <li key="5">
          {" "}
          <Link to="/signin">
            <i className="material-icons">input</i>
          </Link>{" "}
        </li>,
      ];
    }
  };

  const searchUser = (query) => {
    setSearch(query);
    fetch("/searchuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((result) => setUserFinded(result.user))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="navBar">
        <div className="navigationBar">
          <div className="mainPage">
            <Link to={state ? "/" : "/signin"}>
              <i className="material-icons">home</i>
            </Link>
            <Link to={state ? "/" : "/signin"}>
              <p className="mainText">SammiGram</p>
            </Link>
          </div>
          <div className="navLink">
            <ul>{renderNav()}</ul>
          </div>
        </div>
        <div id="modal1" className="modal" ref={searchPanel}>
          <div className="modal-content">
            <div className="input-field col s6">
              <i className="material-icons prefix">search</i>
              <input
                id="icon_prefix"
                type="text"
                value={search}
                onChange={(e) => searchUser(e.target.value)}
                className="validate"
              />
              <label htmlFor="icon_prefix">Search...</label>
            </div>
            <div>
              <ul className="collection">
                {userFinded.length ? (
                  userFinded.map((item) => (
                    <Link
                      to={
                        item._id !== state._id
                          ? "/profile/" + item._id
                          : "/profile"
                      }
                      onClick={() =>
                        M.Modal.getInstance(searchPanel.current).close()
                      }
                    >
                      <li key={item._id} class="collection-item avatar">
                        <img src={item.pic} alt="" class="circle" />
                        <span class="title">
                          {item.name} <br /> {item.email}{" "}
                        </span>
                      </li>
                    </Link>
                  ))
                ) : (
                  <p style={{ fontWeight: "bold", fontStyle: "cursive" }}>
                    Lookong for...
                  </p>
                )}
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat #0d47a1 blue darken-4"
              style={{ color: "#fff" }}
              onClick={() => setSearch("")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10vh" }}></div>
    </>
  );
}

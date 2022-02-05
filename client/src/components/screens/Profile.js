import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Not from "./Not";
import M from "materialize-css";
import "./css/MyProfile.css"

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [myName, setMyName] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.myPost);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "sammiGram");
      data.append("cloud_name", "dtabxocmw");
      fetch("https://api.cloudinary.com/v1_1/dtabxocmw/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Sammi " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  const editProfile = () => {
    if (myName) {
      fetch("/editname", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Sammi " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          myName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, name: data.name })
          );
          dispatch({ type: "EDITPROFILE", payload: data.name });
          M.toast({
            html: "Your Profile was changed successfully!!",
            classes: "#0d47a1 blue darken-4",
          });
        });
    }
    setIsEdit(false);
  };

  return (
    <div className="profile">
      <div className="profileMain">
        <div>
          <div className="containers">
            <img
              src={state ? state.pic : ""}
              alt="Avatar"
              className="profileImg"
            />
            <div className="middles">
              <button
                onClick={() => setIsOpenModal(true)}
                className="btn #0d47a1 blue darken-4"
              >
                <i className="material-icons">add_a_photo</i>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="profileName">
            <h4>{state ? state.name : "loading"}</h4>
            <button
              onClick={() => setIsEdit(true)}
              className="btn #0d47a1 blue darken-4"
            >
              <i className="material-icons">settings</i>
            </button>
          </div>
          <div className="infoProfile">
            <p>{profile.length} posts</p>
            <p>{state ? state.followers.length : "0"} followers</p>
            <p>{state ? state.following.length : "0"} following</p>
          </div>
          <Link to="/myfollowerpost">
            <button
              style={{ marginTop: 10 }}
              className="btn #0d47a1 blue darken-4"
            >
              Show My Following Users Posts
            </button>
          </Link>
        </div>
      </div>
      {!profile.length ? (
        <Not value="No Photo Yet" />
      ) : (
        <div className="row">
          {profile.map((item) => {
            return (
                <img key={item._id} src={item.photo} className="col s6" style={{cursor: "pointer"}} alt={item._id} />
            );
          })}
        </div>
      )}
      {isOpenModal ? (
        <div className="modalS" onClick={() => setIsOpenModal(false)}>
          <div className="modalS__content" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h4>Add Your Accaunt Photo</h4>
              <i
                style={{ cursor: "pointer", color: "#0d47a1" }}
                onClick={() => setIsOpenModal(false)}
                className="small material-icons "
              >
                close
              </i>
            </div>
            <div className="modalConten">
              <div className="file-field input-field">
                <div className="btn #0d47a1 blue darken-4">
                  <span>
                    <i className="material-icons">add_a_photo</i>
                  </span>
                  <input
                    type="file"
                    onChange={(e) => updatePhoto(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    placeholder="You Photo"
                  />
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button
                className="btn #0d47a1 blue darken-4"
                onClick={() => setIsOpenModal(false)}
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isEdit ? (
        <div className="modalS" onClick={() => setIsEdit(false)}>
          <div className="modalS__content" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h4>Change Accaunt Profile</h4>
            </div>
            <div className="modalConten">
              <div className="file-field input-field">
                <div className="btn #0d47a1 blue darken-4">
                  <span>
                    <i className="material-icons">add_a_photo</i>
                  </span>
                  <input
                    type="file"
                    onChange={(e) => updatePhoto(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    placeholder="You Photo"
                  />
                </div>
              </div>
              <div className="input-field col s6">
                <i
                  className="material-icons prefix"
                  style={{ color: "#0d47a1" }}
                >
                  account_circle
                </i>
                <input
                  id="icon_prefix"
                  onChange={(e) => setMyName(e.target.value)}
                  type="text"
                  className="validate"
                />
                <label for="icon_prefix">First Name</label>
              </div>
            </div>
            <div className="modalFooter">
              <button
                className="btn #0d47a1 blue darken-4"
                onClick={() => editProfile()}
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

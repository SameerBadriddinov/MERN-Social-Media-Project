import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

export default function HomeSideBar() {
  const [profile, setProfile] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allusers", {
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
  }, []);
  return (
    <>
      <ul className="collection">
        {profile
          .map((item) => {
            return (
              <Link
                to={
                  item._id !== state._id ? "/profile/" + item._id : "/profile"
                }
              >
                <li key={item._id} class="collection-item avatar">
                  <img src={item.pic} alt="" class="circle" />
                  <span class="title">
                    {item.name} <br /> {item.email}{" "}
                  </span>
                </li>
              </Link>
            );
          })
          .slice(0, 8)}
      </ul>
    </>
  );
}

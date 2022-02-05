import { Link } from "react-router-dom";

export default function SignUp() {
  const postData = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        email: "",
        password: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="mycard">
      <div className="card card__auth ">
        <h2>SammiGram</h2>
        <div class="input-field col s6">
          <i class="material-icons prefix">verified_user</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Ismingiz</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">email</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Pochta manzilingiz</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">password</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Parolingiz</label>
        </div>
        <button
          onClick={() => postData()}
          className="waves-effect waves-light btn #0d47a1 blue darken-4"
        >
          Ro'yhatdan o'tish
        </button>

        <p>
          <Link to="/signin">Already have an accaunt?</Link>
        </p>
      </div>
    </div>
  );
}

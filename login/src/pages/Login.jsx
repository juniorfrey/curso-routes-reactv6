import { useEffect, useState } from "react";
import axios from "axios";
const Login = () => {
  const [users, setUsers] = useState({
    user:'',
    password:''
  });

  const [mensaje, setMensaje] = useState(false)


  useEffect(() => {
    var user = sessionStorage.getItem("token_key");

    return () => {
      if (user) {
        window.location.href = "./home";
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);

   Object.keys(users).forEach((user) => {
    if (!users[user].trim()) {
        setMensaje(false);
    } else {
         
        let url_base = 'http://localhost:5000/login';
        let resp = '';
        const json = { email: users.user, password: users.password };
        axios .post(url_base, {
            params:{
                json
            }
        })
        .then((response) => {
                console.log(response.data);
                resp = response.data.token;
                sessionStorage.setItem("token_key", response.data.token);
                sessionStorage.setItem("user", response.data.datas.user);
                window.location.href = './home';
                setMensaje(true);
        }).catch(function (error) {
                console.log(error);
                setMensaje(false);
        });
    }
   });

  }

  /* const setCampos = () => {
        setUsers({
          user: "fredys",
          password: "1234",
        });
  } */
  

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          //border: "3px solid #F44336",
          //backgroundColor: "#2E4053",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <label
          style={{ color: "#1B4F72", fontFamily: "Arial", fontWeight: "bold" }}
        >
          INGRESA TUS CREDENCIALES
        </label>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "6px",
            marginTop: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Usuario"
            onChange={(e) => setUsers({ ...users, user: e.target.value })}
            value={users.user}
            name="user"
            style={{
              margin: "5px",
              backgroundColor: "#1B4F72",
              border: "3px solid #1B4F72",
              width: "200px",
              padding: "10px",
              color: "#CFD8DC",
              borderRadius: "5px",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUsers({ ...users, password: e.target.value })}
            value={users.password}
            name="pass"
            style={{
              margin: "5px",
              backgroundColor: "#1B4F72",
              border: "3px solid #1B4F72",
              width: "200px",
              padding: "10px",
              color: "#CFD8DC",
              borderRadius: "5px",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
        </div>

        <button
          style={{
            backgroundColor: "transparent",
            border: "3px solid #1B4F72",
            color: "#CFD8DC",
            padding: "8px",
            width: "460px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          INGRESAR
        </button>
      </form>
      {/* <button onClick={setCampos} style={{backgroundColor:'transparent', border:'3px solid #1B4F72'}}>setCampos</button> */}
      {!mensaje ? (
        <p style={{ color: "red", fontFamily: "Arial", fontSize: "12px" }}>
          Credenciales invalidas
        </p>
      ) : (
        <p style={{ color: "#4CAF50", fontFamily: "Arial", fontSize: "12px" }}>
          Credenciales correctas
        </p>
      )}
    </div>
  );
};

export default Login;

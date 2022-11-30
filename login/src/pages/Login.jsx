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

  const setCampos = () => {
        setUsers({
          user: "fredys",
          password: "1234",
        });
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label>
        <br />
        <input
          type="text"
          placeholder="Usuario"
          onChange={(e) => setUsers({ ...users, user: e.target.value })}
          value={users.user}
          name="user"
        />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setUsers({ ...users, password: e.target.value })}
          value={users.password}
          name="pass"
        />
        <br />
        <br />
        <br />
        <button>Entrar</button>
      </form>
      <button onClick={setCampos}>setCampos</button>
      {!mensaje ? (
        <p style={{ color: "red" }}>Credenciales invalidas</p>
      ) : (
        <p style={{ color: "blue" }}>Credenciales correctas</p>
      )}
    </div>
  );
};

export default Login;

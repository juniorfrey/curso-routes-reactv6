import { useState } from "react";
const Login = () => {
  const [users, setUsers] = useState({
    user:'',
    password:''
  });

  const [mensaje, setMensaje] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);
    if(users.user === 'fredys' && users.password === '1234'){
        setMensaje(true);
        window.location.href = './home';
        sessionStorage.setItem("item_key", users.user);
    }else{
        setMensaje(false);
    }
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

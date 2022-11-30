import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");

const Home = () => {

    const [proyectos, setProyectos] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [nombreProyecto, setNombreProyecto] = useState('');

    useEffect(() => {
      var user = sessionStorage.getItem("token_key");
      getProyectos();
      return () => {
        if (!user) {
          window.location.href = "./";
        }
      };
    }, []);

    const getProyectos = () => {
        let url = `http://localhost:5000/proyectos`;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token_key")}`,
            },
          })
          .then((response) => {
            setProyectos(response.data.proyectos);
          });
    }

    const verTareas = (id, nombre) => {
        let url = `http://localhost:5000/proyectos/${id}/tareas`;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token_key")}`,
            },
          })
          .then((response) => {
            setTareas(response.data);
            setNombreProyecto(nombre);
          });
    }
    


    const cerrar = () => {
        sessionStorage.removeItem("token_key");
        sessionStorage.removeItem("user");
        window.location.href = "./";

    }
  return (
    <div>
      USUARIO {sessionStorage.getItem("user")}
      <br />
      <br />
      <button onClick={cerrar}>Cerrar</button>
      <br />
      <br />
      <ul>
        {proyectos.map((proyecto, i) => (
          <li
            key={i}
            style={{
              fontFamily: "Arial",
              textAlign: "left",
              padding: "3px",
              backgroundColor: "#f0f0f0",

              border: "2px solid white",
              borderBottom: "3px solid #FF5733",
              borderRadius: "4px",
              listStyle: "none",
              marginTop:'6px'
            }}
          >
            <b style={{ color: "red" }}>{proyecto.nombre}</b>
            <p>{proyecto.descripcion}</p>
            <small>PRIORIDAD: {proyecto.prioridad}</small> <br />
            <button
              style={{
                background: "silver",
                border: "2px solid green",
                color: "green",
                borderRadius: "5px",
              }}
              onClick={() => verTareas(proyecto.id, proyecto.nombre)}
            >
              VER TAREAS
            </button>
          </li>
        ))}
      </ul>
      <br />
      <label>
        Tareas de <b>{nombreProyecto}</b>
      </label>
      <ul>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            style={{
              border: "2px solid silver",
              fontFamily: "Arial",
              textAlign: "left",
              padding: "6px",
              borderRadius: "3px",
              backgroundColor: "silver",
              borderBottom: "1px solid #FF5733",
              listStyle: "none",
            }}
          >
            {tarea.nombre} <br />
            <small style={{ color: "#FF5733", fontWeight: "bold" }}>
              Fecha: {moment(tarea.createdAt).format("LLLL")}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home

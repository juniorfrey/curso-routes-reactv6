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
      console.log(!user);
      if (!user) {
        window.location.href = "./";
      }
      getProyectos();
      return () => {
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
      <h3 style={{ color: "#26C6DA", fontFamily: "Arial" }}>
        USUARIO: {sessionStorage.getItem("user") ? sessionStorage.getItem("user").toUpperCase() : ''}
      </h3>
      <br />
      <br />
      <button
        onClick={cerrar}
        style={{
          backgroundColor: "transparent",
          border: "2px solid #F44336",
          padding: "10px 10px 10px 10px",
          width: "150px",
          fontFamily: "Arial",
          color: "#F44336",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        CERRAR SESSIÓN
      </button>
      <br />
      <br />
      <ul>
        {proyectos.map((proyecto, i) => (
          <li
            key={i}
            style={{
              fontFamily: "Arial",
              textAlign: "left",
              padding: "10px 20px 10px 20px",
              backgroundColor: "transparent",

              border: "2px solid  #26C6DA",
              borderBottom: "6px solid #26C6DA",
              borderRadius: "4px",
              listStyle: "none",
              marginTop: "10px",
            }}
          >
            <b style={{ color: " #26C6DA" }}>{proyecto.nombre}</b>
            <p style={{ color: " white" }}>
              {proyecto.descripcion.toUpperCase()}
              <small
                style={{
                  color: " white",
                  fontSize: "12px",
                  marginLeft: "10px",
                  color: "#26C6DA",
                }}
              >
                PRIORIDAD: {proyecto.prioridad}
              </small>
            </p>
            <hr style={{ border: "1px solid  #26C6DA" }} />
            <button
              style={{
                background: "#273746",
                border: "2px solid #26C6DA",
                color: "#26C6DA",
                borderRadius: "5px",
                padding: "8px",
                boxSizing: "border-box",
                margin: "3px 3px 3px 3px",
                cursor: "pointer",
              }}
              onClick={() => verTareas(proyecto.id, proyecto.nombre)}
            >
              VER TAREAS
            </button>
            <button
              style={{
                background: "transparent",
                border: "2px solid #F44336",
                color: "#26C6DA",
                borderRadius: "5px",
                padding: "8px",
                boxSizing: "border-box",
                margin: "3px 3px 3px 3px",
                color: "#F44336",
                float: "right",
                cursor: "pointer",
              }}
              onClick={() => verTareas(proyecto.id, proyecto.nombre)}
            >
              ELIMINAR
            </button>
          </li>
        ))}
      </ul>
      <br />
      <label style={{ color: "#26C6DA", fontFamily: "Arial" }}>
        TAREAS - <b>{nombreProyecto.toUpperCase()}</b>
      </label>
      <ul style={{ display: "flex" }}>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            style={{
              border: "2px solid #FF5733",
              fontFamily: "Arial",
              textAlign: "center",
              padding: "6px",
              borderRadius: "3px",
              backgroundColor: "transparent",
              listStyle: "none",
              width: "200px",
              margin: "5px 10px 5px 0px",
            }}
          >
            <p
              style={{ fontSize: "12px", color: "#CFD8DC", textAlign: "left" }}
            >
              {tarea.nombre}{" "}
            </p>
            <hr />
            <small
              style={{ color: "#FF5733", fontWeight: "bold", fontSize: "11px" }}
            >
              Fecha: {moment(tarea.createdAt).format("LLL")}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home


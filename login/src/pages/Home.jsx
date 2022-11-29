import { useEffect } from "react"

const Home = () => {

    useEffect(() => {
      var user = sessionStorage.getItem("item_key");

      return () => {
        if (user == null) {
          window.location.href = "./";
        }
      };
    }, []);
    

    const cerrar = () => {
        sessionStorage.removeItem("item_key");
        window.location.href = "./";

    }
  return (
    <div>
        PAGE HOME
        <button onClick={cerrar}>Cerrar</button>
    </div>
  )
}

export default Home

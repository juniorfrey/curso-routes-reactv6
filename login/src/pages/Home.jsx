const Home = () => {
    const cerrar = () => {
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

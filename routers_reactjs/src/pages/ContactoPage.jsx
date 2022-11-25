import { Link } from "react-router-dom";
const ContactoPage = () => {

  const idUsuario = '26';

  return (
    <div>
      Hola desde <b>CONTACTO</b>
      <br />
      <Link to={`/users/${idUsuario}`}>Ir al inicio</Link>
    </div>
  );
};

export default ContactoPage;

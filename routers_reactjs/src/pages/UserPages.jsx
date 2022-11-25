import { useParams } from "react-router-dom";
const UserPages = () => {

  const {id} = useParams();
  
  return (
    <div>
      User <h1>{id}</h1>
    </div>
  );
};

export default UserPages;

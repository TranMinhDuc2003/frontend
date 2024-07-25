import { Product } from "../../interfaces/Product";
import { Link } from "react-router-dom";

interface Props {
  products: Product[];
  onRemove: (_id: any) => void;
}

const Dashboard = ({ products, onRemove }: Props) => {
  return (
    <div>
      <Link to={`/admin/add`} className="btn btn-warning">
                  add
                </Link>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>desc</th>
            <th>image</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.images} alt={item.images} width={100}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemove(item._id)}
                >
                  remove
                </button>
                <Link to={`/admin/edit/${item._id}`} className="btn btn-warning">
                  update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

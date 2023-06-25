import { Helmet } from "react-helmet-async";
import MyProducts from "../components/myproducts/MyProducts";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Mazi-commerce</title>
      </Helmet>
      <h2 className="bg-indigo-500 text-center">Featured products</h2>
      <MyProducts />
    </div>
  );
};

export default Home;

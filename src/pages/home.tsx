import Card from "@/components/ui/Card";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 space-y-5 md:px-36 px-2">
      <Link to={`/product/${1}`}>
        <Card
          price={99999999}
          store="ai store"
          title="selbak"
          totalSoldItems={0}
          image="/seblak.jpg"
        />
      </Link>
    </main>
  );
};

export default HomePage;

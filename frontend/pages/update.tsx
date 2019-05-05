import UpdateItem from "../components/UpdateItem";

const Sell = props => {
  const { query } = props;
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
};

export default Sell;

// import React from 'react';
// next.js will take care of importing react here
import Items from "../components/Items";

const Home = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;

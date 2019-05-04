import React, { Component } from "react";
import { Query } from "react-apollo"; // Query is component using renderProps
import gql from "graphql-tag";
import styled from "styled-components";

import Item from "./Item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <p>Items!</p>
        {/* An example of render props, 
        the way components is passed the props from Query,
        the child of Query is function expression : 
         function(payload) => { return (Component)}  */}
        <Query query={ALL_ITEMS_QUERY}>
          {payload => {
            const { data, error, loading } = payload;
            console.log(payload);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;

export { ALL_ITEMS_QUERY };

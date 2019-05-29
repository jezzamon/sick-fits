import React, { Component } from "react";
import { Query } from "react-apollo"; // Query is component using renderProps
import gql from "graphql-tag";
import styled from "styled-components";

import Pagination from "./Pagination";
import Item from "./Item";
import { perPage } from "../config";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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

class Items extends Component<any, any> {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        {/* An example of render props, 
        the way components is passed the props from Query,
        the child of Query is function expression : 
         function(payload) => { return (Component)}  */}
        <Query
          query={ALL_ITEMS_QUERY}
          // fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage,
            first: perPage
          }}
        >
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
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Items;

export { ALL_ITEMS_QUERY };

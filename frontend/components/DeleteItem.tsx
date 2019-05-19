import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component<any, any> {
  // cache and payload passed from Mutation - update prop
  update = (cache, payload) => {
    //manually update the cache on client so it matches backend
    // matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data, payload);
    // 2. Filter deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    {
      return (
        // Mutation - update prop - apollo will pass along access to  "cache" and "payload" (what is returned from DELETE_ITEM_MUTATION) so we update the UI without making another backend call to fetch updated db, we just removing one item
        <Mutation
          mutation={DELETE_ITEM_MUTATION}
          variables={{ id: this.props.id }}
          update={this.update}
        >
          {// payload in render prop contains loading, error, called, data
          (deleteItem, { error }) => (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete?")) {
                  deleteItem();
                }
              }}
            >
              {this.props.children}}
            </button>
          )}
        </Mutation>
      );
    }
  }
}

export default DeleteItem;

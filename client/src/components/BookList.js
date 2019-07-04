import React, { Component } from 'react';
// import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <Query query={getBooksQuery}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading..</h4>;
            if (error) console.log(error);

            // return data.books.map(book => {
            //   return <li>{book.name}</li>;
            // });
            return (
              <React.Fragment>
                {data.books.map(book => (
                  <li
                    key={book.id}
                    onClick={e => {
                      this.setState({ selected: book.id });
                    }}
                  >
                    {book.name}
                  </li>
                ))}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default BookList;

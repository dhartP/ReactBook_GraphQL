import React, { Component } from 'react';
// import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

// const addBookMutation = gql`
//   mutation {
//     addBook(name: "", genre: "", authorId: "") {
//       name
//       id
//     }
//   }
// `;

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  render() {
    return (
      <Mutation mutation={addBookMutation}>
        {addBook => (
          <form
            id='add-book'
            onSubmit={e => {
              e.preventDefault();
              addBook({
                variables: {
                  name: this.state.name,
                  genre: this.state.genre,
                  authorId: this.state.authorId
                },
                refetchQueries: [{ query: getBooksQuery }]
              });
            }}
          >
            <div className='field'>
              <label>Book name:</label>
              <input
                type='text'
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Genre:</label>
              <input
                type='text'
                onChange={e => this.setState({ genre: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Author:</label>
              <select
                onChange={e => this.setState({ authorId: e.target.value })}
              >
                <option>Select author</option>
                {/* {this.displayAuthors()} */}
                <Query query={getAuthorsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <option disabled>Loading..</option>;
                    if (error) console.log(error);

                    return (
                      <React.Fragment>
                        {data.authors.map(author => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        ))}
                      </React.Fragment>
                    );
                  }}
                </Query>
              </select>
            </div>
            <button>+</button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default AddBook;

// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

// export default JokeList;

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props){
    super(props);
    this.state = {
      jokes: []
    };

    /* empty joke list and then call getJokes */
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleLock = this.toggleLock.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet) {
      this.getJokes();
    }
  }

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    if (this.state.jokes.length < this.props.numJokesToGet) {
      this.getJokes();
    }
  }
  // const [jokes, setJokes] = useState([]);

  /* get jokes if there are no jokes */

  // useEffect(function() {
  //   async function getJokes() {
  //     let j = [...jokes];
  //     let seenJokes = new Set();
  //     try {
  //       while (j.length < numJokesToGet) {
  //         let res = await axios.get("https://icanhazdadjoke.com", {
  //           headers: { Accept: "application/json" }
  //         });
  //         let { status, ...jokeObj } = res.data;
  
  //         if (!seenJokes.has(jokeObj.id)) {
  //           seenJokes.add(jokeObj.id);
  //           j.push({ ...jokeObj, votes: 0 });
  //         } else {
  //           console.error("duplicate found!");
  //         }
  //       }
  //       setJokes(j);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   if (jokes.length === 0) getJokes();
  // }, [jokes, numJokesToGet]);

  async getJokes() {
    // let j = [...jokes];
    // let seenJokes = new Set();
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let jokes = this.state.jokes;
      let jokeVotes = JSON.parse(
        window.localStorage.getItem("jokeVotes") || "{}"
      );
      let seenJokes = new Set(jokes.map(joke => joke.id));

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          jokes.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({ jokes });
      window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes))
    } catch (e) {
      console.log(e);
    }
  }

  // if (jokes.length === 0) getJokes();


  /* empty joke list and then call getJokes */

  generateNewJokes() {
    // this.setState([this.getJokes()]);
    // this.getJokes();

    // Hannah ? What is this doing?
    this.setState(st => ({  jokes: st.jokes.filter(joke => joke.locked)}));
  }

  /** Add the ability to reset the vote counts by clicking on a button. This should also clear out local storage. */ 
  reset() {
    window.localStorage.setItem("jokeVotes", "{}");
    this.setState(st => ({
      jokes: st.jokes.map(joke => ({ ...joke, votes: 0 }))
    }));
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    let jokeVotes = JSON.parse(window.localStorage.getItem("jokeVotes"));
    jokeVotes[id] = (jokeVotes[id] || 0) + delta;
    window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
    this.setState(st => ({
      jokes: st.jokes.map(joke => 
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    }));
  }
  
  /** Add the ability to “lock” a joke with a lock button, 
   * so that you can keep jokes on the page when you request new jokes. */ 
  toggleLock(id) {
    this.setState(st => ({
      jokes: st.jokes.map(joke => (joke.id === id ? { ...joke, locked:!joke.locked  } : joke))
    }));
  }

  /* render: either loading spinner or list of sorted jokes. */
  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    /** Store the list of jokes, with votes in local storage. 
     * When users visit the app, it should show saved jokes, 
     * rather than fetching new jokes. 
     * However, the user should still be able to generate new jokes via the button, 
     * and these new jokes should replace the ones in local storage. */ 
    let allLocked = sortedJokes.filter(joke => joke.locked).length === this.props.numJokesToGet;
  
    return (
      <div className="JokeList">
        <button 
          className="JokeList-getmore" 
          onClick={this.generateNewJokes}
          disabled={allLocked}
          >
          Get New Jokes
        </button>

        <button
          className="JokeList-getmore"
          onClick={this.reset}>
          Reset Vote Counts
        </button>
  
        {sortedJokes.map(j => (
          <Joke 
            text={j.joke} 
            key={j.id} 
            id={j.id} 
            votes={j.votes} 
            vote={this.vote} 
            locked={j.locked}
            toggleLock={this.toggleLock}
          />
        ))}

        {sortedJokes.length < this.props.numJokesToGet ? (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
          ) : null}
      </div>
    );
  }
}

export default JokeList;

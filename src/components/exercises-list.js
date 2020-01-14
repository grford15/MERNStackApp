import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date}</td>
    <td>
      <Link
        to={'/edit/' + props.exercise._id}
        className="btn btn-success"
      >
        Edit
      </Link>{' '}
      |{' '}
      <button
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
        className="btn btn-danger"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
    };

    this.deleteExercise = this.deleteExercise.bind(this);
    this.exerciseList = this.exerciseList.bind(this);
  }

  componentDidMount() {
    axios('http://localhost:5000/exercises')
      .then(res => this.setState({ exercises: res.data }))
      .catch(err => console.log(err));
  }

  deleteExercise(id) {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

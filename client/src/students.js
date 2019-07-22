import React, { Component } from "react";

class Students extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }

  async componentDidMount() {
    const res = await fetch("/api/students");
    const data = await res.json();
    this.setState({
      students: data
    });
  }
  render() {
    return this.state.students ? (
      <div>{this.state.students.map(el => el.firstName)} </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default Students;

import React, { Component } from "react";

class Students extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }

  async componentDidMount() {
    console.log("try 1");
    const res = await fetch("/employees");
    console.log("try 2");
    console.log("res ", res);
    const data = await res.json();
    console.log("try");
    console.log(data);
    this.setState({
      students: data
    });
  }
  render() {
    console.log(this.state.students);
    return this.state.students ? (
      <div>
        <table>
          <tr>
            <th>EmpID</th>
            <th>Name</th>
            <th>EmpCode</th>
            <th>Salary</th>
          </tr>
        {this.state.students.map(el => {
          return (
            <tr>

              <th>{el.EmpID}</th>
              <th>{el.Name}</th>
              <th>{el.EmpCode}</th>
              <th>{el.Salary}</th>
             </tr>
          )
        })} 
        </table>
       
        <div>
          test
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Students;

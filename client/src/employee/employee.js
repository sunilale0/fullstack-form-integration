import React, {Component} from 'react';
import axios from 'axios';


class Employee extends Component {
    constructor(){
        super();
        this.state = {
            employees: [],
            object: {}
        }
    }
    
    async componentDidMount() {
        try {
        const emps = await axios.get('/employees');
        this.setState({
            employees: emps.data
            })
        } catch (error) {
            console.error(error)
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        // const {(EmpID.Value), (Name.Name), (EmpCode.EmpCode), (Salary.Salary)} = event.target
        // const { EmpID, Name, EmpCode, Salary } = event.target;
        const newEmp = {
            Name: event.target.Name.value,
            EmpCode: event.target.EmpCode.value,
            Salary: event.target.Salary.value

        }
        
        console.log(newEmp.ID)
        axios.post(`/employees`,
            {
                Name: newEmp.Name,
                EmpCode: newEmp.EmpCode,
                Salary: newEmp.Salary
            })
        this.refresh();
    }

    async deleteEmployee (EmpID) {
        await axios.delete(`/employees/${EmpID}`)
        this.refresh();
    }

    refresh = async () => {
        try {
            const res = await axios.get('/employees')
            this.setState({
                employees:res.data
            })
        } catch (error) {
            console.error(error)
        }
    }

    async updateEmployee(EmpID) {
        await axios.put(`employees`)
    }


    
render(){
    return (
        this.state.employees.length ? (<div>

            <form onSubmit={this.submitHandler} className='border p-5'>
                <div className='form-group'>
                    <label htmlFor='Name'>Name</label>
                    <input type='text' className='form-control' name='Name'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='EmpCode'>EmpCode</label>
                    <input type='number' className='form-control' name='EmpCode'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='Salary'>Salary</label>
                    <input type='number' className='form-control' name='Salary'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <table className='table' style={{ color: 'white' }}>
                <thead>
                    <tr>
                        <th>EmpID</th>
                        <th>Name</th>
                        <th>EmpCode</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.map((el, i) => {
                        return (
                            <tr key={i}>

                                <th>{el.EmpID}</th>
                                <th>{el.Name}</th>
                                <th>{el.EmpCode}</th>
                                <th>{el.Salary}</th>
                                <th>
                                <button
                                    type='button'
                                    onClick={() => this.deleteEmployee(el.EmpID)}
                                    className="btn btn-primary" >Delete</button>
                                </th>
                                <th>
                                <button
                                    type='button'
                                    onClick={() => this.updateEmployee(el.EmpID)}
                                    className="btn btn-primary" >Update</button>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
         
            </table>
        </div>) : 'No Employees yet!'
    )
}
    
}

export default Employee;
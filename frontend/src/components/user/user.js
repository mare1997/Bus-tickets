import React from 'react';

class User extends React.Component {
    constructor() {
        super();
        this.state={
            users: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3001/users')
        .then(results =>{
            return results.json();
        }).then(data =>{
            console.log(data);
            let user=data.map((u) => {
                return (
                    <div key={u.id}>
                        <h1>User {u.id}</h1>
                        <p>Firstname: {u.firstName}</p>
                        <p>Lastname: {u.lastName}</p>
                        <p>Age: {u.age}</p>

                    </div>
                )
            })
            this.setState({users: user})

        })
    }
    render() {
        return (
            <div className="container">
                {this.state.users}
            </div>
        )
    }
}
export default User;
import React from 'react';

class Tasklist extends React.Component{
    state ={
        task : "" // current task
        taskList : [] //hold all tasks
    }
    componentDidMount(){
        this.getTasklist();
    }
    
    getTasklist = () => {
        axios
        .get('http://localhost:4000/tasks')
        .then((response) => response.data)
        .then(response => this.setState({taskList : response}));
    };
    onDeleteClick = taskid => {
        axios.delete(`http://localhost:4000/deleteTask/${taskid}`);
        this.getTasklist();
    };
    onSubmitClick = () =>{
        axios.post('http://localhost:4000/addTask',{
            task: this.state.task
        });
        this.getTasklist()
    };
    render() {
        return (
            <div>
            <h3>taskList</h3>
            <div className='ui input'>
            <input value ={this.state.task} onChange ={e => this.setState({
                task : e.target.value
            })} placeholder ="your tasks." />
            </div>
            <button className='ui primary button basic'>submit</button>
            <hr />
            <div className="ui cards">
                { this.state.tasklist.map((task) => (
                <div className="card">
                    <div className="content">
                        <div className ="meta">{task.tasks}
                            
                        </div>
                        <div className="description">
                            
                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                            <div className="ui basic green button">Done</div>
                            <div className="ui basic red button" onclick ={
                                () => this.onDeleteClick(task.taskid)
                            }>Delete</div>
                        </div>
                        </div>
                    </div> 
                </div>
                ))}
            </div>
            </div>
        )
    }
}

export default Tasklist
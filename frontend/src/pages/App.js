import { useEffect, useState } from 'react';
import './App.css';
import Header from '../component/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
const moment = require('moment');

const App = () => {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' }); 

  const showTodos = async () => {
    try {
      const { data } = await axios.get('/api/show/todos');
      const todosWithUpdateAtNull = data.filter((todo) => todo.updateAt === null).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));;
      const todosWithUpdateAt = data.filter((todo) => todo.updateAt !== null).sort((a, b) => new Date(a.updateAt) - new Date(b.updateAt));
      const sortedList = [...todosWithUpdateAtNull, ...todosWithUpdateAt];
      setList(sortedList);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = async (todoId) => {
    try {
      await axios.put(`/api/update/todo/${todoId}`);
      showTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault(); 

    if (!newTodo.title.trim()) {
      alert("Le titre est obligatoire.");
      console.log(newTodo.title);
      console.log(newTodo);
      return;
    }

    try {
      await axios.post('/api/create/list', newTodo);
      setNewTodo({ title: '', description: '' });

      showTodos();

    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleChange = (e) => {
    setNewTodo({ ...newTodo, title: e.target.value });
  };
  
  const handleDescriptionChange = (e) => {
    setNewTodo({ ...newTodo, description: e.target.value });
  };
  

  useEffect(() => {
    showTodos();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className='form' style={{ paddingBottom: "50px", paddingTop: "50px" }}>
          <form onSubmit={handleAddTodo}>
            <div className='form-wrapper' style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <input className='form-control' type='text' placeholder='title' name='title' value={newTodo.title} onChange={handleTitleChange}/>
              </div>
              <div style={{ flex: 3 }}>
                
                <textarea className="form-control" aria-label="description" placeholder='description' name='description' value={newTodo.description} onChange={handleDescriptionChange}></textarea>
              </div>
              <div>
              <button type='submit' style={{ width: "200px", marginLeft: "10px", backgroundColor:"#2980b9" }}  className='btn btn-success'>Add</button>
              </div>
            </div>
          </form>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>
                N°
              </th>
              <th scope='col'>
                Title
              </th>
              <th scope='col'>
                Craeted At
              </th>
              <th scope='col'>
                Details
              </th>
              <th scope='col'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              list && list.map((d) => (
                <tr key={d.id}>
                  <td className={d.status === 0 ? 'completed' : ''}>{d.id}</td>
                  <td className={d.status === 0 ? 'completed' : ''}>{d.title}</td>
                  <td className={d.status === 0 ? 'completed' : ''}>{moment(d.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                  <td>
                    <Link to={`/details/${d.id}`}>See the details</Link>
                  </td>
                  <td> <input
                    type="checkbox"
                    checked={d.status === 0}
                    onChange={() => handleChange(d.id)}

                  /></td>
                </tr>
              ))

            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
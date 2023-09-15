import { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header';
import axios from 'axios';
const moment = require('moment');

const App = () => {
  const [list, setList] = useState([]);
  //const [checked, setChecked] = React.useState(false);

  const showTodos = async () => {
    try {
      const { data } = await axios.get('/api/show/todos');
      console.log(data);
      const todosWithUpdateAtNull = data.filter((todo) => todo.updateAt === null).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));;
      const todosWithUpdateAt = data.filter((todo) => todo.updateAt !== null).sort((a, b) => new Date(a.updateAt) - new Date(b.updateAt));
      const sortedList = [...todosWithUpdateAtNull, ...todosWithUpdateAt];
      setList(sortedList);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = async (todoId) => {
    
  };

  useEffect(() => {
    showTodos();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
       

        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>
                Title
              </th>
              <th scope='col'>
                Description
              </th>
              <th scope='col'>
                Craeted At
              </th>
              <th scope='col'>
                update At
              </th>
              <th scope='col'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              list && list.map((d) => (
                <tr key={d.id} >
                  <td >{d.title}</td>
                  <td >{d.description}</td>
                  <td >{moment(d.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                  <td>{moment(d.updateAt).format('DD-MM-YYYY HH:mm:ss')}</td>

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
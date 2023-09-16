import { useEffect, useState } from 'react';
import './App.css';
import Header from '../component/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
const moment = require('moment');

const App = () => {
  const [list, setList] = useState([]);

  const showTodos = async () => {
    try {
      const { data } = await axios.get('/api/show/todos');
      const todosWithUpdateAtNull = data.filter((todo) => todo.updateAt === null).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));;
      const todosWithUpdateAt = data.filter((todo) => todo.updateAt !== null).sort((a, b) => new Date(a.updateAt) - new Date(b.updateAt));
      const sortedList = [...todosWithUpdateAtNull, ...todosWithUpdateAt];
      setList(sortedList);
      //setList(sortedList);
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
                    <Link to={`/details/${d.id}`}>Voir les détails</Link>
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
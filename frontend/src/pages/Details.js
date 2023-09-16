import Header from '../component/Header';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const moment = require('moment');

const Details = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const response = await axios.get(`/api/get/todo/${taskId}`);
        setTask(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadTask();
  }, [taskId]);

  if (!task) {
    return (
      <>
        <Header />
        <div className="container">
          <h2 className="my-4">Details of task {taskId}</h2>
          <p>Loading ...</p>
        </div>
      </>
    );
  }


  return (
    <>
      <Header />
      <div className="container">
        <h2 className="my-4">Details of task {taskId}</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">N° {task[0].id}</h5>
            <p className="card-text">Title : {task[0].title}</p>
            <p className="card-text">Description : {task[0].description}</p>
            <p className="card-text">
              State :{' '}
              {task[0].status === 0 ? (
                <span className="text-success fw-bold">Done</span>
              ) : (
                <span className="text-warning fw-bold">Todo</span>
              )}
            </p>
            <p className="card-text">Created at : {moment(task[0].createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
            {
              task[0].updateAt === null ?  <p className="card-text"></p>
              :  <p className="card-text">The task is done at : {moment(task[0].updateAt).format('DD-MM-YYYY HH:mm:ss')}</p>
            }
           
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
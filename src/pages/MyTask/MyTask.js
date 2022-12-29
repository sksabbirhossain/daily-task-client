import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const userid = currentUser?.uid;

  //get my task by user id
  useEffect(() => {
    axiosInstance
      .get(`my-task?userid=${userid}`)
      .then((res) => setTasks(res.data.data))
      .catch((error) => {
        console.log(error);
      });
  }, [userid, loading]);

  //completed task
  const completeTask = (id) => {
    axiosInstance
      .patch(`my-task/complete/${id}`)
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          setLoading(!loading);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.err(err.message);
      });
  };

  //delete task
  const deleteTask = (id) => {
    axiosInstance
      .delete(`my-task/${id}`)
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          setLoading(!loading);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.err(err.message);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="shadow-lg p-4 rounded-lg mt-4">
        <h3 className="text-2xl text-center font-medium">My Tasks</h3>
      </div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="dark:bg-gray-700">
              <tr className="text-left">
                <th className="p-3">Invoice</th>
                <th className="p-3">Task</th>
                <th className="p-3">Completed</th>
                <th className="p-3">Update</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                >
                  <td className="p-3">
                    <p>{1}</p>
                  </td>
                  <td className="p-3">
                    <p>{task.task}</p>
                  </td>
                  <td className="p-3 text-left">
                    <button onClick={() => completeTask(task._id)}>
                      Completed
                    </button>
                  </td>
                  <td className="p-3 text-left">
                    <p className="text-green-900 cursor-pointer">
                      <Link to={`/my-task/update/${task._id}`}>
                        <FaPencilAlt />
                      </Link>
                    </p>
                  </td>
                  <td className="p-3 text-left">
                    <p
                      className="text-red-500 cursor-pointer"
                      onClick={() => deleteTask(task._id)}
                    >
                      <FaRegTrashAlt />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTask;

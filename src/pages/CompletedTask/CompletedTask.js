import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";

const CompletedTask = () => {
  const [completedTask, setCompletedTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const userid = currentUser?.uid;

  var i = 1;
  //get all completed tasks
  useEffect(() => {
    axiosInstance
      .get(`completed-task?userid=${userid}`)
      .then((res) => setCompletedTask(res.data.data))
      .catch((error) => {
        console.log(error);
      });
  }, [userid, loading]);

  //not completed
  const notCompleteTask = (id) => {
    axiosInstance
      .patch(`completed-task/not-completed/${id}`)
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
      <div className="shadow-lg rounded-lg p-4 mt-4 dark:bg-gray-800">
        <h3 className="text-center text-xl">Completed Tasks</h3>
      </div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="dark:bg-gray-900">
              <tr className="text-left">
                <th className="p-3">Invoice</th>
                <th className="p-3">Task</th>
                <th className="p-3">Not Completed</th>
                <th className="p-3">Details</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {completedTask?.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="p-3">
                    <p>{i++}</p>
                  </td>
                  <td className="p-3">
                    <p>{task.task}</p>
                  </td>
                  <td className="p-3 text-left">
                    <button onClick={() => notCompleteTask(task._id)}>
                      Not Completed
                    </button>
                  </td>
                  <td className="p-3 text-left">
                    <Link to={`/completed-task/details/${task._id}`}>
                      <button>Details</button>
                    </Link>
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

export default CompletedTask;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { axiosInstance } from "../../utils/axiosInstance";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  //get task by id
  useEffect(() => {
    axiosInstance
      .get(`my-task/update/${id}`)
      .then((res) => setTask(res.data.data))
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //update task
  const handleTaskUpdate = (e) => {
    e.preventDefault();
    const taskDetails = {
      task: e.target.title.value,
      photourl: e.target.photo.value,
    };
    // update
    axiosInstance
      .patch(`my-task/update/${id}`, taskDetails)
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          navigate("/my-task");
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("not update");
        console.log(err);
      });
  };
  return (
    <div className="px-4 flex justify-center mt-4">
      <div className=" bg-gray-200 w-3/4 p-4 rounded-lg shadow-md">
        <div className="shadow-lg py-4 rounded-lg">
          <h3 className="text-center text-2xl">Update Task</h3>
        </div>
        <Form onSubmit={handleTaskUpdate}>
          <div className="flex flex-col my-3">
            <label htmlFor="" className="font-bold py-2">
              Task Details
            </label>
            <textarea
              name="title"
              type="text"
              rows="3"
              className="border rounded-lg p-2"
              defaultValue={task[0]?.task}
              required
            ></textarea>
          </div>
          <FormInput
            label="Photo URL"
            name="photo"
            type="text"
            placeholder="photo url"
            defaultValue={task[0]?.photourl}
            required
          />
          <Button>Update</Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateTask;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { useAuth } from "../../contexts/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  //add task function
  const addTaskHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post("add-task", {
        task: title,
        photourl: photo,
        userId: currentUser?.uid,
        status: false,
      });
      if (data.success) {
        toast.success("add task successfull");
        navigate("/my-task");
      } else {
        toast.error("something worng!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 flex justify-center mt-4">
      <div className="dark:bg-gray-700 dark:text-white bg-gray-200 w-3/4 p-4 rounded-lg shadow-md">
        <div className="shadow-lg py-4 rounded-lg dark:bg-gray-800" >
          <h3 className="text-center text-2xl">Add Task</h3>
        </div>
        <Form onSubmit={addTaskHandler}>
          <div className="flex flex-col my-3">
            <label htmlFor="" className="font-bold py-2">
              Task Details
            </label>
            <textarea
              name="title"
              type="text"
              rows="3"
              className="border rounded-lg p-2 dark:border-gray-700 dark:bg-gray-500 dark:text-gray-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></textarea>
          </div>
          <FormInput
            label="Photo URL"
            name="photo"
            type="text"
            placeholder="photo url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
          />
          <Button>Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default AddTask;

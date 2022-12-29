import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { useAuth } from "../../contexts/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";

const TaskDetails = () => {
  const [task, setTask] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams();
  const userid = currentUser.uid;
  var i = 1;

  //get task by id
  useEffect(() => {
    axiosInstance
      .get(`my-task/update/${id}`)
      .then((res) => setTask(res.data.data))
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //add comment function
  const addCommentHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post("completed-task/comment", {
        comment: commentValue,
        userId: currentUser.uid,
        taskId: id,
      });
      if (data.success) {
        toast.success("comment added successfull");
      } else {
        toast.error("something worng!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get comments
  useEffect(() => {
    axiosInstance
      .get(`completed-task/comment/${id}?userid=${userid}`)
      .then((data) => {
        if (data.data.success) {
          setLoading(!loading);
          setComment(data.data.data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userid, loading, id]);

  console.log(comment);

  return (
    <div className="container mx-auto px-4">
      <div className="shadow-lg rounded-lg p-4 mt-4">
        <h3 className="text-center text-xl">Completed Task Details</h3>
      </div>
      <div className="sm:flex sm:flex-row gap-10 mt-5">
        <div className="flex-1 max-w-[350px]">
          <img
            className="max-w-[350px]"
            src={
              task[0]?.photourl
                ? task[0].photourl
                : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
            }
            alt="..."
          />
        </div>
        <div className="flex-1">
          <p className="sm:mt-0 mt-3">{task[0]?.task}</p>
        </div>
      </div>

      <div className="shadow-lg rounded-lg p-4 mt-10">
        <h3 className="text-center text-xl">Comment</h3>
      </div>
      <div className=" mt-5">
        <Form onSubmit={addCommentHandler}>
          <FormInput
            label="Write comment"
            name="comment"
            placeholder="..."
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <Button>Add</Button>
        </Form>
      </div>

      <div className="mt-5">
        <ul>
          {comment?.map((com) => (
            <li className="mb-5 shadow-md p-3 rounded-lg" key={com._id}>
              <span className="mr-2">{i++}.</span>
              {com.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskDetails;

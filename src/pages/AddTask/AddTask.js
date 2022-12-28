import React from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";

const AddTask = () => {
  return (
    <div className="px-4 flex justify-center mt-4">
      <div className=" bg-gray-200 w-3/4 p-4 rounded-lg shadow-md">
        <div className="shadow-lg py-4 rounded-lg">
          <h3 className="text-center text-2xl">Add Task</h3>
        </div>
        <Form>
          <div className="flex flex-col my-3">
            <label htmlFor="" className="font-bold py-2">
              Task Details
            </label>
            <textarea
              name=""
              rows="3"
              className="border rounded-lg p-2"
            ></textarea>
          </div>
          <FormInput
            label="Photo URL"
            name="photo"
            type="text"
            placeholder="photo url"
          />
          <Button>Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default AddTask;

import * as React from 'react';
import { IRobot } from './RobotCard';

const AddRobotForm = ({
  submitHandler,
}: {
  submitHandler: ({ name, purpose }: IRobot) => void;
}) => {
  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // To add and detect type of the form
    const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      purpose: HTMLInputElement;
    };

    if (!formElements.name.value || !formElements.purpose.value) return;

    submitHandler({
      name: formElements.name.value,
      purpose: formElements.purpose.value,
    });
    form.reset();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h1 className="text-xl mb-4">Add Robot</h1>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Robot name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-gray-700"
          >
            Purpose
          </label>
          <div className="mt-1">
            <input
              id="purpose"
              name="purpose"
              type="text"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddRobotForm;

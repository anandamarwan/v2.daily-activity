import { useState } from "react";

import { dataActivities } from "./data/activities";
import { ActivityItem } from "./components/activity-item";

export const MainApp = () => {
  const [activities, setActivities] = useState(dataActivities);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const activityFormData = new FormData(event.currentTarget);

    const newActivity = {
      id: 100,
      title: String(activityFormData.get("title")),
      category: String(activityFormData.get("category")),
    };

    // console.log({ newActivity });

    const newActivities = [...activities, newActivity];

    setActivities(newActivities);
  };

  return (
    <div>
      <main className="m-10 flex justify-center">
        <div className="w-full max-w-3xl space-y-4">
          <h1 className="text-3xl">Today</h1>
          <hr />

          <div className="flex flex-col">
            <form method="post" onSubmit={handleSubmit}>
              <label
                className="text-xl block mb-2  font-medium text-gray-900 dark:text-white"
                htmlFor="title"
              >
                Title:{" "}
              </label>
              <input
                className="p-2 rounded-lg bg-gray-700"
                type="text"
                name="title"
                id="title"
                placeholder="Breakfast"
                required
              />

              <label
                htmlFor="category"
                className="text-xl block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Select a Category:
              </label>
              <select
                defaultValue="food"
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="food">Food</option>
                <option value="sport">Sport</option>
                <option value="study">Study</option>
                <option value="hobbies">hobbies</option>
              </select>
              <button
                type="submit"
                className="mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Add Activity
              </button>
            </form>
          </div>

          <div>
            <ul>
              {activities.map((activity) => (
                <li key={activity.id}>
                  <ActivityItem activity={activity} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

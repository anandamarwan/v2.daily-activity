import {
  Form,
  redirect,
  useLoaderData,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { getActivity, updateActivity } from "@/storage/activities";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.activityId);
  const activity = await getActivity(id);
  return { activity };
}

// Action untuk memperbarui aktivitas
export async function action({ request, params }: ActionFunctionArgs) {
  // Pastikan activityId adalah sebuah angka
  const activityId = Number(params.activityId);
  if (!activityId || isNaN(activityId)) {
    throw new Error("Invalid activity ID");
  }

  const formData = await request.formData();

  const newActivity = {
    id: activityId,
    title: String(formData.get("title")),
    category: String(formData.get("category")),
    createdAt: new Date(),
  };

  await updateActivity(activityId, newActivity);

  return redirect(`/activities/${activityId}`);
}

// Fungsi Loader (tambahkan jika diperlukan)
// export async function loader({ params }: LoaderFunctionArgs) {
//   const activity = await getActivity(params.activityId); // Sesuaikan dengan fungsi Anda
//   return { activity };
// }

export function EditActivityRoute() {
  const { activity } = useLoaderData() as {
    activity: { title: string; category: string };
  };

  return (
    <div>
      <Form method="post" className="space-y-4">
        <div className="space-y-1">
          <label
            className="text-xl block font-medium text-gray-900 dark:text-white"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="p-2 rounded-lg bg-gray-700"
            type="text"
            name="title"
            id="title"
            placeholder="Breakfast"
            required
            defaultValue={activity.title}
          />
        </div>

        <label
          htmlFor="category"
          className="text-xl block mb-2 font-medium text-gray-900 dark:text-white"
        >
          Select a Category:
        </label>
        <select
          defaultValue={activity.category}
          id="category"
          name="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="food">Food</option>
          <option value="sport">Sport</option>
          <option value="study">Study</option>
          <option value="hobbies">Hobbies</option>
        </select>

        <Button type="submit">Update Activity</Button>
      </Form>
    </div>
  );
}

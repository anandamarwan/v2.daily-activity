import { ActivityItem } from "../components/activity/activity-item";
import { Button } from "../components/ui/button";
import { createActivity, getActivities } from "../storage/activities";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { useEffect, useRef } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? undefined;
  const activities = await getActivities(q);
  return { activities, q };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const activity = await createActivity(formData);
  return redirect(`/activities/${activity.id}`);
}

export function ActivitiesRoute() {
  const { activities, q } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = q ?? "";
    }
  }, [q]);

  return (
    <div>
      <Form id="search-form" role="search">
        <input
          ref={inputRef}
          id="q"
          className="text-black"
          aria-label="Search activities"
          placeholder="Search"
          type="search"
          name="q"
          defaultValue={q ?? ""}
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </Form>

      <main className="m-10 flex justify-center">
        <div className="w-full max-w-3xl space-y-4">
          <div className="flex flex-col">
            <Form method="post" className="space-y-4">
              <div className="space-y-1">
                <label
                  className="text-xl block font-medium text-gray-900 dark:text-white"
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
              </div>

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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="food">Food</option>
                <option value="sport">Sport</option>
                <option value="study">Study</option>
                <option value="hobbies">Hobbies</option>
              </select>
              <Button type="submit">Add Activity</Button>
            </Form>
          </div>

          <div>
            {!activities || activities.length === 0 ? (
              <p>No activities found.</p>
            ) : (
              <ul>
                {activities.map((activity) => (
                  <li key={activity.id}>
                    <Link
                      to={`/activities/${activity.id}`}
                      className="block hover:bg-stone-950"
                    >
                      <ActivityItem activity={activity} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

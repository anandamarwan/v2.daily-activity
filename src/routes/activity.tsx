import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getActivity } from "../storage/activities";
import { Button } from "../components/ui/button";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.activityId);

  const activity = await getActivity(id);
  return { activity };
}

export function ActivityRoute() {
  const { activity } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (!activity) {
    return (
      <div>
        <p>Activity Not Found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold"> {activity.title}</h1>
      <h2>
        Category: <span className="font-bold">{activity.category}</span>
      </h2>

      <div>
        <Button>Delete</Button>
      </div>
    </div>
  );
}

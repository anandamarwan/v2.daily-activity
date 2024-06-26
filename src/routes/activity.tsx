import {
  type LoaderFunctionArgs,
  useLoaderData,
  Form,
  ActionFunctionArgs,
  redirect,
  Link,
} from "react-router-dom";
import { deleteActivity, getActivity } from "../storage/activities";
import { Button } from "../components/ui/button";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.activityId);
  const activity = await getActivity(id);
  return { activity };
}

export async function action({ params }: ActionFunctionArgs) {
  const id = Number(params.activityId);
  await deleteActivity(id);
  return redirect("/");
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
    <div className="space-y-4">
      <h1 className="text-3xl font-bold"> {activity.title}</h1>
      <h2>
        Category: <span className="font-bold">{activity.category}</span>
      </h2>

      <div className="flex gap-4">
        <Form method="DELETE">
          <Button variant="destructive" size="xs">
            Delete
          </Button>
        </Form>
        <Button asChild size="xs">
          <Link to={`/activities/${activity.id}/edit`}>Edit</Link>
        </Button>
      </div>
    </div>
  );
}

import { Activity, dataActivities } from "./data/activities";
import { ActivityItem } from "./components/activity-item";

export const MainApp = () => {
  return (
    <div>
      <main className="m-10 flex justify-center">
        <div className="w-full max-w-3xl space-y-4">
          <h1 className="text-3xl">Today</h1>
          <hr />

          <div>
            <ul>
              {dataActivities.map((activity) => (
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

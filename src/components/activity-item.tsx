import { Activity } from "../data/activities";

export function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="p-2">
      <p>{activity.title}</p>
      <p className="text-slate-400">{activity.category}</p>
    </div>
  );
}

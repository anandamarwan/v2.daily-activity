import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

import { type Activity } from "../data/activities";

export async function getActivities(query?: string) {
  await fakeNetwork(`getActivities:${query}`);

  let activities = await get();

  if (!activities) activities = [];

  if (query) {
    activities = matchSorter(activities, query, { keys: ["title"] });
  }

  return activities.sort(sortBy("last", "createdAt"));
}

export async function createActivity(formData: FormData) {
  await fakeNetwork(``);

  const newActivity: Activity = {
    id: Math.floor(Math.random() * (10_000_000 - 1 + 1) + 1), // 1 to 100
    title: String(formData.get("title")),
    category: String(formData.get("category")),
    createdAt: new Date(),
  };

  const activities = await getActivities();
  const newActivities = [...activities, newActivity];

  await set(newActivities);

  return newActivity;
}

export async function getActivity(id: number) {
  await fakeNetwork(`activity:${id}`);

  const activities = await get();
  const activity = activities.find((activity) => activity.id === id);

  return activity ?? null;
}

export async function updateActivity(id: number, newActivity: Activity) {
  await fakeNetwork(``);

  const activities = await get();
  const activity = activities.find((activity) => activity.id === id);
  if (!activity) throw new Error("No activity found for");

  Object.assign(activity, newActivity);

  await set(activities);

  return activity;
}

export async function deleteActivity(id: number) {
  const activities = await get();

  const updatedActivities = activities.filter((activity) => activity.id !== id);
  await set(updatedActivities);

  return false;
}

async function get() {
  return (await localforage.getItem("activities")) as Activity[];
}

function set(activities: Activity[]) {
  return localforage.setItem("activities", activities);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key: string) {
  if (!key) {
    fakeCache = {};
  }

  // @ts-expect-error Later
  if (fakeCache[key]) {
    return;
  }

  // @ts-expect-error Later
  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 100);
  });
}

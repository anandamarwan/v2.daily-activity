export type Activity = {
  id: number;
  title: string;
  category: string;
  createdAt?: Date;
};

export const dataActivities: Activity[] = [
  {
    id: 1,
    title: "Joging",
    category: "Sport",
  },
  {
    id: 2,
    title: "Breakfast",
    category: "Food",
  },
  {
    id: 3,
    title: "Lunch",
    category: "Food",
  },
];

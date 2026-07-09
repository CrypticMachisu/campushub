// src/data/mockData.jsx

export const CATEGORIES = [
  "Academic",
  "Arts & Culture",
  "Sports & Fitness",
  "Technology",
  "Service & Volunteering",
  "Social",
];

export const clubs = [
  {
    id: "club-1",
    name: "Robotics Club",
    category: "Technology",
    description: "Building and programming robots for regional competitions.",
    image: "https://placehold.co/400x250?text=Robotics+Club",
    tags: ["robotics", "engineering", "coding"],
    memberCount: 42,
  },
  {
    id: "club-2",
    name: "Photography Society",
    category: "Arts & Culture",
    description: "Weekly photo walks, editing workshops, and gallery nights.",
    image: "https://placehold.co/400x250?text=Photography+Society",
    tags: ["photography", "art", "creative"],
    memberCount: 28,
  },
  {
    id: "club-3",
    name: "Debate Team",
    category: "Academic",
    description: "Competitive debate practice and tournament travel.",
    image: "https://placehold.co/400x250?text=Debate+Team",
    tags: ["debate", "public speaking", "academic"],
    memberCount: 19,
  },
  {
    id: "club-4",
    name: "Intramural Soccer",
    category: "Sports & Fitness",
    description: "Casual weekly matches open to all skill levels.",
    image: "https://placehold.co/400x250?text=Intramural+Soccer",
    tags: ["soccer", "sports", "fitness"],
    memberCount: 35,
  },
  {
    id: "club-5",
    name: "Volunteer Corps",
    category: "Service & Volunteering",
    description: "Organizing campus and community service events.",
    image: "https://placehold.co/400x250?text=Volunteer+Corps",
    tags: ["volunteering", "community", "service"],
    memberCount: 51,
  },
];

// Helper to generate dynamic dates relative to today so seed data never expires
function daysFromNow(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

export const events = [
  {
    id: "event-1",
    clubId: "club-1",
    title: "Robotics Build Night",
    date: daysFromNow(3),
    time: "18:00",
    description: "Weekly build session ahead of the regional competition.",
    image: "https://placehold.co/400x250?text=Robotics+Build+Night",
    location: "Engineering Lab 204",
  },
  {
    id: "event-2",
    clubId: "club-2",
    title: "Golden Hour Photo Walk",
    date: daysFromNow(5),
    time: "17:30",
    description: "Campus photo walk focused on natural lighting techniques.",
    image: "https://placehold.co/400x250?text=Photo+Walk",
    location: "Main Quad",
  },
  {
    id: "event-3",
    clubId: "club-3",
    title: "Debate Practice Round",
    date: daysFromNow(2),
    time: "19:00",
    description: "Practice rounds ahead of the regional tournament.",
    image: "https://placehold.co/400x250?text=Debate+Practice",
    location: "Humanities Building Room 110",
  },
  {
    id: "event-4",
    clubId: "club-4",
    title: "Soccer Pickup Match",
    date: daysFromNow(1),
    time: "16:00",
    description: "Casual pickup match, all skill levels welcome.",
    image: "https://placehold.co/400x250?text=Soccer+Match",
    location: "West Athletic Field",
  },
  {
    id: "event-5",
    clubId: "club-5",
    title: "Community Cleanup Day",
    date: daysFromNow(7),
    time: "09:00",
    description: "Neighborhood cleanup event, gloves and bags provided.",
    image: "https://placehold.co/400x250?text=Cleanup+Day",
    location: "Riverside Park",
  },
];
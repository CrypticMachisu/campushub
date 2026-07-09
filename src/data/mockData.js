// Static seed data for CampusHub.
// Shape locked in 00-shared-contracts.md §3 — don't rename fields without
// telling the group, other pages destructure these directly.
//
// Event dates are generated relative to today (see daysFromNow below)
// per the 01-person1-foundation.md peer review — hardcoded strings like
// "2026-07-14" quietly become "past events" the moment that date
// passes, which breaks the "upcoming events" feed for anyone opening
// the project after that. Offsets preserve the original spacing.

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

export const CATEGORIES = [
  "Academic",
  "Arts & Culture",
  "Sports & Fitness",
  "Technology",
  "Community Service",
  "Social",
];

export const clubs = [
  {
    id: "club-01",
    name: "Debate & Rhetoric Society",
    category: "Academic",
    description:
      "Weekly parliamentary-style debates and coaching for regional and national tournaments.",
    logoUrl: "https://placehold.co/200x200?text=Debate",
    meetingTime: "Tuesdays, 6:00 PM",
    meetingLocation: "Humanities Hall, Room 214",
    tags: ["public-speaking", "competitive", "writing"],
  },
  {
    id: "club-02",
    name: "Lens Collective",
    category: "Arts & Culture",
    description:
      "A photography and film club for students who want to shoot, edit, and screen their work together.",
    logoUrl: "https://placehold.co/200x200?text=Lens",
    meetingTime: "Wednesdays, 5:30 PM",
    meetingLocation: "Fine Arts Building, Studio 3",
    tags: ["photography", "film", "creative"],
  },
  {
    id: "club-03",
    name: "Trailblazers Running Club",
    category: "Sports & Fitness",
    description:
      "Casual and competitive group runs around campus and the river trail, all paces welcome.",
    logoUrl: "https://placehold.co/200x200?text=Run",
    meetingTime: "Mon/Thu, 6:30 AM",
    meetingLocation: "Meet at the Rec Center steps",
    tags: ["running", "fitness", "outdoors"],
  },
  {
    id: "club-04",
    name: "Byte Club",
    category: "Technology",
    description:
      "Hands-on workshops, hackathon prep, and project nights for anyone into building software.",
    logoUrl: "https://placehold.co/200x200?text=Byte",
    meetingTime: "Thursdays, 7:00 PM",
    meetingLocation: "Engineering Building, Lab 108",
    tags: ["coding", "hackathon", "workshops"],
  },
  {
    id: "club-05",
    name: "Neighborhood Tutors",
    category: "Community Service",
    description:
      "Student-run tutoring for local middle schoolers in math and reading, transport provided.",
    logoUrl: "https://placehold.co/200x200?text=Tutors",
    meetingTime: "Saturdays, 10:00 AM",
    meetingLocation: "Vans depart from Student Union",
    tags: ["volunteering", "education", "community"],
  },
  {
    id: "club-06",
    name: "Night Market Society",
    category: "Social",
    description:
      "Monthly themed hangouts, game nights, and pop-up food events for meeting people outside your major.",
    logoUrl: "https://placehold.co/200x200?text=Social",
    meetingTime: "First Friday of the month, 7:00 PM",
    meetingLocation: "Courtyard, Building C",
    tags: ["social", "games", "food"],
  },
];

export const events = [
  {
    id: "event-01",
    clubId: "club-01",
    title: "Novice Debate Night",
    description: "An introductory round-robin for students who've never debated before.",
    category: "Academic",
    date: daysFromNow(3),
    time: "18:00",
    location: "Humanities Hall, Room 214",
    imageUrl: "https://placehold.co/600x300?text=Debate+Night",
  },
  {
    id: "event-02",
    clubId: "club-01",
    title: "Regional Tournament Prep",
    description: "Coaching session ahead of the state qualifiers, bring your case files.",
    category: "Academic",
    date: daysFromNow(10),
    time: "17:30",
    location: "Humanities Hall, Room 214",
    imageUrl: "https://placehold.co/600x300?text=Tournament+Prep",
  },
  {
    id: "event-03",
    clubId: "club-02",
    title: "Golden Hour Photowalk",
    description: "A guided walk across campus shooting available light, all skill levels.",
    category: "Arts & Culture",
    date: daysFromNow(2),
    time: "19:00",
    location: "Meet at the Quad fountain",
    imageUrl: "https://placehold.co/600x300?text=Photowalk",
  },
  {
    id: "event-04",
    clubId: "club-02",
    title: "Short Film Screening Night",
    description: "Member-made shorts on the big screen, followed by an open critique.",
    category: "Arts & Culture",
    date: daysFromNow(14),
    time: "20:00",
    location: "Fine Arts Building, Studio 3",
    imageUrl: "https://placehold.co/600x300?text=Screening+Night",
  },
  {
    id: "event-05",
    clubId: "club-03",
    title: "River Trail 5K",
    description: "A social 5K along the river trail, coffee after at the Rec Center.",
    category: "Sports & Fitness",
    date: daysFromNow(1),
    time: "06:30",
    location: "Rec Center steps",
    imageUrl: "https://placehold.co/600x300?text=River+Trail+5K",
  },
  {
    id: "event-06",
    clubId: "club-03",
    title: "Interval Training Session",
    description: "Coached speed workout on the track, spikes optional.",
    category: "Sports & Fitness",
    date: daysFromNow(8),
    time: "06:30",
    location: "Campus Track",
    imageUrl: "https://placehold.co/600x300?text=Interval+Training",
  },
  {
    id: "event-07",
    clubId: "club-04",
    title: "Hackathon Kickoff Workshop",
    description: "Team formation and a crash course in the tools you'll need for the fall hackathon.",
    category: "Technology",
    date: daysFromNow(4),
    time: "19:00",
    location: "Engineering Building, Lab 108",
    imageUrl: "https://placehold.co/600x300?text=Hackathon+Kickoff",
  },
  {
    id: "event-08",
    clubId: "club-04",
    title: "Intro to React Workshop",
    description: "A beginner-friendly build-along, laptops provided for anyone who needs one.",
    category: "Technology",
    date: daysFromNow(16),
    time: "18:30",
    location: "Engineering Building, Lab 108",
    imageUrl: "https://placehold.co/600x300?text=React+Workshop",
  },
  {
    id: "event-09",
    clubId: "club-05",
    title: "Saturday Tutoring Session",
    description: "Weekly math and reading support for local middle schoolers.",
    category: "Community Service",
    date: daysFromNow(3),
    time: "10:00",
    location: "Vans depart from Student Union",
    imageUrl: "https://placehold.co/600x300?text=Tutoring+Session",
  },
  {
    id: "event-10",
    clubId: "club-05",
    title: "School Supply Drive",
    description: "Pack and deliver supply kits for the tutoring program's partner schools.",
    category: "Community Service",
    date: daysFromNow(11),
    time: "11:00",
    location: "Student Union, Room 102",
    imageUrl: "https://placehold.co/600x300?text=Supply+Drive",
  },
  {
    id: "event-11",
    clubId: "club-06",
    title: "Night Market Mixer",
    description: "Food stalls, board games, and a playlist run by the club's DJ crew.",
    category: "Social",
    date: daysFromNow(2),
    time: "19:00",
    location: "Courtyard, Building C",
    imageUrl: "https://placehold.co/600x300?text=Night+Market",
  },
  {
    id: "event-12",
    clubId: "club-06",
    title: "Trivia & Tacos",
    description: "Team trivia with a taco truck on standby, prizes for the top three teams.",
    category: "Social",
    date: daysFromNow(17),
    time: "19:30",
    location: "Courtyard, Building C",
    imageUrl: "https://placehold.co/600x300?text=Trivia+Night",
  },
];

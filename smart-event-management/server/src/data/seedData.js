// password for all demo users = "password123"
const rawUsers = [
  { name: "Admin One", email: "admin@smart.com", role: "admin", interests: ["Hackathon","Workshop"] },
  { name: "Alice", email: "alice@mail.com", role: "user", interests: ["Workshop","Cultural"] },
  { name: "Bob", email: "bob@mail.com", role: "user", interests: ["Hackathon","Seminar"] }
];

const events = [
  {
    title: "Campus Hackathon 2025",
    type: "Hackathon",
    description: "24-hour coding sprint with mentors.",
    date: new Date(Date.now() + 1000*60*60*24*7),
    startTime: "09:00", endTime: "09:00",
    venue: "Main Auditorium", city: "Kochi",
    totalSeats: 120, bookedSeats: 0,
    imageUrl: "/assets/slide1.jpg", tags: ["coding","team"]
  },
  {
    title: "AI Workshop: Prompt Engineering",
    type: "Workshop",
    description: "Hands-on session on LLM prompts.",
    date: new Date(Date.now() + 1000*60*60*24*14),
    startTime: "10:00", endTime: "16:00",
    venue: "Lab 3", city: "Kochi",
    totalSeats: 40, bookedSeats: 0,
    imageUrl: "/assets/slide2.jpg", tags: ["ai","beginner"]
  },
  {
    title: "Cloud Career Seminar",
    type: "Seminar",
    description: "Talks by industry engineers.",
    date: new Date(Date.now() + 1000*60*60*24*21),
    startTime: "11:00", endTime: "13:00",
    venue: "Seminar Hall B", city: "Thrissur",
    totalSeats: 200, bookedSeats: 0,
    imageUrl: "/assets/slide3.jpg", tags: ["cloud","career"]
  },
  {
    title: "Cultural Night: Fusion Fest",
    type: "Cultural",
    description: "Music, dance, food stalls.",
    date: new Date(Date.now() + 1000*60*60*24*28),
    startTime: "18:00", endTime: "22:00",
    venue: "Open Grounds", city: "Kottayam",
    totalSeats: 300, bookedSeats: 0,
    imageUrl: "/assets/slide4.jpg", tags: ["music","festival"]
  }
];

module.exports = { rawUsers, events };

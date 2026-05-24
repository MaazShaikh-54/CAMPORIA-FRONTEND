const activities = [
  {
    id: "campfire",
    title: "Camp Fire",
    description: "Gather around the warm glow of a crackling fire, sharing stories under the night sky.",
    images: [1, 2, 3, 4, 5].map(n => `/assets/activities/campfire${n}.jpg`),
  },
  {
    id: "cycling",
    title: "Cycling",
    description: "Ride through scenic trails, enjoying the fresh air and breathtaking landscapes.",
    images: [1, 2].map(n => `/assets/activities/cycling${n}.jpg`),
  },
  {
    id: "hiking",
    title: "Hiking",
    description: "Trek across rugged terrains, discovering hidden waterfalls and stunning viewpoints.",
    images: [1, 2, 3].map(n => `/assets/activities/hiking${n}.jpg`),
  },
  {
    id: "stargazing",
    title: "Star Gazing",
    description: "Witness a mesmerizing night sky, filled with countless twinkling stars.",
    images: [
      "/assets/activities/stargazing1.jpg",
      "/assets/activities/stargazing2.jpeg",
    ],
  },
  {
    id: "food",
    title: "Dining",
    description: "Savor delicious, freshly prepared meals that fuel your adventure.",
    images: [1, 2, 3].map(n => `/assets/activities/food${n}.jpg`),
  },
  {
    id: "exploringvillages",
    title: "Exploring Region",
    description: "Immerse yourself in local culture, history, and traditions as you wander through charming villages.",
    images: [
      "/assets/activities/exploringvillages1.jpg",
      "/assets/activities/exploringvillages2.jpg",
      "/assets/activities/exploringvillages3.jpg",
      "/assets/activities/exploringvillages4.jpg",
      "/assets/activities/exploringvillages5.jpeg",
    ],
  },
];

export default function Activity() {
  return (
    <div id="activity" style={{ padding: "2rem 1rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.3rem", color: "#1a1a1a" }}>Activities</h1>
      <p style={{ color: "#777", marginBottom: "2.5rem", fontSize: "1rem" }}>Experiences that make every trip unforgettable</p>

      {activities.map((activity, i) => (
        <div
          key={activity.id}
          style={{
            display: "flex",
            flexDirection: i % 2 === 0 ? "row" : "row-reverse",
            gap: "2rem",
            marginBottom: "3.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 280px", minWidth: "0" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d6a4f", marginBottom: "0.5rem" }}>
              {activity.title}
            </h2>
            <p style={{ color: "#555", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6 }}>
              {activity.description}
            </p>
          </div>

          <div
            style={{
              flex: "2 1 340px",
              display: "grid",
              gridTemplateColumns: activity.images.length === 1
                ? "1fr"
                : activity.images.length === 2
                ? "1fr 1fr"
                : "1fr 1fr 1fr",
              gap: "8px",
            }}
          >
            {activity.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${activity.title} - ${idx + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  display: "block",
                  gridColumn: activity.images.length === 5 && idx === 4 ? "span 2" : "span 1",
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
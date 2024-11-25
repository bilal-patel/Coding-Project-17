import React, { useState, useEffect } from "react";

const Gallery = () => {
  // storing tours
  const [tours, setTours] = useState([]);
  // tracking loading
  const [loading, setLoading] = useState(true);
  // handling errors
  const [error, setError] = useState("");

  // Fetching the tour data from API
  useEffect(() => {
    fetch("https://www.course-api.com/react-tours-project")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Yikes! We failed to fetch tours but don't worry we'll be back up and running soon :)");
        }
        return response.json();
      })
      .then((data) => {
        setTours(data); // Update state with the tours
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError(err.message); setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // If  data still loading
  if (loading) {
    return <h2>Loading tours... almost there!</h2>;
  }

  // If error
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Render tours
  return (
    <div>
      {tours.map((tour) => (
        <div
          key={tour.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{tour.name}</h3>
          <p>Price: ${tour.price}</p>
          <img
            src={tour.image}
            alt={tour.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <Description info={tour.info} />
          <button
            onClick={() => {
              const updatedTours = tours.filter((t) => t.id !== tour.id);
              setTours(updatedTours);
            }}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "5px 10px",
              marginTop: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Not Interested
          </button>
        </div>
      ))}
    </div>
  );
};

//  component to handle toggling
const Description = ({ info }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <p>
      {isExpanded ? info : `${info.slice(0, 100)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          marginLeft: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </p>
  );
};

export default Gallery;

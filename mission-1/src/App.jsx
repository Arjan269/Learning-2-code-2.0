import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [carType, setCarType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const endpoint = import.meta.env.VITE_AZURE_ENDPOINT;
  const key = import.meta.env.VITE_AZURE_KEY;

  const carTypes = ["suv", "sedan", "truck"];

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setCarType("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${endpoint}/vision/v3.2/tag`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/octet-stream",
        },
        body: file,
      });

      if (!response.ok) throw new Error("Image analysis failed");

      const data = await response.json();

      const tags = data.tags.map((tag) => ({
        name: tag.name.toLowerCase(),
        confidence: tag.confidence,
      }));

      let bestMatch = { name: "Unknown", confidence: 0 };

      for (const type of carTypes) {
        const found = tags.find((t) => t.name.includes(type));
        if (found && found.confidence > bestMatch.confidence) {
          bestMatch = found;
        }
      }

      if (bestMatch.confidence > 0.3) {
        setCarType(bestMatch.name.toUpperCase());
      } else {
        setCarType("Unknown");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing the image.");
    }

    setLoading(false);
  };

  return (
    <>
      <header>
        🚗 Turners AI Vehicle Type Detector
      </header>

      <div className="container">
        <h1>Upload a Car Image</h1>

        <label className="upload-label">
          <input type="file" accept="image/*" onChange={handleUpload} />
          Upload Car Image
        </label>

        {image && (
          <div className="preview">
            <img src={image} alt="Uploaded car" />
          </div>
        )}

        {loading && <p className="loading">Analyzing image...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && carType && (
          <div className="result">
            {carType === "Unknown" ? (
              <p>Unable to identify vehicle type</p>
            ) : (
              <p>
                Detected Vehicle Type: <strong>{carType}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

"use client";
import { useEffect, useState } from "react";

const useLoadGoogleMapsScript = (apiKey: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const existingScript = document.getElementById("google-maps-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);
      script.onerror = () => console.error("Failed to load Google Maps script");
      document.body.appendChild(script);
    } else {
      existingScript.onload = () => setLoaded(true);
    }
  }, [apiKey]);

  return loaded;
};

export default useLoadGoogleMapsScript;

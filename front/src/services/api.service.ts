export const API_URL = "http://localhost:3000";

export const fetchData = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch data");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
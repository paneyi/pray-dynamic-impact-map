import { useState, useEffect } from "react";
import { getPastor } from "../services/pastor.service";

interface Pastor {
  id: string;
  name: string;
  picturePath: string;
  hqCoordinates: [number, number];
}

const usePastor = (pastorId: string) => {
  const [pastor, setPastor] = useState<Pastor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPastor = async () => {
      if (!pastorId) return;
			
      setLoading(true);
      setError(null);

      try {
        const data = await getPastor(pastorId);
        setPastor(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPastor();
  }, [pastorId]);

  return { pastor, loading, error };
};

export default usePastor;
import { useState, useEffect } from "react";
import { getEngagements } from "../services/pastor.service";

interface Engagement {
  id: string;
  state: string;
  coordinates: [number, number];
  timestamp: string;
}

type StateEngagements = Record<string, Engagement[]>;

const MAX_LIMIT = 300;

const useEngagements = (pastorId: string) => {
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [stateEngagements, setStateEngagements] = useState<StateEngagements>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
	const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchEngagements = async () => {
			if (!pastorId) return;

      setLoading(true);
      setError(null);

			let page = 1;
      let allEngagements: Engagement[] = [];
			
      try {
				// In a real scenario, this wouldn't fetch all, but consider a lazy-loading,
				// making a new call when requested
				while (true) {
          const data = await getEngagements(pastorId, page, MAX_LIMIT);

          if (page === 1) {
            setTotalCount(data.total); // Set the total count once
          }

          allEngagements = [...allEngagements, ...data.engagements];

          if (data.engagements.length < MAX_LIMIT || allEngagements.length >= data.total) {
            break; // No more pages to fetch
          }

          page++;
        }

        setEngagements(allEngagements);

        // Classify engagements by state
        const engagementsByState: StateEngagements = allEngagements.reduce((acc: StateEngagements, engagement: Engagement) => {
          if (!acc[engagement.state]) {
            acc[engagement.state] = [];
          }
          acc[engagement.state].push(engagement);
          return acc;
        }, {} as StateEngagements);

        setStateEngagements(engagementsByState);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagements();
    const interval = setInterval(fetchEngagements, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, [pastorId]);

  return { engagements, stateEngagements, loading, error };
};

export default useEngagements;
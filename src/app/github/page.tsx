'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

interface GitHubStats {
  totalJanuaryCommits: number;
  threshold: number;
  isActive: boolean;
  encouragingMessage: string;
  codingAtNightMessage: string;
  nightTimeContributions: number;
}

export default function Page() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const searchParams = useSearchParams();
  const username = searchParams.get("username")
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/github-stats`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
          console.log('Error fetching Github stats', error);
      } finally {
        // this is for setLoading state 
      }
    }

    fetchData();
    
  }, [username])

  return(
    <div>
      {data && (
        <>
         <div className="firstSlide">
            <p>Total January Commits: {data.totalJanuaryCommits}</p>
            <p>Threshold for Active Start: {data.threshold}</p>
            <p>Active Start to the Year: {data.isActive ? "true" : data.encouragingMessage}</p>
         </div>
         <div className="secondSlide">
            <p>total nightly contribution: {data.nightTimeContributions}</p>
            <p>coding at night message: {data.codingAtNightMessage}</p>
         </div>
        </>
      )}
    </div>
  )
}
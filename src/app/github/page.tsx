'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);
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
      <p>hello</p>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
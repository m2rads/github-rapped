'use client'
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// export default function GithubStatsPage() {
//     const router = useRouter();
    // const { username } = router.query;
    // const [loading, setLoading] = useState(true);
    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     if (!username || Array.isArray(username)) return;

    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await fetch(`/api/github-stats`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ username }),
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setData(data);
    //         } catch (error) {
    //             console.error('Error fetching GitHub stats:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [username]);

    // if (loading) {
    //     return <div>Loading...</div>; // Replace with your loading graphics or component
    // }

    // if (!data) {
    //     return <div>No data found</div>;
    // }

//     return (
//         <div>
//             {/* Display your data here */}
//             <p>Hello</p>
//         </div>
//     );
// }


export default function ls() {
    return(
        <p>hello</p>
    )
}
// // pages/api/github-stats.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Octokit } from '@octokit/core';

// const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

// interface RepoAnalysis {
//   name: string;
//   stars: number;
//   forks: number;
//   commit_count: number;
//   collaborators_count: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { username } = req.query;

//   if (typeof username !== 'string') {
//     return res.status(400).json({ message: 'Username must be a string' });
//   }

//   try {
//     // Get user repositories
//     const reposResponse = await octokit.request('GET /users/{username}/repos', {
//       username,
//     });

//     const repoAnalysis: RepoAnalysis[] = await Promise.all(
//       reposResponse.data.map(async (repo: any) => {
//         // Get number of stars for each repo
//         const stars = repo.stargazers_count;

//         // Get number of forks for each repo
//         const forks = repo.forks_count;

//         // Get number of commits for each repo
//         const commitsResponse = await octokit.request('GET /repos/{owner}/{repo}/commits', {
//           owner: username,
//           repo: repo.name,
//         });

//         // Get collaborators for each repo
//         const collaboratorsResponse = await octokit.request('GET /repos/{owner}/{repo}/collaborators', {
//           owner: username,
//           repo: repo.name,
//         });

//         return {
//           name: repo.name,
//           stars,
//           forks,
//           commit_count: commitsResponse.data.length,
//           collaborators_count: collaboratorsResponse.data.length,
//         };
//       })
//     );

//     // Example: Filter out commits made at night (between 00:00 and 06:00)
//     // const nightTimeCommits = // ... similar filter as in the JavaScript version

//     res.status(200).json({
//       username,
//       repo_count: reposResponse.data.length,
//       repo_analysis: repoAnalysis,
//       // night_time_commits_count: nightTimeCommits.length
//     });
//   } catch (error) {
//     console.error('Error accessing the GitHub API:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/core';

// Assuming the GitHub Personal Access Token is stored in an environment variable
// const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  return new NextResponse(JSON.stringify({
    username,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // if (typeof username !== 'string') {
  //   return new NextResponse(JSON.stringify({ message: 'Username must be a string' }), {
  //     status: 400,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  // Fetch GitHub data using the username
  // try {
  //   // Example: Fetch user repositories
  //   // const reposResponse = await octokit.request('GET /users/{username}/repos', {
  //   //   username,
  //   // });

  //   // Process the data (e.g., repo analysis)
  //   // ...
    

  //   // Return the response
  //   // return new NextResponse(JSON.stringify({
  //   //   username,
  //   //   repo_count: reposResponse.data.length,
  //   //   // other data
  //   // }), {
  //   //   status: 200,
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   // });
  // } catch (error) {
  //   console.error('Error accessing the GitHub API:', error);
  //   return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
  //     status: 500,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }
}

import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  if (typeof username !== 'string') {
    return new NextResponse(JSON.stringify({ message: 'Username must be a string' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { januaryCommits, yearlyCommits } = await fetchCommitData(username);
    const averageMonthlyCommits = yearlyCommits / 12; 
    const threshold = averageMonthlyCommits / 2 // Adjust the threshold accordingly
    const isActive = januaryCommits >= threshold;

    return new NextResponse(JSON.stringify({
      totalJanuaryCommits: januaryCommits,
      threshold: threshold,
      isActive: isActive
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error accessing the GitHub API:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

async function fetchCommitData(username: string) {
  // calculates the start and end dates for january and the past year
  const currentYear = new Date().getFullYear();
  const janStart = new Date(currentYear, 0, 1).toISOString();
  const janEnd = new Date(currentYear, 1, 0).toISOString();
  const yearStart = new Date(currentYear - 1, 0, 1).toISOString();
  const yearEnd = new Date(currentYear, 0, 0).toISOString();

  // Fetch commits from January and the past yaer 
  const januaryCommits = await getCommitsCount(username, janStart, janEnd);
  const yearlyCommits = await getCommitsCount(username, yearStart, yearEnd);

  return { januaryCommits, yearlyCommits};
}

async function getCommitsCount(username: string, startDate: string, endDate: string) {
  // fetch commit data from github using Octokit
  // we need to handle pagination for accurate results
  const commitsResponse = await octokit.request('GET /search/commits', {
    q: `author:${username} committer-date:${startDate}..${endDate}`,
    sort: 'committer-date',
    order: 'asc',
    per_page: 100 //adjust as neccessary for pagination
  })

  return commitsResponse.data.total_count;
}

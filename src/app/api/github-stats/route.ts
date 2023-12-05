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
    const reposResponse = await octokit.request('GET /users/{username}/repos', {
      username,
    });

    return new NextResponse(JSON.stringify({
      username,
      repo_count: reposResponse.data.length,
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

import { NextRequest, NextResponse } from 'next/server';
import { graphql } from '@octokit/graphql';

// some encouraging messages with added humor
const slowStartMessages = [
  "Started the year on 'sleep mode', but then you hit 'Ctrl + Alt + Commit' – now you're on a coding spree!",
  "Started the year on 'Hello, World!' but soon went full 'git commit -m 'Unleash the Code!'' mode. That's some serious version control magic!",
  "You began the year on 'debug mode', but then switched to 'release mode' with style. Keep on compiling those wins!",
  "Early in the year: coffee loading... ☕ Later: code compiling like a pro. That's an impressive runtime upgrade!",
  "January's commits were like searching for a semicolon; by mid-year, you're coding like it's a hackathon finale. Epic comeback!",
  "Started with 'Ctrl+C', evolved to 'Ctrl+V', now you're all about 'Ctrl+S'. Saving the day, one commit at a time!",
  "First few months: coding at tortoise speed. Now? You're in the express lane on the JavaScript highway. Zooming past those bugs!"
];

const goodStartMessages = [
  "You hit the ground running like a well-optimized algorithm in January! Keep up that high-performance computing! 💻🚀",
  "Started the year with more commits than coffee breaks? Java-nice day! ☕👨‍💻",
  "Your early-year coding spree? Simply 'for' loop-tastic! Keep iterating through success! 🔄🌟",
  "Bug-free January? Looks like you’ve already debugged 2023! 🐞🎉",
  "Pushing more than a gym enthusiast, you've got your code repo in shape early! 🏋️‍♂️💾",
  "You've been committing like it's a hackathon every day! Let's keep this code party going! 🎉👩‍💻",
  "Array of hope! Your January contributions are like a perfectly indexed array, fast and efficient. Keep accessing those elements of success! 📈🤖"
]

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface GitHubUser {
  contributionsCollection: ContributionsCollection;
}

interface GraphQLResponse {
    user: GitHubUser;
}



// const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
// Initialize the GraphQL client with authentication
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

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
    const monthlyCommits = await fetchCommitData(username);
    const yearlyCommits = monthlyCommits.reduce((a, b) => a + b, 0);
    const averageMonthlyCommits = yearlyCommits / 12; 
    const threshold = averageMonthlyCommits / 2; 
    const isActiveStart = monthlyCommits[0] >= threshold;

    let encouragingMessage = '';
    if (!isActiveStart) {
      // Check for months with increased activity
      const activeMonths = monthlyCommits.map((commits, index) => commits > averageMonthlyCommits ? index : -1).filter(index => index > 0);
      if (activeMonths.length > 0) {
        // Construct a message based on active months
        encouragingMessage = slowStartMessages[Math.floor(Math.random() * slowStartMessages.length)];
      }
    } else {
      encouragingMessage = goodStartMessages[Math.floor(Math.random() * goodStartMessages.length)];
    }

    return new NextResponse(JSON.stringify({
      totalJanuaryCommits: monthlyCommits[0],
      threshold: threshold,
      isActiveStart: isActiveStart,
      encouragingMessage: encouragingMessage
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
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1).toISOString();
  const endDate = new Date(currentYear + 1, 0, 0).toISOString();

  // Define your GraphQL query here
  const query = `
        query($username:String!) { 
          user(login: $username){
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
  `;


  // Fetch data
  const result = await graphqlWithAuth(query, {
    username: username
  }) as GraphQLResponse;
  // console.log("GraphQL query result:", result);


  // Process the result to calculate monthly commits
  let monthlyCommits = processIntoMonthlyContributions(result);

  return monthlyCommits;
}

function processIntoMonthlyContributions(data: GraphQLResponse): number[] {
  const monthlyContributions = new Array(12).fill(0);

  console.log("total contribution: ", data.user.contributionsCollection.contributionCalendar.totalContributions)

  data.user.contributionsCollection.contributionCalendar.weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      const date = new Date(day.date);
      const month = date.getMonth(); // 0-11
      monthlyContributions[month] += day.contributionCount;
    });
  });

  console.log("let's see monthly contributions: ", monthlyContributions)

  return monthlyContributions;
}

function countNightTimeContributions(weeksData: ContributionCalendar["weeks"]): number {
  let nightTimeContributions = 0;
  weeksData.forEach(week => {
    week.contributionDays.forEach(day => {
      const contributionDate = new Date(day.date);
      const hour = contributionDate.getUTCHours();

      // Assuming night time is between 20:00 (8 PM) and 4:00 (4 AM) UTC
      if (hour >= 20 || hour < 4) {
        nightTimeContributions += day.contributionCount;
      }
    });
  });

  return nightTimeContributions;
}


// const result = await graphqlWithAuth(yourGraphQLQuery, {
//   username: "yourUsername"
// });

// const monthlyContributions = processIntoMonthlyContributions(result);

// github restful api implementation
// async function fetchCommitData(username: string) {
//   const currentYear = new Date().getFullYear();
//   const startOfYear = new Date(currentYear, 0, 1).toISOString();
//   const endOfYear = new Date(currentYear + 1, 0, 0).toISOString();

//   const yearlyCommitsData = await getCommitsCount(username, startOfYear, endOfYear);

//   // Process yearly data to calculate commits per month
//   let monthlyCommits = processYearlyDataIntoMonthly(yearlyCommitsData, currentYear);

//   return monthlyCommits;
// }

// async function getCommitsCount(username: string, startDate: string, endDate: string): Promise<any[]> {
//   // Fetch the commit data for the specified date range
//   // Handle pagination if necessary

//   const commitsResponse = await octokit.request('GET /search/commits', {
//     q: `author:${username} committer-date:${startDate}..${endDate}`,
//     sort: 'committer-date',
//     order: 'asc',
//     per_page: 100 // Adjust for pagination
//   });

//   return commitsResponse.data.items; // Access the items array
// }
import { NextRequest, NextResponse } from 'next/server';
import { graphql } from '@octokit/graphql';
import { ContributionCalendar, GraphQLResponse } from './types' 
import { slowStartMessages, goodStartMessages, codingAtNightMessages } from './messages'

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
    const result = await fetchCommitData(username);

    let monthlyCommits = processIntoMonthlyContributions(result);
    const yearlyCommits = monthlyCommits.reduce((a, b) => a + b, 0);
    const averageMonthlyCommits = yearlyCommits / 12; 
    const threshold = averageMonthlyCommits / 2; 
    const isActiveStart = monthlyCommits[0] >= threshold;

    let weeks = result.user.contributionsCollection.contributionCalendar.weeks
    let nightTimeContributions = countNightTimeContributions(weeks)


    let codingAtNightMessage = codingAtNightMessages[Math.floor(Math.random() * goodStartMessages.length)];
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
      encouragingMessage: encouragingMessage,
      nightTimeContributions: nightTimeContributions,
      codingAtNightMessage: codingAtNightMessage
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
  // console.log("GraphQL query result:", result.user.contributionsCollection.contributionCalendar.weeks.date);

  return result;
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
      console.log("date:", day);
      const hour = contributionDate.getUTCHours();

      // Assuming night time is between 20:00 (8 PM) and 4:00 (4 AM) UTC
      if (hour >= 20 || hour < 4) {
        nightTimeContributions += day.contributionCount;
      }
    });
  });

  return nightTimeContributions;
}
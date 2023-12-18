export interface ContributionDay {
    contributionCount: number;
    date: string;
  }
  
export interface ContributionWeek {
    contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

export interface ContributionsCollection {
    contributionCalendar: ContributionCalendar;
}

export interface GitHubUser {
    contributionsCollection: ContributionsCollection;
}

export interface GraphQLResponse {
    user: GitHubUser;
}
import { GetServerSideProps, NextPage } from 'next';

// Define the type for the props
interface GithubStatsPageProps {
  data: any; // Replace 'any' with a more specific type based on the data structure you expect
}

export const GithubStatsPage: NextPage<GithubStatsPageProps> = ({ data }) => {
  // Render your page with the fetched data
  return (
    <div>
      {/* Display your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  GithubStatsPageProps
> = async (context) => {
  const username = context.query.username;

  // Ensure username is a string
  if (typeof username !== 'string') {
    return { props: { data: null } };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/github-stats?username=${username}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Handle error appropriately
    return { props: { data: null } };
  }
};

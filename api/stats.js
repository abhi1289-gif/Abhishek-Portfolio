export default async function handler(req, res) {
  try {
    // -----------------------------
    // GitHub Stats
    // -----------------------------
    const githubResponse = await fetch(
      "https://api.github.com/users/abhi1289-gif/repos?per_page=100"
    );

    if (!githubResponse.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const repositories = await githubResponse.json();

    const githubRepos = repositories.length;

    const githubStars = repositories.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );

    // -----------------------------
    // LeetCode Stats
    // -----------------------------
    const leetcodeQuery = {
      query: `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            profile {
              ranking
            }

            badges {
              id
            }

            languageProblemCount {
              languageName
              problemsSolved
            }
          }
        }
      `,
      variables: {
        username: "Abhishek_12_89",
      },
    };

    const leetcodeResponse = await fetch(
      "https://leetcode.com/graphql/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com/",
        },
        body: JSON.stringify(leetcodeQuery),
      }
    );

    if (!leetcodeResponse.ok) {
      throw new Error("Failed to fetch LeetCode data");
    }

    const leetcodeData = await leetcodeResponse.json();

    const user = leetcodeData?.data?.matchedUser;

    if (!user) {
      throw new Error("LeetCode user not found");
    }

    // -----------------------------
    // Find C++ and Java counts
    // -----------------------------
    const languages = user.languageProblemCount || [];

    const cpp = languages.find(
      (lang) =>
        lang.languageName.toLowerCase() === "cpp" ||
        lang.languageName.toLowerCase() === "c++"
    );

    const java = languages.find(
      (lang) => lang.languageName.toLowerCase() === "java"
    );

    // -----------------------------
    // Send response
    // -----------------------------
    res.status(200).json({
      github: {
        repositories: githubRepos,
        stars: githubStars,
      },

      leetcode: {
        cpp: cpp?.problemsSolved || 0,
        java: java?.problemsSolved || 0,
        ranking: user.profile?.ranking || 0,
        badges: user.badges?.length || 0,
      },
    });
  } catch (error) {
    console.error("Stats API error:", error);

    // Fallback values
    res.status(200).json({
      github: {
        repositories: 8,
        stars: 7,
      },

      leetcode: {
        cpp: 417,
        java: 417,
        ranking: 76444,
        badges: 4,
      },

      fallback: true,
    });
  }
}
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // Fallback values
  let stats = {
    githubRepos: "8",
    githubStars: "7",
    leetcodeCpp: "417",
    leetcodeJava: "417",
    leetcodeRank: "76,444",
    leetcodeBadges: "4",
  };

  // -----------------------------
  // GitHub
  // -----------------------------
  try {
    const response = await fetch(
      "https://api.github.com/users/abhi1289-gif/repos?per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10",
        },
      }
    );

    if (response.ok) {
      const repos = await response.json();

      stats.githubRepos = String(repos.length);

      stats.githubStars = String(
        repos.reduce(
          (total, repo) => total + (repo.stargazers_count || 0),
          0
        )
      );
    } else {
      console.error("GitHub request failed:", response.status);
    }
  } catch (error) {
    console.error("GitHub error:", error);
  }

  // -----------------------------
  // LeetCode
  // -----------------------------
  try {
    const query = `
      query userStats($username: String!) {
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
    `;

    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        Referer: "https://leetcode.com/",
      },

      body: JSON.stringify({
        query,
        variables: {
          username: "Abhishek_12_89",
        },
      }),
    });

    if (response.ok) {
      const result = await response.json();

      const user = result?.data?.matchedUser;

      if (user) {
        const languages = user.languageProblemCount || [];

        const cpp = languages.find(
          (item) =>
            item.languageName?.toLowerCase() === "c++"
        );

        const java = languages.find(
          (item) =>
            item.languageName?.toLowerCase() === "java"
        );

        if (cpp) {
          stats.leetcodeCpp = String(cpp.problemsSolved);
        }

        if (java) {
          stats.leetcodeJava = String(java.problemsSolved);
        }

        if (user.profile?.ranking) {
          stats.leetcodeRank = Number(
            user.profile.ranking
          ).toLocaleString("en-IN");
        }

        if (user.badges) {
          stats.leetcodeBadges = String(
            user.badges.length
          );
        }
      } else {
        console.error("LeetCode user not found");
      }
    } else {
      console.error(
        "LeetCode request failed:",
        response.status
      );
    }
  } catch (error) {
    console.error("LeetCode error:", error);
  }

  // -----------------------------
  // Response
  // -----------------------------

  res.setHeader(
    "Cache-Control",
    "s-maxage=3600, stale-while-revalidate=86400"
  );

  return res.status(200).json({
    ...stats,
    updatedAt: new Date().toISOString(),
  });
}
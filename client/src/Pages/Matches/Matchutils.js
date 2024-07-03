
export const generateMatches = (teams) => {
    let matches = [];
    const interval = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
    let currentDate = new Date();

    const streamUrls = [
        "https://www.youtube.com/watch?v=TcAvKE-Je0U",
        "https://www.youtube.com/watch?v=v0jaK8eMjKE",
        "https://www.youtube.com/watch?v=A2KLpTEZlmw",
        "https://www.youtube.com/watch?v=i3D8v_F6MKE",
        "https://www.youtube.com/watch?v=K6oAptRWpA4",
        "https://www.youtube.com/watch?v=ocpaY9zgYpw"
    ];

    const getRandomStreamUrl = () => {
        return streamUrls[Math.floor(Math.random() * streamUrls.length)];
    };

    for (let i = 0; i < teams.length; i += 2) {
        if (i + 1 < teams.length) {
            currentDate = new Date(currentDate.getTime() + interval);
            const match = {
                team1: teams[i],
                team2: teams[i + 1],
                date: currentDate,
                streamUrl: getRandomStreamUrl()
            };
            matches.push(match);
        }
    }
    return matches;
};

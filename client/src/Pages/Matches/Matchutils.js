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

    // Create matches
    for (let i = 0; i < teams.length - (teams.length % 2); i += 2) {
        currentDate = new Date(currentDate.getTime() + interval);
        const match = {
            team1: teams[i].teamname,
            team2: teams[i + 1].teamname,
            team1Image: teams[i].teamImage, // Assuming teamImage is the property name
            team2Image: teams[i + 1].teamImage, // Assuming teamImage is the property name
            MatchDate: currentDate.toISOString().split('T')[0],
            Matchtime: currentDate.toTimeString().split(' ')[0],
            streamUrl: getRandomStreamUrl()
        };
        matches.push(match);
    }

    return matches;
};

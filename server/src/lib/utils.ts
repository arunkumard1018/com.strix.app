function formatUptime(uptime:number) {
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / 3600) % 24);
    const days = Math.floor(uptime / 86400); // 86400 seconds in a day

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
// Color word for Logger
const colorWord = (word: string, colorCode: string) => {
    const coloredWord = `\x1b[38;5;${colorCode}m${word}\x1b[0m`; // Use 256-color codes
    return coloredWord;
};

export { formatUptime, colorWord }
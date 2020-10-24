export default function getSeasons(episodes) {
   let seasons = [];
   episodes.forEach((episode) => {
      // get list of season numbers
      const seasonNumbers = seasons.map((season) => {
         return season.number;
      });
      // if episode season number is not in seasons create a new season
      if (!seasonNumbers.includes(episode.season)) {
         seasons = seasons.concat({
            number: episode.season,
            episodes: [episode],
            isOpen: false,
            airedAt: episode.airdate,
         });
      } else {
         // else concat the episode into its season
         const seasonIndex = seasons.findIndex((season) => {
            return season.number === episode.season;
         });
         const targetSeason = seasons[seasonIndex];
         const episodes = targetSeason.episodes.concat(episode);
         targetSeason.episodes = episodes;
      }
   });
   return seasons;
}

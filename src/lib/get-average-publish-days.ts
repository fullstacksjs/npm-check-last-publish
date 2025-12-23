export const getAveragePublishDays = (
  publishedTimes: Record<string, string>,
) => {
  const publishTimesList = Object.values(publishedTimes)
    .map((publishTime) => Temporal.Instant.from(publishTime))
    .sort((a, b) => a.epochMilliseconds - b.epochMilliseconds);

  if (publishTimesList.length < 2) return 0;

  const totalDaysBetweenReleases = publishTimesList
    .map((publishTime, index, publishTimesArray) => {
      const nextPublishTime = publishTimesArray[index + 1];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!nextPublishTime) return 0;

      const publishTimeDate = publishTime
        .toZonedDateTimeISO("UTC")
        .toPlainDate();

      const nextPublishTimeDate = nextPublishTime
        .toZonedDateTimeISO("UTC")
        .toPlainDate();

      return nextPublishTimeDate.since(publishTimeDate).days;
    })
    .reduce((sum, days) => sum + days, 0);

  return Math.round(totalDaysBetweenReleases / (publishTimesList.length - 1));
};

export const getAveragePublishDays = (
  publishedTimes: Record<string, string>,
) => {
  const publishTimesList = Object.values(publishedTimes);
  const totalPublishTimeDays = publishTimesList
    .map((publishTime) => new Date(publishTime))
    .sort((a, b) => {
      return a.getTime() - b.getTime();
    })
    .map((publishTime, index, publishTimesArray) => {
      let nextPublishTime = publishTimesArray[index + 1];
      if (!nextPublishTime) nextPublishTime = new Date();

      const nextPublishTimeDate = nextPublishTime
        .toTemporalInstant()
        .toZonedDateTimeISO("UTC")
        .toPlainDate();

      const publishTimeDate = publishTime
        .toTemporalInstant()
        .toZonedDateTimeISO("UTC");

      return nextPublishTimeDate.since(publishTimeDate).days;
    })
    .reduce((a, b) => a + b, 0);

  const days = Math.round(totalPublishTimeDays / publishTimesList.length);
  return days;
};

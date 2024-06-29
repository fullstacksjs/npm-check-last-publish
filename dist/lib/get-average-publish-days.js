import { differenceInDays } from "date-fns";
export const getAveragePublishDays = (publishedTimes) => {
    const publishTimesList = Object.values(publishedTimes);
    const totalPublishTimeDays = publishTimesList
        .map((publishTime) => new Date(publishTime))
        .sort((a, b) => {
        return a.getTime() - b.getTime();
    })
        .map((publishTime, index, publishTimesArray) => {
        let nextPublishTime = publishTimesArray[index + 1];
        if (!nextPublishTime)
            nextPublishTime = new Date();
        return differenceInDays(nextPublishTime, publishTime);
    })
        .reduce((a, b) => a + b, 0);
    const days = Math.round(totalPublishTimeDays / publishTimesList.length);
    return days;
};

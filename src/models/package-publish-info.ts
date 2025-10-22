export type PackagePublishInfo =
  | {
      tag: "Error";
      packageName: string;
      packageVersion: "0.0.0";
      packagePublishDate: null;
      publishedTimes: Record<string, never>;
    }
  | {
      tag: "OK";
      packageName: string;
      packageVersion: string;
      packagePublishDate: Date;
      publishedTimes: Record<string, string>;
    };

export const errorPackagePublishInfo = (name: string): PackagePublishInfo => {
  return {
    tag: "Error",
    packageName: name,
    packageVersion: "0.0.0",
    packagePublishDate: null,
    publishedTimes: {},
  };
};

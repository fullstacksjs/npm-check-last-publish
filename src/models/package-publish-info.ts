export type PackagePublishInfo =
  | {
      tag: "OK";
      packageName: string;
      packageVersion: string;
      packagePublishDate: Date;
      publishedTimes: Record<string, string>;
    }
  | {
      tag: "Error";
      packageName: string;
      packageVersion: "0.0.0";
      packagePublishDate: null;
      publishedTimes: Record<string, never>;
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

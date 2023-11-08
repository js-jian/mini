import cloud from "wx-server-sdk";

export function getCloud() {
  cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
  });

  return cloud;
}

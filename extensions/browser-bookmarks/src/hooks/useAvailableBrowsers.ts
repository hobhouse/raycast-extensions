import { getApplications } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

export const BROWSERS_BUNDLE_ID = {
  arc: "company.thebrowser.browser",
  brave: "com.brave.browser",
  braveBeta: "com.brave.browser.beta",
  chrome: "com.google.chrome",
  chromeDev: "com.google.chrome.dev",
  firefox: "org.mozilla.firefox",
  safari: "com.apple.safari",
  edge: "com.microsoft.edgemac",
  edgeDev: "com.microsoft.edgemac.dev",
  edgeCanary: "com.microsoft.edgemac.canary",
  vivaldi: "com.vivaldi.vivaldi",
};

export const availableBrowsers = Object.values(BROWSERS_BUNDLE_ID);

export default function useBrowsers() {
  return useCachedPromise(async () => {
    const apps = await getApplications();

    return (
      apps
        // The default macOS browser's bundle ID is lowercased, so let's lowercase all bundleIds
        .map((app) => ({ ...app, bundleId: app.bundleId?.toLowerCase() }))
        .filter((app) => availableBrowsers.includes(app.bundleId?.toLowerCase() as string))
    );
  });
}

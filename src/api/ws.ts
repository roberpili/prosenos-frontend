export function matchesSocketUrl(baseUrl?: string): string {
  if (baseUrl) {
    return `${baseUrl.replace(/^http/, "ws")}/ws/matches/live`;
  }

  if (typeof window !== "undefined") {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.host}/ws/matches/live`;
  }

  return "";
}

interface VitalBotMetric {
  id: string;
  href: string;
  event_name: string;
  value: number;
  speed: string;
}

interface NextJsMetric {
  id: string;
  name: string;
  value: number;
  label: string;
}

const DEFAULT_ENDPOINT = "/api";

// TODO: timreynolds add batching to make less requests
function sendWebVitals(metric: VitalBotMetric) {
  const body = JSON.stringify(metric);

  (navigator.sendBeacon &&
    navigator.sendBeacon(DEFAULT_ENDPOINT + "/wv", body)) ||
    fetch(DEFAULT_ENDPOINT, { body, method: "POST", keepalive: true });
}

export async function getPageWebVitals(href: string) {
  const result = await fetch(DEFAULT_ENDPOINT + `/page-vitals?href='${href}'`);

  if (result.ok) {
    const { data } = await result.json();
    return data;
  } else {
    return [];
  }
}

export function reportNextJsMetric(metric: NextJsMetric) {
  if (metric.label === "web-vital") {
    sendWebVitals({
      id: metric.id,
      // page: window.location.origin,
      href: window.location.href,
      event_name: metric.name,
      value: metric.value,
      speed: navigator.connection.effectiveType,
    });
  }
}

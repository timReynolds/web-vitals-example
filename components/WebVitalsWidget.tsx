import { useEffect, useState } from "react";
import { getPageWebVitals } from "../lib/analytics";

interface MetricProps {
  name: string;
  avg: number;
  min: number;
  max: number;
}

const millisecondToSecond = (ms: number) => (ms / 1000).toFixed(2);

const Metric = ({ name, avg, min, max }: MetricProps) => {
  return (
    <div className="px-4 py-5 sm:p-6">
      <dt className="text-base font-normal text-gray-900">{name}</dt>
      <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
          {millisecondToSecond(avg)}s
          <span className="ml-2 text-sm font-medium text-gray-500">
            min {millisecondToSecond(min)}s, max {millisecondToSecond(max)}s
          </span>
        </div>
      </dd>
    </div>
  );
};

export default function WebVitalsWidget() {
  const [vitalsData, setVitalsData] = useState<
    Array<{
      event_name: string;
      avg: number;
      min: number;
      max: number;
    }>
  >();

  const getData = async () => {
    // Deplay just to make it look like it was harder
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await getPageWebVitals(window.location.href);
    console.table(data);
    setVitalsData(data);
    return data;
  };

  useEffect(() => {
    getData();
  }, []);

  if (!vitalsData) {
    return null;
  }

  const ttfb = vitalsData.find((v) => v.event_name === "TTFB");
  const fcp = vitalsData.find((v) => v.event_name === "FCP");
  const lcp = vitalsData.find((v) => v.event_name === "LCP");

  return (
    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg md:grid-cols-3 md:divide-y-0 md:divide-x">
      <Metric name="Time to First Byte (avg)" {...ttfb} />
      <Metric name="First Contentful Paint (avg)" {...fcp} />
      <Metric name="Largest Contentful Paint (avg)" {...lcp} />
    </dl>
  );
}

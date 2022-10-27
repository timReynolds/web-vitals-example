# Web Vitals Example

This repo demonstrates using upstash and tinybird to store and display web vital information from Next.js. Each page will load vital information after a short delay. 

To replicate this setup you need Kafka setup in upstash used as an ingestion source in tinybird. Within tinybird you'd need a pipeline and api similar too;

```
<!-- Node -->
SELECT event_name, href, speed, value FROM kafka_ds_414321
<!-- transformation, published as an API -->
SELECT event_name, href, avg(value) as avg, max(value) as max, min(value) as min FROM web_vitals_values group by (event_name, href)
````

This code is a rough working example made in a few hours and ignores all error cases etc. 
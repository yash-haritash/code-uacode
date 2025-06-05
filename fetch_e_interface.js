import { promises as fs } from 'fs';
import fetch from 'node-fetch';

async function fetchData() {
  try {
    const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_interface/ua-workflows', {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'baggage': 'sentry-environment=production,sentry-release=a9655bb07e030a27ecee1c1cf266161c490e438d,sentry-public_key=fc6a14b17d93d742324c59402a2f5c57,sentry-trace_id=4a38c96c29ac2d466ed5e61a4eb94e13',
        'cookie': '_ga=GA1.1.811782646.1748517941; _fuid=NWJiNjY0ZjEtMTY2NS00ZjdmLWEyYTItNTk5NzRiYmU1ZmM0; _ga_H7XWQ9H9CX=GS2.1.s1748680700$o2$g0$t1748680815$j60$l0$h0; _at=46c51d96-d8b7-40bb-afe7-4dfcc189bdaf',
        'priority': 'u=1, i',
        'referer': 'https://a.qa.unifyapps.com/p/0/interfaces/ua-workflows/builder/ua-workflows-aggregated-insights?blockId=b_oHqrZ',
        'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': '4a38c96c29ac2d466ed5e61a4eb94e13-9f2e091094696302',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'x-ua-app': 'ua-workflows',
        'x-ua-timestamp': '2025-06-05T09:08:34.398Z',
        'x-ua-trace-id': 'c_0jd8ey2Vli_5-dsKWTAl2'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    await fs.writeFile('samples/e_interface.json', JSON.stringify(data, null, 2));
    console.log('Data successfully fetched and saved to samples/e_interface.json');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
}

fetchData();
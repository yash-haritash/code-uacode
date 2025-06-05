const fs = require('fs');

async function fetchEDataSource1() {
    try {
        const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_data_source', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'baggage': 'sentry-environment=production,sentry-release=a9655bb07e030a27ecee1c1cf266161c490e438d,sentry-public_key=fc6a14b17d93d742324c59402a2f5c57,sentry-trace_id=8d57cb9f13284f86a6ff5a2098b0bb5a',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'origin': 'https://a.qa.unifyapps.com',
                'pragma': 'no-cache',
                'priority': 'u=1, i',
                'referer': 'https://a.qa.unifyapps.com/p/0/interfaces/ua-workflows/builder/ua-workflows-aggregated-insights',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'sentry-trace': '8d57cb9f13284f86a6ff5a2098b0bb5a-9d49ec1ef41f6271',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'x-ua-app': 'ua-workflows',
                'x-ua-timestamp': '2025-06-05T09:08:53.808Z',
                'x-ua-trace-id': 'c_uYmkdQqM6DcctIfmhHth4',
                'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; hubspotutk=5433e97510d43910ae824829aea162b4; messagesUtk=0d2e032095754931afbac78474ddbd93; __hstc=9322474.5433e97510d43910ae824829aea162b4.1748570767698.1748570767698.1748574379856.2; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
            },
            body: JSON.stringify({
                filter: {
                    field: "properties.interfacePageId",
                    op: "EQUAL",
                    values: ["ua_workflows_aggregated_insights"]
                },
                page: {
                    limit: 100,
                    offset: 0
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error for first request! status: ${response.status}`);
        }

        const data = await response.json();
        fs.writeFileSync('e_data_source_1.json', JSON.stringify(data, null, 2));
        console.log('Data successfully written to e_data_source_1.json');
    } catch (error) {
        console.error('Error fetching or writing data for e_data_source_1.json:', error);
    }
}

async function fetchEDataSource2() {
    try {
        const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_data_source', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'baggage': 'sentry-environment=production,sentry-release=a9655bb07e030a27ecee1c1cf266161c490e438d,sentry-public_key=fc6a14b17d93d742324c59402a2f5c57,sentry-trace_id=82d8bc7f9afa401fa498db015487b185',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'origin': 'https://a.qa.unifyapps.com',
                'pragma': 'no-cache',
                'priority': 'u=1, i',
                'referer': 'https://a.qa.unifyapps.com/p/0/interfaces/ua-workflows/builder/ua-workflow-insights-Ig8Fm',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'sentry-trace': '82d8bc7f9afa401fa498db015487b185-a8160a4ee80233a0',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'x-ua-app': 'ua-workflows',
                'x-ua-timestamp': '2025-06-05T09:11:06.704Z',
                'x-ua-trace-id': 'c__S9K4fCdjdv-X447il89-',
                'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; hubspotutk=5433e97510d43910ae824829aea162b4; messagesUtk=0d2e032095754931afbac78474ddbd93; __hstc=9322474.5433e97510d43910ae824829aea162b4.1748570767698.1748570767698.1748574379856.2; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
            },
            body: JSON.stringify({
                filter: {
                    field: "properties.interfacePageId",
                    op: "EQUAL",
                    values: ["e_67b47f8ba2108f13598de162"]
                },
                page: {
                    limit: 100,
                    offset: 0
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error for second request! status: ${response.status}`);
        }

        const data = await response.json();
        fs.writeFileSync('e_data_source_2.json', JSON.stringify(data, null, 2));
        console.log('Data successfully written to e_data_source_2.json');
    } catch (error) {
        console.error('Error fetching or writing data for e_data_source_2.json:', error);
    }
}

async function fetchEDataSource3() {
    try {
        const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_data_source', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'baggage': 'sentry-environment=production,sentry-release=a9655bb07e030a27ecee1c1cf266161c490e438d,sentry-public_key=fc6a14b17d93d742324c59402a2f5c57,sentry-trace_id=914257e940944b05bca0996781b82e12',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'origin': 'https://a.qa.unifyapps.com',
                'pragma': 'no-cache',
                'priority': 'u=1, i',
                'referer': 'https://a.qa.unifyapps.com/p/0/interfaces/ua-workflows/builder/ua-workflow-insights',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'sentry-trace': '914257e940944b05bca0996781b82e12-bad09aac42d24829',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'x-ua-app': 'ua-workflows',
                'x-ua-timestamp': '2025-06-05T09:12:43.457Z',
                'x-ua-trace-id': 'c_ZuhAzjXzdGryLfS0YGPO1',
                'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; hubspotutk=5433e97510d43910ae824829aea162b4; messagesUtk=0d2e032095754931afbac78474ddbd93; __hstc=9322474.5433e97510d43910ae824829aea162b4.1748570767698.1748570767698.1748574379856.2; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
            },
            body: JSON.stringify({
                filter: {
                    field: "properties.interfacePageId",
                    op: "EQUAL",
                    values: ["ua_workflow_insights"]
                },
                page: {
                    limit: 100,
                    offset: 0
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error for third request! status: ${response.status}`);
        }

        const data = await response.json();
        fs.writeFileSync('e_data_source_3.json', JSON.stringify(data, null, 2));
        console.log('Data successfully written to e_data_source_3.json');
    } catch (error) {
        console.error('Error fetching or writing data for e_data_source_3.json:', error);
    }
}

async function main() {
    await fetchEDataSource1();
    await fetchEDataSource2();
    await fetchEDataSource3();
}

main();
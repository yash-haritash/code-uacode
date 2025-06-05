import { writeFileSync } from 'fs';

async function fetchEComponentData1() {
    try {
        const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_component', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'baggage': 'sentry-environment=production,sentry-release=a9655bb07e030a27ecee1c1cf266161c490e438d,sentry-public_key=fc6a14b17d93d742324c59402a2f5c57,sentry-trace_id=e0b0091f54befcc2cc148ef040aaafb0',
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
                'sentry-trace': 'e0b0091f54befcc2cc148ef040aaafb0-9f1fc2d0433bdf39',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'x-ua-app': 'ua-workflows',
                'x-ua-timestamp': '2025-06-05T09:00:17.807Z',
                'x-ua-trace-id': 'c_D-icfR9nQUY5G8hK6TR57',
                'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; hubspotutk=5433e97510d43910ae824829aea162b4; messagesUtk=0d2e032095754931afbac78474ddbd93; __hstc=9322474.5433e97510d43910ae824829aea162b4.1748570767698.1748570767698.1748574379856.2; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
            },
            body: JSON.stringify({
                filter: {
                    op: "AND",
                    values: [{
                        field: "properties.interfaceId",
                        op: "EQUAL",
                        values: ["ua-workflows"]
                    }]
                },
                sorts: [{
                    field: "properties.name",
                    order: "ASC"
                }],
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
        writeFileSync('e_component_1.json', JSON.stringify(data, null, 2));
        console.log('Data successfully written to e_component_1.json');
    } catch (error) {
        console.error('Error fetching or writing data for e_component_1.json:', error);
    }
}

async function fetchEComponentData2() {
    try {
        const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_component', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'baggage': 'sentry-environment=production,sentry-release=a9655bb07e030a27ecee1c1cf266161c490e438d,sentry-public_key=fc6a14b17d93d742324c59402a2f5c57,sentry-trace_id=d85518b6b98c4af69af9372a7c9b6512',
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
                'sentry-trace': 'd85518b6b98c4af69af9372a7c9b6512-ad1f802a81b54590',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'x-ua-app': 'ua-workflows',
                'x-ua-timestamp': '2025-06-05T09:03:20.728Z',
                'x-ua-trace-id': 'c_PmZ91t8udwYJ0kfg5pJpq',
                'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; hubspotutk=5433e97510d43910ae824829aea162b4; messagesUtk=0d2e032095754931afbac78474ddbd93; __hstc=9322474.5433e97510d43910ae824829aea162b4.1748570767698.1748570767698.1748574379856.2; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
            },
            body: JSON.stringify({
                filter: {
                    op: "AND",
                    values: [{
                        field: "properties.interfaceId",
                        op: "EQUAL",
                        values: ["ua-workflows"]
                    }, {
                        op: "OR",
                        values: [{
                            field: "properties.slug",
                            op: "EQUAL",
                            values: ["ua-workflow-insights-Ig8Fm"]
                        }, {
                            field: "id",
                            op: "EQUAL",
                            values: ["ua-workflow-insights-Ig8Fm"]
                        }]
                    }]
                },
                sorts: [{
                    field: "properties.name",
                    order: "ASC"
                }],
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
        writeFileSync('e_component_2.json', JSON.stringify(data, null, 2));
        console.log('Data successfully written to e_component_2.json');
    } catch (error) {
        console.error('Error fetching or writing data for e_component_2.json:', error);
    }
}

async function fetchEComponentData3() {
    try {
        const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_component', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'baggage': 'sentry-environment=production,sentry-release=a9655bb07e030a27ecee1c1cf266161c490e438d,sentry-public_key=fc6a14b17d93d742324c59402a2f5c57,sentry-trace_id=c6c359471a1842cbac720e1aeb65fc41',
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
                'sentry-trace': 'c6c359471a1842cbac720e1aeb65fc41-a676b3c409719a0d',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'x-ua-app': 'ua-workflows',
                'x-ua-timestamp': '2025-06-05T09:04:57.682Z',
                'x-ua-trace-id': 'c_xzQMBkVF7yFKajXrmtKzu',
                'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; hubspotutk=5433e97510d43910ae824829aea162b4; messagesUtk=0d2e032095754931afbac78474ddbd93; __hstc=9322474.5433e97510d43910ae824829aea162b4.1748570767698.1748570767698.1748574379856.2; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
            },
            body: JSON.stringify({
                filter: {
                    op: "AND",
                    values: [{
                        field: "properties.interfaceId",
                        op: "EQUAL",
                        values: ["ua-workflows"]
                    }, {
                        op: "OR",
                        values: [{
                            field: "properties.slug",
                            op: "EQUAL",
                            values: ["ua-workflow-insights"]
                        }, {
                            field: "id",
                            op: "EQUAL",
                            values: ["ua-workflow-insights"]
                        }]
                    }]
                },
                sorts: [{
                    field: "properties.name",
                    order: "ASC"
                }],
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
        writeFileSync('e_component_3.json', JSON.stringify(data, null, 2));
        console.log('Data successfully written to e_component_3.json');
    } catch (error) {
        console.error('Error fetching or writing data for e_component_3.json:', error);
    }
}

async function main() {
    await fetchEComponentData1();
    await fetchEComponentData2();
    await fetchEComponentData3();
}

main();
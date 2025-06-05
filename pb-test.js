import { promises as fs } from 'fs';
import fetch from 'node-fetch';

async function getHeaders() {
    const timestamp = new Date().toISOString();
    const traceId = `c_${Math.random().toString(36).substr(2, 16)}`;
    
    return {
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
        'sentry-trace': `${Math.random().toString(36).substr(2, 32)}-${Math.random().toString(36).substr(2, 16)}`,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'x-ua-app': 'ua-workflows',
        'x-ua-timestamp': timestamp,
        'x-ua-trace-id': traceId,
        'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
    };
}

async function fetchComponents() {
    try {
        const headers = await getHeaders();
        const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_component', {
            method: 'POST',
            headers,
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure samples directory exists
        await fs.mkdir('samples', { recursive: true });

        // Save individual components
        if (data.objects && Array.isArray(data.objects)) {
            for (let i = 0; i < data.objects.length; i++) {
                const component = data.objects[i];
                const fileName = `samples/sample_e_component${i + 1}.json`;
                await fs.writeFile(fileName, JSON.stringify(component, null, 2));
            }
        }

        // Save metadata
        const metadata = {
            timestamp: new Date().toISOString(),
            totalComponents: data.objects ? data.objects.length : 0,
            cursor: data.cursor || null
        };
        
        await fs.writeFile('samples/captured_components.json', JSON.stringify(metadata, null, 2));

    } catch (error) {
        throw error;
    }
}

fetchComponents()
    .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
    });
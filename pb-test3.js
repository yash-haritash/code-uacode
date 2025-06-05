import { promises as fs } from 'fs';
import fetch from 'node-fetch';

async function getHeaders(pageUrl, interfaceId) {
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
    'referer': pageUrl,
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sentry-trace': `${Math.random().toString(36).substr(2, 32)}-${Math.random().toString(36).substr(2, 16)}`,
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'x-ua-app': interfaceId,
    'x-ua-timestamp': timestamp,
    'x-ua-trace-id': traceId,
    'cookie': '_ga=GA1.1.1179696066.1748342482; _fuid=YzUwYzU1ZGEtNzdkNC00N2M2LWEyOGUtMDE0NTIwMDAwMWI3; _ga_H7XWQ9H9CX=GS2.1.s1748680193$o6$g0$t1748680193$j60$l0$h0; _at=ec6c537a-52c7-4223-a527-4d5c5f665fdf'
  };
}

function extractInterfaceId(pageUrl) {
  try {
    const pathSegments = new URL(pageUrl).pathname.split('/').filter(segment => segment);
    const interfacesIndex = pathSegments.indexOf('interfaces');
    if (interfacesIndex !== -1 && interfacesIndex + 1 < pathSegments.length) {
      return pathSegments[interfacesIndex + 1];
    }
    throw new Error('No interfaceId found in URL');
  } catch (error) {
    console.error(`Error extracting interfaceId from ${pageUrl}:`, error.message);
    throw error;
  }
}

async function fetchComponents(pageUrl) {
  let interfaceId;
  try {
    interfaceId = extractInterfaceId(pageUrl);
  } catch (error) {
    console.error('Failed to extract interfaceId, exiting.');
    process.exit(1);
  }

  try {
    const headers = await getHeaders(pageUrl, interfaceId);
    const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_component', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filter: {
          op: "AND",
          values: [{
            field: "properties.interfaceId",
            op: "EQUAL",
            values: [interfaceId]
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
      throw new Error(`HTTP error for ${interfaceId}! status: ${response.status}`);
    }

    const data = await response.json();
    await fs.mkdir('samples', { recursive: true });

    // Save components
    if (data.objects && Array.isArray(data.objects)) {
      const fileName = 'samples/sample_e_component.json';
      await fs.writeFile(fileName, JSON.stringify(data.objects, null, 2));
      console.log(`Saved ${data.objects.length} components for ${interfaceId} to ${fileName}`);
    }

    // Save metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      interfaceId,
      pageUrl,
      totalComponents: data.objects ? data.objects.length : 0,
      cursor: data.cursor || null
    };
    await fs.writeFile('samples/captured_components.json', JSON.stringify(metadata, null, 2));

    console.log(`Capture complete for ${interfaceId}: ${metadata.totalComponents} components`);
    return metadata;
  } catch (error) {
    console.error(`Error fetching components for ${interfaceId}:`, error.message);
    const metadata = {
      timestamp: new Date().toISOString(),
      interfaceId,
      pageUrl,
      totalComponents: 0,
      error: error.message
    };
    await fs.mkdir('samples', { recursive: true });
    await fs.writeFile('samples/captured_components.json', JSON.stringify(metadata, null, 2));
    process.exit(1);
  }
}

// Get URL from command-line argument
const pageUrl = process.argv[2];
if (!pageUrl) {
  console.error('Please provide a URL as a command-line argument (e.g., node script.js https://a.qa.unifyapps.com/p/0/interfaces/ua-workflows/...)');
  process.exit(1);
}

fetchComponents(pageUrl)
  .catch(error => {
    console.error('Fatal error:', error.message);
    process.exit(1);
  });
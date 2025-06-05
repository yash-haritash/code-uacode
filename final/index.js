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

async function fetchInterface(pageUrl, interfaceId) {
  try {
    const headers = await getHeaders(pageUrl, interfaceId);
    const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_interface', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filter: {
          field: "id",
          op: "EQUAL",
          values: [interfaceId]
        },
        page: {
          limit: 1,
          offset: 0
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error for e_interface! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.objects && Array.isArray(data.objects) && data.objects.length > 0) {
      return data.objects[0];
    } else {
      throw new Error(`No e_interface found for interfaceId: ${interfaceId}`);
    }
  } catch (error) {
    console.error(`Error fetching e_interface for ${interfaceId}:`, error.message);
    throw error;
  }
}

async function fetchComponents(pageUrl, interfaceId) {
  try {
    const headers = await getHeaders(pageUrl, interfaceId);
    let allComponents = [];
    let hasMorePages = true;
    let currentPage = 0;
    const pageSize = 100;

    while (hasMorePages) {
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
            limit: pageSize,
            offset: currentPage * pageSize
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error for e_component! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.objects && Array.isArray(data.objects)) {
        allComponents = allComponents.concat(data.objects);
      }

      hasMorePages = data.objects && data.objects.length === pageSize;
      currentPage++;
    }

    return allComponents;
  } catch (error) {
    console.error(`Error fetching components for ${interfaceId}:`, error.message);
    throw error;
  }
}

async function fetchDataSources(pageUrl, interfaceId, componentId) {
  try {
    const headers = await getHeaders(pageUrl, interfaceId);
    let allDataSources = [];
    let hasMorePages = true;
    let currentPage = 0;
    const pageSize = 100;

    while (hasMorePages) {
      const response = await fetch('https://a.qa.unifyapps.com/api/entity/e_data_source', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          filter: {
            field: "properties.interfacePageId",
            op: "EQUAL",
            values: [componentId]
          },
          sorts: [{
            field: "properties.name",
            order: "ASC"
          }],
          page: {
            limit: pageSize,
            offset: currentPage * pageSize
          }
        })
      });

      if (!response.ok) {
        let errorBody;
        try {
          errorBody = await response.text();
        } catch (e) {
          errorBody = 'No response body available';
        }
        throw new Error(`HTTP error for e_data_source! status: ${response.status}, body: ${errorBody}`);
      }

      const data = await response.json();
      if (data.objects && Array.isArray(data.objects)) {
        allDataSources = allDataSources.concat(data.objects);
      }

      hasMorePages = data.objects && data.objects.length === pageSize;
      currentPage++;
    }

    return allDataSources;
  } catch (error) {
    console.error(`Error fetching data sources for componentId ${componentId}:`, error.message);
    return []; // Return empty array on error to continue processing other components
  }
}

async function fetchAllAndMerge(pageUrl) {
  let interfaceId;
  try {
    interfaceId = extractInterfaceId(pageUrl);
  } catch (error) {
    console.error('Failed to extract interfaceId, exiting.');
    process.exit(1);
  }

  try {
    // Step 1: Fetch the e_interface
    console.log(`Fetching e_interface for ${interfaceId}...`);
    const eInterface = await fetchInterface(pageUrl, interfaceId);

    // Step 2: Fetch all components
    console.log(`Fetching components for ${interfaceId}...`);
    const components = await fetchComponents(pageUrl, interfaceId);
    await fs.mkdir('samples', { recursive: true });

    // Save components to ecomponents.json
    const componentsFile = 'samples/ecomponents.json';
    await fs.writeFile(componentsFile, JSON.stringify(components, null, 2));
    console.log(`Saved ${components.length} components to ${componentsFile}`);

    // Step 3: Extract component IDs and fetch data sources
    console.log('Fetching data sources for each component...');
    let allDataSources = [];
    for (const component of components) {
      const componentId = component.id;
      if (!componentId) {
        console.warn(`Component missing id, skipping:`, JSON.stringify(component, null, 2));
        continue;
      }
      console.log(`Fetching data sources for componentId: ${componentId}...`);
      const dataSources = await fetchDataSources(pageUrl, interfaceId, componentId);
      allDataSources = allDataSources.concat(dataSources);
    }

    // Save data sources to edatasource.json
    const dataSourcesFile = 'samples/edatasource.json';
    await fs.writeFile(dataSourcesFile, JSON.stringify(allDataSources, null, 2));
    console.log(`Saved ${allDataSources.length} data sources to ${dataSourcesFile}`);

    // Step 4: Create merge.json
    const mergedData = [
      eInterface,
      ...components,
      ...allDataSources
    ];
    const mergeFile = 'samples/merge.json';
    await fs.writeFile(mergeFile, JSON.stringify(mergedData, null, 2));
    console.log(`Saved merged data (1 interface, ${components.length} components, ${allDataSources.length} data sources) to ${mergeFile}`);

    // Step 5: Save metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      interfaceId,
      pageUrl,
      totalComponents: components.length,
      totalDataSources: allDataSources.length
    };
    await fs.writeFile('samples/captured_metadata.json', JSON.stringify(metadata, null, 2));
    console.log(`Capture complete for ${interfaceId}: ${metadata.totalComponents} components, ${metadata.totalDataSources} data sources`);
    return metadata;
  } catch (error) {
    console.error(`Error in fetchAllAndMerge:`, error.message);
    const metadata = {
      timestamp: new Date().toISOString(),
      interfaceId,
      pageUrl,
      totalComponents: 0,
      totalDataSources: 0,
      error: error.message
    };
    await fs.mkdir('samples', { recursive: true });
    await fs.writeFile('samples/captured_metadata.json', JSON.stringify(metadata, null, 2));
    process.exit(1);
  }
}

// Get URL from command-line argument
const pageUrl = process.argv[2];
if (!pageUrl) {
  console.error('Please provide a URL as a command-line argument (e.g., node script.js https://a.qa.unifyapps.com/p/0/interfaces/ua-workflows/...)');
  process.exit(1);
}

fetchAllAndMerge(pageUrl)
  .catch(error => {
    console.error('Fatal error:', error.message);
    process.exit(1);
  });
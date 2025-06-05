import { promises as fs } from 'fs';

// Function to read and parse a JSON file
async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading or parsing file ${filePath}:`, error.message);
        return null;
    }
}

// Function to merge data from all files
async function mergeData() {
    const mergedArray = [];

    // Step 1: Read e_interface.json (single object)
    const interfaceData = await readJsonFile('e_interface.json');
    if (interfaceData) {
        mergedArray.push(interfaceData);
    } else {
        console.warn('e_interface.json is empty or invalid, skipping...');
    }

    // Step 2: Read e_component_*.json files and extract objects array
    const componentFiles = ['e_component_1.json', 'e_component_2.json', 'e_component_3.json'];
    for (const file of componentFiles) {
        const componentData = await readJsonFile(file);
        if (componentData && Array.isArray(componentData.objects)) {
            mergedArray.push(...componentData.objects);
        } else {
            console.warn(`${file} does not contain a valid objects array, skipping...`);
        }
    }

    // Step 3: Read e_data_source_*.json files and extract objects array
    const dataSourceFiles = ['e_data_source_1.json', 'e_data_source_2.json', 'e_data_source_3.json'];
    for (const file of dataSourceFiles) {
        const dataSourceData = await readJsonFile(file);
        if (dataSourceData && Array.isArray(dataSourceData.objects)) {
            mergedArray.push(...dataSourceData.objects);
        } else {
            console.warn(`${file} does not contain a valid objects array, skipping...`);
        }
    }

    // Step 4: Log the merged array
    console.log('Merged Array:', mergedArray);
    console.log('Total items in merged array:', mergedArray.length);

    // Step 5: Write merged array to a file
    await fs.writeFile('merge.json', JSON.stringify(mergedArray, null, 2), 'utf8');
    console.log('Merged data written to merge.json');

    return mergedArray;
}

// Run the script
await mergeData();
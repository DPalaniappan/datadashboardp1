import fs from 'fs';
import axios from 'axios';

const API_KEY = '';
const API_URL = 'https://api.restcountries.com/countries/v5?limit=100';

async function downLoadData() {
    try{
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const data = response.data;
        fs.writeFileSync('src/countries.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

downLoadData();


interface QuranSearchResult {
  id: number;
  verse_number: number;
  chapter_id: number;
  text: string;
  verse_key: string;
  surah_name?: string;
}

interface QuranSearchResponse {
  verses?: QuranSearchResult[];
  ayahs?: QuranSearchResult[];
  results?: QuranSearchResult[];
  data?: QuranSearchResult[];
}

const QURAN_SEARCH_API_BASE = 'https://api-quran.com/api';

// Cache for search results
const searchCache = new Map<string, QuranSearchResult[]>();

export const searchQuranWords = async (searchText: string): Promise<QuranSearchResult[]> => {
  const cacheKey = `search-${searchText}`;
  
  // Return cached result if available
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }

  try {
    console.log(`Searching Quran for: "${searchText}"`);
    
    // Using the search API with Arabic text
    const response = await fetch(`${QURAN_SEARCH_API_BASE}?text=${encodeURIComponent(searchText)}&type=tafser1`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Islamic-App/1.0'
      },
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: QuranSearchResponse = await response.json();
    console.log('Search API response:', data);
    
    // Handle different response formats from the API
    let results: QuranSearchResult[] = [];
    
    if (data.verses && Array.isArray(data.verses)) {
      results = data.verses;
    } else if (data.ayahs && Array.isArray(data.ayahs)) {
      results = data.ayahs;
    } else if (data.results && Array.isArray(data.results)) {
      results = data.results;
    } else if (data.data && Array.isArray(data.data)) {
      results = data.data;
    } else if (Array.isArray(data)) {
      results = data;
    }
    
    // Cache the results
    searchCache.set(cacheKey, results);
    console.log(`Found ${results.length} search results for "${searchText}"`);
    
    return results;
  } catch (error) {
    console.error(`Error searching Quran for "${searchText}":`, error);
    
    // Return empty array on error
    return [];
  }
};

// Clear search cache function
export const clearSearchCache = () => {
  searchCache.clear();
};

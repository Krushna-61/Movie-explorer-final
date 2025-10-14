// src/lib/tmdb.ts

import axios from 'axios';

// --- OMDb Configuration (Temporary) ---
const OMDb_BASE_URL = 'https://www.omdbapi.com/';
// Access the public environment variable
const OMDb_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY; 

// --- Types (Using string ID for OMDb's IMDb IDs) ---
export interface Movie {
  id: string; // IMDb ID (e.g., 'tt12345')
  title: string;
  poster_path: string | null; 
  vote_average: number;
  release_date: string;
  overview: string;
}

// Helper to handle the common OMDb request logic
const omdbRequest = async (params: any) => {
    if (!OMDb_API_KEY) {
        console.error("OMDB_API_KEY is not set. Cannot fetch.");
        return { Response: "False", Error: "API Key Missing" };
    }

    try {
        const response = await axios.get(OMDb_BASE_URL, {
            params: {
                ...params,
                // OMDb uses 'apikey' as the key field
                apikey: OMDb_API_KEY, 
            },
        });
        return response.data;
    } catch (error) {
        console.error('OMDb API Request Error:', error);
        return { Response: "False", Error: "Network Error" };
    }
}

// --- 1. Fetch Movies (Search/Listing with Pagination) ---
export const fetchMovies = async (query?: string, page: number = 1): Promise<Movie[]> => {
    // Use a default query if none is provided, as OMDb lacks a 'popular' endpoint
    const searchQuery = query || 'popular'; 

    const data = await omdbRequest({ 
        s: searchQuery, 
        type: 'movie', 
        page: page 
    });

    // FIX 1: Check for explicit failure response from OMDb to stop pagination
    if (data.Response === "False") {
        return []; 
    }

    // Standard Success Check: Check for "True" response and existence of the Search array
    if (data.Response === "True" && data.Search) {
        return data.Search.map((m: any) => ({
            // *** OMDb to Movie Mapping ***
            id: m.imdbID, 
            title: m.Title,
            poster_path: m.Poster !== 'N/A' ? m.Poster : null,
            vote_average: 0, // OMDb search results lack this field
            release_date: m.Year, 
            overview: 'Fetch details to see the plot.', 
        }));
    }
    
    return [];
};


// --- 2. Fetch Movie Details ---
export const fetchMovieDetails = async (id: string): Promise<Movie | null> => {
    // OMDb detail endpoint uses 'i=' for IMDb ID
    const data = await omdbRequest({ 
        i: id, 
        plot: 'full' // Request the full plot for the overview/description
    });

    if (data.Response === "True") {
        return {
            // *** OMDb to Movie Mapping ***
            id: data.imdbID,
            title: data.Title,
            poster_path: data.Poster !== 'N/A' ? data.Poster : null,
            // OMDb returns 'imdbRating' as a string (e.g., "7.8")
            vote_average: parseFloat(data.imdbRating || '0') || 0, 
            release_date: data.Released, 
            overview: data.Plot, 
        };
    }
    return null;
};
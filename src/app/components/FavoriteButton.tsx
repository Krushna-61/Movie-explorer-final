// src/app/components/FavoriteButton.tsx
"use client";
import { useFavorites, FavoriteMovie } from '../../hooks/useFavorites';
import { Heart } from 'lucide-react'; // You may need to install lucide-react or use a simple button

interface FavoriteButtonProps {
    movie: FavoriteMovie;
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(movie.id);

    const handleClick = () => {
        toggleFavorite(movie);
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center px-6 py-3 rounded-full font-bold text-lg transition-colors duration-200 shadow-lg ${
                isFav
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
        >
            <Heart fill={isFav ? 'white' : 'none'} className="w-6 h-6 mr-2" />
            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
}
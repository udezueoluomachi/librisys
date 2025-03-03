"use client";
import React, { useState } from 'react';
import Header from '@/components/header';
import toast, { Toaster } from 'react-hot-toast';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searched, setSearched] = useState(false);
    const [searching, setSearching] = useState(false);

    const handleSearch = async () => {
        try {
            setSearching(true)
            const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}`);
            const data = await response.json();
            const books = data.docs.map(book => ({
                title: book.title,
                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                description: book.first_sentence ? book.first_sentence[0] : 'No description available',
                image: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null
            }));
            setSearchResults(books);
            toast("Success", {position : "top-center"})
        }
        catch(error ) {
           toast.error("Something went wrong", {position : "top-center"})
        }
        finally {
            setSearching(false)
            setSearched(true)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <Toaster />
            <div className="container mx-auto px-10 md:px-[140px] py-4">
                <div className="mb-4 flex flex-col sm:flex-row items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for books..."
                        className="w-full sm:w-3/4 p-2 border border-gray-300 rounded mb-2 sm:mb-0 sm:mr-2"
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        disabled={searching}
                    />
                    <button
                        onClick={handleSearch}
                        disabled={searching}
                        className="w-full sm:w-auto p-2 bg-primary text-white rounded text-center"
                    >
                        {searching ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg> : 
                        "Search"}
                    </button>
                </div>
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchResults.map((book, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow">
                                {book.image ? (
                                    <img src={book.image} alt={book.title} className="w-full h-48 object-cover mb-2" />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-2">
                                        {/* SVG for no book cover image */}
                                    </div>
                                )}
                                <h2 className="text-lg font-bold">{book.title}</h2>
                                <p className="text-sm text-gray-600">{book.author}</p>
                                <p className="text-sm text-gray-800">{book.description}</p>
                                <button className="mt-2 p-2 bg-secondary text-white rounded w-full">
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                ) : searched ? (
                    <div className="w-full h-64 bg-[url('/404.svg')] bg-center bg-contain bg-no-repeat">
                        {/* SVG for 404 no results found */}
                    </div>
                ) : (
                    <div className="w-full h-64 bg-[url('/search.svg')] bg-center bg-contain bg-no-repeat">
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
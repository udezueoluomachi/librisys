"use client";
import React, { useState } from 'react';
import Header from '@/components/header';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searched, setSearched] = useState(false);
    const [searching, setSearching] = useState(false);
    const [cart, setCart] = useState([]);

    const handleSearch = async () => {
        try {
            setSearching(true);
            const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}`);
            const data = await response.json();
            const books = data.docs.map(book => ({
                title: book.title,
                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                description: book.first_sentence ? book.first_sentence[0] : 'No description available',
                image: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null
            }));
            setSearchResults(books);
            toast("Success", { position: "top-center" });
        } catch (error) {
            toast.error("Something went wrong", { position: "top-center" });
        } finally {
            setSearching(false);
            setSearched(true);
        }
    };

    const addToCart = (book, quantity) => {
        setCart(prevCart => [...prevCart, { ...book, quantity }]);
        toast.success("Added to cart", { position: "top-center" });
    };

    const handleCheckout = () => {
        const doc = new jsPDF();
        let y = 10;
        doc.text("Receipt", 10, y);
        y += 10;
        cart.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.title} - ${item.quantity} pcs`, 10, y);
            y += 10;
        });
        doc.save("receipt.pdf");
        toast.success("Receipt generated", { position: "top-center" });
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
                        className="w-full sm:w-auto p-2 bg-primary text-white rounded text-center mb-2 sm:mb-0 sm:mr-2"
                    >
                        {searching ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg> :
                            "Search"}
                    </button>
                    {cart.length > 0 && (
                        <button
                            onClick={handleCheckout}
                            className="w-full sm:w-auto p-2 bg-secondary text-white rounded text-center"
                        >
                            Get reciept for {cart.length} items
                        </button>
                    )}
                </div>
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchResults.map((book, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow">
                                {book.image ? (
                                    <img src={book.image} alt={book.title} className="w-full h-48 object-cover mb-2" />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 bg-[url('/404.svg')] bg-center bg-contain bg-no-repeat flex items-center justify-center mb-2">
                                        {/* SVG for no book cover image */}
                                    </div>
                                )}
                                <h2 className="text-lg font-bold">{book.title}</h2>
                                <p className="text-sm text-gray-600">{book.author}</p>
                                <p className="text-sm text-gray-800">{book.description}</p>
                                <div className="flex items-center mt-2">
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue="1"
                                        className="w-16 p-2 border border-gray-300 rounded mr-2"
                                        id={`quantity-${index}`}
                                    />
                                    <button
                                        onClick={() => addToCart(book, document.getElementById(`quantity-${index}`).value)}
                                        className="p-2 bg-secondary text-white rounded"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
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
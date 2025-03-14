import React from 'react';
import { Button, Stack } from '@chakra-ui/react';
import './SearchPage.css';
import SearchResult from "../SingleListing/Listing";
import NavbarSearch from '../Navbar/SearchListingNav/NavbarSearch';
import Footer from '../Footer/Footer';
import { useSearch } from '../../SearchContext';

const SearchPage = () => {
    // Access the global state
    const { results } = useSearch();
    const data = useSearch();
    
    return (
        <div className="searchPage">
            <NavbarSearch />
            <div className="searchPage-info">
                <h1>{results?.length} Airbnb Luxe stays{` ${results.length>0 ? 'in ' + results[0]?.location : ''}`}</h1>
                <Stack direction='row' spacing={4} align='center' wrap='wrap'>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        Cancellation Flexibility
                    </Button>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        Type of place
                    </Button>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        Price
                    </Button>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        Rooms and beds
                    </Button>
                    <Button size="sm" colorScheme='teal' variant='outline' className='searchPageBtn'>
                        More Filters
                    </Button>
                </Stack>
            </div>

            <div className="searchPage-results">
                {/* Use the global results state */}
                {results && results.length > 0 ? (
                    results.map(result => {
                       
                       return  <SearchResult
                            id = {result._id}
                            key={result._id} // Make sure your result object has an id or unique key
                            image={result.images[0]}
                            location={result.location}
                            title={result.title}
                            description={result.description}
                            star={result.star}
                            price={result.price}
                            total={result.total}
                        />
})
                ) : (
                    <p>No results found.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchPage;

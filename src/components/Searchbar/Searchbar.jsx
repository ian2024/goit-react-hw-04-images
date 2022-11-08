import { useState } from "react";
import { HiOutlineSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleInput = e => {
        setSearchQuery(e.currentTarget.value.toLowerCase().trim());
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!searchQuery) {
            return;
        }
        onSubmit(searchQuery);
        setSearchQuery('');
    };

            return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="SearchForm-button"
                        aria-label="search"
                    >
                        <HiOutlineSearch style={{ width: 20, height: 20 }} />
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleInput}
                    />
                </form>
            </header>
        );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
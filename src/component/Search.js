import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = ({ setSearchText, setOrder, setOrientation, setPerPage }) => {
    const initialSearchList = localStorage.getItem('searchList')
        ? JSON.parse(localStorage.getItem('searchList'))
        : [];
    const [searchOption, setSearchOption] = useState(false);
    const [searchList, setSearchList] = useState(initialSearchList);
    const inputRef = useRef(null);

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const handleInput = (e) => {
        if (e.code === 'Enter') {
            const searchText = e.target.value;
            setSearchText(searchText);
            setSearchList((prev) => [...prev, searchText]);
            e.target.value = '';
        }
    };

    const handleClickSearchTag = (searchText) => {
        setSearchText(searchText);
        inputRef.current.value = searchText;
    };

    const removeSearchTag = (searchTag) => {
        const newSearchTags = [...searchList];
        newSearchTags.splice(newSearchTags.indexOf(searchTag), 1);
        setSearchList(newSearchTags);
    };

    useEffect(() => {
        localStorage.setItem('searchList', JSON.stringify(searchList));
    }, [searchList]);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        onKeyDown={(e) => handleInput(e)}
                        ref={inputRef}
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && (
                    <SearchOption
                        setOrder={setOrder}
                        setOrientation={setOrientation}
                        setPerPage={setPerPage}
                    />
                )}
            </SearchBoxContainer>
            <SearchTagContainer>
                {searchList.map((recentSearchText, idx) => (
                    <SearchTag
                        key={idx}
                        recentSearchText={recentSearchText}
                        handleClickSearchTag={handleClickSearchTag}
                        removeSearchTag={removeSearchTag}
                    />
                ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;

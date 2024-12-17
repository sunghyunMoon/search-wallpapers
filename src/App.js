import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import getWallPapers from './api/getWallPapers';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [order, setOrder] = useState('all');
    const [orientation, setOrientation] = useState('all');
    const [perPage, setPerPage] = useState(20);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const fetchData = await getWallPapers({
                q: searchText,
                order: order,
                orientation: orientation,
                per_page: perPage,
                page: page,
            });
            if (fetchData) setData(fetchData);
        };
        fetchData();
    }, [searchText, order, orientation, perPage, page]);
    return (
        <>
            <Container>
                <Hero
                    setSearchText={setSearchText}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                    setPerPage={setPerPage}
                />
                <ResultContainer
                    data={data}
                    page={page}
                    setPage={setPage}
                    perPage={perPage}
                />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;

import styled from 'styled-components';
import { useState } from 'react';
import DummyData from '../asset/dummyData';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({ data, page, setPage, perPage }) => {
    const [selectedImageData, setSelectedImageData] = useState(null);
    const numOfPages = Math.ceil(data.totalHits / perPage);

    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {/* <ImageModal /> */}
            {selectedImageData && (
                <ImageModal
                    largeImageURL={selectedImageData.largeImageURL}
                    tags={selectedImageData.tags}
                    likes={selectedImageData.likes}
                    views={selectedImageData.views}
                    setSelectedImageData={setSelectedImageData}
                />
            )}
            {data.hits?.length && (
                <Pagination
                    numOfPages={numOfPages}
                    page={page}
                    setPage={setPage}
                />
            )}
            <ResultsWrapper>
                {data.hits?.map((imgData) => (
                    <ImageCard
                        key={imgData.id}
                        imgData={imgData}
                        onClick={() => setSelectedImageData(imgData)}
                    />
                ))}
                {data.hits?.length === 0 && <EmptyResult />}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;

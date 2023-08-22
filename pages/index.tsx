import React, { useEffect, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import data from '../scripts/data.json';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const OpenStreetMap = dynamic(() => import('../components/OpenStreetMap'), {
  ssr: false,
});

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: '1',
      title: 'Prisma is the perfect ORM for Next.js',
      content: '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: false,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    },
  ];
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  const [loadMore, setLoadMore] = useState<number>(5);

  return (
    <Layout>
      {data.map((d) => (
        <>
          <h1> {d.area}</h1>
          <Grid>
            {d.events?.map((event) => (
              <>
                <p>{event.City}</p>
                <p>{event['LGBTQIA+ event']}</p>
                <OpenStreetMap location={event.Geocode as [number, number]} />
              </>
            ))}
          </Grid>
        </>
      ))}
    </Layout>
  );
};

export default Blog;

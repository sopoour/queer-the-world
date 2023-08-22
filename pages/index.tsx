import React, { useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import data from '../scripts/data.json';
import dynamic from 'next/dynamic';
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

  return (
    <Layout>
      <OpenStreetMap />
    </Layout>
  );
};

export default Blog;

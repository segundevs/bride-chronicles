import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import Card from "../components/Card";
import Header from "../components/Header";

export default function Home({ data }) {
  return (
    <div className="container">
      <Head>
        <title>Engaged Living</title>
        <meta name="description" content="The PRADA '22 love story" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="event_container">
        {data?.map((item) => (
          <React.Fragment key={item?.sys?.id}>
            <Card item={item} />
          </React.Fragment>
        ))}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "wedding" });

  return {
    props: {
      data: res?.items,
    },
  };
}

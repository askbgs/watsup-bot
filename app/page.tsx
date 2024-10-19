import Head from 'next/head';
import Layout from './layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>WhatsApp Bot</title>
        <meta name="description" content="WhatsApp Bot with Next.js and Twilio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the WhatsApp Bot
        </h1>
        <p className="text-xl">
          This bot is running and ready to respond to WhatsApp messages.
        </p>
      </main>
    </Layout>
  );
}
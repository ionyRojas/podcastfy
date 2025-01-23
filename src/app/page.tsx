import AudioFiles from "@/components/AudioFiles";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <main className="container px-12 py-8 w-full mx-auto">
      <h1 className="text-3xl font-bold">
        {user?.name} Welcome to our Podcastfy App
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        This is a simple podcast app that allows you to listen to your favorite
        podcasts. To start using it, please sign in.
      </p>
      {user && <AudioFiles />}
    </main>
  );
}

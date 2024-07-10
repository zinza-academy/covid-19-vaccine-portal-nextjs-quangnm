import Login from './login';

export default async function Home() {
  return (
    <main className="w-full h-screen grid md:grid-cols-2 place-items-center">
      <Login></Login>
    </main>
  );
}

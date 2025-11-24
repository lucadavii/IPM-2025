import Image from "next/image";

export default async function Home() {

  return (
    <>


    <div className="flex min-h-screen flex-col items-center justify-start bg-background px-6 py-24">
      
      <Image
        src="/favicon.ico"
        alt="Grow&Care Logo"
        width={150}
        height={150}
        className="mb-12"
      />
      <h1 className="scroll-m-20 text-center text-3xl lg:text-5xl font-extrabold tracking-tight text-balance">Welcome to Grow&amp;Care</h1>
      <p className="mt-6 text-center text-lg max-w-2xl text-muted-foreground">
        Welcome to grow and care - a warm and friendly space for families. Discover fun helpful, educational content created for children and parents
      </p>
      <p className="mt-4 text-center text-lg max-w-2xl text-muted-foreground">  
        Enjoy Play Mode for secure, playful learning.
      </p>
    </div>

    </>
  );
}


import Image from "next/image";

// Edit this list with your group members
const members = [
  { name: "Marta Negri", photo: "/developer.png", number: "75169" },
  { name: "Diana Tleuberlin", photo: "/developer.png", number: "75261" },
  { name: "Nina Lutz", photo: "/developer.png", number: "75245" },
  { name: "Luca Davì", photo: "/developer-2.png", number: "75214" },
];

export const metadata = {
  title: "About | Our Group",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Group 11</h1>
      <p className="mt-2 text-muted-foreground">Meet the team.</p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {members.map((m) => (
          <li key={m.name} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              <div>
                <div className="font-medium leading-none">{m.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{m.number}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
      <br />
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Project Report</h2>
      <Accordion type="single" collapsible className="w-full mt-8">
        <AccordionItem value="stage-1">
          <AccordionTrigger>1st Stage Report</AccordionTrigger>
          <AccordionContent>
            <div className="h-screen w-full flex justify-center items-center">
              <iframe
                src="/G_11_stage1.pdf"
                width="80%"
                height="90%"
                style={{ border: "none" }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stage-2">
          <AccordionTrigger>2nd Stage Report</AccordionTrigger>
          <AccordionContent>
            <div className="h-screen w-full flex justify-center items-center">
              <iframe
                src="/G_11_stage2.pdf"
                width="80%"
                height="90%"
                style={{ border: "none" }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stage-3">
          <AccordionTrigger>3rd Stage Report</AccordionTrigger>
          <AccordionContent>
            <div className="h-screen w-full flex justify-center items-center">
              <iframe
                src="/G_11_stage3.pdf"
                width="80%"
                height="90%"
                style={{ border: "none" }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <br />
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Individual Assignments</h2>
      <Accordion type="single" collapsible className="w-full mt-8">
        <AccordionItem value="assignment-luca">
          <AccordionTrigger>Luca Davì</AccordionTrigger>
          <AccordionContent>
            <div className="h-screen w-full flex justify-center items-center">
              <iframe
                src="/ass_Luca.pdf"
                width="80%"
                height="90%"
                style={{ border: "none" }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="assignment-marta">
          <AccordionTrigger>Marta Negri</AccordionTrigger>
          <AccordionContent>
            <div className="h-screen w-full flex justify-center items-center">
              <iframe
                src="/ass_Marta.pdf"
                width="80%"
                height="90%"
                style={{ border: "none" }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="assignment-nina">
          <AccordionTrigger>Nina Lutz</AccordionTrigger>
          <AccordionContent>
            <div className="h-screen w-full flex justify-center items-center">
              <iframe
                src="/ass_Nina.pdf"
                width="80%"
                height="90%"
                style={{ border: "none" }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="assignment-diana">
          <AccordionTrigger>Diana Tleuberlin</AccordionTrigger>
          <AccordionContent>
            <div className="h-screen w-full flex justify-center items-center">
              <iframe
                src="/ass_Diana.pdf"
                width="80%"
                height="90%"
                style={{ border: "none" }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
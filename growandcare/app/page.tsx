import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data,error } = await supabase.from('Test').select('*');
  if (error) {
    console.error("Error fetching members:", error);
    return <div>Error loading members</div>;
  }
  console.log(data);
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Button>Click me</Button>
    </div>
    <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-semibold">Group Members</h1>
        <ul className="mt-4 space-y-2">
          {data?.map(m => (
            <li key={m.id} className="border-b pb-1">
              {m.name}
            </li>
          ))}
        </ul>
      </main></>
  );
}

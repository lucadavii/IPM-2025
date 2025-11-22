import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// ----- Types -----

// Enumerated types for interests
export type ChildInterest =
  | "MUSIC"
  | "SPORTS"
  | "ART"
  | "ANIMALS"
  | "OUTDOORS"
  | "GAMES"
  | "BOOKS"
  | "SCIENCE";

export interface Child {
  id: string;
  name: string;
  age: number;
  interests: ChildInterest[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

// Label mapping for interests
const CHILD_INTEREST_LABELS: Record<ChildInterest, string> = {
  MUSIC: "Music",
  SPORTS: "Sports",
  ART: "Art & Crafts",
  ANIMALS: "Animals",
  OUTDOORS: "Outdoors",
  GAMES: "Games",
  BOOKS: "Books & Reading",
  SCIENCE: "Science & Experiments",
};

// ----- Mock data (replace with your Supabase data) -----

const mockUser: UserProfile = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Jane",
};

const mockChildren: Child[] = [
  {
    id: "1",
    name: "Alice",
    age: 7,
    interests: ["ART", "BOOKS", "ANIMALS"],
  },
  {
    id: "2",
    name: "Luca",
    age: 5,
    interests: ["GAMES", "OUTDOORS", "SCIENCE"],
  },
];

// ----- Components -----

function InterestsList({ interests }: { interests: ChildInterest[] }) {
  if (!interests.length) {
    return <p className="text-sm text-muted-foreground">No interests set yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((i) => (
        <Badge key={i} variant="secondary" className="text-xs">
          {CHILD_INTEREST_LABELS[i]}
        </Badge>
      ))}
    </div>
  );
}

function ChildrenAccordion({ childrenList }: { childrenList: Child[] }) {
  if (!childrenList.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No children added yet.
      </p>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {childrenList.map((child) => (
        <AccordionItem key={child.id} value={child.id}>
          <AccordionTrigger className="text-left">
            <div className="flex flex-col items-start">
              <span className="font-medium">{child.name}</span>
              <span className="text-xs text-muted-foreground">
                {child.age} years old
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Interests
                </p>
                <InterestsList interests={child.interests} />
              </div>
              {/* If you later add more fields (notes, goals, etc.), place them here */}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function ProfilePage() {
  const user = mockUser;
  const children = mockChildren;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
        {/* Profile card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : (
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {user.email}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        {/* Children section */}
        <Card>
          <CardHeader>
            <CardTitle>Children</CardTitle>
            <CardDescription>
              Expand each child to see their details and interests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChildrenAccordion childrenList={children} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

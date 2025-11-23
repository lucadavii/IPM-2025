import { Profile, Child } from "@/types/user"
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { UUID } from "crypto";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { fetchUserProfile, fetchUserChildrenWithCategoriesAndGoals } from "@/lib/profile-connector";

const fakeProfile: Profile = {
    id: "123e4567-e89b-12d3-a456-426614174000" as UUID,
    name: "John",
    surname: "Doe",
    img_url: "/developer.png",
};

const fakeChildren = [
    {
        id: "223e4567-e89b-12d3-a456-426614174001" as UUID,
        parent_id: fakeProfile.id,
        name: "Alice",
        birthday: "2018-05-20",
        goals: ["cacca", "pupu"],
        categories : ["coca" as UUID, "ina" as UUID],
    }, 
    {
        id: "323e4567-e89b-12d3-a456-426614174002" as UUID,
        parent_id: fakeProfile.id,
        name: "Bob",
        birthday: "2016-11-15",
        goals: ["coca", "fentanyl"],
        categories : ["caca" as UUID, "pupu" as UUID],
    }
];

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id ?? undefined;
  const profile = await fetchUserProfile();
  const children = await fetchUserChildrenWithCategoriesAndGoals();

  if (!profile) {
    return (
      <main>
        <div className="w-full mt-8">
          <p className="text-center text-lg">No profile data available.</p>
        </div>
      </main>
    );
  }

  return (
      <main>
        <div className="w-full  mt-8">
          <div className="mx-auto w-full px-8 flex items-center justify-center mt-12 border-2 p-6 rounded-lg border-gray-400">
              <div className="w-1/3 pr-4">
                    <Image
                        src={profile.img_url ?? "/developer.png"}
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>
                <div className="w-2/3">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {profile.name} {profile.surname}
                    </h1>
                </div>
                
            </div>
            <div className="w-full  mt-8"/>
            <div className="mx-auto  px-8  mt-12 ">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 text-center min-w-2/3">My Children</h2>
              
              {children.length > 0 ? children.map((child) => (
                <div key={child.id} className="mb-6 p-4 border border-gray-300 rounded-lg">
                  <h3 className="text-xl font-semibold">{child.name}</h3>
                  <p>Birthday: {child.birthday} ({ (new Date()).getFullYear() - (new Date(child.birthday)).getFullYear() } y.o.)</p>
                  <div className="mt-2">
                    <h4 className="font-semibold">Goals:</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {child.goals ? child.goals.map((goal, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800">
                          {goal.name}
                        </Badge>
                      )) : 
                      <div className="text-gray-500">No goals available.</div>
                      }
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">Interests:</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      { child.categories ? child.categories.map((category, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800">
                          {category.name}
                        </Badge>
                      )) : 
                      <div className="text-gray-500">No Interests available.</div>
                      }
                    </div>
                  </div>
                </div>
              )):
              <p className="text-center text-lg">No children data available.</p>
              }
            </div>
          </div>
        </main>
    );
}
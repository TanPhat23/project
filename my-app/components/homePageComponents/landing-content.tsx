"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Phat",
    avatar: "J",
    title: "Team Leader",
    description: "This is the best website I have created so far",
  },
  {
    name: "Luan",
    avatar: "A",
    title: "Team Member",
    description: "Hello",
  },
  {
    name: "Thong",
    avatar: "M",
    title: "Team Member",
    description: "Girl is temporary but coding is forever",
  },
  {
    name: "Trong",
    avatar: "M",
    title: "Team Member",
    description: "",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        The team members
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
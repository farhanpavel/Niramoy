"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

export default function Page() {
  const id = Cookies.get("id");
  const [user, setUser] = useState({
    title: "",
    description: "",

    userId: id || "abc",
  });

  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      alert("Please upload an image.");
      return;
    }

    formData.append("image", file);
    formData.append("title", user.title);
    formData.append("description", user.description);
    formData.append("userId", user.userId);
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:4000/api/blog`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to submit data");
      } else {
        setLoading(false);
        setTimeout(() => {
          router.back();
        }, 3000);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-tiro">
      <Card className="border-[1px] border-gray-300 w-[80%]">
        <CardHeader className="space-y-4">
          <CardTitle>ব্লগ পোস্ট</CardTitle>
          <CardDescription>ব্লগ তৈরি করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-6">
                <div className="space-y-2">
                  <div>
                    <Input type="file" name="image" className="w-1/4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs" htmlFor="name">
                      শিরোনাম
                    </Label>
                    <Input
                      id="title"
                      type="name"
                      className="w-1/2"
                      name="title"
                      onChange={handleChange}
                      placeholder="শিরোনাম লিখুন"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs" htmlFor="name">
                      বর্ণনা
                    </Label>
                    <Textarea
                      onChange={handleChange}
                      name="description"
                      placeholder="আপনার বার্তা এখানে লিখুন।"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-end mt-7">
              {isLoading ? (
                <Button
                  type="submit"
                  className=" bg-[#E81046] text-xs hover:bg-red-400 hover:transition-all hover:delay-100"
                  onClick={() => {}}
                >
                  জমা দিন
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled
                  className=" bg-[#E81046] hover:bg-red-400 hover:transition-all hover:delay-100"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

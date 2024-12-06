"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GrOverview } from "react-icons/gr";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaMicroblog } from "react-icons/fa";
import { MdOutlineForum } from "react-icons/md";
import Image from "next/image";

type NavItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
};

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/patientdashboard/overview",
    icon: <GrOverview />,
    label: "overview",
  },
  {
    title: "AI Talk",
    href: "/patientdashboard/aitalk",
    icon: <MdOutlinePhoneInTalk />,
    label: "aitalk",
  },
  {
    title: "Nutrion",
    href: "/patientdashboard/nutrion",
    icon: <IoFastFoodSharp />,
    label: "nutrion",
  },
  {
    title: "Exercise",
    href: "/patientdashboard/exercise",
    icon: <CgGym />,
    label: "exercise",
  },

  {
    title: "Blogs",
    href: "/patientdashboard/blogs",
    icon: <FaMicroblog />,
    label: "blogs",
  },
  {
    title: "forums",
    href: "/patientdashboard/forums",
    icon: <MdOutlineForum />,
    label: "forums",
  },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const path = usePathname(); // This will provide the current pathname
  const searchParams = useSearchParams();
  const tripPlanId = searchParams.get("tripPlanId");

  return (
    <div className="flex min-h-screen">
      <nav
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        className={`relative h-full bg-gray-200 pt-4 transition-all duration-300 rounded-l-lg ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full space-y-4 py-4 items-center">
          <Image src={"/images/logo.png"} width={100} height={100} alt="logo" />

          <nav className="grid items-start gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={
                  item.disabled
                    ? "/"
                    : `${item.href}${
                        tripPlanId ? `?tripPlanId=${tripPlanId}` : ""
                      }`
                }
                onClick={() => setIsSidebarOpen(false)}
                className={`group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  path === item.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                } ${item.disabled && "pointer-events-none opacity-60"}`}
              >
                {/* Icon with rounded background */}
                <div
                  className={`h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 ${
                    isSidebarOpen ? "mr-2" : ""
                  }`}
                >
                  {item.icon}
                </div>

                {/* Title (only when sidebar is open) */}
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-base font-semibold"
                  >
                    {item.title}
                  </motion.span>
                )}

                {/* Active Nav Item Highlight */}
                {path === item.href && (
                  <motion.div
                    className="absolute inset-0 z-[-1] rounded-md bg-accent"
                    layoutId="active-nav-item"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </nav>

      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          {/* {contentMap[path] ? "Trip Navigation" : "Page Not Found"} */}
        </h1>

        <div className="mt-6">
          {/* {contentMap[path] || (
            <div className="text-gray-700">
              Please select a valid navigation item.
            </div>
          )} */}
        </div>
      </main>
    </div>
  );
}

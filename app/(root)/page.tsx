"use client";

import React, { useEffect, useState } from "react";
import ChatItem from "@/components/ChatItem";
import DashBoardCard from "@/components/DashBoardCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewsPreviewCard from "@/components/NewsPreviewCard";
import EventsCalendar from "@/components/Calendar";
import MainLoader from "@/components/MainLoader"; // your loader component

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
};

const RootPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/updates");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Full-page loader overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "black",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MainLoader />
        </div>
      )}

      {/* Actual page content */}
      <div className="p-4 md:p-8 pt-0 md:pt-0 md:pl-25">
        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
          <DashBoardCard />
          <DashBoardCard />
          <DashBoardCard />
          <DashBoardCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {/* Chats */}
          <div className="flex flex-col p-4 dark:bg-[#2A2A2A] bg-[#E2E1DC] my-1 rounded-md mt-8 md:mt-4">
            <div className="flex justify-between items-center w-full px-2">
              <h1 className="text-2xl">Chats</h1>
              <Button variant={"gradientBtn"}>
                <Plus /> &nbsp; New Chat
              </Button>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1">
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
            </div>
          </div>

          {/* Projects */}
          <div className="flex flex-col p-4 dark:bg-[#2A2A2A] bg-[#E2E1DC] my-1 rounded-md mt-8 md:mt-4">
            <div className="flex justify-between items-center w-full px-2">
              <h1 className="text-2xl">Projects</h1>
              <Button variant={"gradientBtn"}>
                <Plus /> &nbsp; New Project
              </Button>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-2 pt-1 gap-y-1">
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
          <div className="md:col-span-1 dark:bg-[#2A2A2A] bg-[#E2E1DC] rounded-md mt-1">
            <div className="flex justify-between items-center w-full px-6 py-3">
              <h1 className="text-2xl">Calendar</h1>
              <Button variant={"gradientBtn"}>
                <Plus /> &nbsp; Add Event
              </Button>
            </div>
            <div className="p-1 pb-0">
              <EventsCalendar />
            </div>
          </div>

          <div className="md:col-span-3 dark:bg-[#2A2A2A] bg-[#E2E1DC] rounded-md mt-1">
            <div className="flex justify-between items-center w-full px-6 py-3">
              <h1 className="text-2xl">News Updates</h1>
              <Button variant={"gradientBtn"}>&nbsp; See More...</Button>
            </div>
            <div className="grid gap-2 px-4 md:grid-cols-3 grid-cols-1 py-2">
              {news.slice(0, 3).map((item, i) => (
                <NewsPreviewCard
                  key={i}
                  title={item.title}
                  content={item.content}
                  link={item.link}
                  date={item.pubDate}
                  source="NASA"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootPage;

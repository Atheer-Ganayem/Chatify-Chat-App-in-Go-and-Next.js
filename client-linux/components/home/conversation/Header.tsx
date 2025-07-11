"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useConversations } from "@/context/ConversationsContext";
import { useOnlineUsers } from "@/context/OnlineUsersContext";

const Header = () => {
  const ctx = useConversations();
  const online = useOnlineUsers().isOnline(
    ctx.currentConversation?.participant._id || ""
  );

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-sidebar">
      <SidebarTrigger className="-ml-1 bg-background" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      {ctx.currentConversation && (
        <div className="flex gap-5 items-center">
          <Avatar className="rounded-full">
            <AvatarImage
              src={`${process.env.AWS}${ctx.currentConversation.participant.avatar}`}
              alt={ctx.currentConversation.participant.name}
            />
            <AvatarFallback className="rounded-lg">
              {ctx.currentConversation.participant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <p>{ctx.currentConversation.participant.name}</p>
          <Badge
            variant={online ? 'default' : 'destructive'}
            className={online ? "bg-green-500" : undefined}
          >
            {online ? "Online" : "Offline"}
          </Badge>
        </div>
      )}
    </header>
  );
};

export default Header;

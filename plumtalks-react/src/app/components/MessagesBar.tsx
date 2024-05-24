import { CircularProgress, Divider, Typography } from "@mui/joy";
import LegendItem from "./LegendItem";
import ChatCard from "./ChatCard";
import { useContext, useEffect, useState } from "react";
import { AppBarContext, ContactContext } from "../page";
import useFetchProfiles from "../hooks/useFetchProfiles";
import ProfileCard from "./ProfileCard";
import useFetchRecentChats from "../hooks/useFetchRecentChats";

export default function MessagesBar() {
  const appBarContext = useContext(AppBarContext);
  const fetchProfiles = useFetchProfiles();
  const fetchRecentChats = useFetchRecentChats();

  return (
    <div className="messagesBar">
      {(() => {
        switch (appBarContext?.selectedAppBar) {
          case 1:
            return (
              <div>
                <div className="legendDiv">
                  <LegendItem name="Family" color="rgb(205, 10, 92)" />
                  <LegendItem name="Work" color="rgb(232, 171, 58)" />
                  <LegendItem name="Friends" color="rgb(82, 207, 177)" />
                </div>
                <Divider style={{ marginInline: "1vw", height: "0.15vh" }} />
                <div className="chatCardsDivParent">
                    {fetchRecentChats.isLoading ? (
                      <CircularProgress />
                    ): (
                      <div className="chatCardsDiv">
                        {fetchRecentChats.recentChats.map((rc) => (
                          <ChatCard 
                            title={rc.displayName}
                            message={rc.content}
                            timestamp={rc.timestamp}
                            legendBadgeColor="rgb(205, 10, 92)"
                            contactId={rc.otherUserId}
                            key={fetchRecentChats.recentChats.indexOf(rc)}
                          />
                        ))}
                      </div>
                    )}
                </div>
              </div>
            );
          case 2:
            return (
                <div>
                    <div className="legendDiv">
                        <Typography fontSize={"1vw"}>Profiles</Typography>
                    </div>
                    <Divider style={{ marginInline: "1vw", height: "0.15vh" }} />
                    <div className="chatCardsDivParent">
                        <div className="chatCardsDiv">
                            {fetchProfiles.profiles.map((pr) => (
                                <ProfileCard 
                                    profile={pr} 
                                    index={pr.userId} 
                                    key={"ProfileCardNo " + fetchProfiles.profiles.indexOf(pr)}    
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )
          default:
            return (
                <div>
                    {appBarContext?.selectedAppBar}
                </div>
            )
        }
      })()}
    </div>
  );
}

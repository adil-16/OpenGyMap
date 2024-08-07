const notifications = [
  
  {
    id: 1,
    type: "Join Session",
    profileImage: "/Request/profileimage.png",
    userName: "Jessica Kawai",
    courtName: "Basketball Court",
    date: "12 Jan 2022",
    time: "12:00 - 14:00",
    action: "wants to join the session",
    timeAgo: "2hr ago",
    actions: [
      {
        type: "Decline",
        style: "border-request-button-decline text-request-button-decline bg-request-button-decline",
      },
      {
        type: "Accept",
        style:
          "border-request-button-accepted text-request-button-accepted bg-request-button-accepted",
      },
    ],
  },
];

export default notifications;

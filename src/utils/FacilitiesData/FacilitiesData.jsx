const facilities = [
  {
    id: 1,
    courtName: "Court 1",
    gymName: "Basketball Gym 1",
    location: "Street 123, California, USA",
    description: "A spacious gym with modern equipment and facilities.",
    houseRules: "No food or drink allowed. Please clean up after use.",
    startingTime: "10:00 AM",
    closingTime: "10:00 PM",
    amountPerHour: "$60.20/hr",
    hours: "Monday - Friday 10:00 - 22:00",

    imageUrls: ["/Home/games.png"],
  },
  {
    id: 2,
    courtName: "Court 2",
    gymName: "Basketball Gym 2",
    location: "Street 124, California, USA",
    description: "A state-of-the-art gym with excellent facilities.",
    houseRules: "No smoking inside the gym. Use lockers for valuables.",
    startingTime: "09:00 AM",
    closingTime: "09:00 PM",
    amountPerHour: "$70.00/hr",
    hours: "Monday - Friday 10:00 - 22:00",

    imageUrls: ["/Home/profile.png", "/Home/games.png"], // Multiple images
  },
  {
    id: 3,
    courtName: "Court 3",
    gymName: "Basketball Gym 3",
    location: "Street 125, California, USA",
    description: "A well-maintained gym with a friendly environment.",
    houseRules: "Wear appropriate sports attire. No loud music.",
    startingTime: "11:00 AM",
    closingTime: "08:00 PM",
    amountPerHour: "$65.50/hr",
    imageUrls: ["/Home/games.png", "/Home/profile.png"], // Multiple images
    hours: "Monday - Friday 10:00 - 22:00",
  },
  {
    id: 4,
    courtName: "Court 4",
    gymName: "Basketball Gym 4",
    location: "Street 126, California, USA",
    description: "An advanced gym with professional-grade equipment.",
    houseRules: "Maintain hygiene and respect other users.",
    startingTime: "08:00 AM",
    closingTime: "11:00 PM",
    amountPerHour: "$75.00/hr",
    imageUrls: ["/Home/profile.png", "/Home/games.png"], // Multiple images
    hours: "Monday - Friday 10:00 - 22:00",
  },
];

export default facilities;

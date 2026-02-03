export const SPLITS = {
    strength: [
        {
            name: "Golden Era (Full Body)",
            desc: "High Frequency 3x/Week",
            schedule: [
                { day: "Day 1", focus: "Squat Focus", muscle: "legs" },
                { day: "Day 2", focus: "Bench Focus", muscle: "chest" },
                { day: "Day 3", focus: "Deadlift Focus", muscle: "back" }
            ]
        },
        {
            name: "Upper / Lower",
            desc: "Intermediate 4x/Week",
            schedule: [
                { day: "Mon", focus: "Upper Power", muscle: "chest" },
                { day: "Tue", focus: "Lower Power", muscle: "legs" },
                { day: "Thu", focus: "Upper Hypertrophy", muscle: "shoulders" },
                { day: "Fri", focus: "Lower Hypertrophy", muscle: "legs" }
            ]
        },
        {
            name: "Powerlifting Peaking",
            desc: "Deadlift Specialization",
            schedule: [
                { day: "Mon", focus: "Deadlift/Back", muscle: "back" },
                { day: "Wed", focus: "Overhead Press", muscle: "shoulders" },
                { day: "Fri", focus: "Squat/Legs", muscle: "legs" }
            ]
        },
        {
            name: "5/3/1 Boring But Big",
            desc: "Proven Strength 4x/Week",
            schedule: [
                { day: "Mon", focus: "OHP & Vol", muscle: "shoulders" },
                { day: "Tue", focus: "Deadlift & Vol", muscle: "back" },
                { day: "Thu", focus: "Bench & Vol", muscle: "chest" },
                { day: "Fri", focus: "Squat & Vol", muscle: "legs" }
            ]
        },
        {
            name: "Texas Method",
            desc: "Volume/Intensity 3x/Week",
            schedule: [
                { day: "Mon", focus: "Volume Day (5x5)", muscle: "legs" },
                { day: "Wed", focus: "Recovery Day", muscle: "shoulders" },
                { day: "Fri", focus: "Intensity Day (1RM)", muscle: "back" }
            ]
        }
    ],
    hypertrophy: [
        {
            name: "PPL (Push Pull Legs)",
            desc: "The Gold Standard",
            schedule: [
                { day: "Push", focus: "Chest/Shoulders/Tri", muscle: "chest" },
                { day: "Pull", focus: "Back/Biceps", muscle: "back" },
                { day: "Legs", focus: "Quads/Hams", muscle: "legs" }
            ]
        },
        {
            name: "Arnold Split",
            desc: "Antagonist Supersets",
            schedule: [
                { day: "Day 1", focus: "Chest & Back", muscle: "chest" },
                { day: "Day 2", focus: "Shoulders & Arms", muscle: "shoulders" },
                { day: "Day 3", focus: "Legs", muscle: "legs" }
            ]
        },
        {
            name: "Bro Split",
            desc: "Maximum Focus",
            schedule: [
                { day: "Mon", focus: "Chest Day", muscle: "chest" },
                { day: "Tue", focus: "Back Day", muscle: "back" },
                { day: "Wed", focus: "Leg Day", muscle: "legs" },
                { day: "Thu", focus: "Shoulders", muscle: "shoulders" },
                { day: "Fri", focus: "Arms", muscle: "arms" }
            ]
        },
        {
            name: "PHAT (Power Hypertrophy)",
            desc: "5-Day Hybrid Split",
            schedule: [
                { day: "Day 1", focus: "Upper Power", muscle: "chest" },
                { day: "Day 2", focus: "Lower Power", muscle: "legs" },
                { day: "Day 3", focus: "Back & Shoulders", muscle: "back" },
                { day: "Day 4", focus: "Lower Hypertrophy", muscle: "legs" },
                { day: "Day 5", focus: "Chest & Arms", muscle: "arms" }
            ]
        },
        {
            name: "Yates Blood & Guts",
            desc: "High Intensity 4-Day",
            schedule: [
                { day: "Day 1", focus: "Chest & Biceps", muscle: "chest" },
                { day: "Day 2", focus: "Back & Rear Delts", muscle: "back" },
                { day: "Day 3", focus: "Delts & Triceps", muscle: "shoulders" },
                { day: "Day 4", focus: "Legs", muscle: "legs" }
            ]
        }
    ]
};

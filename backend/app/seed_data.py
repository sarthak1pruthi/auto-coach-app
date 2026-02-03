EXERCISE_DATA = [
    # --- CHEST (Compounds) ---
    {"name": "Barbell Bench Press", "muscle": "chest", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Incline Barbell Press", "muscle": "chest", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Decline Barbell Press", "muscle": "chest", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Dumbbell Bench Press", "muscle": "chest", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Incline Dumbbell Press", "muscle": "chest", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Weighted Dips", "muscle": "chest", "type": "compound", "cat": "bodyweight", "fatigue": 8},
    {"name": "Machine Chest Press", "muscle": "chest", "type": "compound", "cat": "machine", "fatigue": 6},
    {"name": "Smith Machine Bench Press", "muscle": "chest", "type": "compound", "cat": "machine", "fatigue": 7},
    {"name": "Smith Machine Incline Press", "muscle": "chest", "type": "compound", "cat": "machine", "fatigue": 7},
    {"name": "Hammer Strength Chest Press", "muscle": "chest", "type": "compound", "cat": "machine", "fatigue": 6},
    
    # --- CHEST (Isolation) ---
    {"name": "Dumbbell Flys", "muscle": "chest", "type": "isolation", "cat": "free_weight", "fatigue": 4},
    {"name": "Cable Crossover (High)", "muscle": "chest", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Cable Crossover (Low)", "muscle": "chest", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Pec Deck (Machine Fly)", "muscle": "chest", "type": "isolation", "cat": "machine", "fatigue": 3},
    {"name": "Dumbbell Pullover", "muscle": "chest", "type": "isolation", "cat": "free_weight", "fatigue": 4},

    # --- BACK (Vertical Pull) ---
    {"name": "Pull Ups (Weighted)", "muscle": "back", "type": "compound", "cat": "bodyweight", "fatigue": 9},
    {"name": "Chin Ups", "muscle": "back", "type": "compound", "cat": "bodyweight", "fatigue": 8},
    {"name": "Lat Pulldown (Wide)", "muscle": "back", "type": "compound", "cat": "cable", "fatigue": 6},
    {"name": "Lat Pulldown (Neutral)", "muscle": "back", "type": "compound", "cat": "cable", "fatigue": 6},
    {"name": "Lat Pulldown (Reverse)", "muscle": "back", "type": "compound", "cat": "cable", "fatigue": 6},
    {"name": "Single Arm Lat Pulldown", "muscle": "back", "type": "compound", "cat": "machine", "fatigue": 5},

    # --- BACK (Horizontal Pull) ---
    {"name": "Barbell Bent Over Row", "muscle": "back", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Pendlay Row", "muscle": "back", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Single Arm Dumbbell Row", "muscle": "back", "type": "compound", "cat": "free_weight", "fatigue": 7},
    {"name": "Meadows Row", "muscle": "back", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Seated Cable Row", "muscle": "back", "type": "compound", "cat": "cable", "fatigue": 6},
    {"name": "Chest Supported Machine Row", "muscle": "back", "type": "compound", "cat": "machine", "fatigue": 6},
    {"name": "T-Bar Row", "muscle": "back", "type": "compound", "cat": "free_weight", "fatigue": 8},

    # --- BACK (Posterior Chain) ---
    {"name": "Barbell Deadlift", "muscle": "back", "type": "compound", "cat": "free_weight", "fatigue": 10},
    {"name": "Rack Pulls", "muscle": "back", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Straight Arm Lat Pulldown", "muscle": "back", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Face Pulls", "muscle": "back", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Rear Delt Fly (Machine)", "muscle": "back", "type": "isolation", "cat": "machine", "fatigue": 3},

    # --- LEGS (Quads) ---
    {"name": "Barbell Back Squat", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 10},
    {"name": "Front Squat", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Goblet Squat", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 6},
    {"name": "Leg Press", "muscle": "legs", "type": "compound", "cat": "machine", "fatigue": 8},
    {"name": "Hack Squat", "muscle": "legs", "type": "compound", "cat": "machine", "fatigue": 8},
    {"name": "Bulgarian Split Squat", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Walking Lunges", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Leg Extension", "muscle": "legs", "type": "isolation", "cat": "machine", "fatigue": 4},

    # --- LEGS (Hams/Glutes) ---
    {"name": "Romanian Deadlift (Barbell)", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Romanian Deadlift (Dumbbell)", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Seated Leg Curl", "muscle": "legs", "type": "isolation", "cat": "machine", "fatigue": 4},
    {"name": "Lying Leg Curl", "muscle": "legs", "type": "isolation", "cat": "machine", "fatigue": 4},
    {"name": "Hip Thrust", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Glute Kickback (Cable)", "muscle": "legs", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Standing Calf Raise", "muscle": "legs", "type": "isolation", "cat": "machine", "fatigue": 3},
    {"name": "Seated Calf Raise", "muscle": "legs", "type": "isolation", "cat": "machine", "fatigue": 2},

    # --- SHOULDERS ---
    {"name": "Overhead Press (Barbell)", "muscle": "shoulders", "type": "compound", "cat": "free_weight", "fatigue": 9},
    {"name": "Seated Dumbbell Press", "muscle": "shoulders", "type": "compound", "cat": "free_weight", "fatigue": 7},
    {"name": "Arnold Press", "muscle": "shoulders", "type": "compound", "cat": "free_weight", "fatigue": 7},
    {"name": "Machine Shoulder Press", "muscle": "shoulders", "type": "compound", "cat": "machine", "fatigue": 6},
    {"name": "Lateral Raises (DB)", "muscle": "shoulders", "type": "isolation", "cat": "free_weight", "fatigue": 3},
    {"name": "Egyptian Cable Lateral Raise", "muscle": "shoulders", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Machine Lateral Raise", "muscle": "shoulders", "type": "isolation", "cat": "machine", "fatigue": 3},
    {"name": "Front Raise (Cable/DB)", "muscle": "shoulders", "type": "isolation", "cat": "free_weight", "fatigue": 3},
    {"name": "Upright Row", "muscle": "shoulders", "type": "compound", "cat": "free_weight", "fatigue": 5},

    # --- ARMS (Biceps) ---
    {"name": "Barbell Bicep Curl", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 4},
    {"name": "EZ Bar Curl", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 4},
    {"name": "Hammer Curls", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 3},
    {"name": "Incline DB Curl", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 4},
    {"name": "Preacher Curl (Machine)", "muscle": "arms", "type": "isolation", "cat": "machine", "fatigue": 3},
    {"name": "Cable Bicep Curl", "muscle": "arms", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Bayesian Curl (Cable)", "muscle": "arms", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Concentration Curl", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 3},

    # --- ARMS (Triceps) ---
    {"name": "Skullcrushers", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 5},
    {"name": "Close-Grip Bench Press", "muscle": "arms", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Tricep Pushdown (Rope)", "muscle": "arms", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Tricep Pushdown (Straight Bar)", "muscle": "arms", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Overhead Cable Extension", "muscle": "arms", "type": "isolation", "cat": "cable", "fatigue": 3},
    {"name": "Dumbbell Overhead Extension", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 4},
    {"name": "Tricep Kickback", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 3},
    {"name": "JM Press", "muscle": "arms", "type": "compound", "cat": "free_weight", "fatigue": 6},
    {"name": "Dip Machine", "muscle": "arms", "type": "compound", "cat": "machine", "fatigue": 5},

    # --- FOREARMS/ABS/OTHER ---
    {"name": "Wrist Curls", "muscle": "arms", "type": "isolation", "cat": "free_weight", "fatigue": 2},
    {"name": "Hammer Strength Row (High)", "muscle": "back", "type": "compound", "cat": "machine", "fatigue": 7},
    {"name": "Assisted Pull Up", "muscle": "back", "type": "compound", "cat": "machine", "fatigue": 6},
    {"name": "Hyperextensions", "muscle": "back", "type": "isolation", "cat": "bodyweight", "fatigue": 4},
    {"name": "Good Mornings", "muscle": "legs", "type": "compound", "cat": "free_weight", "fatigue": 8},
    {"name": "Sissy Squat", "muscle": "legs", "type": "isolation", "cat": "bodyweight", "fatigue": 5},
    {"name": "Belt Squat", "muscle": "legs", "type": "compound", "cat": "machine", "fatigue": 8},
    {"name": "Landmine Press", "muscle": "shoulders", "type": "compound", "cat": "free_weight", "fatigue": 6},
    {"name": "Cable Rear Delt Fly", "muscle": "shoulders", "type": "isolation", "cat": "cable", "fatigue": 3},
]

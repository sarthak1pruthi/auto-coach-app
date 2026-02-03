import math

class CoachBrain:
    
    @staticmethod
    def calculate_1rm(weight, reps):
        """Epley Formula to estimate 1 Rep Max"""
        if reps == 0 or weight == 0: return 0
        return int(weight * (1 + reps / 30))

    @staticmethod
    def suggest_progression(history_logs):
        """
        Analyzes past performance to suggest next move.
        Returns a string advice.
        """
        if not history_logs:
            return "New movement! Find a weight that allows 8-12 clean reps."
        
        last_log = history_logs[0] # Assuming sorted DESC
        
        # Simple Linear Progression Logic
        if last_log.reps >= 12:
            return f"Crushed it! Increase weight by 5-10 lbs."
        elif last_log.reps >= 8:
            return f"Good volume. Try to add 2.5-5 lbs or 1 more rep."
        elif last_log.reps < 6:
             return "Strength focus. Keep weight or deload if form breakdown."
        
        return "Maintain weight. Focus on perfect technique."

    @staticmethod
    def detect_plateau(history_logs):
        """
        Input: List of log objects from DB
        Returns: 'stalled', 'progressive', or 'new'
        """
        if not history_logs or len(history_logs) < 3:
            return "new"
        
        # Calculate 1RM for the last 3 sessions
        rms = [CoachBrain.calculate_1rm(log.weight, log.reps) for log in history_logs[:3]]
        
        # Check if 1RM has improved by less than 1% over 3 sessions
        if len(rms) < 3 or rms[-1] == 0: return "new"
        
        oldest_rm = rms[-1]
        newest_rm = rms[0]
        
        improvement = (newest_rm - oldest_rm) / oldest_rm

        if improvement < 0.01: # Less than 1% gain
            return "stalled"
        return "progressive"

    @staticmethod
    def get_warmups(target_weight):
        """Generates plate loading strategy"""
        def round5(n): return 5 * round(n/5)
        
        if target_weight < 45: return []
        
        return [
            {"weight": 45, "reps": 10, "label": "Empty Bar"},
            {"weight": round5(target_weight * 0.5), "reps": 8, "label": "Warmup"},
            {"weight": round5(target_weight * 0.7), "reps": 4, "label": "Warmup"},
            {"weight": round5(target_weight * 0.9), "reps": 1, "label": "Primer"}
        ]

    @staticmethod
    def check_volume_governor(weekly_sets, muscle):
        """Checks if user is overtraining"""
        caps = {"chest": 20, "legs": 20, "back": 25, "shoulders": 16, "arms": 15}
        limit = caps.get(muscle, 15)
        
        if weekly_sets >= limit:
            return "LOCKED"
        elif weekly_sets >= limit - 4:
            return "WARNING"
        return "GO"
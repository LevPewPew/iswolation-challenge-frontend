export const validation = {
  MIN_GROUP_NAME_CHARS: 1, // no blank names
  MAX_GROUP_NAME_CHARS: 20, // 20 chosen to make frontend display logic easier
  MIN_PLAYERS_CHARS: 1, // no blank names
  MAX_PLAYERS_CHARS: 9, // 9 chosen to make frontend display logic easier
  MIN_PLAYERS_LENGTH: 1, // less than 1 player is pointless
  MAX_PLAYERS_LENGTH: 100, // 100, UX design decision
  MIN_EXERCISE_NAME_CHARS: 1, // no blank names
  MAX_EXERCISE_NAME_CHARS: 18,  // 18 chosen to make frontend display logic easier
  MIN_EXERCISES_LENGTH: 1, // less than 1 exercise is pointless
  MAX_EXERCISES_LENGTH: 10,  // 10, UX design decision
  MIN_REPS_COUNT: 1, // less than 1 rep is pointless
  MAX_REPS_COUNT: 999 // 999 chosen to make frontend display logic easier, and also to prevent people from killing themselves reaching crazy reps
};

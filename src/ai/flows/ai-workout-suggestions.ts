'use server';

/**
 * @fileOverview An AI-powered workout suggestion flow.
 *
 * - aiWorkoutSuggestions - A function that provides workout suggestions based on user fitness goals and progress.
 * - AIWorkoutSuggestionsInput - The input type for the aiWorkoutSuggestions function.
 * - AIWorkoutSuggestionsOutput - The return type for the aiWorkoutSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIWorkoutSuggestionsInputSchema = z.object({
  fitnessGoals: z
    .string()
    .describe('The fitness goals of the user, e.g., lose weight, build muscle, improve endurance.'),
  currentProgress: z
    .string()
    .describe('The current progress of the user, e.g., weight lifted, exercises completed, duration of workouts.'),
  workoutHistory: z
    .string()
    .optional()
    .describe('Optional: A description of the user prior workout history.'),
});
export type AIWorkoutSuggestionsInput = z.infer<typeof AIWorkoutSuggestionsInputSchema>;

const AIWorkoutSuggestionsOutputSchema = z.object({
  workoutSuggestions: z
    .string()
    .describe('A list of workout suggestions tailored to the user fitness goals and progress.'),
});
export type AIWorkoutSuggestionsOutput = z.infer<typeof AIWorkoutSuggestionsOutputSchema>;

export async function aiWorkoutSuggestions(
  input: AIWorkoutSuggestionsInput
): Promise<AIWorkoutSuggestionsOutput> {
  return aiWorkoutSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiWorkoutSuggestionsPrompt',
  input: {schema: AIWorkoutSuggestionsInputSchema},
  output: {schema: AIWorkoutSuggestionsOutputSchema},
  prompt: `You are a personal trainer providing workout suggestions to users based on their fitness goals and current progress.

  Fitness Goals: {{{fitnessGoals}}}
  Current Progress: {{{currentProgress}}}
  Workout History: {{{workoutHistory}}}

  Based on the information above, suggest a workout plan. The plan should be tailored to help the user achieve their fitness goals and take into account their current progress. The workout plan should include specific exercises, sets, reps and duration.
  Workout Suggestions:`, // Keep as one line, as handlebar code will insert newlines.
});

const aiWorkoutSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiWorkoutSuggestionsFlow',
    inputSchema: AIWorkoutSuggestionsInputSchema,
    outputSchema: AIWorkoutSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

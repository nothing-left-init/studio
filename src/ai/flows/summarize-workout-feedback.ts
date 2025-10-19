'use server';

/**
 * @fileOverview A flow to summarize user feedback on workout plans.
 *
 * - summarizeWorkoutFeedback - A function that summarizes workout feedback.
 * - SummarizeWorkoutFeedbackInput - The input type for the summarizeWorkoutFeedback function.
 * - SummarizeWorkoutFeedbackOutput - The return type for the summarizeWorkoutFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeWorkoutFeedbackInputSchema = z.object({
  feedback: z
    .string()
    .describe('The user feedback on the workout plan.'),
  workoutPlan: z.string().describe('The workout plan being reviewed.'),
});
export type SummarizeWorkoutFeedbackInput = z.infer<
  typeof SummarizeWorkoutFeedbackInputSchema
>;

const SummarizeWorkoutFeedbackOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the user feedback, highlighting key areas for improvement.'
    ),
});
export type SummarizeWorkoutFeedbackOutput = z.infer<
  typeof SummarizeWorkoutFeedbackOutputSchema
>;

export async function summarizeWorkoutFeedback(
  input: SummarizeWorkoutFeedbackInput
): Promise<SummarizeWorkoutFeedbackOutput> {
  return summarizeWorkoutFeedbackFlow(input);
}

const summarizeWorkoutFeedbackPrompt = ai.definePrompt({
  name: 'summarizeWorkoutFeedbackPrompt',
  input: {schema: SummarizeWorkoutFeedbackInputSchema},
  output: {schema: SummarizeWorkoutFeedbackOutputSchema},
  prompt: `You are an AI assistant helping a personal trainer summarize user feedback on a workout plan.

  Workout Plan:
  {{workoutPlan}}

  User Feedback:
  {{feedback}}

  Provide a concise summary of the feedback, highlighting key areas for improvement.  Focus on actionable insights the trainer can use to improve the workout plan.
  Summary:
  `,
});

const summarizeWorkoutFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeWorkoutFeedbackFlow',
    inputSchema: SummarizeWorkoutFeedbackInputSchema,
    outputSchema: SummarizeWorkoutFeedbackOutputSchema,
  },
  async input => {
    const {output} = await summarizeWorkoutFeedbackPrompt(input);
    return output!;
  }
);

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { aiWorkoutSuggestions } from '@/ai/flows/ai-workout-suggestions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fitnessGoals: z.string().min(5, 'Please describe your goals in more detail.'),
  currentProgress: z.string().min(5, 'Please describe your progress in more detail.'),
});

export function AiWorkoutSuggestions() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessGoals: '',
      currentProgress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuggestion('');
    try {
      const result = await aiWorkoutSuggestions(values);
      setSuggestion(result.workoutSuggestions);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to get AI suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          AI Workout Suggestion
        </CardTitle>
        <CardDescription>Get a custom workout plan from our AI.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="fitnessGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fitness Goals</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Lose 10kg, run a 5k" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentProgress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Fitness Level</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Beginner, can run 1km" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Generating...' : 'Get Suggestion'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {suggestion && (
        <>
          <CardHeader>
             <CardTitle className="text-lg">Your AI-Generated Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-muted p-4">
              {suggestion}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}

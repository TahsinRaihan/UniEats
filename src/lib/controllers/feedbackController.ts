
import * as feedbackService from '../services/feedbackService';

export async function submitFeedback(content: string, userId?: string) {
  const { error } = await feedbackService.submitFeedback(content, userId);
  return { error };
}

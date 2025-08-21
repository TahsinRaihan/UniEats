
import * as feedbackRepository from '../repositories/feedbackRepository';
import { supabase } from '$lib/supabase'; // Assuming supabaseClient is needed for auth

export async function submitFeedback(content: string, userId?: string) {
  let user_id_to_use: string | undefined;

  if (userId) {
    user_id_to_use = userId;
  } else {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      return { error: { message: 'User not authenticated.' } };
    }
    user_id_to_use = user.id;
  }

  if (!user_id_to_use) {
    return { error: { message: 'User ID not available.' } };
  }

  const error = await feedbackRepository.insertFeedback(user_id_to_use, content);
  return { error };
}

// src/routes/feedback/+page.server.ts
import { fail } from '@sveltejs/kit';
import * as feedbackController from '$lib/controllers/feedbackController';

export const actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const content = String(form.get('content') || '').trim();
    if (!content) return fail(400, { message: 'Content is required.' });

    const userId = locals.user?.id;

    if (!userId) {
      return fail(401, { message: 'User not authenticated.' });
    }

    const { error } = await feedbackController.submitFeedback(content, userId);
    if (error) {
      return fail(500, { message: error.message || 'Failed to submit feedback.' });
    }
    return { success: true };
  }
};

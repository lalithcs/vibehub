import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import { PostValidation } from '@/lib/validation'
import { Models } from 'appwrite'
import { useUserContext } from '@/context/AuthContext'
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queriesAndMutations'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID   = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const sendTelegramNotification = async (caption: string, username: string, location: string) => {
  const message = `🆕 *New Post on CareerQuest!*\n\n👤 *By:* ${username}\n📝 *Caption:* ${caption.slice(0, 100)}${caption.length > 100 ? '...' : ''}\n📍 *Location:* ${location || 'Not specified'}`;
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" }),
    });
  } catch {
    // Silent — notification failure should never block the user
  }
};

type PostFormProps = {
  post?: Models.Document;
  action: 'create' | 'update';
}

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { user } = useUserContext();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption:  post ? post.caption  : "",
      location: post ? post.location : "",
      tags:     post ? post.tags.join(',') : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === 'update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
      });

      if (!updatedPost) {
        toast({ title: 'Update failed — please try again' });
        return;
      }

      toast({ title: 'Post updated successfully' });
      return navigate(`/posts/${post.$id}`);
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({ title: 'Post creation failed — please try again' });
      return;
    }

    toast({ title: 'Post created successfully' });
    // Fire-and-forget Telegram notification
    sendTelegramNotification(values.caption, user.name || user.username, values.location ?? "");

    navigate('/');
  }

  const isLoading = isLoadingCreate || isLoadingUpdate;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-from_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-from_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-from_label">Add Tags (separated by comma ",")</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Art, Expression, Learn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          {/* Cancel now navigates back properly */}
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          {/* Fixed: label no longer shows "false" when not loading */}
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : `${action === 'create' ? 'Create' : 'Update'} Post`}
          </Button>
        </div>

      </form>
    </Form>
  );
};

export default PostForm;

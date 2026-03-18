import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/Client";
import { uploadPostImage } from "@/lib/supabase/Storage";

export const usePost = () => {

    const {user} = useAuth();

    const createPost = async (imageUri: string, description?: string) => { 
        if(!user){
            throw new Error("User not authenticated");
        }

        try {
            const imageUrl = await uploadPostImage(user.id, imageUri);

            // Calculate expiration time
            const now = new Date ();
            const expireAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            const {error} = await supabase.from('posts').insert({
                user_id: user.id,
                image_url: imageUrl,
                description: description || null,
                expires_at: expireAt.toISOString(),
                is_active: true,

            }).select()
            .single();

        } catch (error) {
            console.error("Error creating post:",error)
            throw error;
        }

    };

    return { createPost };
};

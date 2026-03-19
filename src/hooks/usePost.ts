import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/Client";
import { uploadPostImage } from "@/lib/supabase/Storage";
import { useEffect, useState } from "react";

export interface PostUser {
    id: string;
    name: string;
    username: string;
    profile_image_url?: string;
}
export interface Post {
    id: string;
    user_id: string;
    image_url: string;
    description?: string;
    created_at: string;
    expires_at: string;
    is_active: boolean;
    profiles?: PostUser;
}

export const usePost = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    
    console.log("USER:", user);
  console.log("POSTS:", posts);

 useEffect(() => {
    if (user) {
        loadPosts();
    }
}, [user]);

    const loadPosts = async () => {
        if (!user) return;

        setIsLoading(true);

        try {
            const { data: postsData, error: postError } = await supabase
                .from("posts")
                .select(
                    `
                    *,
                    profiles(id, name, username, profile_image_url)
                    `,
                )
                .eq("is_active", true)
                .gt("expires_at", new Date().toISOString())
                .order("created_at", { ascending: false });

            if (postError) {
                console.error("Error loading posts:", postError);
                throw postError;
            }

            if (!postsData || postsData.length === 0) {
                setPosts([]);
                return;
            }

            const postWithProfiles = postsData.map((post)=>({
                ...post,
                profiles: post.profiles || null,
            }))

            setPosts(postWithProfiles)
        } catch (error) {
            console.error("error in loadPost", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createPost = async (imageUri: string, description?: string) => {
        if (!user) {
            throw new Error("User not authenticated");
        }

        try {
            const imageUrl = await uploadPostImage(user.id, imageUri);

            // Calculate expiration time
            const now = new Date();
            const expireAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            const { error } = await supabase
                .from("posts")
                .insert({
                    user_id: user.id,
                    image_url: imageUrl,
                    description: description || null,
                    expires_at: expireAt.toISOString(),
                    is_active: true,
                })
                .select()
                .single();
                if (error) {
                    console.error("Error creating post:", error);
                    throw error;
                }
                await loadPosts();
        } catch (error) { }
    };

    return { createPost, posts };
};

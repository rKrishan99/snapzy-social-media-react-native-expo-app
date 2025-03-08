import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  const identify = await ctx.auth.getUserIdentity();
  if (!identify) throw new Error("Unauthorized");
  return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: {
    caption: v.optional(v.string()),
    storageId: v.id("_storage"),
  },

  handler: async (ctx, args) => {
    const identify = await ctx.auth.getUserIdentity();
    if (!identify) throw new Error("Unauthorized");

    const currentUser = await ctx.db.query("users").withIndex(
        "by_clerk_id", (q) => q.eq("clerkId", identify.subject)
    ).first();

    if(!currentUser) throw new Error("Use not found");

    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if(!imageUrl) throw new Error("Image not found");


    // craete post
    const postId = await ctx.db.insert("posts", {
        userId: currentUser._id,
        imageUrl,
        storageId: args.storageId,
        caption: args.caption,
        likes: 0,
        comments: 0
    })

    // increment users post count by 1
    await ctx.db.patch(currentUser._id, {
        post: currentUser.post +1
    })

    return postId;
 
  },
});

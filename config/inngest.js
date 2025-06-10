import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "innodeeps" });

export const syncUseconnection = inngest.createFunction(
    {
        id: "sync-use-connection",
    },

    {
        event: "clerk/user.created",
    },
    async ({ event}) => {
       const {id,first_name,last_name,email_addresses,image_url} = event.data;
       const userData = {
           _id: id,
           name: `${first_name} ${last_name}`,
           email: email_addresses[0].email_address,
           ImageUrl: image_url,

       };
       await connectDB();
       await User.create(userData)
    }
)
// Ingest function for updatation
export const synsUserupdate = inngest.createFunction(
    {
        id: "update-user-from-clerk",
    },

    {
        event: "clerk/user.updated",
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            ImageUrl: image_url,
        };
        await connectDB();
        await User.findByIdAndUpdate(id,userData)
    }
);
export const syncUserDelete = inngest.createFunction(
    {
        id: "delete-user-from-clerk",
    },

    {
        event: "clerk/user.deleted",
    },
    async ({ event }) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)
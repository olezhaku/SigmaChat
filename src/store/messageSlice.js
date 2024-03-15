import { createSlice } from "@reduxjs/toolkit";

let count = 0;

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        messages: [],
    },
    reducers: {
        createMessage(state, action) {
            console.log(state);
            console.log(action);

            const time =
                new Date().toLocaleTimeString().slice(0, -3) +
                " Σ " +
                new Date().toLocaleDateString().slice(0, -5);
            // dialogs.map((dialog) => {
            //     if (dialog.userId === isActive) {
            //         dialog.lstMsg = newMessage.text;
            //     }
            // });

            state.messages.push({
                id: count++,
                // userId: action.payload.isActive,
                isMe: true,
                text: action.payload,
                time: time,
            });
        },
    },
});

export const { createMessage } = messageSlice.actions;

export default messageSlice.reducer;

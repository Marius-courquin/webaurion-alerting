import axios from "axios";

export const sendNewMessage = async (noteName) => {
        const message = {
            content: 'Une nouvelle note a été ajoutée : ' + noteName
        };
        return axios.post(process.env.WEBHOOK_URL, message);
};
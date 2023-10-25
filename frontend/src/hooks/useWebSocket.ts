import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = (url: string, onNewReview: (review: any) => void) => {
    useEffect(() => {
        const socket = io(url);

        socket.on("newReview", onNewReview);

        return () => {
            socket.disconnect();
        };
    }, [url, onNewReview]);
};

export default useWebSocket;

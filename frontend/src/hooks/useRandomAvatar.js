import { useState, useEffect } from "react";

const useRandomAvatar = (email) => {
    const avatars = [
        '/avatar/avataaars-1.png',
        '/avatar/avataaars-2.png',
        '/avatar/avataaars-3.png',
        '/avatar/avataaars-4.png',
        '/avatar/avataaars-5.png',
        '/avatar/avataaars-6.png'
    ];

    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatars.length);
        return avatars[randomIndex];
    };  

    const avatarKey = `userAvatar_${email}`;
    const storedAvatar = localStorage.getItem(avatarKey);

    const [avatar, setAvatar] = useState(() => {
        return storedAvatar ? storedAvatar : getRandomAvatar();
    });

    useEffect(() => {
        if (!storedAvatar) {
            localStorage.setItem(avatarKey, avatar);
        }
    }, [avatar, storedAvatar, avatarKey]);

    return avatar;
};

export default useRandomAvatar;

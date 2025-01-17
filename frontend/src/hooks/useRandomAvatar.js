import { useState, useEffect } from "react";

const useRandomAvatar = (email) => {
    const avatars = [
        '/img/avatar/avataaars-1.png',
        '/img/avatar/avataaars-2.png',
        '/img/avatar/avataaars-3.png',
        '/img/avatar/avataaars-4.png',
        '/img/avatar/avataaars-5.png',
        '/img/avatar/avataaars-6.png'
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

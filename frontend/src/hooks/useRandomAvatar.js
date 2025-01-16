import { useState } from "react";

const useRandomAvatar = () => {   

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

    const [avatar, setAvatar] = useState(getRandomAvatar);
    
    return avatar;
};

export default useRandomAvatar;
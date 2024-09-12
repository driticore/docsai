'use client';

import { useUser } from '@clerk/nextjs';

function ClientUser({ userId }: { userId: string }) {
    const { user } = useUser();

    return <span>{user?.firstName}</span>;
}

export default ClientUser;

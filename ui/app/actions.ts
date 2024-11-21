'use server'

import { cookies } from 'next/headers';

export async function logoff() {
    cookies().delete("token")
}

'use server'

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function logoff() {
    cookies().delete("token")
    revalidatePath('/dashboard');
}

'use client';
import { Button } from '@/Components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	return (
		<div className="mt-10 ml-10">
			<Button onClick={(e) => router.push('/dashboard')}>
				Go to Dashboard
			</Button>
		</div>
	);
}

'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/dashboard'); // Only redirect root
	}, [router]);
	return null;
}

'use client';
'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sun, Moon, User, Settings, LogOut, Search } from 'lucide-react';
import { Input } from '../ui/input';

const Navbar = () => {
	const { theme, setTheme } = useTheme();
	// const { toggleSidebar } = useSidebar();
	return (
		<header className="flex items-center justify-between bg-background px-4 py-2 border-b ">
			{/* Search bar */}
			<div className="relative w-full max-w-sm">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
				<Input
					placeholder="Search products or orders..."
					className="pl-8 bg-secondary border-none text-gray-200 placeholder-gray-400"
				/>
			</div>

			{/* Right icons */}
			<div className="flex items-center gap-4 ml-4">
				{/* Theme toggle */}
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
				>
					{theme === 'light' ? (
						<Moon className="h-5 w-5 text-gray-700" />
					) : (
						<Sun className="h-5 w-5 text-gray-300" />
					)}
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar className="h-8 w-8">
							<AvatarImage src="/avatar.png" alt="User" />
							<AvatarFallback>U</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={10}>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="h-[1.2rem] w-[1.2rem] mr-2" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
							Settings
						</DropdownMenuItem>
						<DropdownMenuItem variant="destructive">
							<LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default Navbar;

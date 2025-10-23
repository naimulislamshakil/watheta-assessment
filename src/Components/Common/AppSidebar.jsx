import {
	Home,
	Inbox,
	Calendar,
	Search,
	Settings,
	User2,
	ChevronUp,
	Plus,
	Projector,
	ChevronDown,
	LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import {
	Sidebar,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from '../ui/sidebar';

const items = [
	{
		title: 'Home',
		url: '/',
		icon: Home,
	},
	{
		title: 'Inbox',
		url: '#',
		icon: Inbox,
	},
	{
		title: 'Calendar',
		url: '#',
		icon: Calendar,
	},
	{
		title: 'Search',
		url: '#',
		icon: Search,
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings,
	},
];

const AppSidebar = () => {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="py-2.5">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/dashboard">
								<LayoutDashboard width="20px" />
								<span className="text-xl uppercase font-semibold">
									Dashboard
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarSeparator />
		</Sidebar>
	);
};

export default AppSidebar;

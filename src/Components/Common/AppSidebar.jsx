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
	ListOrderedIcon,
	Badge,
} from 'lucide-react';
import Link from 'next/link';
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from '../ui/sidebar';

const items = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: <Home />,
	},
	{
		title: 'Products',
		url: '/dashboard/products',
		icon: <Badge />,
	},
	{
		title: 'Orders',
		url: ' /dashboard/orders',
		icon: <ListOrderedIcon />,
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

			<SidebarContent>
				<div className="mt-4 px-2">
					<SidebarMenu>
						{items.map((item, i) => (
							<SidebarMenuItem key={i}>
								<SidebarMenuButton asChild>
									<Link
										href={item.url}
										className="flex items-center gap-3 rounded px-3 py-4 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
									>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</div>
			</SidebarContent>
		</Sidebar>
	);
};

export default AppSidebar;

import { NAV_LINKS } from '@/content/navigation';
import Button from '@/shared/ui/Button';

type Props = { active: string };

export default function DesktopNav({ active }: Props) {
    return (
        <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
            {NAV_LINKS.map((item) => (
                <a key={item.href} href={item.href} className={`relative inline-block py-1 transition ${active === item.href ? 'text-primary' : 'hover:text-primary'} group`}>
                    {item.label}
                    <span
                        className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 ${active === item.href ? 'scale-x-100' : ''}`}
                    />
                </a>
            ))}
            <Button as="a" href="#reserver">
                Réserver
            </Button>
        </nav>
    );
}

'use client';

import Image from 'next/image';
import { AcademicCapIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { Github, Linkedin } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';

const OrcidIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
);

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    features: SiteConfig['features'];
    researchInterests?: string[];
}

export default function Profile({ author, social, researchInterests }: ProfileProps) {
    const links = [
        social.email && { label: social.email, href: `mailto:${social.email}`, icon: EnvelopeIcon },
        social.location && { label: social.location, href: social.location_url || '#', icon: MapPinIcon },
        social.google_scholar && { label: 'Google Scholar', href: social.google_scholar, icon: AcademicCapIcon },
        social.orcid && { label: 'ORCID', href: social.orcid, icon: OrcidIcon },
        social.github && { label: 'GitHub', href: social.github, icon: Github },
        social.linkedin && { label: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    ].filter(Boolean) as Array<{ label: string; href: string; icon: React.ComponentType<{ className?: string }> }>;

    return (
        <div className="academic-profile">
            <div className="academic-avatar">
                <Image src={author.avatar} alt={author.name} width={220} height={220}
                    className="h-full w-full object-cover object-[32%_center]" priority />
            </div>
            <h1>{author.name}</h1>
            <p className="academic-role">{author.title}</p>
            <p className="academic-institution">{author.institution}</p>

            <ul className="academic-links" aria-label="Profile links">
                {links.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                            <Icon className="h-4 w-4" /><span>{label}</span>
                        </a>
                    </li>
                ))}
            </ul>

            {researchInterests && researchInterests.length > 0 && (
                <div className="academic-interests">
                    <h2>Research interests</h2>
                    <p>{researchInterests.join(' · ')}</p>
                </div>
            )}
        </div>
    );
}

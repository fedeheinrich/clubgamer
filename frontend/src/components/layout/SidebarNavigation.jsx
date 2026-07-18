import { Link } from 'react-router-dom';

function SidebarNavigation({
  logoSrc,
  logoAlt = 'Logo',
  items = [],
  activeId,
}) {
  const hasLogo = Boolean(logoSrc);

  return (
    <aside className={`hidden w-64 shrink-0 p-6 lg:flex lg:flex-col ${hasLogo ? '' : 'pt-8'}`}>
      {hasLogo ? (
        <img src={logoSrc} alt={logoAlt} className="mb-10 h-auto w-48 object-contain" />
      ) : null}

      <nav className={`mx-auto w-full max-w-[196px] space-y-5 ${hasLogo ? 'mt-10' : 'mt-4'}`}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId || item.active;

          return (
            <Link
              key={item.id}
              to={item.to}
              className={`group relative flex items-center gap-3.5 rounded-xl px-3 py-3 text-[1.12rem] font-semibold transition
                ${isActive ? 'text-white' : 'text-slate-200/95 hover:text-white'}`}
            >
              {isActive && (
                <span className="absolute -left-6 top-1/2 h-11 w-3 -translate-y-1/2 rounded-r-full bg-[#3D63FF] shadow-[0_0_18px_rgba(61,99,255,0.95)]" />
              )}
              <Icon className={`h-6 w-6 shrink-0 ${isActive ? 'text-[#3D63FF]' : 'text-white'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default SidebarNavigation;